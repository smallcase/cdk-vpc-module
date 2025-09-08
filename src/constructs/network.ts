import { aws_ec2 as ec2, CfnOutput, Tags, aws_iam as iam, Stack } from 'aws-cdk-lib';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { SubnetStack } from './subnet-stack';
import { VpcEndpointServiceNestedStack, VpcEndpontServiceConfig } from './vpc-endpoint-service';
import { ObjToStrMap } from '../utils/common';

export interface NetworkACL {
  readonly cidr: ec2.AclCidr;
  readonly traffic: ec2.AclTraffic;
}

export interface AddRouteOptions {
  readonly routerId?: string;
  readonly existingVpcPeeringRouteKey?: string;
  /**
     * IPv4 range this route applies to.
     *
     * @default '0.0.0.0/0'
     * @stability stable
     */
  readonly destinationCidrBlock?: string;
  /**
    * IPv6 range this route applies to.
    *
    * @default - Uses IPv6
    * @stability stable
    */
  readonly destinationIpv6CidrBlock?: string;
  /**
    * What type of router to route this traffic to.
    *
    * @stability stable
    */
  readonly routerType: ec2.RouterType;
  /**
    * The ID of the router.
    *
    * Can be an instance ID, gateway ID, etc, depending on the router type.
    *
    * @stability stable
    */
  /**
    * Whether this route will enable internet connectivity.
    *
    * If true, this route will be added before any AWS resources that depend
    * on internet connectivity in the VPC will be created.
    *
    * @default false
    * @stability stable
    */
  readonly enablesInternetConnectivity?: boolean;
  readonly routeName?: string;
}
export interface ISubnetsProps {
  readonly subnetGroupName: string;
  readonly subnetType: ec2.SubnetType;
  readonly cidrBlock: string[];
  readonly availabilityZones: string[];
  readonly ingressNetworkACL?: NetworkACL[];
  readonly egressNetworkACL?: NetworkACL[];
  readonly routes?: AddRouteOptions[];
  readonly tags?: Record<string, string>;
  readonly useSubnetForNAT?: boolean;
  readonly useNestedStacks?: boolean;
}
export interface VPCProps {
  readonly vpc: ec2.VpcProps;
  readonly peeringConfigs?: Record<string, PeeringConfig>;
  readonly vpcEndpoints?: VpcEndpointConfig[]; // List of VPC endpoints to configure
  readonly natEipAllocationIds?: string[];
  readonly subnets: ISubnetsProps[];
  readonly vpcEndpointServices?: VpcEndpontServiceConfig[]; // List of VPC endpoint Service to configure
  readonly useNestedStacks?: boolean;
}

export interface PeeringConfig {
  readonly peeringVpcId: string;
  readonly peerOwnerId?: string;
  readonly peerAssumeRoleArn?: string;
  readonly peerRegion?: string;
  readonly tags: Record<string, string>;
}


export interface PeeringConnectionInternalType {
  /**
  * @jsii ignore
  */
  [name: string]: ec2.CfnVPCPeeringConnection;
}
export interface SecurityGroupRule {
  readonly peer: ec2.IPeer | ec2.ISecurityGroup; // Define the source of the traffic (Peer)
  readonly port: ec2.Port; // Define the port and protocol (Port)
  readonly description?: string; // Optional description for the rule
}
export interface IExternalVPEndpointSubnets {
  readonly id: string;
  readonly availabilityZone: string;
  readonly routeTableId: string;
}
export interface VpcEndpointConfig {
  readonly name: string; // Name of the VPC endpoint
  readonly service: ec2.InterfaceVpcEndpointAwsService | ec2.GatewayVpcEndpointAwsService | ec2.InterfaceVpcEndpointService;
  readonly subnetGroupNames: string[]; // Array of subnet group names to associate with the endpoint
  readonly externalSubnets?: IExternalVPEndpointSubnets[]; // Array of subnet IDs with availability zones
  readonly iamPolicyStatements?: iam.PolicyStatement[]; // Optional IAM policy statements for the endpoint
  readonly securityGroupRules?: SecurityGroupRule[]; // Optional list of security group rules for Interface Endpoints
  readonly additionalTags?: { [key: string]: string }; // Optional additional tags
}

export class Network extends Construct {
  public pbSubnets: ec2.PublicSubnet[] = [];
  public pvSubnets: ec2.PrivateSubnet[] = [];
  public natSubnets: ec2.PublicSubnet[] = [];
  public subnets: { [key: string]: ec2.Subnet[] } = {};
  public readonly vpc!: ec2.Vpc;
  public readonly securityGroupOutputs: { [key: string]: ec2.SecurityGroup } = {}; // Store Security Group outputs
  public readonly endpointOutputs: { [key: string]: ec2.InterfaceVpcEndpoint | ec2.GatewayVpcEndpoint } = {}; // Store Endpoint outputs
  private peeringConnectionIds: PeeringConnectionInternalType = {};
  constructor(scope: Construct, id: string, props: VPCProps) {
    super(scope, id);
    this.vpc = new ec2.Vpc(this, 'VPC', props.vpc);

    if (props.peeringConfigs) {
      const convertPeeringConfig: Map<string, PeeringConfig> = ObjToStrMap(props.peeringConfigs);
      convertPeeringConfig.forEach((createVpcPeering, key) => {
        let peeringConnectionIdByKey: ec2.CfnVPCPeeringConnection = new ec2.CfnVPCPeeringConnection(this, `PeerDestination-${key}`, {
          vpcId: this.vpc.vpcId,
          peerVpcId: createVpcPeering.peeringVpcId,
          peerOwnerId: createVpcPeering.peerOwnerId,
          peerRoleArn: createVpcPeering.peerAssumeRoleArn,
          peerRegion: createVpcPeering.peerRegion,
        });
        const tags: Map<string, string> = ObjToStrMap(createVpcPeering.tags);
        tags.forEach((v, k) => {
          Tags.of(peeringConnectionIdByKey).add(k, v);
        });
        this.peeringConnectionIds[key] = peeringConnectionIdByKey;
      });
    }

    const internetGateway = new ec2.CfnInternetGateway(
      this,
      'InternetGateway',
      {},
    );
    new ec2.CfnVPCGatewayAttachment(this, 'VPCGatewayAttachement', {
      internetGatewayId: internetGateway.ref,
      vpcId: this.vpc.vpcId,
    });

    // Initialize NAT provider with EIP allocation IDs if provided
    const natProvider = props.natEipAllocationIds && props.natEipAllocationIds.length > 0
      ? ec2.NatProvider.gateway({
        eipAllocationIds: props.natEipAllocationIds,
      }) : ec2.NatProvider.gateway();


    // First pass: collect all subnets
    props.subnets.forEach((subnetProps) => {
      let subnet = this.createSubnet(subnetProps, this.vpc, this.peeringConnectionIds, props.useNestedStacks);
      this.subnets[subnetProps.subnetGroupName] = subnet;
      subnet.forEach((sb) => {
        if (sb instanceof ec2.PublicSubnet) {
          this.pbSubnets.push(sb);
        } else if (sb instanceof ec2.PrivateSubnet) {
          this.pvSubnets.push(sb);
        }
        if (
          subnetProps.subnetGroupName == 'NATGateway' &&
          sb instanceof ec2.PublicSubnet
        ) {
          this.natSubnets.push(sb);
        } else if (
          sb instanceof ec2.PublicSubnet &&
          subnetProps.useSubnetForNAT == true
        ) {
          this.natSubnets.push(sb);
        }
      });
    });

    // Configure NAT after collecting all subnets
    if (this.natSubnets.length > 0) {
      natProvider.configureNat({
        vpc: this.vpc,
        natSubnets: this.natSubnets,
        privateSubnets: this.pvSubnets,
      });
    }

    // Determine routing strategy based on number of NAT Gateways
    const natGatewayCount = this.natSubnets.length;
    const useSingleRouteTable = natGatewayCount <= 1;

    // Add output to show which strategy is being used
    new CfnOutput(this, 'RoutingStrategy', {
      value: useSingleRouteTable ? 'Route Table per Subnet Group' : 'Route Table per Subnet',
      description: 'Routing strategy based on NAT Gateway count',
    });

    new CfnOutput(this, 'NATGatewayCount', {
      value: natGatewayCount.toString(),
      description: 'Number of NAT Gateways configured',
    });

    // Add output for EIP allocation IDs if provided
    if (props.natEipAllocationIds && props.natEipAllocationIds.length > 0) {
      new CfnOutput(this, 'NATEipAllocationIds', {
        value: props.natEipAllocationIds.join(','),
        description: 'EIP allocation IDs used for NAT Gateways',
      });
    }

    // this.pbSubnets.forEach((pb) => {
    //   pb.addDefaultInternetRoute(internetGateway.ref, att);
    // });

    new CfnOutput(this, 'VpcId', { value: this.vpc.vpcId });
    // Add VPC endpoints if specified in the props
    if (props?.vpcEndpoints) {
      for (const endpointConfig of props.vpcEndpoints) {
        this.addVpcEndpoint(endpointConfig);
      }
    }
    if (props?.vpcEndpointServices) {
      new VpcEndpointServiceNestedStack(this, 'VpcEndpointServices', {
        vpc: this.vpc,
        vpcEndpointServiceConfigs: props.vpcEndpointServices,
        subnets: this.subnets,
      });
    }
  }

  createSubnet(option: ISubnetsProps, vpc: ec2.Vpc, peeringConnectionId?: PeeringConnectionInternalType, useGlobalNestedStacks?: boolean) {
    const shouldUseNestedStack = option.useNestedStacks ?? useGlobalNestedStacks ?? false;
    if (shouldUseNestedStack) {
      // Create nested stack for this subnet group
      const subnetStack = new SubnetStack(this, `${option.subnetGroupName}Stack`, {
        vpc: vpc,
        subnetGroupName: option.subnetGroupName,
        subnetType: option.subnetType,
        cidrBlocks: option.cidrBlock,
        availabilityZones: option.availabilityZones,
        ingressNetworkACL: option.ingressNetworkACL,
        egressNetworkACL: option.egressNetworkACL,
        routes: option.routes,
        peeringConnectionId: peeringConnectionId,
        tags: option.tags,
        useSubnetForNAT: option.useSubnetForNAT,
      });
      // Return the subnets from the nested stack
      return subnetStack.subnets;
    } else {
      const subnets: ec2.Subnet[] = [];
      const SUBNETTYPE_TAG = 'aws-cdk:subnet-type';
      const SUBNETNAME_TAG = 'aws-cdk:subnet-name';
      const NAME_TAG = 'Name';
      if (option.availabilityZones.length != option.cidrBlock.length) {
        // eslint-disable-next-line max-len
        throw new Error(
          "You cannot reference a Subnet's availability zone if it was not supplied. Add the availabilityZone when importing using option.fromSubnetAttributes()",
        );
      }

      option.availabilityZones.forEach((az, index) => {
        let subnet: ec2.PrivateSubnet | ec2.PublicSubnet =
          option.subnetType === ec2.SubnetType.PUBLIC
            ? new ec2.PublicSubnet(
              this,
              `${option.subnetGroupName}Subnet${index}`,
              {
                availabilityZone: az,
                cidrBlock: option.cidrBlock[index],
                vpcId: vpc.vpcId,
                mapPublicIpOnLaunch: true,

              },
            )
            : new ec2.PrivateSubnet(
              this,
              `${option.subnetGroupName}Subnet${index}`,
              {
                availabilityZone: az,
                cidrBlock: option.cidrBlock[index],
                vpcId: vpc.vpcId,
                mapPublicIpOnLaunch: false,
              },
            );
        option.routes?.forEach((route, routeIndex) => {
          if (peeringConnectionId != undefined && route.existingVpcPeeringRouteKey != undefined) {
            let routeId: ec2.CfnVPCPeeringConnection | undefined = peeringConnectionId[route.existingVpcPeeringRouteKey];
            if (routeId != undefined) {
              subnet.addRoute(
                `${option.subnetGroupName}${routeIndex}RouteEntry`,
                {
                  routerId: routeId.ref,
                  routerType: route.routerType,
                  destinationCidrBlock: route.destinationCidrBlock,
                },
              );
            }
          } else if (route.routerId != undefined) {
            subnet.addRoute(
              `${option.subnetGroupName}${routeIndex}RouteEntry`,
              {
                routerId: route.routerId ?? '',
                routerType: route.routerType,
                destinationCidrBlock: route.destinationCidrBlock,
              },
            );
          }

        });
        Tags.of(subnet).add(SUBNETNAME_TAG, option.subnetGroupName);
        Tags.of(subnet).add(SUBNETTYPE_TAG, option.subnetType);
        if (option.tags != undefined) {
          const tags: Map<string, string> = ObjToStrMap(option.tags);
          tags.forEach((v, k) => {
            Tags.of(subnet).add(k, v);
          });
        }
        subnets.push(subnet);
      });
      const nacl = new ec2.NetworkAcl(this, `${option.subnetGroupName}NACL`, {
        vpc: vpc,
        subnetSelection: {
          subnets: subnets,
        },
      });
      Tags.of(nacl).add(NAME_TAG, nacl.node.path);
      option.ingressNetworkACL?.forEach((ingressNACL, index) => {
        new ec2.NetworkAclEntry(
          this,
          `${option.subnetGroupName}IngressNACL-${index}`,
          {
            ruleNumber: 100 + index,
            cidr: ingressNACL.cidr,
            networkAcl: nacl,
            traffic: ingressNACL.traffic,
            direction: ec2.TrafficDirection.INGRESS,
          },
        );
      });
      option.egressNetworkACL?.forEach((ingressNACL, index) => {
        new ec2.NetworkAclEntry(
          this,
          `${option.subnetGroupName}EgressNACL-${index}`,
          {
            ruleNumber: 100 + index,
            cidr: ingressNACL.cidr,
            networkAcl: nacl,
            traffic: ingressNACL.traffic,
            direction: ec2.TrafficDirection.EGRESS,
          },
        );
      });

      new CfnOutput(this, `${option.subnetGroupName}OutPutSubnets`, {
        value: subnets
          .map((subnet) => {
            return subnet.subnetId;
          })
          .join(','),
        description: `${option.subnetGroupName} subnets cross`,
      });
      new CfnOutput(this, `${option.subnetGroupName}OutPutNACL`, {
        value: nacl.networkAclId,
        description: `${option.subnetGroupName} subnets associated this nacl`,
      });
      return subnets;
    }
  }

  // Helper function to add VPC endpoints based on the service and optional subnet and security group configuration
  private addVpcEndpoint(endpointConfig: VpcEndpointConfig) {
    const NAME_TAG = 'Name';
    // Retrieve the subnets using the group names and merge all the selected subnets
    const mergedSubnets = this.mergeSubnetsByGroupNames(endpointConfig.name, endpointConfig.service, endpointConfig.subnetGroupNames,
      endpointConfig.externalSubnets);
    if (endpointConfig.service instanceof ec2.GatewayVpcEndpointAwsService) {
      // Gateway Endpoint (e.g., S3, DynamoDB)
      const gatewayEndpoint = this.vpc.addGatewayEndpoint(endpointConfig.name, {
        service: endpointConfig.service,
        subnets: [mergedSubnets],
      });
      // Store the Gateway Endpoint output
      this.endpointOutputs[endpointConfig.name] = gatewayEndpoint;
      // Tag the Interface Endpoint with a Name
      //Tags.of(gatewayEndpoint).add(NAME_TAG, endpointConfig.name);
      this.applyTagsUsingCustomResource(gatewayEndpoint.vpcEndpointId, `GVPETagging${endpointConfig.name}`, {
        [NAME_TAG]: endpointConfig.name,
        ...endpointConfig.additionalTags,
      });

      // If IAM policy statements are provided, apply them to the endpoint
      if (endpointConfig.iamPolicyStatements) {
        for (const statement of endpointConfig.iamPolicyStatements) {
          gatewayEndpoint.addToPolicy(statement);
        }
      }
    } else if (endpointConfig.service instanceof ec2.InterfaceVpcEndpointService ||
      endpointConfig.service instanceof ec2.InterfaceVpcEndpointAwsService) {
      // Interface Endpoint (e.g., MongoDB Atlas, EC2, Secrets Manager)

      // If security group rules are provided, create a security group with those rules
      const securityGroup = this.createSecurityGroupWithRules(endpointConfig.securityGroupRules, endpointConfig.name);

      // Create the Interface VPC Endpoint for both custom and AWS services
      const interfaceEndpoint = this.vpc.addInterfaceEndpoint(endpointConfig.name, {
        service: endpointConfig.service,
        subnets: mergedSubnets,
        securityGroups: [securityGroup],
      });

      // Tag the Interface Endpoint with a Name
      //Tags.of(interfaceEndpoint).add(NAME_TAG, endpointConfig.name);
      this.applyTagsUsingCustomResource(interfaceEndpoint.vpcEndpointId, `VPETagging${endpointConfig.name}`, {
        [NAME_TAG]: endpointConfig.name,
        ...endpointConfig.additionalTags,
      });
      // Store the outputs
      this.securityGroupOutputs[endpointConfig.name] = securityGroup;
      this.endpointOutputs[endpointConfig.name] = interfaceEndpoint;
    } else {
      throw new Error('Unsupported service type');
    }
  }


  // Helper function to merge subnets based on subnet group names
  public mergeSubnetsByGroupNames(name: string,
    service: ec2.InterfaceVpcEndpointAwsService | ec2.GatewayVpcEndpointAwsService
      | ec2.InterfaceVpcEndpointService,
    subnetGroupNames: string[], externalSubnets?: IExternalVPEndpointSubnets[]): ec2.SelectedSubnets {
    // Check if subnetGroupNames is required and not empty for Interface VPC Endpoints
    if ((service instanceof ec2.InterfaceVpcEndpointAwsService || service instanceof ec2.InterfaceVpcEndpointService) &&
      (!subnetGroupNames || subnetGroupNames.length === 0)) {
      throw new Error('subnetGroupNames must contain at least one subnet group name for Interface VPC Endpoints.');
    }

    // Initialize an array to hold all the subnets
    let mergedSubnets: ec2.ISubnet[] = [];

    // Iterate over each subnet group name and select the subnets
    for (const groupName of subnetGroupNames) {
      const selectedSubnets = this.subnets[groupName];
      mergedSubnets = mergedSubnets.concat(selectedSubnets); // Merge the subnets
    }
    // Fetch subnets by subnet ID and add to the mergedSubnets array
    if (externalSubnets != undefined && !(service instanceof ec2.InterfaceVpcEndpointAwsService
      || service instanceof ec2.InterfaceVpcEndpointService)) {
      for (const subnetInfo of externalSubnets) {
        const subnet = ec2.Subnet.fromSubnetAttributes(this, `${name}-${subnetInfo.id}`, {
          subnetId: subnetInfo.id,
          availabilityZone: subnetInfo.availabilityZone, // Must supply the availability zone
          routeTableId: subnetInfo.routeTableId,
        });
        mergedSubnets.push(subnet);
      }
    }

    // Return the merged subnets as a SelectedSubnets object
    return {
      subnets: mergedSubnets,
      availabilityZones: [...new Set(mergedSubnets.map(subnet => subnet.availabilityZone))], // Deduplicate AZs
    } as ec2.SelectedSubnets;
  }

  // Helper function to create a security group with a list of rules
  private createSecurityGroupWithRules(rules?: SecurityGroupRule[], name?: string): ec2.SecurityGroup {
    const sg = new ec2.SecurityGroup(this, `${name}-sg`, {
      vpc: this.vpc,
      securityGroupName: `${name}`,
      description: `Custom security group for ${name}`,
      allowAllOutbound: true, // Allow all outbound traffic by default
    });
    Tags.of(sg).add('Name', `${name}`);
    // If rules are provided, add each rule to the security group
    if (rules) {
      for (const rule of rules) {
        sg.addIngressRule(rule.peer, rule.port, rule.description);
      }
    }

    return sg;
  }

  private applyTagsUsingCustomResource(resourceId: string, resourceType: string, tags: { [key: string]: string }) {
    new AwsCustomResource(this, `AddTagsTo${resourceType}`, {
      onCreate: {
        service: 'EC2',
        action: 'createTags',
        parameters: {
          Resources: [resourceId], // Use the VPC endpoint ID (or other resource IDs) for tagging
          Tags: Object.entries(tags).map(([key, value]) => ({ Key: key, Value: value })),
        },
        physicalResourceId: PhysicalResourceId.of(`${resourceType}-tags`), // Ensures the resource is tagged only once
      },
      // onUpdate: {
      //   service: 'EC2',
      //   action: 'createTags',
      //   parameters: {
      //     Resources: [resourceId], // Use the VPC endpoint ID (or other resource IDs) for tagging
      //     Tags: Object.entries(tags).map(([key, value]) => ({ Key: key, Value: value })),
      //   },
      //   physicalResourceId: PhysicalResourceId.of(`${resourceType}-${Object.keys(tags).length}-tags-update`), // Ensures the resource is tagged only once
      // },
      policy: AwsCustomResourcePolicy.fromStatements([
        new iam.PolicyStatement({
          actions: ['ec2:CreateTags'],
          resources: [`arn:aws:ec2:${Stack.of(this).region}:${Stack.of(this).account}:vpc-endpoint/${resourceId}`],
        }),
      ]),
    });
  }
}



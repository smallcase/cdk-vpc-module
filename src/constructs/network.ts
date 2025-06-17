import { aws_ec2 as ec2, CfnOutput, Tags, aws_iam as iam, Stack } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { RouteTableManager } from './routeTableManager';
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
}
export interface VPCProps {
  readonly vpc: ec2.VpcProps;
  readonly peeringConfigs?: Record<string, PeeringConfig>;
  readonly vpcEndpoints?: VpcEndpointConfig[]; // List of VPC endpoints to configure
  readonly natEipAllocationIds?: string[];
  readonly subnets: ISubnetsProps[];
  readonly vpcEndpointServices?: VpcEndpontServiceConfig[]; // List of VPC endpoint Service to configure
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
// Target Group Configuration Interface
export interface TargetGroupConfig {
  readonly host: string;
  readonly applicationPort: number;
  readonly healthCheckPath?: string;
  readonly healthCheckProtocol?: elbv2.Protocol;
  readonly protocolVersion?: elbv2.ApplicationProtocolVersion;
  readonly protocol?: elbv2.ApplicationProtocol;
  readonly healthCheckPort?: number;
  readonly priority?: number;
}

export interface LoadBalancerConfig {
  readonly existingArn?: string;
  readonly existingSecurityGroupId?: string;
  readonly subnetGroupName?: string;
  readonly internetFacing?: boolean;
  readonly targetGroups?: TargetGroupConfig[];
  readonly certificates?: string[];
  readonly securityGroupRules?: SecurityGroupRule[]; // Optional list of security group rules for Interface Endpoints
}

export interface NetworkLoadBalancerConfig {
  readonly subnetGroupName: string;
  readonly securityGroupRules: SecurityGroupRule[]; // Optional list of security group rules for Interface Endpoints
  readonly existingSecurityGroupId?: string;
  readonly certificates?: string[];
  readonly internetFacing?: boolean;
}

export interface VpcEndpontServiceConfig {
  readonly name: string;
  readonly alb: LoadBalancerConfig;
  readonly nlb: NetworkLoadBalancerConfig;
  readonly allowedPrincipals?: string[];
  readonly acceptanceRequired?: boolean;
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

    // Initialize NAT provider after collecting all subnets
    const natProvider = props.natEipAllocationIds?.length === this.natSubnets?.length && props.natEipAllocationIds?.length > 0
      ? ec2.NatProvider.gateway({
          eipAllocationIds: props.natEipAllocationIds,
        }) : ec2.NatProvider.gateway();

    
    // First pass: collect all subnets
    props.subnets.forEach((subnetProps) => {
      let subnet = this.createSubnet(subnetProps, this.vpc);
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

    // Second pass: configure routes after NAT is configured
    props.subnets.forEach((subnetProps) => {
      const routeTableManager = new RouteTableManager(this, `${subnetProps.subnetGroupName}RouteTableManager`, {
        vpc: this.vpc,
        subnetGroupName: subnetProps.subnetGroupName,
        routes: subnetProps.routes,
        peeringConnectionId: this.peeringConnectionIds,
        subnetType: subnetProps.subnetType,
        natProvider: natProvider,
        internetGateway: internetGateway
      });
      this.subnets[subnetProps.subnetGroupName].forEach((subnet, index) => {
        routeTableManager.associateSubnet(subnet, index);
      });
    });

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
      for (const vpcEndpointServiceConfig of props.vpcEndpointServices) {
        this.addVpcEndpointService(vpcEndpointServiceConfig);
      }
    }
  }

  createSubnet(option: ISubnetsProps, vpc: ec2.Vpc) {
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
  private mergeSubnetsByGroupNames(name: string,
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
  // Helper function to create a security group with a list of rules
  private createOrExistingSGWithRules(type: string, sgId?: string, rules?: SecurityGroupRule[], name?: string): ec2.SecurityGroup {
    const sg = sgId ? ec2.SecurityGroup.fromSecurityGroupId(
      this,
      `${name}${type}ExistingSecurityGroup`,
      sgId,
    ) as ec2.SecurityGroup
      : new ec2.SecurityGroup(this, `${name}-${type}-sg`, {
        vpc: this.vpc,
        securityGroupName: `${name}-${type}-sg`,
        description: `Custom security group for ${name}`,
        allowAllOutbound: true, // Allow all outbound traffic by default
      });
    Tags.of(sg).add('Name', `${name}-${type}-sg`);
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

  private addVpcEndpointService(vpceServiceConfig: VpcEndpontServiceConfig) {
    const { alb, name, nlb, allowedPrincipals, acceptanceRequired, additionalTags } = vpceServiceConfig;
    let ALB: elbv2.ApplicationLoadBalancer;
    let NLB: elbv2.NetworkLoadBalancer;
    let vpcEndpointService: ec2.VpcEndpointService;
    let nlbTargetGroups: elbv2.INetworkTargetGroup[] = [];
    let albListeners: string[];
    let albListener: elbv2.IApplicationListener;
    let albOutputArn: string | undefined;
    let nlbOutputArn: string | undefined;
    // eslint-disable-next-line max-len
    const albVpcSubnets = alb.subnetGroupName ? this.mergeSubnetsByGroupNames(name, ec2.InterfaceVpcEndpointService, [alb.subnetGroupName]) : undefined;

    const nlbSecurityGroup = this.createOrExistingSGWithRules('NLB', nlb.existingSecurityGroupId, nlb.securityGroupRules, name);
    const albSecurityGroup = this.createOrExistingSGWithRules('ALB', alb.existingSecurityGroupId, alb.securityGroupRules, name);
    albSecurityGroup.addIngressRule(nlbSecurityGroup, ec2.Port.HTTPS, 'allowNLBTraffic443');
    albSecurityGroup.addIngressRule(nlbSecurityGroup, ec2.Port.HTTP, 'allowNLBTraffic80');
    // eslint-disable-next-line max-len
    const nlbVpcSubnets = nlb.subnetGroupName ? this.mergeSubnetsByGroupNames(name, ec2.InterfaceVpcEndpointService, [nlb.subnetGroupName]) : undefined;

    if (alb.existingArn == undefined) {
      ALB = new elbv2.ApplicationLoadBalancer(this, `${name}alb`, {
        vpc: this.vpc,
        internetFacing: alb?.internetFacing ? alb?.internetFacing : false,
        vpcSubnets: albVpcSubnets,
        securityGroup: albSecurityGroup,
      });
      const nlbTargetGroup = new elbv2.NetworkTargetGroup(this, `NLBTargetGroup${name}`, {
        port: 443,
        vpc: this.vpc,
        protocol: elbv2.Protocol.TCP,
        targets: [new targets.AlbArnTarget(ALB.loadBalancerArn, 443)],
      });
      nlbTargetGroups.push(nlbTargetGroup);
      albListener = ALB.addListener(`${name}-443-ALBListener`, {
        port: 443,
        certificates: alb.certificates ? alb.certificates.map((certiArn, index) => {
          return acm.Certificate.fromCertificateArn(this, `${name}-importAlbCert-${index}`, certiArn);
        }) : undefined,
        defaultAction: elbv2.ListenerAction.fixedResponse(503, {
          contentType: 'text/plain',
          messageBody: 'Service is temporarily unavailable.', // Custom Response Body
        }),
      });
      ALB.addListener(`${name}-HttpListener`, {
        port: 80,
        defaultAction: elbv2.ListenerAction.redirect({
          port: '443',
          protocol: elbv2.ApplicationProtocol.HTTPS,
          permanent: true, // HTTP 301 Redirect
        }),
      });
      albOutputArn = ALB.loadBalancerArn;
    } else {
      const nlbTargetGroup = new elbv2.NetworkTargetGroup(this, `NLBTargetGroup${name}`, {
        port: 443,
        vpc: this.vpc,
        protocol: elbv2.Protocol.TCP,
        targets: [new targets.AlbArnTarget(alb.existingArn, 443)],
      });
      nlbTargetGroups.push(nlbTargetGroup);
      albListeners = this.getLoadBalancerListener(alb.existingArn, true, name);
      albOutputArn = alb.existingArn;
    }
    NLB = new elbv2.NetworkLoadBalancer(this, `${name}nlb`, {
      vpc: this.vpc,
      vpcSubnets: nlbVpcSubnets,
      internetFacing: nlb.internetFacing ? nlb.internetFacing : false,
      securityGroups: [nlbSecurityGroup!],
    });
    if (nlb.certificates != undefined) {
      const certificates: acm.ICertificate[] = nlb.certificates.map((certiArn, index) => {
        return acm.Certificate.fromCertificateArn(this, `${name}-importNlbCert-${index}`, certiArn);
      });
      NLB.addListener(`${name}NLB443Listener`, {
        port: 443,
        certificates,
        protocol: elbv2.Protocol.HTTPS,
        defaultTargetGroups: nlbTargetGroups,
      });
      NLB.addListener(`${name}NLB80Listener`, {
        port: 80,
        protocol: elbv2.Protocol.HTTP,
        defaultTargetGroups: nlbTargetGroups,
      });
    } else {
      NLB.addListener(`${name}NLB443Listener`, {
        port: 443,
        protocol: elbv2.Protocol.TCP,
        defaultTargetGroups: nlbTargetGroups,
      });
      NLB.addListener(`${name}NLB80Listener`, {
        port: 80,
        protocol: elbv2.Protocol.TCP,
        defaultTargetGroups: nlbTargetGroups,
      });
    }
    vpcEndpointService = new ec2.VpcEndpointService(this, `${name}EndpointService`, {
      vpcEndpointServiceLoadBalancers: [NLB],
      acceptanceRequired: acceptanceRequired,
      allowedPrincipals: allowedPrincipals?.map((principal) => new iam.ArnPrincipal(principal)),
      contributorInsights: false,
    });
    nlbOutputArn = NLB.loadBalancerArn;
    this.createVPCEndpointServiceOutputs(vpcEndpointService, name, nlbOutputArn, albOutputArn);

    if (additionalTags) {
      Tags.of(vpcEndpointService).add('Name', name);
      Object.entries(additionalTags).forEach(([key, value]) => {
        Tags.of(vpcEndpointService).add(key, value);
      });
    }

    if (alb.targetGroups) {
      alb.targetGroups.forEach((tgConfig, index) => {
        const albTargetGroup = new elbv2.ApplicationTargetGroup(this, `${name}-AlbTargetGroup-${index}`, {
          vpc: this.vpc,
          protocolVersion: tgConfig.protocolVersion ? tgConfig.protocolVersion : elbv2.ApplicationProtocolVersion.HTTP1,
          protocol: tgConfig.protocol ? tgConfig.protocol : elbv2.ApplicationProtocol.HTTP,
          targetType: elbv2.TargetType.IP,
          port: tgConfig.applicationPort,
          healthCheck: {
            path: tgConfig.healthCheckPath,
            protocol: tgConfig.healthCheckProtocol ? tgConfig.healthCheckProtocol : elbv2.Protocol.HTTP,
            port: tgConfig.healthCheckPort ? `${tgConfig.healthCheckPort}` : `${tgConfig.applicationPort}`,
          },
        });
        if (alb.existingArn) {
          new elbv2.CfnListenerRule(this, `${name}-http-rule-${index}`, {
            listenerArn: albListeners[0],
            actions: [
              {
                type: 'forward',
                targetGroupArn: albTargetGroup.targetGroupArn,
              },
            ],
            conditions: [
              {
                field: 'host-header',
                hostHeaderConfig: {
                  values: [tgConfig.host],
                },
              },
            ],
            priority: tgConfig.priority ? tgConfig.priority : (index + 1),
          });
        } else {
          if ( albListener != undefined ) {
            albListener.addAction(`${name}-albAction-${index}`, {
              conditions: [
                elbv2.ListenerCondition.hostHeaders([tgConfig.host]),
              ],
              action: elbv2.ListenerAction.forward([albTargetGroup]),
              priority: tgConfig.priority ? tgConfig.priority : (index + 1),
            });
          }
        }
      });
    }

  }
  private createVPCEndpointServiceOutputs(
    vpcEndpointService: ec2.VpcEndpointService,

    name: string,
    nlb?: string,
    alb?: string,
  ) {
    new CfnOutput(this, `${name}VpcEndpointServiceName`, {
      value: vpcEndpointService.vpcEndpointServiceName,
      description: 'The name of the VPC Endpoint Service.',
    });
    if (alb != undefined) {
      new CfnOutput(this, `${name}AlbArn`, {
        value: alb,
        description: 'The ALB ARN of the Application Load Balancer.',
      });
    }

    if (nlb != undefined) {
      new CfnOutput(this, `${name}NlbArn`, {
        value: nlb,
        description: 'The NLB ARN of the Network Load Balancer.',
      });
    }
  }

  private getLoadBalancerListener(loadBalancerArn: string, sslEnabled: boolean, name: string) {
    const listeners = [];

    if (!sslEnabled) {
      listeners.push(elbv2.ApplicationListener.fromLookup(this, name + '-listener-http', {
        loadBalancerArn: loadBalancerArn,
        listenerProtocol: elbv2.ApplicationProtocol.HTTP,
      }).listenerArn);
    }

    if (sslEnabled) {
      listeners.push(elbv2.ApplicationListener.fromLookup(this, name + '-listener-https', {
        loadBalancerArn: loadBalancerArn,
        listenerProtocol: elbv2.ApplicationProtocol.HTTPS,
      }).listenerArn);
    }
    return listeners;
  }

}



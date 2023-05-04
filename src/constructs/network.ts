import { aws_ec2 as ec2, CfnOutput, Tags } from 'aws-cdk-lib';
import { Construct } from 'constructs';
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
}
export interface VPCProps {
  readonly vpc: ec2.VpcProps;
  readonly peeringConfigs?: Record<string, PeeringConfig>;
  readonly natEipAllocationIds?: string[];
  readonly subnets: ISubnetsProps[];
}

export interface PeeringConfig {
  readonly peeringVpcId: string;
  readonly peerOwnerId?: string;
  readonly peerAssumeRoleArn?: string;
  readonly peerRegion?: string;
  readonly tags: Record<string, string>;
}
export interface PeeringConnectionInternalType {
  [name: string]: ec2.CfnVPCPeeringConnection;
}
export class Network extends Construct {
  public pbSubnets: ec2.PublicSubnet[] = [];
  public pvSubnets: ec2.PrivateSubnet[] = [];
  public natSubnets: ec2.PublicSubnet[] = [];
  private peeringConnectionIds: PeeringConnectionInternalType = {};
  public readonly vpc!: ec2.Vpc;
  public readonly natProvider!: ec2.NatProvider;
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
        console.log(`test value ${peeringConnectionIdByKey}`);
        this.peeringConnectionIds[key] = peeringConnectionIdByKey;
      });
    }
    props.subnets.forEach((subnetProps) => {
      let subnet = this.createSubnet(subnetProps, this.vpc, this.peeringConnectionIds);
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
        }
      });
    });
    const internetGateway = new ec2.CfnInternetGateway(
      this,
      'InternetGateway',
      {},
    );
    const att = new ec2.CfnVPCGatewayAttachment(this, 'VPCGatewayAttachement', {
      internetGatewayId: internetGateway.ref,
      vpcId: this.vpc.vpcId,
    });
    this.pbSubnets.forEach((pb) => {
      pb.addDefaultInternetRoute(internetGateway.ref, att);
    });
    if (this.natSubnets.length > 0) {
      if (props.natEipAllocationIds && this.natSubnets.length != props.natEipAllocationIds?.length) {
        // eslint-disable-next-line max-len
        throw new Error(
          'natEipAllocationIds and natSubnets length should be  equal',
        );
      }

      if (props.natEipAllocationIds?.length == this.natSubnets?.length) {
        this.natProvider = ec2.NatProvider.gateway({
          eipAllocationIds: props.natEipAllocationIds,
        });
      } else {
        this.natProvider = ec2.NatProvider.gateway();
      }

      this.natProvider.configureNat({
        vpc: this.vpc,
        natSubnets: this.natSubnets,
        privateSubnets: this.pvSubnets,
      });
    }
  }

  createSubnet(option: ISubnetsProps, vpc: ec2.Vpc, peeringConnectionId?: PeeringConnectionInternalType) {
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
          console.log(`peeringConnectionid ${peeringConnectionId}`);
          console.log(`existingVpcPeeringRouteKey ${route.existingVpcPeeringRouteKey}`);
          console.log(`object ${Object.keys(peeringConnectionId)}`);
          console.log(`object get value ${peeringConnectionId[route.existingVpcPeeringRouteKey]}`);
          let routeId: ec2.CfnVPCPeeringConnection | undefined = peeringConnectionId[route.existingVpcPeeringRouteKey];
          console.log(routeId);
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


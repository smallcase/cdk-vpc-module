import * as cdk from 'aws-cdk-lib';
import { Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { AddRouteOptions, NetworkACL } from './network';
import { ObjToStrMap } from '../utils/common';

interface SubnetStackProps extends cdk.NestedStackProps {
  vpc: ec2.Vpc;
  subnetGroupName: string;
  subnetType: ec2.SubnetType;
  cidrBlocks: string[];
  availabilityZones: string[];
  ingressNetworkACL?: NetworkACL[];
  egressNetworkACL?: NetworkACL[];
  routes?: AddRouteOptions[];
  peeringConnectionId?: { [key: string]: ec2.CfnVPCPeeringConnection };
  tags?: Record<string, string>;
  useSubnetForNAT?: boolean;
  useNestedStacks?: boolean;
}

export class SubnetStack extends cdk.NestedStack {
  public readonly subnets: ec2.Subnet[] = [];
  public readonly nacl: ec2.NetworkAcl;

  constructor(scope: Construct, id: string, props: SubnetStackProps) {
    super(scope, id, props);

    const SUBNETTYPE_TAG = 'aws-cdk:subnet-type';
    const SUBNETNAME_TAG = 'aws-cdk:subnet-name';
    const NAME_TAG = 'Name';

    // Validate input
    if (props.availabilityZones.length !== props.cidrBlocks.length) {
      throw new Error(
        "You cannot reference a Subnet's availability zone if it was not supplied. Add the availabilityZone when importing using option.fromSubnetAttributes()",
      );
    }

    // Create subnets
    props.availabilityZones.forEach((az, index) => {
      const subnet: ec2.PrivateSubnet | ec2.PublicSubnet =
        props.subnetType === ec2.SubnetType.PUBLIC
          ? new ec2.PublicSubnet(
            this,
            `${props.subnetGroupName}Subnet${index}`,
            {
              availabilityZone: az,
              cidrBlock: props.cidrBlocks[index],
              vpcId: props.vpc.vpcId,
              mapPublicIpOnLaunch: true,
            },
          )
          : new ec2.PrivateSubnet(
            this,
            `${props.subnetGroupName}Subnet${index}`,
            {
              availabilityZone: az,
              cidrBlock: props.cidrBlocks[index],
              vpcId: props.vpc.vpcId,
              mapPublicIpOnLaunch: false,
            },
          );

      // Add tags
      Tags.of(subnet).add(SUBNETNAME_TAG, props.subnetGroupName);
      Tags.of(subnet).add(SUBNETTYPE_TAG, props.subnetType);

      if (props.tags) {
        const tags: Map<string, string> = ObjToStrMap(props.tags);
        tags.forEach((v, k) => {
          Tags.of(subnet).add(k, v);
        });
      }

      // Add routes
      props.routes?.forEach((route) => {
        const destinationCidr = route.routeName ?? route.destinationCidrBlock?.replace(/[./]/g, '-');
        if (props.peeringConnectionId && route.existingVpcPeeringRouteKey !== undefined) {
          const routeId = props.peeringConnectionId[route.existingVpcPeeringRouteKey];
          if (routeId !== undefined) {
            subnet.addRoute(
              `${props.subnetGroupName}-${destinationCidr}-Route`,
              {
                routerId: routeId.ref,
                routerType: route.routerType,
                destinationCidrBlock: route.destinationCidrBlock,
              },
            );
          }
        } else if (route.routerId) {
          subnet.addRoute(
            `${props.subnetGroupName}-${destinationCidr}-Route`,
            {
              routerId: route.routerId,
              routerType: route.routerType,
              destinationCidrBlock: route.destinationCidrBlock,
            },
          );
        }
      });
      this.subnets.push(subnet);
    });

    // Create Network ACL
    this.nacl = new ec2.NetworkAcl(this, `${props.subnetGroupName}NACL`, {
      vpc: props.vpc,
      subnetSelection: {
        subnets: this.subnets,
      },
    });

    Tags.of(this.nacl).add(NAME_TAG, this.nacl.node.path);

    // Add NACL entries
    props.ingressNetworkACL?.forEach((ingressNACL, index) => {
      new ec2.NetworkAclEntry(
        this,
        `${props.subnetGroupName}IngressNACL-${index}`,
        {
          ruleNumber: 100 + index,
          cidr: ingressNACL.cidr,
          networkAcl: this.nacl,
          traffic: ingressNACL.traffic,
          direction: ec2.TrafficDirection.INGRESS,
        },
      );
    });

    props.egressNetworkACL?.forEach((egressNACL, index) => {
      new ec2.NetworkAclEntry(
        this,
        `${props.subnetGroupName}EgressNACL-${index}`,
        {
          ruleNumber: 100 + index,
          cidr: egressNACL.cidr,
          networkAcl: this.nacl,
          traffic: egressNACL.traffic,
          direction: ec2.TrafficDirection.EGRESS,
        },
      );
    });

    // Outputs
    new cdk.CfnOutput(this, `${props.subnetGroupName}OutputSubnets`, {
      value: this.subnets
        .map((subnet) => subnet.subnetId)
        .join(','),
      description: `${props.subnetGroupName} subnets`,
    });

    new cdk.CfnOutput(this, `${props.subnetGroupName}OutputNACL`, {
      value: this.nacl.networkAclId,
      description: `${props.subnetGroupName} NACL`,
    });
  }
}

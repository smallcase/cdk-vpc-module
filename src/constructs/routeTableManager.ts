import { NestedStack, Tags } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { AddRouteOptions } from './network';

export interface RouteTableManagerProps {
  readonly vpc: ec2.Vpc;
  readonly subnetGroupName: string;
  readonly routes?: AddRouteOptions[];
  readonly peeringConnectionId?: { [key: string]: ec2.CfnVPCPeeringConnection };
  readonly subnetType: ec2.SubnetType;
  readonly natProvider: ec2.NatProvider;
  readonly internetGateway: ec2.CfnInternetGateway
}

export class RouteTableManager extends Construct {
  public readonly routeTable: ec2.CfnRouteTable;
  private readonly nestedStack: NestedStack;

  constructor(scope: Construct, id: string, props: RouteTableManagerProps) {
    super(scope, id);

    // Create a nested stack for route table resources
    this.nestedStack = new NestedStack(this, `${props.subnetGroupName}RouteTableStack`, {
      description: `Route table stack for ${props.subnetGroupName} subnet group`,
    });

    // Create a single route table for the subnet group in the nested stack
    this.routeTable = new ec2.CfnRouteTable(this.nestedStack, `${props.subnetGroupName}RouteTable`, {
      vpcId: props.vpc.vpcId,
    });
    // Add Name tag
    Tags.of(this.routeTable).add('Name', `${props.subnetGroupName}`);

    // Add routes to the route table in the nested stack
    props.routes?.forEach((route) => {
      if (props.peeringConnectionId && route.existingVpcPeeringRouteKey) {
        const routeId = props.peeringConnectionId[route.existingVpcPeeringRouteKey];
        if (routeId) {
          const destinationCidr = route.destinationCidrBlock?.replace(/[./]/g, '-') ?? 'default';
          new ec2.CfnRoute(this.nestedStack, `${props.subnetGroupName}-${destinationCidr}-Route`, {
            routeTableId: this.routeTable.ref,
            destinationCidrBlock: route.destinationCidrBlock,
            gatewayId: route.routerType === ec2.RouterType.GATEWAY ? routeId.ref : undefined,
            natGatewayId: route.routerType === ec2.RouterType.NAT_GATEWAY ? routeId.ref : undefined,
            transitGatewayId: route.routerType === ec2.RouterType.TRANSIT_GATEWAY ? routeId.ref : undefined,
            vpcPeeringConnectionId: route.routerType === ec2.RouterType.VPC_PEERING_CONNECTION ? routeId.ref : undefined,
          });
        }
      } else if (route.routerId) {
        const destinationCidr = route.destinationCidrBlock?.replace(/[./]/g, '-') ?? 'default';
        new ec2.CfnRoute(this.nestedStack, `${props.subnetGroupName}-${destinationCidr}-Route`, {
          routeTableId: this.routeTable.ref,
          destinationCidrBlock: route.destinationCidrBlock,
          gatewayId: route.routerType === ec2.RouterType.GATEWAY ? route.routerId : undefined,
          natGatewayId: route.routerType === ec2.RouterType.NAT_GATEWAY ? route.routerId : undefined,
          transitGatewayId: route.routerType === ec2.RouterType.TRANSIT_GATEWAY ? route.routerId : undefined,
          vpcPeeringConnectionId: route.routerType === ec2.RouterType.VPC_PEERING_CONNECTION ? route.routerId : undefined,
        });
      }
    });

    // Add default routes based on subnet type
    if (props.subnetType === ec2.SubnetType.PUBLIC) {
      // Add internet route for public subnets
      new ec2.CfnRoute(this.nestedStack, `${props.subnetGroupName}-InternetRoute`, {
        routeTableId: this.routeTable.ref,
        destinationCidrBlock: '0.0.0.0/0',
        gatewayId: props.internetGateway.ref,
      });
    } else if (props.subnetType === ec2.SubnetType.PRIVATE_WITH_EGRESS) {
      // Add NAT route for private subnets
      const natGateway = props.natProvider.configuredGateways[0];
      console.log('natGateway', natGateway);
      if (natGateway) {
        new ec2.CfnRoute(this.nestedStack, `${props.subnetGroupName}-NatRoute`, {
          routeTableId: this.routeTable.ref,
          destinationCidrBlock: '0.0.0.0/0',
          natGatewayId: natGateway.gatewayId,
        });
      }
    }
  }

  public associateSubnet(subnet: ec2.ISubnet, index: number): void {
    // Create subnet-route table association in the nested stack
    new ec2.CfnSubnetRouteTableAssociation(this.nestedStack, `${subnet.node.id}RouteTableAssociation${index}`, {
      subnetId: subnet.subnetId,
      routeTableId: this.routeTable.ref,
    });
  }
}
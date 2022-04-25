# cdk-vpc-module
cdk-vpc-module construct library is an open-source extension of the AWS Cloud Development Kit (AWS CDK) to deploy configurable aws vpc  and its individual components in less than 50 lines of code and human readable configuration which can be managed by pull requests!

## :sparkles: Features

- :white_check_mark:  when you use default ec2.vpc module, there is no option to configure custom IPv4 CIDR(10.10.0.0/24), this module provide way to configure custom IPv4 CIDR
- :white_check_mark: VPC Peering with  routetable entry 
- :white_check_mark: Configurable NACL as per subnets Group
- :white_check_mark: NATGateway as per availabilityZones


Using cdk a vpc can be deployed using the following sample code snippet:
```typescript
import { Network } from "@smallcase/cdk-vpc-module/lib/constructs/network";
import { aws_ec2 as ec2, App, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class VPCStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    new Network(this, 'NETWORK', {
      vpc: {
        cidr: '10.10.0.0/16',
        subnetConfiguration: [],
      },
      peeringConfigs: {
        // when you deployd this stack , it will be create your peering id, this key will be use to get that id and configure route-table as per route
        "TEST-PEERING": {
          peeringVpcId: "vpc-0000",
          tags: {
            "Name": "TEST-PEERING to CREATED-VPC",
            "Description": "Connect"
          }
        }
      },
      subnets: [
        {
          subnetGroupName: 'NATGateway',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrBlock: ['10.10.0.0/28', '10.10.0.16/28', '10.10.0.32/28'],
          availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
          ingressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
          routes: [
          ],
          egressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
        },
        {
          subnetGroupName: 'Public',
          subnetType: ec2.SubnetType.PUBLIC,
          cidrBlock: ['10.10.2.0/24', '10.10.3.0/24', '10.10.4.0/24'],
          availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
          ingressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
          egressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
          routes: [
          ],
          tags: {
            // you are this vpc to deploy your eks cluster, you have to tag your subnets [read more](https://aws.amazon.com/premiumsupport/knowledge-center/eks-vpc-subnet-discovery/)
            'kubernetes.io/role/elb': '1',
            'kubernetes.io/cluster/TEST-CLUSTER': 'owned',
          },
        },
        {
          subnetGroupName: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrBlock: ['10.10.5.0/24', '10.10.6.0/24', '10.10.7.0/24'],
          availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
          ingressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
          egressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },

          ],
          routes: [
            {
              routerType: ec2.RouterType.VPC_PEERING_CONNECTION,
              destinationCidrBlock: "10.1.0.0/24",
              existingVpcPeeringRouteKey: "TEST-PEERING"
            }
          ],
          tags: {
            // you are this vpc to deploy your eks cluster, you have to tag your subnets [read more](https://aws.amazon.com/premiumsupport/knowledge-center/eks-vpc-subnet-discovery/)
            'kubernetes.io/role/internal-elb': '1',
            'kubernetes.io/cluster/TEST-CLUSTER': 'owned',
          },
        },
        {
          subnetGroupName: 'Database',
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrBlock: ['10.10.14.0/27', '10.10.14.32/27', '10.10.14.64/27'],
          availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
          ingressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
          egressNetworkACL: [
            {
              cidr: ec2.AclCidr.ipv4('0.0.0.0/0'),
              traffic: ec2.AclTraffic.allTraffic(),
            },
          ],
          routes: [
          ],
          tags: {
          },
        },
      ],
    });
  }
}
const envDef = {
  account: '<AWS-ID>',
  region: '<AWS-REGION>',
};

const app = new App();

new VPCStack(app, 'TEST', {
  env: envDef,
  terminationProtection: true,
  tags: {
});
app.synth();
```
Please refer [here](/API.md) to check how to use individual resource constructs.

Install using NPM:
```
npm install @smallcase/cdk-vpc-module
```
Using yarn
```
yarn add @smallcase/cdk-vpc-module


Bootstrap the environment
```
cdk bootstrap
```

Check the changed which are to be deployed
```
~ -> cdk diff

Deploy using
```
~ -> cdk deploy
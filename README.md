# cdk-vpc-module
cdk-vpc-module construct library is an open-source extension of the AWS Cloud Development Kit (AWS CDK) to deploy configurable aws vpc  and its individual components in less than 50 lines of code and human readable configuration which can be managed by pull requests!

## :sparkles: Features

- :white_check_mark: Option to configure custom IPv4 CIDR(10.10.0.0/24)
- :white_check_mark: VPC Peering with  route table entry
- :white_check_mark: Configurable NACL as per subnet group
- :white_check_mark: NATGateway as per availabilityZones


Using cdk a vpc can be deployed using the following sample code snippet:
```typescript
import { Network } from "@smallcase/cdk-vpc-module/lib/constructs/network";
import { aws_ec2 as ec2, App, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class VPCStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    const s3EndpointIamPermission = new iam.PolicyStatement({
      actions: ["s3:*"],
      resources: ['arn:aws:s3:::*'],
      principals: [new iam.AnyPrincipal()],
    })
    const monitoringEndpointIamPermission = new iam.PolicyStatement({
      actions: ["*"],
      resources: ['*'],
      principals: [new iam.AnyPrincipal()],
    })
    super(scope, id, props);
    new Network(this, 'NETWORK', {
      vpc: {
        cidr: '10.10.0.0/16',
        subnetConfiguration: [],
      },
      peeringConfigs: {
        "TEST-PEERING": { // this key will be used as your peering id, which you will have to mention below when you configure a route table for your subnets
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
            // if you use this vpc for your eks cluster, you have to tag your subnets [read more](https://aws.amazon.com/premiumsupport/knowledge-center/eks-vpc-subnet-discovery/)
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
            // if you use this vpc for your eks cluster, you have to tag your subnets [read more](https://aws.amazon.com/premiumsupport/knowledge-center/eks-vpc-subnet-discovery/)
              routerType: ec2.RouterType.VPC_PEERING_CONNECTION,
              destinationCidrBlock: "<destinationCidrBlock>",
              //<Your VPC PeeringConfig KEY, in this example TEST-PEERING will be your ID>
              existingVpcPeeringRouteKey: "TEST-PEERING"
            }
          ],
          tags: {
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
      vpcEndpoints: [
        {
          name: "s3-gw",
          service: ec2.GatewayVpcEndpointAwsService.S3,
          subnetGroupNames: ["Private","Database"],
          externalSubnets: [
            {
              id: "subnet-<id>",
              availabilityZone: "ap-south-1a",
              routeTableId: "rtb-<id>"
            },
            {
              id: "subnet-<id>",
              availabilityZone: "ap-south-1b",
              routeTableId: "rtb-<id>"
            }
          ],
          iamPolicyStatements: [s3EndpointIamPermission]
        },
        {
          name: "da-stag-monitoring-vpe",
          service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_MONITORING,
          subnetGroupNames: ["ManageServicePrivate"],
          iamPolicyStatements: [monitoringEndpointIamPermission],
          securityGroupRules: [
            {
              peer: ec2.Peer.ipv4("10.10.0.0/16"),
              port:  ec2.Port.tcp(443),
              description: "From Test VPC"
            }
          ],
        },
      ]
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

## :clapper: Quick Start

The quick start shows you how to create an **AWS-VPC** using this module.

### Prerequisites

- A working [`aws`](https://aws.amazon.com/cli/) CLI installation with access to an account and administrator privileges
- You'll need a recent [NodeJS](https://nodejs.org) installation

To get going you'll need a CDK project. For details please refer to the [detailed guide for CDK](https://docs.aws.amazon.com/cdk/latest/guide/hello_world.html).

Create an empty directory on your system.

```bash
mkdir aws-quick-start-vpc && cd aws-quick-start-vpc
```

Bootstrap your CDK project, we will use TypeScript, but you can switch to any other supported language.

```bash
npx cdk init sample-vpc  --language typescript
npx cdk bootstrap 
```

Install using NPM:
```
npm install @smallcase/cdk-vpc-module
```
Using yarn
```
yarn add @smallcase/cdk-vpc-module
```

Check the changed which are to be deployed
```bash
~ -> npx cdk diff
```

Deploy using
```bash
~ -> npx cdk deploy
```


Features
Multiple VPC Endpoints: Define and manage multiple VPC Endpoints in one configuration.
Flexible Subnet Selection: Attach VPC Endpoints to multiple subnet groups or external subnets.
Custom Security Groups: Configure security groups for Interface VPC Endpoints.
IAM Policies: Attach custom IAM policies to control access to the VPC Endpoints.
Tagging: Apply custom tags to each VPC Endpoint.

Defining VPC Endpoints Configuration
You can define multiple VPC Endpoints in the vpcEndpoints: [] configuration array. Each VPC Endpoint can be customized with different subnet groups, IAM policies, security group rules, and tags.
```
vpcEndpoints: [
  {
    name: "test-s3-gw",
    service: ec2.GatewayVpcEndpointAwsService.S3,
    subnetGroupNames: ["ManageServicePrivate", "ToolPrivate", "Database"],  // Subnet groups for the endpoint
    externalSubnets: [
      {
        id: "subnet-<id>",
        availabilityZone: "ap-south-1a",
        routeTableId: "rtb-<id>",
      },
      {
        id: "subnet-<id>",
        availabilityZone: "ap-south-1b",
        routeTableId: "rtb-<id>",
      }
    ],
    iamPolicyStatements: [s3EndpointIamPermission],  // Custom IAM policy for the endpoint
  },
  {
    name: "DynamoDbGatewayEndpoint",
    service: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
    subnetGroupNames: ["private-subnet"],
    additionalTags: {
      Environment: "Staging",
    },
  },
],
```
In this example:

The S3 Gateway Endpoint is created in three subnet groups: ManageServicePrivate, ToolPrivate, and Database.
External subnets are specified with their IDs, availability zones, and route table IDs for the S3 endpoint.
A custom IAM policy (s3EndpointIamPermission) is attached to control access to the S3 endpoint.
A DynamoDB Gateway Endpoint is created in the private-subnet with additional tags specifying the environment and ownership.

Configuration Options
Here’s a breakdown of the configuration options available:
1. name: A unique name for the VPC Endpoint.
2. service: The AWS service the VPC Endpoint connects to (e.g., S3, DynamoDB, Secrets Manager)
3. subnetGroupNames: The subnet group names where the VPC Endpoint will be deployed.
4. externalSubnets: Specify external subnets if you need to define subnets manually (each with an id, availabilityZone, and routeTableId).
5. iamPolicyStatements: (Optional) Attach IAM policy statements to control access to the endpoint.
6. additionalTags: (Optional) Add custom tags to the VPC Endpoint for easier identification and tracking.

## Dynamic Routing Strategy

The module automatically chooses the optimal routing strategy based on the number of NAT Gateways to prevent duplicate `0.0.0.0/0` route entries:

### **Single NAT Gateway (≤1 NAT Gateway)**
- **Strategy**: One route table per subnet group
- **Benefits**: 
  - **Cost Optimized**: Fewer route tables = lower costs
  - **Simpler Management**: One route table per subnet group
  - **No Duplicate Routes**: Single NAT Gateway means no duplicate `0.0.0.0/0` entries
  - **Suitable for**: Development, testing, small workloads
- **Configuration**: All subnets in a group share the same route table with one NAT route

### **Multiple NAT Gateways (>1 NAT Gateway)**
- **Strategy**: One route table per subnet
- **Benefits**:
  - **Prevents Duplicate Routes**: Each subnet gets its own route table, avoiding duplicate `0.0.0.0/0` entries
  - **AZ-Aware Routing**: Each subnet uses NAT Gateway in the same AZ when possible
  - **High Availability**: Better fault tolerance and load distribution
  - **Cross-AZ Cost Reduction**: Reduced data transfer costs
  - **Suitable for**: Production workloads, high availability requirements
- **Configuration**: Each subnet gets its own route table with one NAT route

### **Why This Strategy?**

AWS route tables don't support duplicate entries for the same destination CIDR (like `0.0.0.0/0`). When you have multiple NAT Gateways:

- **❌ Wrong Approach**: Multiple NAT routes in same route table → `AlreadyExists` error
- **✅ Correct Approach**: One route table per subnet → Each gets one NAT route

### **Automatic Strategy Selection**

```typescript
// Single NAT Gateway - Cost Optimized
new Network(this, 'NETWORK', {
  vpc: {
    cidr: '10.10.0.0/16',
    subnetConfiguration: [],
  },
  subnets: [
    {
      subnetGroupName: 'NATGateway',
      subnetType: ec2.SubnetType.PUBLIC,
      cidrBlock: ['10.10.0.0/28'], // Only one subnet
      availabilityZones: ['ap-south-1a'], // Only one AZ
      useSubnetForNAT: true,
    },
    {
      subnetGroupName: 'Private',
      subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      cidrBlock: ['10.10.5.0/24', '10.10.6.0/24', '10.10.7.0/24'],
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
    },
  ],
});

// Multiple NAT Gateways - Performance Optimized
new Network(this, 'NETWORK', {
  vpc: {
    cidr: '10.10.0.0/16',
    subnetConfiguration: [],
  },
  natEipAllocationIds: [
    'eipalloc-1234567890abcdef',
    'eipalloc-0987654321fedcba',
    'eipalloc-abcdef1234567890',
  ],
  subnets: [
    {
      subnetGroupName: 'NATGateway',
      subnetType: ec2.SubnetType.PUBLIC,
      cidrBlock: ['10.10.0.0/28', '10.10.0.16/28', '10.10.0.32/28'],
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
      useSubnetForNAT: true,
    },
    {
      subnetGroupName: 'Private',
      subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      cidrBlock: ['10.10.5.0/24', '10.10.6.0/24', '10.10.7.0/24'],
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
    },
  ],
});
```

### **CloudFormation Outputs**

The module provides outputs to show which strategy is being used:

- **RoutingStrategy**: Shows "Route Table per Subnet Group" or "Route Table per Subnet"
- **NATGatewayCount**: Shows the number of NAT Gateways configured

### **Route Table Distribution**

| Scenario | Route Tables | NAT Routes per Table | Strategy |
|----------|-------------|---------------------|----------|
| Single NAT | 1 per subnet group | 1 | Cost optimized |
| Multiple NAT | 1 per subnet | 1 | Performance optimized |

### **Migration Strategy**

You can easily migrate between strategies by changing your configuration:

1. **Development → Production**: Add more NAT Gateway subnets
2. **Production → Development**: Reduce to single NAT Gateway subnet
3. **Cost Optimization**: Monitor usage and adjust NAT Gateway count

The module handles the migration automatically without manual route table changes.

## NAT Gateway EIP Allocation

You can specify existing Elastic IP (EIP) allocation IDs to use with your NAT Gateways. This is useful when you want to:

- Use pre-existing EIPs
- Maintain consistent IP addresses across deployments
- Control EIP costs and management

### **Using EIP Allocation IDs**

```typescript
new Network(this, 'NETWORK', {
  vpc: {
    cidr: '10.10.0.0/16',
    subnetConfiguration: [],
  },
  // Specify existing EIP allocation IDs
  natEipAllocationIds: [
    'eipalloc-1234567890abcdef', // EIP for NAT Gateway 1
    'eipalloc-0987654321fedcba', // EIP for NAT Gateway 2
    'eipalloc-abcdef1234567890', // EIP for NAT Gateway 3
  ],
  subnets: [
    {
      subnetGroupName: 'NATGateway',
      subnetType: ec2.SubnetType.PUBLIC,
      cidrBlock: ['10.10.0.0/28', '10.10.0.16/28', '10.10.0.32/28'],
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
      useSubnetForNAT: true,
    },
    {
      subnetGroupName: 'Private',
      subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
      cidrBlock: ['10.10.5.0/24', '10.10.6.0/24', '10.10.7.0/24'],
      availabilityZones: ['ap-south-1a', 'ap-south-1b', 'ap-south-1c'],
    },
  ],
});
```

### **EIP Allocation ID Requirements**

- **Count**: Should match the number of NAT Gateway subnets (optional)
- **Format**: Must be valid EIP allocation IDs (e.g., `eipalloc-xxxxxxxxx`)
- **Region**: Must be in the same region as your VPC
- **Account**: Must be owned by the same AWS account

### **Benefits of Using EIP Allocation IDs**

1. **Cost Control**: Reuse existing EIPs instead of creating new ones
2. **IP Consistency**: Maintain the same public IP addresses across deployments
3. **Compliance**: Meet requirements for static IP addresses
4. **DNS**: Use existing DNS records that point to specific EIPs

### **CloudFormation Outputs**

When EIP allocation IDs are provided, the module outputs:

- **NATEipAllocationIds**: Comma-separated list of EIP allocation IDs used
- **RoutingStrategy**: Shows the routing strategy being used
- **NATGatewayCount**: Number of NAT Gateways configured

### **Example Output**

```json
{
  "NATEipAllocationIds": "eipalloc-1234567890abcdef,eipalloc-0987654321fedcba,eipalloc-abcdef1234567890",
  "RoutingStrategy": "Route Table per Subnet",
  "NATGatewayCount": "3"
}
```

### **Creating EIPs for NAT Gateways**

If you need to create EIPs first, you can do so using CDK:

```typescript
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// Create EIPs
const eip1 = new ec2.CfnEIP(this, 'NATEip1', {
  domain: 'vpc',
});

const eip2 = new ec2.CfnEIP(this, 'NATEip2', {
  domain: 'vpc',
});

const eip3 = new ec2.CfnEIP(this, 'NATEip3', {
  domain: 'vpc',
});

// Use them in your Network construct
new Network(this, 'NETWORK', {
  vpc: {
    cidr: '10.10.0.0/16',
    subnetConfiguration: [],
  },
  natEipAllocationIds: [
    eip1.attrAllocationId,
    eip2.attrAllocationId,
    eip3.attrAllocationId,
  ],
  // ... rest of configuration
});
```

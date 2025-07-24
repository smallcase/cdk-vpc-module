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
      ],
      vpcEndpointServices: [
        {
          name: "my-vpce-service",
          alb: {
            subnetGroupName: "Public",
            internetFacing: true,
            certificates: ["arn:aws:acm:region:account:certificate/cert-id"],
            securityGroupRules: [
              {
                peer: ec2.Peer.ipv4("10.10.0.0/16"),
                port: ec2.Port.tcp(443),
                description: "Allow HTTPS from VPC"
              }
            ],
            targetGroups: [
              {
                host: "api.example.com",
                applicationPort: 8080,
                healthCheckPath: "/health",
                healthCheckProtocol: elbv2.Protocol.HTTP,
                priority: 1
              }
            ]
          },
          nlb: {
            subnetGroupName: "Private",
            securityGroupRules: [
              {
                peer: ec2.Peer.ipv4("10.10.0.0/16"),
                port: ec2.Port.tcp(443),
                description: "Allow HTTPS from VPC"
              }
            ]
          },
          allowedPrincipals: ["arn:aws:iam::123456789012:root"],
          acceptanceRequired: false,
          additionalTags: {
            Environment: "Production",
            Service: "API"
          }
        }
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

## VPC Endpoint Services

VPC Endpoint Services allow you to create your own services that can be accessed through VPC endpoints. This feature enables you to expose your applications as AWS services within your VPC.

### Features
- **Application Load Balancer (ALB) Integration**: Configure ALB with target groups, certificates, and security groups
- **Network Load Balancer (NLB) Integration**: Set up NLB with custom security groups and certificates
- **Access Control**: Configure allowed principals and acceptance requirements
- **Flexible Subnet Configuration**: Deploy across multiple subnet groups
- **Custom Tagging**: Apply tags for resource management

### VPC Endpoint Services Configuration

You can define VPC Endpoint Services in the `vpcEndpointServices: []` configuration array. Each service can be customized with ALB/NLB configurations, security groups, and access controls.

#### Using Existing ALB

You can also use an existing Application Load Balancer by providing its ARN and security group ID. This is useful when you want to integrate with already deployed load balancers.

```typescript
vpcEndpointServices: [
  {
    name: "my-vpce-service",
    alb: {
      subnetGroupName: "Public",
      internetFacing: true,
      certificates: ["arn:aws:acm:region:account:certificate/cert-id"],
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4("10.10.0.0/16"),
          port: ec2.Port.tcp(443),
          description: "Allow HTTPS from VPC"
        }
      ],
      targetGroups: [
        {
          host: "api.example.com",
          applicationPort: 8080,
          healthCheckPath: "/health",
          healthCheckProtocol: elbv2.Protocol.HTTP,
          priority: 1
        }
      ]
    },
    nlb: {
      subnetGroupName: "Private",
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4("10.10.0.0/16"),
          port: ec2.Port.tcp(443),
          description: "Allow HTTPS from VPC"
        }
      ]
    },
    allowedPrincipals: ["arn:aws:iam::123456789012:root"],
    acceptanceRequired: false,
    additionalTags: {
      Environment: "Production",
      Service: "API"
    }
  },
  {
    name: "existing-alb-vpce-service",
    alb: {
      existingArn: "arn:aws:elasticloadbalancing:region:account:loadbalancer/app/existing-alb/1234567890abcdef",
      existingSecurityGroupId: "sg-1234567890abcdef",
      targetGroups: [
        {
          host: "service.example.com",
          applicationPort: 9000,
          healthCheckPath: "/status",
          healthCheckProtocol: elbv2.Protocol.HTTP,
          priority: 1
        },
        {
          host: "admin.example.com",
          applicationPort: 8080,
          healthCheckPath: "/admin/health",
          healthCheckProtocol: elbv2.Protocol.HTTP,
          priority: 2
        }
      ]
    },
    nlb: {
      subnetGroupName: "Private",
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4("10.10.0.0/16"),
          port: ec2.Port.tcp(443),
          description: "Allow HTTPS from VPC"
        }
      ]
    },
    allowedPrincipals: ["arn:aws:iam::123456789012:root"],
    acceptanceRequired: true,
    additionalTags: {
      Environment: "Staging",
      Service: "LegacyAPI"
    }
  }
]
```

### Configuration Options

#### ALB Configuration
- **subnetGroupName**: Subnet group where the ALB will be deployed (not required when using existingArn)
- **internetFacing**: Whether the ALB should be internet-facing (default: false, not used when using existingArn)
- **certificates**: Array of ACM certificate ARNs for HTTPS termination (not used when using existingArn)
- **securityGroupRules**: Security group rules for the ALB (not used when using existingSecurityGroupId)
- **targetGroups**: Array of target group configurations
- **existingArn**: Use existing ALB ARN instead of creating new one
- **existingSecurityGroupId**: Use existing security group ID

**Note**: When using `existingArn`, the module will use the existing ALB instead of creating a new one. In this case, `subnetGroupName`, `internetFacing`, `certificates`, and `securityGroupRules` are ignored. The `targetGroups` configuration will create listener rules on the existing ALB.

#### NLB Configuration
- **subnetGroupName**: Subnet group where the NLB will be deployed
- **securityGroupRules**: Security group rules for the NLB
- **certificates**: Array of ACM certificate ARNs for HTTPS termination
- **internetFacing**: Whether the NLB should be internet-facing (default: false)
- **existingSecurityGroupId**: Use existing security group ID

#### Target Group Configuration
- **host**: Host header for routing
- **applicationPort**: Port where the application is running
- **healthCheckPath**: Health check path (default: "/")
- **healthCheckProtocol**: Health check protocol (default: HTTP)
- **protocolVersion**: Application protocol version (default: HTTP1)
- **protocol**: Application protocol (default: HTTP)
- **healthCheckPort**: Health check port (default: applicationPort)
- **priority**: Rule priority for routing

#### Service Configuration
- **name**: Unique name for the VPC Endpoint Service
- **allowedPrincipals**: Array of IAM principal ARNs allowed to connect
- **acceptanceRequired**: Whether manual acceptance is required (default: true)
- **additionalTags**: Custom tags for the service

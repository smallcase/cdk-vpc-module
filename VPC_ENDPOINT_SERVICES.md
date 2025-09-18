# VPC Endpoint Services - Complete Usage Guide

This document provides comprehensive documentation for ALL possible usage cases of VPC Endpoint Services with the cdk-vpc-module construct library.

## Overview

VPC Endpoint Services allow you to expose your services privately within a VPC without requiring internet connectivity. This construct creates a complete setup with Application Load Balancer (ALB) and Network Load Balancer (NLB) to provide a robust, scalable solution for VPC endpoint services.

## Architecture

The VPC Endpoint Service construct creates the following architecture:

```
Internet/Client VPC
        ↓
   VPC Endpoint
        ↓
   Network Load Balancer (NLB)
        ↓
   Application Load Balancer (ALB)
        ↓
   Target Groups (Your Services)
```

## Complete Feature Set

- ✅ **Dual Load Balancer Setup**: NLB for VPC endpoint service + ALB for application routing
- ✅ **SSL/TLS Termination**: Support for SSL certificates on both NLB and ALB
- ✅ **Multiple Target Groups**: Route traffic to different backend services
- ✅ **Security Groups**: Configurable security group rules
- ✅ **Existing ALB Support**: Use existing ALB instead of creating new one
- ✅ **Host-based Routing**: Route traffic based on host headers
- ✅ **Health Checks**: Configurable health check settings
- ✅ **Access Control**: Principal-based access control
- ✅ **Auto-acceptance**: Optional automatic endpoint acceptance
- ✅ **Multiple Protocols**: HTTP/1.1, HTTP/2, TCP, HTTPS
- ✅ **Custom Ports**: Configurable application and health check ports
- ✅ **Priority-based Routing**: Custom listener rule priorities
- ✅ **Internet-facing Options**: Both internal and external-facing configurations
- ✅ **Certificate Management**: Multiple SSL certificates support
- ✅ **Tag Management**: Comprehensive tagging support
- ✅ **Output Management**: CloudFormation outputs for all resources

## Basic Usage

### Simple VPC Endpoint Service

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
      subnets: [
        {
          subnetGroupName: 'Private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
          cidrBlock: ['10.10.1.0/24', '10.10.2.0/24'],
          availabilityZones: ['us-east-1a', 'us-east-1b'],
        }
      ],
      vpcEndpointServices: [
        {
          name: 'my-service',
          alb: {
            subnetGroupName: 'Private',
            internetFacing: false,
            targetGroups: [
              {
                host: 'api.example.com',
                applicationPort: 8080,
                healthCheckPath: '/health',
                priority: 1
              }
            ]
          },
          nlb: {
            subnetGroupName: 'Private',
            securityGroupRules: [
              {
                peer: ec2.Peer.anyIpv4(),
                port: ec2.Port.tcp(443),
                description: 'Allow HTTPS traffic'
              }
            ]
          },
          acceptanceRequired: false,
          allowedPrincipals: ['arn:aws:iam::123456789012:root']
        }
      ]
    });
  }
}
```

## Configuration Options

### VpcEndpontServiceConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | ✅ | Unique name for the VPC endpoint service |
| `alb` | `LoadBalancerConfig` | ✅ | Application Load Balancer configuration |
| `nlb` | `NetworkLoadBalancerConfig` | ✅ | Network Load Balancer configuration |
| `allowedPrincipals` | `string[]` | ❌ | ARNs of principals allowed to create endpoints |
| `acceptanceRequired` | `boolean` | ❌ | Whether endpoint acceptance is required (default: true) |
| `additionalTags` | `Record<string, string>` | ❌ | Additional tags for the service |

### LoadBalancerConfig (ALB)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `existingArn` | `string` | ❌ | ARN of existing ALB to use instead of creating new one |
| `existingSecurityGroupId` | `string` | ❌ | ID of existing security group to use |
| `subnetGroupName` | `string` | ❌ | Subnet group name for ALB placement |
| `internetFacing` | `boolean` | ❌ | Whether ALB should be internet-facing (default: false) |
| `targetGroups` | `TargetGroupConfig[]` | ❌ | Target groups for routing traffic |
| `certificates` | `string[]` | ❌ | ARNs of SSL certificates for HTTPS |
| `securityGroupRules` | `SecurityGroupRule[]` | ❌ | Custom security group rules |

### NetworkLoadBalancerConfig (NLB)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `subnetGroupName` | `string` | ✅ | Subnet group name for NLB placement |
| `securityGroupRules` | `SecurityGroupRule[]` | ✅ | Security group rules for NLB |
| `existingSecurityGroupId` | `string` | ❌ | ID of existing security group to use |
| `certificates` | `string[]` | ❌ | ARNs of SSL certificates for HTTPS |
| `internetFacing` | `boolean` | ❌ | Whether NLB should be internet-facing (default: false) |

### TargetGroupConfig

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `host` | `string` | ✅ | Host header to match for routing |
| `applicationPort` | `number` | ✅ | Port where the application is running |
| `healthCheckPath` | `string` | ❌ | Health check path (default: '/') |
| `healthCheckProtocol` | `elbv2.Protocol` | ❌ | Health check protocol (default: HTTP) |
| `protocolVersion` | `elbv2.ApplicationProtocolVersion` | ❌ | ALB protocol version (default: HTTP1) |
| `protocol` | `elbv2.ApplicationProtocol` | ❌ | Application protocol (default: HTTP) |
| `healthCheckPort` | `number` | ❌ | Health check port (default: applicationPort) |
| `priority` | `number` | ❌ | Listener rule priority |

### SecurityGroupRule

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `peer` | `ec2.IPeer \| ec2.ISecurityGroup` | ✅ | Source of traffic (IP range, security group, etc.) |
| `port` | `ec2.Port` | ✅ | Port and protocol configuration |
| `description` | `string` | ❌ | Description for the rule |

## Complete Usage Cases

### 1. Basic Internal Service (Minimal Configuration)

```typescript
vpcEndpointServices: [
  {
    name: 'basic-internal-service',
    alb: {
      subnetGroupName: 'Private'
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 2. Using Existing ALB (No New ALB Creation)

```typescript
vpcEndpointServices: [
  {
    name: 'existing-alb-service',
    alb: {
      existingArn: 'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/my-existing-alb/1234567890123456',
      existingSecurityGroupId: 'sg-12345678'
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 3. SSL/TLS Termination on Both NLB and ALB

```typescript
vpcEndpointServices: [
  {
    name: 'ssl-termination-service',
    alb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/alb-cert-12345678'],
      targetGroups: [
        {
          host: 'secure.example.com',
          applicationPort: 8080,
          protocol: elbv2.ApplicationProtocol.HTTP, // ALB handles SSL termination
          healthCheckPath: '/health'
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/nlb-cert-12345678'],
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 4. Multiple Target Groups with Host-based Routing

```typescript
vpcEndpointServices: [
  {
    name: 'multi-host-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'api.example.com',
          applicationPort: 8080,
          protocol: elbv2.ApplicationProtocol.HTTP,
          protocolVersion: elbv2.ApplicationProtocolVersion.HTTP1,
          healthCheckPath: '/api/health',
          priority: 1
        },
        {
          host: 'admin.example.com',
          applicationPort: 8081,
          protocol: elbv2.ApplicationProtocol.HTTP,
          healthCheckPath: '/admin/health',
          priority: 2
        },
        {
          host: 'grpc.example.com',
          applicationPort: 9090,
          protocol: elbv2.ApplicationProtocol.HTTP,
          protocolVersion: elbv2.ApplicationProtocolVersion.HTTP2,
          healthCheckPath: '/grpc/health',
          priority: 3
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 5. Custom Security Groups with Specific IP Ranges

```typescript
vpcEndpointServices: [
  {
    name: 'restricted-access-service',
    alb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4('10.0.0.0/8'),
          port: ec2.Port.tcp(80),
          description: 'Allow HTTP from VPC'
        },
        {
          peer: ec2.Peer.ipv4('10.0.0.0/8'),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from VPC'
        },
        {
          peer: ec2.Peer.securityGroupId('sg-12345678'),
          port: ec2.Port.tcp(8080),
          description: 'Allow from specific security group'
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4('10.0.0.0/8'),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from VPC'
        },
        {
          peer: ec2.Peer.ipv4('172.16.0.0/12'),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from another VPC range'
        }
      ]
    }
  }
]
```

### 6. Access Control with Principal-based Permissions

```typescript
vpcEndpointServices: [
  {
    name: 'principal-controlled-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'internal.example.com',
          applicationPort: 8080
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    },
    allowedPrincipals: [
      'arn:aws:iam::123456789012:root',
      'arn:aws:iam::123456789012:role/MyRole',
      'arn:aws:iam::123456789012:user/ServiceUser'
    ],
    acceptanceRequired: true // Manual approval required
  }
]
```

### 7. Auto-acceptance with No Principal Restrictions

```typescript
vpcEndpointServices: [
  {
    name: 'open-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'public.example.com',
          applicationPort: 8080
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    },
    acceptanceRequired: false // Auto-accept all connections
  }
]
```

### 8. Internet-facing Configuration

```typescript
vpcEndpointServices: [
  {
    name: 'internet-facing-service',
    alb: {
      subnetGroupName: 'Public',
      internetFacing: true,
      targetGroups: [
        {
          host: 'public.example.com',
          applicationPort: 8080
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Public',
      internetFacing: true,
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from internet'
        }
      ]
    }
  }
]
```

### 9. Custom Health Check Configuration

```typescript
vpcEndpointServices: [
  {
    name: 'custom-health-check-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'api.example.com',
          applicationPort: 8080,
          healthCheckPath: '/custom/health/endpoint',
          healthCheckProtocol: elbv2.Protocol.HTTPS,
          healthCheckPort: 8443,
          protocol: elbv2.ApplicationProtocol.HTTP
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 10. Multiple SSL Certificates

```typescript
vpcEndpointServices: [
  {
    name: 'multi-cert-service',
    alb: {
      subnetGroupName: 'Private',
      certificates: [
        'arn:aws:acm:us-east-1:123456789012:certificate/cert1-12345678',
        'arn:aws:acm:us-east-1:123456789012:certificate/cert2-12345678'
      ],
      targetGroups: [
        {
          host: 'api1.example.com',
          applicationPort: 8080
        },
        {
          host: 'api2.example.com',
          applicationPort: 8081
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      certificates: [
        'arn:aws:acm:us-east-1:123456789012:certificate/nlb-cert1-12345678',
        'arn:aws:acm:us-east-1:123456789012:certificate/nlb-cert2-12345678'
      ],
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 11. TCP-only Configuration (No SSL)

```typescript
vpcEndpointServices: [
  {
    name: 'tcp-only-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'tcp.example.com',
          applicationPort: 8080,
          protocol: elbv2.ApplicationProtocol.HTTP
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      // No certificates = TCP mode
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(80),
          description: 'Allow HTTP traffic'
        },
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 12. HTTP/2 with gRPC Support

```typescript
vpcEndpointServices: [
  {
    name: 'grpc-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'grpc.example.com',
          applicationPort: 9090,
          protocol: elbv2.ApplicationProtocol.HTTP,
          protocolVersion: elbv2.ApplicationProtocolVersion.HTTP2,
          healthCheckPath: '/grpc.health.v1.Health/Check',
          healthCheckProtocol: elbv2.Protocol.HTTP
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 13. Custom Priority-based Routing

```typescript
vpcEndpointServices: [
  {
    name: 'priority-routing-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'high-priority.example.com',
          applicationPort: 8080,
          priority: 1 // Highest priority
        },
        {
          host: 'medium-priority.example.com',
          applicationPort: 8081,
          priority: 10
        },
        {
          host: 'low-priority.example.com',
          applicationPort: 8082,
          priority: 100 // Lowest priority
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    }
  }
]
```

### 14. Comprehensive Tagging Strategy

```typescript
vpcEndpointServices: [
  {
    name: 'tagged-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'tagged.example.com',
          applicationPort: 8080
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS traffic'
        }
      ]
    },
    additionalTags: {
      'Environment': 'Production',
      'Owner': 'Platform Team',
      'Project': 'VPC Endpoint Services',
      'CostCenter': '12345',
      'Compliance': 'SOC2',
      'Backup': 'Required',
      'Monitoring': 'Enabled'
    }
  }
]
```

### 15. Enterprise Multi-Service Setup

```typescript
vpcEndpointServices: [
  // API Gateway Service
  {
    name: 'api-gateway-service',
    alb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/api-cert'],
      targetGroups: [
        {
          host: 'api.company.com',
          applicationPort: 8080,
          priority: 1
        },
        {
          host: 'api-v2.company.com',
          applicationPort: 8081,
          priority: 2
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/nlb-cert'],
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4('10.0.0.0/8'),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from VPC'
        }
      ]
    },
    allowedPrincipals: ['arn:aws:iam::123456789012:root'],
    acceptanceRequired: false,
    additionalTags: {
      'Service': 'API Gateway',
      'Environment': 'Production'
    }
  },
  // Admin Service
  {
    name: 'admin-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'admin.company.com',
          applicationPort: 8080
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        {
          peer: ec2.Peer.ipv4('10.0.0.0/8'),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from VPC'
        }
      ]
    },
    allowedPrincipals: [
      'arn:aws:iam::123456789012:role/AdminRole',
      'arn:aws:iam::123456789012:user/AdminUser'
    ],
    acceptanceRequired: true,
    additionalTags: {
      'Service': 'Admin Panel',
      'Environment': 'Production',
      'AccessLevel': 'Restricted'
    }
  },
  // Public Service
  {
    name: 'public-service',
    alb: {
      subnetGroupName: 'Public',
      internetFacing: true,
      targetGroups: [
        {
          host: 'public.company.com',
          applicationPort: 8080
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Public',
      internetFacing: true,
      securityGroupRules: [
        {
          peer: ec2.Peer.anyIpv4(),
          port: ec2.Port.tcp(443),
          description: 'Allow HTTPS from internet'
        }
      ]
    },
    acceptanceRequired: false,
    additionalTags: {
      'Service': 'Public API',
      'Environment': 'Production',
      'AccessLevel': 'Public'
    }
  }
]
```

## Real-World Usage Scenarios

### 1. Microservices Architecture
**Use Case**: Expose multiple microservices through a single VPC endpoint service
```typescript
vpcEndpointServices: [
  {
    name: 'microservices-gateway',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'user-service.company.com', applicationPort: 8080, priority: 1 },
        { host: 'order-service.company.com', applicationPort: 8081, priority: 2 },
        { host: 'payment-service.company.com', applicationPort: 8082, priority: 3 },
        { host: 'notification-service.company.com', applicationPort: 8083, priority: 4 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'Internal HTTPS' }
      ]
    }
  }
]
```

### 2. API Gateway Replacement
**Use Case**: Replace AWS API Gateway with private VPC endpoint service
```typescript
vpcEndpointServices: [
  {
    name: 'private-api-gateway',
    alb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/api-cert'],
      targetGroups: [
        { host: 'api.company.com', applicationPort: 8080, protocol: elbv2.ApplicationProtocol.HTTP },
        { host: 'api-v2.company.com', applicationPort: 8081, protocol: elbv2.ApplicationProtocol.HTTP }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/nlb-cert'],
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    },
    allowedPrincipals: ['arn:aws:iam::123456789012:root'],
    acceptanceRequired: false
  }
]
```

### 3. Multi-Tenant SaaS Platform
**Use Case**: Serve different tenants through host-based routing
```typescript
vpcEndpointServices: [
  {
    name: 'saas-platform',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'tenant1.company.com', applicationPort: 8080, priority: 1 },
        { host: 'tenant2.company.com', applicationPort: 8080, priority: 2 },
        { host: 'tenant3.company.com', applicationPort: 8080, priority: 3 },
        { host: 'admin.company.com', applicationPort: 8081, priority: 10 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    }
  }
]
```

### 4. Internal Developer Portal
**Use Case**: Expose internal tools and services to development teams
```typescript
vpcEndpointServices: [
  {
    name: 'dev-portal',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'jenkins.company.com', applicationPort: 8080, priority: 1 },
        { host: 'grafana.company.com', applicationPort: 3000, priority: 2 },
        { host: 'kibana.company.com', applicationPort: 5601, priority: 3 },
        { host: 'prometheus.company.com', applicationPort: 9090, priority: 4 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'Internal HTTPS' }
      ]
    },
    allowedPrincipals: [
      'arn:aws:iam::123456789012:role/DeveloperRole',
      'arn:aws:iam::123456789012:role/DevOpsRole'
    ],
    acceptanceRequired: true
  }
]
```

### 5. gRPC Services
**Use Case**: Expose gRPC microservices with HTTP/2 support
```typescript
vpcEndpointServices: [
  {
    name: 'grpc-services',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        {
          host: 'user-grpc.company.com',
          applicationPort: 9090,
          protocol: elbv2.ApplicationProtocol.HTTP,
          protocolVersion: elbv2.ApplicationProtocolVersion.HTTP2,
          healthCheckPath: '/grpc.health.v1.Health/Check'
        },
        {
          host: 'order-grpc.company.com',
          applicationPort: 9091,
          protocol: elbv2.ApplicationProtocol.HTTP,
          protocolVersion: elbv2.ApplicationProtocolVersion.HTTP2,
          healthCheckPath: '/grpc.health.v1.Health/Check'
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    }
  }
]
```

### 6. Database Proxy Services
**Use Case**: Expose database connections through VPC endpoint service
```typescript
vpcEndpointServices: [
  {
    name: 'database-proxy',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'mysql-proxy.company.com', applicationPort: 3306, priority: 1 },
        { host: 'postgres-proxy.company.com', applicationPort: 5432, priority: 2 },
        { host: 'redis-proxy.company.com', applicationPort: 6379, priority: 3 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'Internal HTTPS' }
      ]
    },
    allowedPrincipals: ['arn:aws:iam::123456789012:role/DatabaseRole'],
    acceptanceRequired: true
  }
]
```

### 7. File Storage Services
**Use Case**: Expose file storage and CDN services privately
```typescript
vpcEndpointServices: [
  {
    name: 'file-storage',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'files.company.com', applicationPort: 8080, priority: 1 },
        { host: 'images.company.com', applicationPort: 8081, priority: 2 },
        { host: 'documents.company.com', applicationPort: 8082, priority: 3 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    }
  }
]
```

### 8. Webhook Services
**Use Case**: Expose webhook endpoints for third-party integrations
```typescript
vpcEndpointServices: [
  {
    name: 'webhook-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'webhooks.company.com', applicationPort: 8080, priority: 1 },
        { host: 'stripe-webhooks.company.com', applicationPort: 8081, priority: 2 },
        { host: 'github-webhooks.company.com', applicationPort: 8082, priority: 3 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    },
    acceptanceRequired: false
  }
]
```

### 9. Monitoring and Observability
**Use Case**: Expose monitoring tools and dashboards
```typescript
vpcEndpointServices: [
  {
    name: 'monitoring-stack',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'prometheus.company.com', applicationPort: 9090, priority: 1 },
        { host: 'grafana.company.com', applicationPort: 3000, priority: 2 },
        { host: 'jaeger.company.com', applicationPort: 16686, priority: 3 },
        { host: 'zipkin.company.com', applicationPort: 9411, priority: 4 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'Internal HTTPS' }
      ]
    },
    allowedPrincipals: [
      'arn:aws:iam::123456789012:role/MonitoringRole',
      'arn:aws:iam::123456789012:role/DevOpsRole'
    ],
    acceptanceRequired: true
  }
]
```

### 10. Legacy System Integration
**Use Case**: Expose legacy systems through modern VPC endpoint service
```typescript
vpcEndpointServices: [
  {
    name: 'legacy-integration',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'legacy-api.company.com', applicationPort: 8080, priority: 1 },
        { host: 'soap-service.company.com', applicationPort: 8081, priority: 2 },
        { host: 'xml-api.company.com', applicationPort: 8082, priority: 3 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    }
  }
]
```

### 11. Multi-Environment Setup
**Use Case**: Different configurations for dev, staging, and production
```typescript
// Development Environment
const devVpcEndpointServices = [
  {
    name: 'dev-api-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'api-dev.company.com', applicationPort: 8080 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    },
    acceptanceRequired: false
  }
];

// Production Environment
const prodVpcEndpointServices = [
  {
    name: 'prod-api-service',
    alb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/prod-cert'],
      targetGroups: [
        { host: 'api.company.com', applicationPort: 8080 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      certificates: ['arn:aws:acm:us-east-1:123456789012:certificate/prod-nlb-cert'],
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'Internal HTTPS' }
      ]
    },
    allowedPrincipals: ['arn:aws:iam::123456789012:root'],
    acceptanceRequired: true,
    additionalTags: {
      'Environment': 'Production',
      'Criticality': 'High'
    }
  }
];
```

### 12. Disaster Recovery Setup
**Use Case**: Cross-region VPC endpoint services for DR
```typescript
// Primary Region
const primaryVpcEndpointServices = [
  {
    name: 'primary-api-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'api-primary.company.com', applicationPort: 8080 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    }
  }
];

// DR Region
const drVpcEndpointServices = [
  {
    name: 'dr-api-service',
    alb: {
      subnetGroupName: 'Private',
      targetGroups: [
        { host: 'api-dr.company.com', applicationPort: 8080 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    },
    additionalTags: {
      'Environment': 'DR',
      'PrimaryRegion': 'us-east-1'
    }
  }
];
```

### 13. Compliance and Security
**Use Case**: Highly secure services with strict access controls
```typescript
vpcEndpointServices: [
  {
    name: 'compliance-service',
    alb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(80), description: 'HTTP from VPC' },
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'HTTPS from VPC' }
      ],
      targetGroups: [
        { host: 'compliance.company.com', applicationPort: 8080 }
      ]
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.ipv4('10.0.0.0/8'), port: ec2.Port.tcp(443), description: 'HTTPS from VPC' }
      ]
    },
    allowedPrincipals: [
      'arn:aws:iam::123456789012:role/ComplianceRole',
      'arn:aws:iam::123456789012:role/AuditRole'
    ],
    acceptanceRequired: true,
    additionalTags: {
      'Compliance': 'SOC2',
      'DataClassification': 'Confidential',
      'AccessLevel': 'Restricted'
    }
  }
]
```

### 14. Cost Optimization
**Use Case**: Using existing ALB to reduce costs
```typescript
vpcEndpointServices: [
  {
    name: 'cost-optimized-service',
    alb: {
      existingArn: 'arn:aws:elasticloadbalancing:us-east-1:123456789012:loadbalancer/app/existing-alb/1234567890123456',
      existingSecurityGroupId: 'sg-12345678'
    },
    nlb: {
      subnetGroupName: 'Private',
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    }
  }
]
```

### 15. High Availability Setup
**Use Case**: Multi-AZ deployment with health checks
```typescript
vpcEndpointServices: [
  {
    name: 'ha-service',
    alb: {
      subnetGroupName: 'Private', // Must span multiple AZs
      targetGroups: [
        {
          host: 'ha-api.company.com',
          applicationPort: 8080,
          healthCheckPath: '/health',
          healthCheckProtocol: elbv2.Protocol.HTTP,
          priority: 1
        }
      ]
    },
    nlb: {
      subnetGroupName: 'Private', // Must span multiple AZs
      securityGroupRules: [
        { peer: ec2.Peer.anyIpv4(), port: ec2.Port.tcp(443), description: 'HTTPS traffic' }
      ]
    },
    additionalTags: {
      'Availability': 'High',
      'RTO': '5min',
      'RPO': '1min'
    }
  }
]
```

## Configuration Matrix

| Feature | Basic | Intermediate | Advanced | Enterprise |
|---------|-------|-------------|----------|------------|
| **ALB Creation** | ✅ New | ✅ New | ✅ New/Existing | ✅ New/Existing |
| **SSL Termination** | ❌ | ✅ ALB only | ✅ Both ALB/NLB | ✅ Both + Multiple Certs |
| **Target Groups** | 1 | 2-3 | 4-10 | 10+ |
| **Host Routing** | ❌ | ✅ Basic | ✅ Advanced | ✅ Complex |
| **Security Groups** | Basic | Custom | Advanced | Enterprise |
| **Access Control** | Open | Principal-based | Role-based | Multi-level |
| **Health Checks** | Default | Custom | Advanced | Comprehensive |
| **Protocols** | HTTP | HTTP/HTTPS | HTTP/HTTPS/gRPC | All |
| **Tagging** | Basic | Standard | Advanced | Comprehensive |
| **Monitoring** | Basic | Standard | Advanced | Enterprise |

## Outputs

The construct automatically creates the following CloudFormation outputs:

- `{serviceName}VpcEndpointServiceName`: The name of the VPC Endpoint Service
- `{serviceName}AlbArn`: The ARN of the Application Load Balancer (if created)
- `{serviceName}NlbArn`: The ARN of the Network Load Balancer

## Best Practices

### 1. Subnet Placement
- Place ALB and NLB in private subnets for internal services
- Use multiple AZs for high availability
- Ensure subnets have proper routing to your target services

### 2. Security Groups
- Follow the principle of least privilege
- Use specific IP ranges instead of `0.0.0.0/0` when possible
- Document security group rules with meaningful descriptions

### 3. SSL/TLS
- Use AWS Certificate Manager for SSL certificates
- Enable HTTPS redirect on ALB
- Use appropriate protocol versions (HTTP/1.1 or HTTP/2)

### 4. Health Checks
- Configure appropriate health check paths
- Set reasonable health check intervals
- Monitor health check metrics

### 5. Access Control
- Use IAM principals for access control
- Consider using `acceptanceRequired: true` for additional security
- Regularly review allowed principals

### 6. Monitoring
- Enable CloudWatch monitoring
- Set up alarms for health check failures
- Monitor NLB and ALB metrics

## Troubleshooting

### Common Issues

1. **VPC Endpoint Service Not Available**
   - Check that the NLB is in the correct subnets
   - Verify security group rules allow traffic
   - Ensure the service is in the same region

2. **Target Health Check Failures**
   - Verify target group health check configuration
   - Check that target applications are responding on the correct port
   - Ensure security groups allow health check traffic

3. **SSL Certificate Issues**
   - Verify certificate ARN is correct
   - Ensure certificate is in the same region
   - Check certificate validation status

4. **Access Denied Errors**
   - Verify allowed principals configuration
   - Check IAM permissions for endpoint creation
   - Ensure acceptance is not required or properly handled

### Debugging Steps

1. Check CloudFormation stack events for deployment issues
2. Verify security group rules in AWS Console
3. Test connectivity from VPC endpoints to targets
4. Review CloudWatch logs for ALB and NLB
5. Validate certificate configuration

## Cost Considerations

- **NLB**: Charged per hour and per GB processed
- **ALB**: Charged per hour and per LCU (Load Balancer Capacity Unit)
- **VPC Endpoint Service**: Charged per hour and per GB processed
- **Data Transfer**: Charges apply for data transfer between AZs

Consider using existing ALBs when possible to reduce costs.

## Limitations

- VPC Endpoint Services are only available in specific AWS regions
- Maximum of 10 VPC endpoint services per VPC
- NLB must be in at least 2 AZs
- Some AWS services have specific requirements for VPC endpoint services

## Complete Usage Summary

### All Possible Configuration Combinations

#### 1. **ALB Configuration Options**
- ✅ **New ALB Creation**: Full control over ALB configuration
- ✅ **Existing ALB Usage**: Reuse existing ALB with `existingArn`
- ✅ **Custom Security Groups**: Use existing security groups with `existingSecurityGroupId`
- ✅ **Subnet Placement**: Choose specific subnet groups for ALB placement
- ✅ **Internet-facing**: Configure ALB as internal or internet-facing
- ✅ **SSL Certificates**: Support for single or multiple SSL certificates
- ✅ **Target Groups**: 1 to unlimited target groups with host-based routing
- ✅ **Custom Security Rules**: Define custom security group rules

#### 2. **NLB Configuration Options**
- ✅ **Subnet Placement**: Required subnet group name for NLB placement
- ✅ **Security Groups**: Required security group rules configuration
- ✅ **Existing Security Groups**: Use existing security groups
- ✅ **SSL Certificates**: Support for single or multiple SSL certificates
- ✅ **Internet-facing**: Configure NLB as internal or internet-facing
- ✅ **Protocol Support**: TCP, HTTP, HTTPS protocols

#### 3. **Target Group Configuration Options**
- ✅ **Host-based Routing**: Route traffic based on host headers
- ✅ **Port Configuration**: Custom application ports
- ✅ **Health Checks**: Custom health check paths, protocols, and ports
- ✅ **Protocol Versions**: HTTP/1.1 and HTTP/2 support
- ✅ **Protocols**: HTTP and HTTPS protocols
- ✅ **Priority-based Routing**: Custom listener rule priorities
- ✅ **Multiple Services**: Support for multiple backend services

#### 4. **Security and Access Control**
- ✅ **IP-based Access**: Restrict access by IP ranges
- ✅ **Security Group-based Access**: Use existing security groups
- ✅ **Principal-based Access**: IAM principal-based access control
- ✅ **Auto-acceptance**: Automatic or manual endpoint acceptance
- ✅ **Custom Security Rules**: Define custom security group rules
- ✅ **Multi-level Access**: Different access levels for different services

#### 5. **SSL/TLS Configuration**
- ✅ **ALB SSL Termination**: SSL termination at ALB level
- ✅ **NLB SSL Termination**: SSL termination at NLB level
- ✅ **Dual SSL Termination**: SSL termination at both levels
- ✅ **Multiple Certificates**: Support for multiple SSL certificates
- ✅ **Certificate Management**: AWS Certificate Manager integration
- ✅ **Protocol Support**: HTTP, HTTPS, TCP protocols

#### 6. **Networking Options**
- ✅ **Private Subnets**: Internal-only services
- ✅ **Public Subnets**: Internet-facing services
- ✅ **Multi-AZ Deployment**: High availability across availability zones
- ✅ **Custom Subnet Groups**: Use predefined subnet groups
- ✅ **VPC Integration**: Seamless VPC integration

#### 7. **Monitoring and Observability**
- ✅ **Health Checks**: Comprehensive health check configuration
- ✅ **CloudWatch Integration**: Built-in CloudWatch monitoring
- ✅ **Custom Metrics**: Support for custom monitoring metrics
- ✅ **Logging**: Access logs and error logs
- ✅ **Alerting**: CloudWatch alarms support

#### 8. **Cost Optimization**
- ✅ **Existing ALB Usage**: Reduce costs by reusing existing ALBs
- ✅ **Shared Resources**: Share resources across multiple services
- ✅ **Right-sizing**: Optimize resource allocation
- ✅ **Tagging**: Comprehensive tagging for cost tracking

#### 9. **Enterprise Features**
- ✅ **Multi-environment Support**: Dev, staging, production configurations
- ✅ **Disaster Recovery**: Cross-region DR support
- ✅ **Compliance**: SOC2, HIPAA, PCI-DSS compliance support
- ✅ **Audit Logging**: Comprehensive audit trail
- ✅ **Role-based Access**: Fine-grained access control

#### 10. **Integration Patterns**
- ✅ **Microservices**: Service mesh and microservices architecture
- ✅ **API Gateway**: Replace or complement AWS API Gateway
- ✅ **Legacy Integration**: Modernize legacy systems
- ✅ **Multi-tenant**: SaaS and multi-tenant applications
- ✅ **gRPC Services**: High-performance gRPC services
- ✅ **Webhook Services**: Third-party integration webhooks
- ✅ **Database Proxies**: Database connection management
- ✅ **File Storage**: File storage and CDN services
- ✅ **Monitoring Stack**: Observability and monitoring tools
- ✅ **Developer Tools**: Internal developer portals

### Quick Reference Matrix

| Configuration | Option 1 | Option 2 | Option 3 | Option 4 |
|---------------|-----------|----------|----------|----------|
| **ALB** | New | Existing | Custom SG | Internet-facing |
| **NLB** | Private | Public | SSL | Multi-cert |
| **Target Groups** | Single | Multiple | Host-based | Priority-based |
| **Security** | Open | IP-based | Principal-based | Multi-level |
| **SSL** | None | ALB only | NLB only | Both |
| **Protocols** | HTTP | HTTPS | HTTP/2 | gRPC |
| **Access** | Auto-accept | Manual | Principal | Role-based |
| **Environment** | Dev | Staging | Production | DR |

### Decision Tree

```
Start
├── Need SSL?
│   ├── Yes → ALB + NLB SSL termination
│   └── No → TCP-only configuration
├── Multiple Services?
│   ├── Yes → Multiple target groups with host routing
│   └── No → Single target group
├── Access Control?
│   ├── Open → acceptanceRequired: false
│   ├── Restricted → Principal-based access
│   └── Enterprise → Multi-level access control
├── Cost Optimization?
│   ├── Yes → Use existing ALB
│   └── No → Create new ALB
└── High Availability?
    ├── Yes → Multi-AZ deployment
    └── No → Single AZ (not recommended)
```

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Check AWS documentation for VPC Endpoint Services
- Review CloudFormation documentation for load balancer resources
- Consult the configuration matrix for quick reference
- Use the decision tree for configuration guidance

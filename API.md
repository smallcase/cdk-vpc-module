# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### Network <a name="Network" id="@smallcase/cdk-vpc-module.Network"></a>

#### Initializers <a name="Initializers" id="@smallcase/cdk-vpc-module.Network.Initializer"></a>

```typescript
import { Network } from '@smallcase/cdk-vpc-module'

new Network(scope: Construct, id: string, props: VPCProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.Network.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.Initializer.parameter.props">props</a></code> | <code><a href="#@smallcase/cdk-vpc-module.VPCProps">VPCProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@smallcase/cdk-vpc-module.Network.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@smallcase/cdk-vpc-module.Network.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@smallcase/cdk-vpc-module.Network.Initializer.parameter.props"></a>

- *Type:* <a href="#@smallcase/cdk-vpc-module.VPCProps">VPCProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.Network.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@smallcase/cdk-vpc-module.Network.createSubnet">createSubnet</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="@smallcase/cdk-vpc-module.Network.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `createSubnet` <a name="createSubnet" id="@smallcase/cdk-vpc-module.Network.createSubnet"></a>

```typescript
public createSubnet(option: ISubnetsProps, vpc: Vpc): Subnet[]
```

###### `option`<sup>Required</sup> <a name="option" id="@smallcase/cdk-vpc-module.Network.createSubnet.parameter.option"></a>

- *Type:* <a href="#@smallcase/cdk-vpc-module.ISubnetsProps">ISubnetsProps</a>

---

###### `vpc`<sup>Required</sup> <a name="vpc" id="@smallcase/cdk-vpc-module.Network.createSubnet.parameter.vpc"></a>

- *Type:* aws-cdk-lib.aws_ec2.Vpc

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.Network.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@smallcase/cdk-vpc-module.Network.isConstruct"></a>

```typescript
import { Network } from '@smallcase/cdk-vpc-module'

Network.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@smallcase/cdk-vpc-module.Network.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.endpointOutputs">endpointOutputs</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ec2.InterfaceVpcEndpoint \| aws-cdk-lib.aws_ec2.GatewayVpcEndpoint}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.securityGroupOutputs">securityGroupOutputs</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ec2.SecurityGroup}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.Vpc</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.natSubnets">natSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.PublicSubnet[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.pbSubnets">pbSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.PublicSubnet[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.pvSubnets">pvSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.PrivateSubnet[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.subnets">subnets</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ec2.Subnet[]}</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@smallcase/cdk-vpc-module.Network.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `endpointOutputs`<sup>Required</sup> <a name="endpointOutputs" id="@smallcase/cdk-vpc-module.Network.property.endpointOutputs"></a>

```typescript
public readonly endpointOutputs: {[ key: string ]: InterfaceVpcEndpoint | GatewayVpcEndpoint};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ec2.InterfaceVpcEndpoint | aws-cdk-lib.aws_ec2.GatewayVpcEndpoint}

---

##### `securityGroupOutputs`<sup>Required</sup> <a name="securityGroupOutputs" id="@smallcase/cdk-vpc-module.Network.property.securityGroupOutputs"></a>

```typescript
public readonly securityGroupOutputs: {[ key: string ]: SecurityGroup};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ec2.SecurityGroup}

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@smallcase/cdk-vpc-module.Network.property.vpc"></a>

```typescript
public readonly vpc: Vpc;
```

- *Type:* aws-cdk-lib.aws_ec2.Vpc

---

##### `natSubnets`<sup>Required</sup> <a name="natSubnets" id="@smallcase/cdk-vpc-module.Network.property.natSubnets"></a>

```typescript
public readonly natSubnets: PublicSubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.PublicSubnet[]

---

##### `pbSubnets`<sup>Required</sup> <a name="pbSubnets" id="@smallcase/cdk-vpc-module.Network.property.pbSubnets"></a>

```typescript
public readonly pbSubnets: PublicSubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.PublicSubnet[]

---

##### `pvSubnets`<sup>Required</sup> <a name="pvSubnets" id="@smallcase/cdk-vpc-module.Network.property.pvSubnets"></a>

```typescript
public readonly pvSubnets: PrivateSubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.PrivateSubnet[]

---

##### `subnets`<sup>Required</sup> <a name="subnets" id="@smallcase/cdk-vpc-module.Network.property.subnets"></a>

```typescript
public readonly subnets: {[ key: string ]: Subnet[]};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ec2.Subnet[]}

---


## Structs <a name="Structs" id="Structs"></a>

### AddRouteOptions <a name="AddRouteOptions" id="@smallcase/cdk-vpc-module.AddRouteOptions"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.AddRouteOptions.Initializer"></a>

```typescript
import { AddRouteOptions } from '@smallcase/cdk-vpc-module'

const addRouteOptions: AddRouteOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.routerType">routerType</a></code> | <code>aws-cdk-lib.aws_ec2.RouterType</code> | What type of router to route this traffic to. |
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.destinationCidrBlock">destinationCidrBlock</a></code> | <code>string</code> | IPv4 range this route applies to. |
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.destinationIpv6CidrBlock">destinationIpv6CidrBlock</a></code> | <code>string</code> | IPv6 range this route applies to. |
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.enablesInternetConnectivity">enablesInternetConnectivity</a></code> | <code>boolean</code> | Whether this route will enable internet connectivity. |
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.existingVpcPeeringRouteKey">existingVpcPeeringRouteKey</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.routerId">routerId</a></code> | <code>string</code> | *No description.* |

---

##### `routerType`<sup>Required</sup> <a name="routerType" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.routerType"></a>

```typescript
public readonly routerType: RouterType;
```

- *Type:* aws-cdk-lib.aws_ec2.RouterType

What type of router to route this traffic to.

---

##### `destinationCidrBlock`<sup>Optional</sup> <a name="destinationCidrBlock" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.destinationCidrBlock"></a>

```typescript
public readonly destinationCidrBlock: string;
```

- *Type:* string
- *Default:* '0.0.0.0/0'

IPv4 range this route applies to.

---

##### `destinationIpv6CidrBlock`<sup>Optional</sup> <a name="destinationIpv6CidrBlock" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.destinationIpv6CidrBlock"></a>

```typescript
public readonly destinationIpv6CidrBlock: string;
```

- *Type:* string
- *Default:* Uses IPv6

IPv6 range this route applies to.

---

##### `enablesInternetConnectivity`<sup>Optional</sup> <a name="enablesInternetConnectivity" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.enablesInternetConnectivity"></a>

```typescript
public readonly enablesInternetConnectivity: boolean;
```

- *Type:* boolean
- *Default:* false

Whether this route will enable internet connectivity.

If true, this route will be added before any AWS resources that depend
on internet connectivity in the VPC will be created.

---

##### `existingVpcPeeringRouteKey`<sup>Optional</sup> <a name="existingVpcPeeringRouteKey" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.existingVpcPeeringRouteKey"></a>

```typescript
public readonly existingVpcPeeringRouteKey: string;
```

- *Type:* string

---

##### `routerId`<sup>Optional</sup> <a name="routerId" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.routerId"></a>

```typescript
public readonly routerId: string;
```

- *Type:* string

---

### LoadBalancerConfig <a name="LoadBalancerConfig" id="@smallcase/cdk-vpc-module.LoadBalancerConfig"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.Initializer"></a>

```typescript
import { LoadBalancerConfig } from '@smallcase/cdk-vpc-module'

const loadBalancerConfig: LoadBalancerConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.certificates">certificates</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.existingArn">existingArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.existingSecurityGroupId">existingSecurityGroupId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.internetFacing">internetFacing</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.securityGroupRules">securityGroupRules</a></code> | <code><a href="#@smallcase/cdk-vpc-module.SecurityGroupRule">SecurityGroupRule</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.subnetGroupName">subnetGroupName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig.property.targetGroups">targetGroups</a></code> | <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig">TargetGroupConfig</a>[]</code> | *No description.* |

---

##### `certificates`<sup>Optional</sup> <a name="certificates" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.certificates"></a>

```typescript
public readonly certificates: string[];
```

- *Type:* string[]

---

##### `existingArn`<sup>Optional</sup> <a name="existingArn" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.existingArn"></a>

```typescript
public readonly existingArn: string;
```

- *Type:* string

---

##### `existingSecurityGroupId`<sup>Optional</sup> <a name="existingSecurityGroupId" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.existingSecurityGroupId"></a>

```typescript
public readonly existingSecurityGroupId: string;
```

- *Type:* string

---

##### `internetFacing`<sup>Optional</sup> <a name="internetFacing" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.internetFacing"></a>

```typescript
public readonly internetFacing: boolean;
```

- *Type:* boolean

---

##### `securityGroupRules`<sup>Optional</sup> <a name="securityGroupRules" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.securityGroupRules"></a>

```typescript
public readonly securityGroupRules: SecurityGroupRule[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.SecurityGroupRule">SecurityGroupRule</a>[]

---

##### `subnetGroupName`<sup>Optional</sup> <a name="subnetGroupName" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.subnetGroupName"></a>

```typescript
public readonly subnetGroupName: string;
```

- *Type:* string

---

##### `targetGroups`<sup>Optional</sup> <a name="targetGroups" id="@smallcase/cdk-vpc-module.LoadBalancerConfig.property.targetGroups"></a>

```typescript
public readonly targetGroups: TargetGroupConfig[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.TargetGroupConfig">TargetGroupConfig</a>[]

---

### NetworkACL <a name="NetworkACL" id="@smallcase/cdk-vpc-module.NetworkACL"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.NetworkACL.Initializer"></a>

```typescript
import { NetworkACL } from '@smallcase/cdk-vpc-module'

const networkACL: NetworkACL = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkACL.property.cidr">cidr</a></code> | <code>aws-cdk-lib.aws_ec2.AclCidr</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkACL.property.traffic">traffic</a></code> | <code>aws-cdk-lib.aws_ec2.AclTraffic</code> | *No description.* |

---

##### `cidr`<sup>Required</sup> <a name="cidr" id="@smallcase/cdk-vpc-module.NetworkACL.property.cidr"></a>

```typescript
public readonly cidr: AclCidr;
```

- *Type:* aws-cdk-lib.aws_ec2.AclCidr

---

##### `traffic`<sup>Required</sup> <a name="traffic" id="@smallcase/cdk-vpc-module.NetworkACL.property.traffic"></a>

```typescript
public readonly traffic: AclTraffic;
```

- *Type:* aws-cdk-lib.aws_ec2.AclTraffic

---

### NetworkLoadBalancerConfig <a name="NetworkLoadBalancerConfig" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.Initializer"></a>

```typescript
import { NetworkLoadBalancerConfig } from '@smallcase/cdk-vpc-module'

const networkLoadBalancerConfig: NetworkLoadBalancerConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.securityGroupRules">securityGroupRules</a></code> | <code><a href="#@smallcase/cdk-vpc-module.SecurityGroupRule">SecurityGroupRule</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.subnetGroupName">subnetGroupName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.certificates">certificates</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.existingSecurityGroupId">existingSecurityGroupId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.internetFacing">internetFacing</a></code> | <code>boolean</code> | *No description.* |

---

##### `securityGroupRules`<sup>Required</sup> <a name="securityGroupRules" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.securityGroupRules"></a>

```typescript
public readonly securityGroupRules: SecurityGroupRule[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.SecurityGroupRule">SecurityGroupRule</a>[]

---

##### `subnetGroupName`<sup>Required</sup> <a name="subnetGroupName" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.subnetGroupName"></a>

```typescript
public readonly subnetGroupName: string;
```

- *Type:* string

---

##### `certificates`<sup>Optional</sup> <a name="certificates" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.certificates"></a>

```typescript
public readonly certificates: string[];
```

- *Type:* string[]

---

##### `existingSecurityGroupId`<sup>Optional</sup> <a name="existingSecurityGroupId" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.existingSecurityGroupId"></a>

```typescript
public readonly existingSecurityGroupId: string;
```

- *Type:* string

---

##### `internetFacing`<sup>Optional</sup> <a name="internetFacing" id="@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig.property.internetFacing"></a>

```typescript
public readonly internetFacing: boolean;
```

- *Type:* boolean

---

### PeeringConfig <a name="PeeringConfig" id="@smallcase/cdk-vpc-module.PeeringConfig"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.PeeringConfig.Initializer"></a>

```typescript
import { PeeringConfig } from '@smallcase/cdk-vpc-module'

const peeringConfig: PeeringConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.PeeringConfig.property.peeringVpcId">peeringVpcId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.PeeringConfig.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.PeeringConfig.property.peerAssumeRoleArn">peerAssumeRoleArn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.PeeringConfig.property.peerOwnerId">peerOwnerId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.PeeringConfig.property.peerRegion">peerRegion</a></code> | <code>string</code> | *No description.* |

---

##### `peeringVpcId`<sup>Required</sup> <a name="peeringVpcId" id="@smallcase/cdk-vpc-module.PeeringConfig.property.peeringVpcId"></a>

```typescript
public readonly peeringVpcId: string;
```

- *Type:* string

---

##### `tags`<sup>Required</sup> <a name="tags" id="@smallcase/cdk-vpc-module.PeeringConfig.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `peerAssumeRoleArn`<sup>Optional</sup> <a name="peerAssumeRoleArn" id="@smallcase/cdk-vpc-module.PeeringConfig.property.peerAssumeRoleArn"></a>

```typescript
public readonly peerAssumeRoleArn: string;
```

- *Type:* string

---

##### `peerOwnerId`<sup>Optional</sup> <a name="peerOwnerId" id="@smallcase/cdk-vpc-module.PeeringConfig.property.peerOwnerId"></a>

```typescript
public readonly peerOwnerId: string;
```

- *Type:* string

---

##### `peerRegion`<sup>Optional</sup> <a name="peerRegion" id="@smallcase/cdk-vpc-module.PeeringConfig.property.peerRegion"></a>

```typescript
public readonly peerRegion: string;
```

- *Type:* string

---

### PeeringConnectionInternalType <a name="PeeringConnectionInternalType" id="@smallcase/cdk-vpc-module.PeeringConnectionInternalType"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.PeeringConnectionInternalType.Initializer"></a>

```typescript
import { PeeringConnectionInternalType } from '@smallcase/cdk-vpc-module'

const peeringConnectionInternalType: PeeringConnectionInternalType = { ... }
```


### SecurityGroupRule <a name="SecurityGroupRule" id="@smallcase/cdk-vpc-module.SecurityGroupRule"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.SecurityGroupRule.Initializer"></a>

```typescript
import { SecurityGroupRule } from '@smallcase/cdk-vpc-module'

const securityGroupRule: SecurityGroupRule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.SecurityGroupRule.property.peer">peer</a></code> | <code>aws-cdk-lib.aws_ec2.IPeer \| aws-cdk-lib.aws_ec2.ISecurityGroup</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.SecurityGroupRule.property.port">port</a></code> | <code>aws-cdk-lib.aws_ec2.Port</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.SecurityGroupRule.property.description">description</a></code> | <code>string</code> | *No description.* |

---

##### `peer`<sup>Required</sup> <a name="peer" id="@smallcase/cdk-vpc-module.SecurityGroupRule.property.peer"></a>

```typescript
public readonly peer: IPeer | ISecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.IPeer | aws-cdk-lib.aws_ec2.ISecurityGroup

---

##### `port`<sup>Required</sup> <a name="port" id="@smallcase/cdk-vpc-module.SecurityGroupRule.property.port"></a>

```typescript
public readonly port: Port;
```

- *Type:* aws-cdk-lib.aws_ec2.Port

---

##### `description`<sup>Optional</sup> <a name="description" id="@smallcase/cdk-vpc-module.SecurityGroupRule.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

---

### TargetGroupConfig <a name="TargetGroupConfig" id="@smallcase/cdk-vpc-module.TargetGroupConfig"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.TargetGroupConfig.Initializer"></a>

```typescript
import { TargetGroupConfig } from '@smallcase/cdk-vpc-module'

const targetGroupConfig: TargetGroupConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.applicationPort">applicationPort</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.host">host</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.healthCheckPath">healthCheckPath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.healthCheckPort">healthCheckPort</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.healthCheckProtocol">healthCheckProtocol</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.Protocol</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.priority">priority</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.protocol">protocol</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocol</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.TargetGroupConfig.property.protocolVersion">protocolVersion</a></code> | <code>aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocolVersion</code> | *No description.* |

---

##### `applicationPort`<sup>Required</sup> <a name="applicationPort" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.applicationPort"></a>

```typescript
public readonly applicationPort: number;
```

- *Type:* number

---

##### `host`<sup>Required</sup> <a name="host" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.host"></a>

```typescript
public readonly host: string;
```

- *Type:* string

---

##### `healthCheckPath`<sup>Optional</sup> <a name="healthCheckPath" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.healthCheckPath"></a>

```typescript
public readonly healthCheckPath: string;
```

- *Type:* string

---

##### `healthCheckPort`<sup>Optional</sup> <a name="healthCheckPort" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.healthCheckPort"></a>

```typescript
public readonly healthCheckPort: number;
```

- *Type:* number

---

##### `healthCheckProtocol`<sup>Optional</sup> <a name="healthCheckProtocol" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.healthCheckProtocol"></a>

```typescript
public readonly healthCheckProtocol: Protocol;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.Protocol

---

##### `priority`<sup>Optional</sup> <a name="priority" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.priority"></a>

```typescript
public readonly priority: number;
```

- *Type:* number

---

##### `protocol`<sup>Optional</sup> <a name="protocol" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.protocol"></a>

```typescript
public readonly protocol: ApplicationProtocol;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocol

---

##### `protocolVersion`<sup>Optional</sup> <a name="protocolVersion" id="@smallcase/cdk-vpc-module.TargetGroupConfig.property.protocolVersion"></a>

```typescript
public readonly protocolVersion: ApplicationProtocolVersion;
```

- *Type:* aws-cdk-lib.aws_elasticloadbalancingv2.ApplicationProtocolVersion

---

### VpcEndpointConfig <a name="VpcEndpointConfig" id="@smallcase/cdk-vpc-module.VpcEndpointConfig"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.Initializer"></a>

```typescript
import { VpcEndpointConfig } from '@smallcase/cdk-vpc-module'

const vpcEndpointConfig: VpcEndpointConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.service">service</a></code> | <code>aws-cdk-lib.aws_ec2.InterfaceVpcEndpointAwsService \| aws-cdk-lib.aws_ec2.GatewayVpcEndpointAwsService \| aws-cdk-lib.aws_ec2.InterfaceVpcEndpointService</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.subnetGroupNames">subnetGroupNames</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.additionalTags">additionalTags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.externalSubnets">externalSubnets</a></code> | <code><a href="#@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets">IExternalVPEndpointSubnets</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.iamPolicyStatements">iamPolicyStatements</a></code> | <code>aws-cdk-lib.aws_iam.PolicyStatement[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig.property.securityGroupRules">securityGroupRules</a></code> | <code><a href="#@smallcase/cdk-vpc-module.SecurityGroupRule">SecurityGroupRule</a>[]</code> | *No description.* |

---

##### `name`<sup>Required</sup> <a name="name" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `service`<sup>Required</sup> <a name="service" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.service"></a>

```typescript
public readonly service: InterfaceVpcEndpointAwsService | GatewayVpcEndpointAwsService | InterfaceVpcEndpointService;
```

- *Type:* aws-cdk-lib.aws_ec2.InterfaceVpcEndpointAwsService | aws-cdk-lib.aws_ec2.GatewayVpcEndpointAwsService | aws-cdk-lib.aws_ec2.InterfaceVpcEndpointService

---

##### `subnetGroupNames`<sup>Required</sup> <a name="subnetGroupNames" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.subnetGroupNames"></a>

```typescript
public readonly subnetGroupNames: string[];
```

- *Type:* string[]

---

##### `additionalTags`<sup>Optional</sup> <a name="additionalTags" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.additionalTags"></a>

```typescript
public readonly additionalTags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `externalSubnets`<sup>Optional</sup> <a name="externalSubnets" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.externalSubnets"></a>

```typescript
public readonly externalSubnets: IExternalVPEndpointSubnets[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets">IExternalVPEndpointSubnets</a>[]

---

##### `iamPolicyStatements`<sup>Optional</sup> <a name="iamPolicyStatements" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.iamPolicyStatements"></a>

```typescript
public readonly iamPolicyStatements: PolicyStatement[];
```

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement[]

---

##### `securityGroupRules`<sup>Optional</sup> <a name="securityGroupRules" id="@smallcase/cdk-vpc-module.VpcEndpointConfig.property.securityGroupRules"></a>

```typescript
public readonly securityGroupRules: SecurityGroupRule[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.SecurityGroupRule">SecurityGroupRule</a>[]

---

### VpcEndpontServiceConfig <a name="VpcEndpontServiceConfig" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.Initializer"></a>

```typescript
import { VpcEndpontServiceConfig } from '@smallcase/cdk-vpc-module'

const vpcEndpontServiceConfig: VpcEndpontServiceConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.alb">alb</a></code> | <code><a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig">LoadBalancerConfig</a></code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.name">name</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.nlb">nlb</a></code> | <code><a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig">NetworkLoadBalancerConfig</a></code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.acceptanceRequired">acceptanceRequired</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.additionalTags">additionalTags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.allowedPrincipals">allowedPrincipals</a></code> | <code>string[]</code> | *No description.* |

---

##### `alb`<sup>Required</sup> <a name="alb" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.alb"></a>

```typescript
public readonly alb: LoadBalancerConfig;
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.LoadBalancerConfig">LoadBalancerConfig</a>

---

##### `name`<sup>Required</sup> <a name="name" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---

##### `nlb`<sup>Required</sup> <a name="nlb" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.nlb"></a>

```typescript
public readonly nlb: NetworkLoadBalancerConfig;
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.NetworkLoadBalancerConfig">NetworkLoadBalancerConfig</a>

---

##### `acceptanceRequired`<sup>Optional</sup> <a name="acceptanceRequired" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.acceptanceRequired"></a>

```typescript
public readonly acceptanceRequired: boolean;
```

- *Type:* boolean

---

##### `additionalTags`<sup>Optional</sup> <a name="additionalTags" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.additionalTags"></a>

```typescript
public readonly additionalTags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `allowedPrincipals`<sup>Optional</sup> <a name="allowedPrincipals" id="@smallcase/cdk-vpc-module.VpcEndpontServiceConfig.property.allowedPrincipals"></a>

```typescript
public readonly allowedPrincipals: string[];
```

- *Type:* string[]

---

### VPCProps <a name="VPCProps" id="@smallcase/cdk-vpc-module.VPCProps"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.VPCProps.Initializer"></a>

```typescript
import { VPCProps } from '@smallcase/cdk-vpc-module'

const vPCProps: VPCProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.subnets">subnets</a></code> | <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps">ISubnetsProps</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.VpcProps</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.natEipAllocationIds">natEipAllocationIds</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.peeringConfigs">peeringConfigs</a></code> | <code>{[ key: string ]: <a href="#@smallcase/cdk-vpc-module.PeeringConfig">PeeringConfig</a>}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.vpcEndpoints">vpcEndpoints</a></code> | <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig">VpcEndpointConfig</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.vpcEndpointServices">vpcEndpointServices</a></code> | <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig">VpcEndpontServiceConfig</a>[]</code> | *No description.* |

---

##### `subnets`<sup>Required</sup> <a name="subnets" id="@smallcase/cdk-vpc-module.VPCProps.property.subnets"></a>

```typescript
public readonly subnets: ISubnetsProps[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.ISubnetsProps">ISubnetsProps</a>[]

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@smallcase/cdk-vpc-module.VPCProps.property.vpc"></a>

```typescript
public readonly vpc: VpcProps;
```

- *Type:* aws-cdk-lib.aws_ec2.VpcProps

---

##### `natEipAllocationIds`<sup>Optional</sup> <a name="natEipAllocationIds" id="@smallcase/cdk-vpc-module.VPCProps.property.natEipAllocationIds"></a>

```typescript
public readonly natEipAllocationIds: string[];
```

- *Type:* string[]

---

##### `peeringConfigs`<sup>Optional</sup> <a name="peeringConfigs" id="@smallcase/cdk-vpc-module.VPCProps.property.peeringConfigs"></a>

```typescript
public readonly peeringConfigs: {[ key: string ]: PeeringConfig};
```

- *Type:* {[ key: string ]: <a href="#@smallcase/cdk-vpc-module.PeeringConfig">PeeringConfig</a>}

---

##### `vpcEndpoints`<sup>Optional</sup> <a name="vpcEndpoints" id="@smallcase/cdk-vpc-module.VPCProps.property.vpcEndpoints"></a>

```typescript
public readonly vpcEndpoints: VpcEndpointConfig[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.VpcEndpointConfig">VpcEndpointConfig</a>[]

---

##### `vpcEndpointServices`<sup>Optional</sup> <a name="vpcEndpointServices" id="@smallcase/cdk-vpc-module.VPCProps.property.vpcEndpointServices"></a>

```typescript
public readonly vpcEndpointServices: VpcEndpontServiceConfig[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig">VpcEndpontServiceConfig</a>[]

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IExternalVPEndpointSubnets <a name="IExternalVPEndpointSubnets" id="@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets"></a>

- *Implemented By:* <a href="#@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets">IExternalVPEndpointSubnets</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets.property.availabilityZone">availabilityZone</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets.property.routeTableId">routeTableId</a></code> | <code>string</code> | *No description.* |

---

##### `availabilityZone`<sup>Required</sup> <a name="availabilityZone" id="@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets.property.availabilityZone"></a>

```typescript
public readonly availabilityZone: string;
```

- *Type:* string

---

##### `id`<sup>Required</sup> <a name="id" id="@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `routeTableId`<sup>Required</sup> <a name="routeTableId" id="@smallcase/cdk-vpc-module.IExternalVPEndpointSubnets.property.routeTableId"></a>

```typescript
public readonly routeTableId: string;
```

- *Type:* string

---

### ISubnetsProps <a name="ISubnetsProps" id="@smallcase/cdk-vpc-module.ISubnetsProps"></a>

- *Implemented By:* <a href="#@smallcase/cdk-vpc-module.ISubnetsProps">ISubnetsProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.cidrBlock">cidrBlock</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.subnetGroupName">subnetGroupName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.subnetType">subnetType</a></code> | <code>aws-cdk-lib.aws_ec2.SubnetType</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.egressNetworkACL">egressNetworkACL</a></code> | <code><a href="#@smallcase/cdk-vpc-module.NetworkACL">NetworkACL</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.ingressNetworkACL">ingressNetworkACL</a></code> | <code><a href="#@smallcase/cdk-vpc-module.NetworkACL">NetworkACL</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.routes">routes</a></code> | <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions">AddRouteOptions</a>[]</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.tags">tags</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.useSubnetForNAT">useSubnetForNAT</a></code> | <code>boolean</code> | *No description.* |

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

---

##### `cidrBlock`<sup>Required</sup> <a name="cidrBlock" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.cidrBlock"></a>

```typescript
public readonly cidrBlock: string[];
```

- *Type:* string[]

---

##### `subnetGroupName`<sup>Required</sup> <a name="subnetGroupName" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.subnetGroupName"></a>

```typescript
public readonly subnetGroupName: string;
```

- *Type:* string

---

##### `subnetType`<sup>Required</sup> <a name="subnetType" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.subnetType"></a>

```typescript
public readonly subnetType: SubnetType;
```

- *Type:* aws-cdk-lib.aws_ec2.SubnetType

---

##### `egressNetworkACL`<sup>Optional</sup> <a name="egressNetworkACL" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.egressNetworkACL"></a>

```typescript
public readonly egressNetworkACL: NetworkACL[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.NetworkACL">NetworkACL</a>[]

---

##### `ingressNetworkACL`<sup>Optional</sup> <a name="ingressNetworkACL" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.ingressNetworkACL"></a>

```typescript
public readonly ingressNetworkACL: NetworkACL[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.NetworkACL">NetworkACL</a>[]

---

##### `routes`<sup>Optional</sup> <a name="routes" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.routes"></a>

```typescript
public readonly routes: AddRouteOptions[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.AddRouteOptions">AddRouteOptions</a>[]

---

##### `tags`<sup>Optional</sup> <a name="tags" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.tags"></a>

```typescript
public readonly tags: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `useSubnetForNAT`<sup>Optional</sup> <a name="useSubnetForNAT" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.useSubnetForNAT"></a>

```typescript
public readonly useSubnetForNAT: boolean;
```

- *Type:* boolean

---


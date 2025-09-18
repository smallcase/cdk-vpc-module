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
public createSubnet(option: ISubnetsProps, vpc: Vpc, peeringConnectionId?: PeeringConnectionInternalType, useGlobalNestedStacks?: boolean): Subnet[]
```

###### `option`<sup>Required</sup> <a name="option" id="@smallcase/cdk-vpc-module.Network.createSubnet.parameter.option"></a>

- *Type:* <a href="#@smallcase/cdk-vpc-module.ISubnetsProps">ISubnetsProps</a>

---

###### `vpc`<sup>Required</sup> <a name="vpc" id="@smallcase/cdk-vpc-module.Network.createSubnet.parameter.vpc"></a>

- *Type:* aws-cdk-lib.aws_ec2.Vpc

---

###### `peeringConnectionId`<sup>Optional</sup> <a name="peeringConnectionId" id="@smallcase/cdk-vpc-module.Network.createSubnet.parameter.peeringConnectionId"></a>

- *Type:* <a href="#@smallcase/cdk-vpc-module.PeeringConnectionInternalType">PeeringConnectionInternalType</a>

---

###### `useGlobalNestedStacks`<sup>Optional</sup> <a name="useGlobalNestedStacks" id="@smallcase/cdk-vpc-module.Network.createSubnet.parameter.useGlobalNestedStacks"></a>

- *Type:* boolean

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
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.endpointOutputs">endpointOutputs</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ec2.GatewayVpcEndpoint \| aws-cdk-lib.aws_ec2.InterfaceVpcEndpoint}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.Network.property.natProvider">natProvider</a></code> | <code>aws-cdk-lib.aws_ec2.NatProvider</code> | *No description.* |
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
public readonly endpointOutputs: {[ key: string ]: GatewayVpcEndpoint | InterfaceVpcEndpoint};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ec2.GatewayVpcEndpoint | aws-cdk-lib.aws_ec2.InterfaceVpcEndpoint}

---

##### `natProvider`<sup>Required</sup> <a name="natProvider" id="@smallcase/cdk-vpc-module.Network.property.natProvider"></a>

```typescript
public readonly natProvider: NatProvider;
```

- *Type:* aws-cdk-lib.aws_ec2.NatProvider

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


### VpcEndpointServiceNestedStack <a name="VpcEndpointServiceNestedStack" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack"></a>

#### Initializers <a name="Initializers" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer"></a>

```typescript
import { VpcEndpointServiceNestedStack } from '@smallcase/cdk-vpc-module'

new VpcEndpointServiceNestedStack(scope: Construct, id: string, props: VpcEndpointServiceNestedStackProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer.parameter.props">props</a></code> | <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps">VpcEndpointServiceNestedStackProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.Initializer.parameter.props"></a>

- *Type:* <a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps">VpcEndpointServiceNestedStackProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addDependency">addDependency</a></code> | Add a dependency between this stack and another stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addMetadata">addMetadata</a></code> | Adds an arbitrary key-value pair, with information you want to record about the stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addTransform">addTransform</a></code> | Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportStringListValue">exportStringListValue</a></code> | Create a CloudFormation Export for a string list value. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportValue">exportValue</a></code> | Create a CloudFormation Export for a string value. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.formatArn">formatArn</a></code> | Creates an ARN from components. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.getLogicalId">getLogicalId</a></code> | Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.regionalFact">regionalFact</a></code> | Look up a fact value for the given fact for the region of this stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.renameLogicalId">renameLogicalId</a></code> | Rename a generated logical identities. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.reportMissingContextKey">reportMissingContextKey</a></code> | Indicate that a context key was expected. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.resolve">resolve</a></code> | Resolve a tokenized value in the context of the current stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.splitArn">splitArn</a></code> | Splits the provided ARN into its components. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toJsonString">toJsonString</a></code> | Convert an object, potentially containing tokens, to a JSON string. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toYamlString">toYamlString</a></code> | Convert an object, potentially containing tokens, to a YAML string. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.setParameter">setParameter</a></code> | Assign a value to one of the nested stack parameters. |

---

##### `toString` <a name="toString" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addDependency` <a name="addDependency" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addDependency"></a>

```typescript
public addDependency(target: Stack, reason?: string): void
```

Add a dependency between this stack and another stack.

This can be used to define dependencies between any two stacks within an
app, and also supports nested stacks.

###### `target`<sup>Required</sup> <a name="target" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addDependency.parameter.target"></a>

- *Type:* aws-cdk-lib.Stack

---

###### `reason`<sup>Optional</sup> <a name="reason" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addDependency.parameter.reason"></a>

- *Type:* string

---

##### `addMetadata` <a name="addMetadata" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addMetadata"></a>

```typescript
public addMetadata(key: string, value: any): void
```

Adds an arbitrary key-value pair, with information you want to record about the stack.

These get translated to the Metadata section of the generated template.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/metadata-section-structure.html)

###### `key`<sup>Required</sup> <a name="key" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addMetadata.parameter.key"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addMetadata.parameter.value"></a>

- *Type:* any

---

##### `addTransform` <a name="addTransform" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addTransform"></a>

```typescript
public addTransform(transform: string): void
```

Add a Transform to this stack. A Transform is a macro that AWS CloudFormation uses to process your template.

Duplicate values are removed when stack is synthesized.

> [https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-section-structure.html)

*Example*

```typescript
declare const stack: Stack;

stack.addTransform('AWS::Serverless-2016-10-31')
```


###### `transform`<sup>Required</sup> <a name="transform" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.addTransform.parameter.transform"></a>

- *Type:* string

The transform to add.

---

##### `exportStringListValue` <a name="exportStringListValue" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportStringListValue"></a>

```typescript
public exportStringListValue(exportedValue: any, options?: ExportValueOptions): string[]
```

Create a CloudFormation Export for a string list value.

Returns a string list representing the corresponding `Fn.importValue()`
expression for this Export. The export expression is automatically wrapped with an
`Fn::Join` and the import value with an `Fn::Split`, since CloudFormation can only
export strings. You can control the name for the export by passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

See `exportValue` for an example of this process.

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportStringListValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportStringListValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `exportValue` <a name="exportValue" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportValue"></a>

```typescript
public exportValue(exportedValue: any, options?: ExportValueOptions): string
```

Create a CloudFormation Export for a string value.

Returns a string representing the corresponding `Fn.importValue()`
expression for this Export. You can control the name for the export by
passing the `name` option.

If you don't supply a value for `name`, the value you're exporting must be
a Resource attribute (for example: `bucket.bucketName`) and it will be
given the same name as the automatic cross-stack reference that would be created
if you used the attribute in another Stack.

One of the uses for this method is to *remove* the relationship between
two Stacks established by automatic cross-stack references. It will
temporarily ensure that the CloudFormation Export still exists while you
remove the reference from the consuming stack. After that, you can remove
the resource and the manual export.

Here is how the process works. Let's say there are two stacks,
`producerStack` and `consumerStack`, and `producerStack` has a bucket
called `bucket`, which is referenced by `consumerStack` (perhaps because
an AWS Lambda Function writes into it, or something like that).

It is not safe to remove `producerStack.bucket` because as the bucket is being
deleted, `consumerStack` might still be using it.

Instead, the process takes two deployments:

**Deployment 1: break the relationship**:

- Make sure `consumerStack` no longer references `bucket.bucketName` (maybe the consumer
  stack now uses its own bucket, or it writes to an AWS DynamoDB table, or maybe you just
  remove the Lambda Function altogether).
- In the `ProducerStack` class, call `this.exportValue(this.bucket.bucketName)`. This
  will make sure the CloudFormation Export continues to exist while the relationship
  between the two stacks is being broken.
- Deploy (this will effectively only change the `consumerStack`, but it's safe to deploy both).

**Deployment 2: remove the bucket resource**:

- You are now free to remove the `bucket` resource from `producerStack`.
- Don't forget to remove the `exportValue()` call as well.
- Deploy again (this time only the `producerStack` will be changed -- the bucket will be deleted).

###### `exportedValue`<sup>Required</sup> <a name="exportedValue" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportValue.parameter.exportedValue"></a>

- *Type:* any

---

###### `options`<sup>Optional</sup> <a name="options" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.exportValue.parameter.options"></a>

- *Type:* aws-cdk-lib.ExportValueOptions

---

##### `formatArn` <a name="formatArn" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.formatArn"></a>

```typescript
public formatArn(components: ArnComponents): string
```

Creates an ARN from components.

If `partition`, `region` or `account` are not specified, the stack's
partition, region and account will be used.

If any component is the empty string, an empty string will be inserted
into the generated ARN at the location that component corresponds to.

The ARN will be formatted as follows:

  arn:{partition}:{service}:{region}:{account}:{resource}{sep}{resource-name}

The required ARN pieces that are omitted will be taken from the stack that
the 'scope' is attached to. If all ARN pieces are supplied, the supplied scope
can be 'undefined'.

###### `components`<sup>Required</sup> <a name="components" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.formatArn.parameter.components"></a>

- *Type:* aws-cdk-lib.ArnComponents

---

##### `getLogicalId` <a name="getLogicalId" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.getLogicalId"></a>

```typescript
public getLogicalId(element: CfnElement): string
```

Allocates a stack-unique CloudFormation-compatible logical identity for a specific resource.

This method is called when a `CfnElement` is created and used to render the
initial logical identity of resources. Logical ID renames are applied at
this stage.

This method uses the protected method `allocateLogicalId` to render the
logical ID for an element. To modify the naming scheme, extend the `Stack`
class and override this method.

###### `element`<sup>Required</sup> <a name="element" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.getLogicalId.parameter.element"></a>

- *Type:* aws-cdk-lib.CfnElement

The CloudFormation element for which a logical identity is needed.

---

##### `regionalFact` <a name="regionalFact" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.regionalFact"></a>

```typescript
public regionalFact(factName: string, defaultValue?: string): string
```

Look up a fact value for the given fact for the region of this stack.

Will return a definite value only if the region of the current stack is resolved.
If not, a lookup map will be added to the stack and the lookup will be done at
CDK deployment time.

What regions will be included in the lookup map is controlled by the
`@aws-cdk/core:target-partitions` context value: it must be set to a list
of partitions, and only regions from the given partitions will be included.
If no such context key is set, all regions will be included.

This function is intended to be used by construct library authors. Application
builders can rely on the abstractions offered by construct libraries and do
not have to worry about regional facts.

If `defaultValue` is not given, it is an error if the fact is unknown for
the given region.

###### `factName`<sup>Required</sup> <a name="factName" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.regionalFact.parameter.factName"></a>

- *Type:* string

---

###### `defaultValue`<sup>Optional</sup> <a name="defaultValue" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.regionalFact.parameter.defaultValue"></a>

- *Type:* string

---

##### `renameLogicalId` <a name="renameLogicalId" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.renameLogicalId"></a>

```typescript
public renameLogicalId(oldId: string, newId: string): void
```

Rename a generated logical identities.

To modify the naming scheme strategy, extend the `Stack` class and
override the `allocateLogicalId` method.

###### `oldId`<sup>Required</sup> <a name="oldId" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.renameLogicalId.parameter.oldId"></a>

- *Type:* string

---

###### `newId`<sup>Required</sup> <a name="newId" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.renameLogicalId.parameter.newId"></a>

- *Type:* string

---

##### `reportMissingContextKey` <a name="reportMissingContextKey" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.reportMissingContextKey"></a>

```typescript
public reportMissingContextKey(report: MissingContext): void
```

Indicate that a context key was expected.

Contains instructions which will be emitted into the cloud assembly on how
the key should be supplied.

###### `report`<sup>Required</sup> <a name="report" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.reportMissingContextKey.parameter.report"></a>

- *Type:* aws-cdk-lib.cloud_assembly_schema.MissingContext

The set of parameters needed to obtain the context.

---

##### `resolve` <a name="resolve" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.resolve"></a>

```typescript
public resolve(obj: any): any
```

Resolve a tokenized value in the context of the current stack.

###### `obj`<sup>Required</sup> <a name="obj" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.resolve.parameter.obj"></a>

- *Type:* any

---

##### `splitArn` <a name="splitArn" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.splitArn"></a>

```typescript
public splitArn(arn: string, arnFormat: ArnFormat): ArnComponents
```

Splits the provided ARN into its components.

Works both if 'arn' is a string like 'arn:aws:s3:::bucket',
and a Token representing a dynamic CloudFormation expression
(in which case the returned components will also be dynamic CloudFormation expressions,
encoded as Tokens).

###### `arn`<sup>Required</sup> <a name="arn" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.splitArn.parameter.arn"></a>

- *Type:* string

the ARN to split into its components.

---

###### `arnFormat`<sup>Required</sup> <a name="arnFormat" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.splitArn.parameter.arnFormat"></a>

- *Type:* aws-cdk-lib.ArnFormat

the expected format of 'arn' - depends on what format the service 'arn' represents uses.

---

##### `toJsonString` <a name="toJsonString" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toJsonString"></a>

```typescript
public toJsonString(obj: any, space?: number): string
```

Convert an object, potentially containing tokens, to a JSON string.

###### `obj`<sup>Required</sup> <a name="obj" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toJsonString.parameter.obj"></a>

- *Type:* any

---

###### `space`<sup>Optional</sup> <a name="space" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toJsonString.parameter.space"></a>

- *Type:* number

---

##### `toYamlString` <a name="toYamlString" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toYamlString"></a>

```typescript
public toYamlString(obj: any): string
```

Convert an object, potentially containing tokens, to a YAML string.

###### `obj`<sup>Required</sup> <a name="obj" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.toYamlString.parameter.obj"></a>

- *Type:* any

---

##### `setParameter` <a name="setParameter" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.setParameter"></a>

```typescript
public setParameter(name: string, value: string): void
```

Assign a value to one of the nested stack parameters.

###### `name`<sup>Required</sup> <a name="name" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.setParameter.parameter.name"></a>

- *Type:* string

The parameter name (ID).

---

###### `value`<sup>Required</sup> <a name="value" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.setParameter.parameter.value"></a>

- *Type:* string

The value to assign.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isStack">isStack</a></code> | Return whether the given object is a Stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.of">of</a></code> | Looks up the first stack scope in which `construct` is defined. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isNestedStack">isNestedStack</a></code> | Checks if `x` is an object of type `NestedStack`. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isConstruct"></a>

```typescript
import { VpcEndpointServiceNestedStack } from '@smallcase/cdk-vpc-module'

VpcEndpointServiceNestedStack.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isStack` <a name="isStack" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isStack"></a>

```typescript
import { VpcEndpointServiceNestedStack } from '@smallcase/cdk-vpc-module'

VpcEndpointServiceNestedStack.isStack(x: any)
```

Return whether the given object is a Stack.

We do attribute detection since we can't reliably use 'instanceof'.

###### `x`<sup>Required</sup> <a name="x" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isStack.parameter.x"></a>

- *Type:* any

---

##### `of` <a name="of" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.of"></a>

```typescript
import { VpcEndpointServiceNestedStack } from '@smallcase/cdk-vpc-module'

VpcEndpointServiceNestedStack.of(construct: IConstruct)
```

Looks up the first stack scope in which `construct` is defined.

Fails if there is no stack up the tree.

###### `construct`<sup>Required</sup> <a name="construct" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.of.parameter.construct"></a>

- *Type:* constructs.IConstruct

The construct to start the search from.

---

##### `isNestedStack` <a name="isNestedStack" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isNestedStack"></a>

```typescript
import { VpcEndpointServiceNestedStack } from '@smallcase/cdk-vpc-module'

VpcEndpointServiceNestedStack.isNestedStack(x: any)
```

Checks if `x` is an object of type `NestedStack`.

###### `x`<sup>Required</sup> <a name="x" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.isNestedStack.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.account">account</a></code> | <code>string</code> | The AWS account into which this stack will be deployed. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.artifactId">artifactId</a></code> | <code>string</code> | The ID of the cloud assembly artifact for this stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.availabilityZones">availabilityZones</a></code> | <code>string[]</code> | Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.bundlingRequired">bundlingRequired</a></code> | <code>boolean</code> | Indicates whether the stack requires bundling or not. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.dependencies">dependencies</a></code> | <code>aws-cdk-lib.Stack[]</code> | Return the stacks this stack depends on. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.environment">environment</a></code> | <code>string</code> | The environment coordinates in which this stack is deployed. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.nested">nested</a></code> | <code>boolean</code> | Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | Returns the list of notification Amazon Resource Names (ARNs) for the current stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.partition">partition</a></code> | <code>string</code> | The partition in which this stack is defined. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.region">region</a></code> | <code>string</code> | The AWS region into which this stack will be deployed (e.g. `us-west-2`). |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.stackId">stackId</a></code> | <code>string</code> | An attribute that represents the ID of the stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.stackName">stackName</a></code> | <code>string</code> | An attribute that represents the name of the nested stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.synthesizer">synthesizer</a></code> | <code>aws-cdk-lib.IStackSynthesizer</code> | Synthesis method for this stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.tags">tags</a></code> | <code>aws-cdk-lib.TagManager</code> | Tags to be applied to the stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.templateFile">templateFile</a></code> | <code>string</code> | The name of the CloudFormation template file emitted to the output directory during synthesis. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.templateOptions">templateOptions</a></code> | <code>aws-cdk-lib.ITemplateOptions</code> | Options for CloudFormation template (like version, transform, description). |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.urlSuffix">urlSuffix</a></code> | <code>string</code> | The Amazon domain suffix for the region in which this stack is defined. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.nestedStackParent">nestedStackParent</a></code> | <code>aws-cdk-lib.Stack</code> | If this is a nested stack, returns it's parent stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.nestedStackResource">nestedStackResource</a></code> | <code>aws-cdk-lib.CfnResource</code> | If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.terminationProtection">terminationProtection</a></code> | <code>boolean</code> | Whether termination protection is enabled for this stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `account`<sup>Required</sup> <a name="account" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.account"></a>

```typescript
public readonly account: string;
```

- *Type:* string

The AWS account into which this stack will be deployed.

This value is resolved according to the following rules:

1. The value provided to `env.account` when the stack is defined. This can
   either be a concrete account (e.g. `585695031111`) or the
   `Aws.ACCOUNT_ID` token.
3. `Aws.ACCOUNT_ID`, which represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::AccountId" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.account)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **account-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `artifactId`<sup>Required</sup> <a name="artifactId" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.artifactId"></a>

```typescript
public readonly artifactId: string;
```

- *Type:* string

The ID of the cloud assembly artifact for this stack.

---

##### `availabilityZones`<sup>Required</sup> <a name="availabilityZones" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.availabilityZones"></a>

```typescript
public readonly availabilityZones: string[];
```

- *Type:* string[]

Returns the list of AZs that are available in the AWS environment (account/region) associated with this stack.

If the stack is environment-agnostic (either account and/or region are
tokens), this property will return an array with 2 tokens that will resolve
at deploy-time to the first two availability zones returned from CloudFormation's
`Fn::GetAZs` intrinsic function.

If they are not available in the context, returns a set of dummy values and
reports them as missing, and let the CLI resolve them by calling EC2
`DescribeAvailabilityZones` on the target environment.

To specify a different strategy for selecting availability zones override this method.

---

##### `bundlingRequired`<sup>Required</sup> <a name="bundlingRequired" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.bundlingRequired"></a>

```typescript
public readonly bundlingRequired: boolean;
```

- *Type:* boolean

Indicates whether the stack requires bundling or not.

---

##### `dependencies`<sup>Required</sup> <a name="dependencies" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.dependencies"></a>

```typescript
public readonly dependencies: Stack[];
```

- *Type:* aws-cdk-lib.Stack[]

Return the stacks this stack depends on.

---

##### `environment`<sup>Required</sup> <a name="environment" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.environment"></a>

```typescript
public readonly environment: string;
```

- *Type:* string

The environment coordinates in which this stack is deployed.

In the form
`aws://account/region`. Use `stack.account` and `stack.region` to obtain
the specific values, no need to parse.

You can use this value to determine if two stacks are targeting the same
environment.

If either `stack.account` or `stack.region` are not concrete values (e.g.
`Aws.ACCOUNT_ID` or `Aws.REGION`) the special strings `unknown-account` and/or
`unknown-region` will be used respectively to indicate this stack is
region/account-agnostic.

---

##### `nested`<sup>Required</sup> <a name="nested" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.nested"></a>

```typescript
public readonly nested: boolean;
```

- *Type:* boolean

Indicates if this is a nested stack, in which case `parentStack` will include a reference to it's parent.

---

##### `notificationArns`<sup>Required</sup> <a name="notificationArns" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]

Returns the list of notification Amazon Resource Names (ARNs) for the current stack.

---

##### `partition`<sup>Required</sup> <a name="partition" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.partition"></a>

```typescript
public readonly partition: string;
```

- *Type:* string

The partition in which this stack is defined.

---

##### `region`<sup>Required</sup> <a name="region" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The AWS region into which this stack will be deployed (e.g. `us-west-2`).

This value is resolved according to the following rules:

1. The value provided to `env.region` when the stack is defined. This can
   either be a concrete region (e.g. `us-west-2`) or the `Aws.REGION`
   token.
3. `Aws.REGION`, which is represents the CloudFormation intrinsic reference
   `{ "Ref": "AWS::Region" }` encoded as a string token.

Preferably, you should use the return value as an opaque string and not
attempt to parse it to implement your logic. If you do, you must first
check that it is a concrete value an not an unresolved token. If this
value is an unresolved token (`Token.isUnresolved(stack.region)` returns
`true`), this implies that the user wishes that this stack will synthesize
into a **region-agnostic template**. In this case, your code should either
fail (throw an error, emit a synth error using `Annotations.of(construct).addError()`) or
implement some other region-agnostic behavior.

---

##### `stackId`<sup>Required</sup> <a name="stackId" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.stackId"></a>

```typescript
public readonly stackId: string;
```

- *Type:* string

An attribute that represents the ID of the stack.

This is a context aware attribute:
- If this is referenced from the parent stack, it will return `{ "Ref": "LogicalIdOfNestedStackResource" }`.
- If this is referenced from the context of the nested stack, it will return `{ "Ref": "AWS::StackId" }`

Example value: `arn:aws:cloudformation:us-east-2:123456789012:stack/mystack-mynestedstack-sggfrhxhum7w/f449b250-b969-11e0-a185-5081d0136786`

---

##### `stackName`<sup>Required</sup> <a name="stackName" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.stackName"></a>

```typescript
public readonly stackName: string;
```

- *Type:* string

An attribute that represents the name of the nested stack.

This is a context aware attribute:
- If this is referenced from the parent stack, it will return a token that parses the name from the stack ID.
- If this is referenced from the context of the nested stack, it will return `{ "Ref": "AWS::StackName" }`

Example value: `mystack-mynestedstack-sggfrhxhum7w`

---

##### `synthesizer`<sup>Required</sup> <a name="synthesizer" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.synthesizer"></a>

```typescript
public readonly synthesizer: IStackSynthesizer;
```

- *Type:* aws-cdk-lib.IStackSynthesizer

Synthesis method for this stack.

---

##### `tags`<sup>Required</sup> <a name="tags" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.tags"></a>

```typescript
public readonly tags: TagManager;
```

- *Type:* aws-cdk-lib.TagManager

Tags to be applied to the stack.

---

##### `templateFile`<sup>Required</sup> <a name="templateFile" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.templateFile"></a>

```typescript
public readonly templateFile: string;
```

- *Type:* string

The name of the CloudFormation template file emitted to the output directory during synthesis.

Example value: `MyStack.template.json`

---

##### `templateOptions`<sup>Required</sup> <a name="templateOptions" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.templateOptions"></a>

```typescript
public readonly templateOptions: ITemplateOptions;
```

- *Type:* aws-cdk-lib.ITemplateOptions

Options for CloudFormation template (like version, transform, description).

---

##### `urlSuffix`<sup>Required</sup> <a name="urlSuffix" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.urlSuffix"></a>

```typescript
public readonly urlSuffix: string;
```

- *Type:* string

The Amazon domain suffix for the region in which this stack is defined.

---

##### `nestedStackParent`<sup>Optional</sup> <a name="nestedStackParent" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.nestedStackParent"></a>

```typescript
public readonly nestedStackParent: Stack;
```

- *Type:* aws-cdk-lib.Stack

If this is a nested stack, returns it's parent stack.

---

##### `nestedStackResource`<sup>Optional</sup> <a name="nestedStackResource" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.nestedStackResource"></a>

```typescript
public readonly nestedStackResource: CfnResource;
```

- *Type:* aws-cdk-lib.CfnResource

If this is a nested stack, this represents its `AWS::CloudFormation::Stack` resource.

`undefined` for top-level (non-nested) stacks.

---

##### `terminationProtection`<sup>Required</sup> <a name="terminationProtection" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStack.property.terminationProtection"></a>

```typescript
public readonly terminationProtection: boolean;
```

- *Type:* boolean

Whether termination protection is enabled for this stack.

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
| <code><a href="#@smallcase/cdk-vpc-module.AddRouteOptions.property.routeName">routeName</a></code> | <code>string</code> | *No description.* |
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

##### `routeName`<sup>Optional</sup> <a name="routeName" id="@smallcase/cdk-vpc-module.AddRouteOptions.property.routeName"></a>

```typescript
public readonly routeName: string;
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

### VpcEndpointServiceNestedStackProps <a name="VpcEndpointServiceNestedStackProps" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps"></a>

#### Initializer <a name="Initializer" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.Initializer"></a>

```typescript
import { VpcEndpointServiceNestedStackProps } from '@smallcase/cdk-vpc-module'

const vpcEndpointServiceNestedStackProps: VpcEndpointServiceNestedStackProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.description">description</a></code> | <code>string</code> | A description of the stack. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.notificationArns">notificationArns</a></code> | <code>string[]</code> | The Simple Notification Service (SNS) topics to publish stack related events. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.parameters">parameters</a></code> | <code>{[ key: string ]: string}</code> | The set value pairs that represent the parameters passed to CloudFormation when this nested stack is created. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Policy to apply when the nested stack is removed. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The length of time that CloudFormation waits for the nested stack to reach the CREATE_COMPLETE state. |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.subnets">subnets</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_ec2.Subnet[]}</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.Vpc</code> | *No description.* |
| <code><a href="#@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.vpcEndpointServiceConfigs">vpcEndpointServiceConfigs</a></code> | <code><a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig">VpcEndpontServiceConfig</a>[]</code> | *No description.* |

---

##### `description`<sup>Optional</sup> <a name="description" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the stack.

---

##### `notificationArns`<sup>Optional</sup> <a name="notificationArns" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.notificationArns"></a>

```typescript
public readonly notificationArns: string[];
```

- *Type:* string[]
- *Default:* notifications are not sent for this stack.

The Simple Notification Service (SNS) topics to publish stack related events.

---

##### `parameters`<sup>Optional</sup> <a name="parameters" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.parameters"></a>

```typescript
public readonly parameters: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}
- *Default:* no user-defined parameters are passed to the nested stack

The set value pairs that represent the parameters passed to CloudFormation when this nested stack is created.

Each parameter has a name corresponding
to a parameter defined in the embedded template and a value representing
the value that you want to set for the parameter.

The nested stack construct will automatically synthesize parameters in order
to bind references from the parent stack(s) into the nested stack.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy
- *Default:* RemovalPolicy.DESTROY

Policy to apply when the nested stack is removed.

The default is `Destroy`, because all Removal Policies of resources inside the
Nested Stack should already have been set correctly. You normally should
not need to set this value.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* no timeout

The length of time that CloudFormation waits for the nested stack to reach the CREATE_COMPLETE state.

When CloudFormation detects that the nested stack has reached the
CREATE_COMPLETE state, it marks the nested stack resource as
CREATE_COMPLETE in the parent stack and resumes creating the parent stack.
If the timeout period expires before the nested stack reaches
CREATE_COMPLETE, CloudFormation marks the nested stack as failed and rolls
back both the nested stack and parent stack.

---

##### `subnets`<sup>Required</sup> <a name="subnets" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.subnets"></a>

```typescript
public readonly subnets: {[ key: string ]: Subnet[]};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_ec2.Subnet[]}

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.vpc"></a>

```typescript
public readonly vpc: Vpc;
```

- *Type:* aws-cdk-lib.aws_ec2.Vpc

---

##### `vpcEndpointServiceConfigs`<sup>Required</sup> <a name="vpcEndpointServiceConfigs" id="@smallcase/cdk-vpc-module.VpcEndpointServiceNestedStackProps.property.vpcEndpointServiceConfigs"></a>

```typescript
public readonly vpcEndpointServiceConfigs: VpcEndpontServiceConfig[];
```

- *Type:* <a href="#@smallcase/cdk-vpc-module.VpcEndpontServiceConfig">VpcEndpontServiceConfig</a>[]

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
| <code><a href="#@smallcase/cdk-vpc-module.VPCProps.property.useNestedStacks">useNestedStacks</a></code> | <code>boolean</code> | *No description.* |
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

##### `useNestedStacks`<sup>Optional</sup> <a name="useNestedStacks" id="@smallcase/cdk-vpc-module.VPCProps.property.useNestedStacks"></a>

```typescript
public readonly useNestedStacks: boolean;
```

- *Type:* boolean

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
| <code><a href="#@smallcase/cdk-vpc-module.ISubnetsProps.property.useNestedStacks">useNestedStacks</a></code> | <code>boolean</code> | *No description.* |
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

##### `useNestedStacks`<sup>Optional</sup> <a name="useNestedStacks" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.useNestedStacks"></a>

```typescript
public readonly useNestedStacks: boolean;
```

- *Type:* boolean

---

##### `useSubnetForNAT`<sup>Optional</sup> <a name="useSubnetForNAT" id="@smallcase/cdk-vpc-module.ISubnetsProps.property.useSubnetForNAT"></a>

```typescript
public readonly useSubnetForNAT: boolean;
```

- *Type:* boolean

---


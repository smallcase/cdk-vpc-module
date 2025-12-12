## Changelog

All notable changes to this project will be documented in this file.

### [0.0.21]

#### Added
- **Configurable route table entry naming for subnet routes**
  - Added `routeTableStringFormat` to `ISubnetsProps` to control the logical ID format for routes created via `subnet.addRoute`.
  - When `routeTableStringFormat` is `true`, route logical IDs follow the descriptive format `${subnetGroupName}-${routeName-or-sanitized-destinationCidrBlock}-Route`.
  - When `routeTableStringFormat` is `false` or unset, the previous `${subnetGroupName}${routeIndex}RouteEntry` naming is preserved for backwards compatibility.


### [0.0.22]

#### Added
- **Global nested subnet stacks configuration**
  - Added a global `useNestedStacks` option to `VPCProps` to create subnets via `SubnetStack` by default.
  - Updated `Network.createSubnet` (`src/constructs/network.ts`) to choose between nested (`SubnetStack`) and inline subnet/NACL/route creation based on this flag.
  - A per-subnet `useNestedStacks` value in `ISubnetsProps` overrides the global setting, allowing fine-grained control per subnet group.
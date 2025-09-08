import { NestedStack, NestedStackProps, CfnOutput, Tags, aws_iam as iam, aws_ec2 as ec2 } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { Construct } from 'constructs';
import { SecurityGroupRule } from './network';

export interface VpcEndpontServiceConfig {
  readonly name: string;
  readonly alb: LoadBalancerConfig;
  readonly nlb: NetworkLoadBalancerConfig;
  readonly allowedPrincipals?: string[];
  readonly acceptanceRequired?: boolean;
  readonly additionalTags?: { [key: string]: string };
}

export interface LoadBalancerConfig {
  readonly existingArn?: string;
  readonly existingSecurityGroupId?: string;
  readonly subnetGroupName?: string;
  readonly internetFacing?: boolean;
  readonly targetGroups?: TargetGroupConfig[];
  readonly certificates?: string[];
  readonly securityGroupRules?: SecurityGroupRule[];
}

export interface NetworkLoadBalancerConfig {
  readonly subnetGroupName: string;
  readonly securityGroupRules: SecurityGroupRule[];
  readonly existingSecurityGroupId?: string;
  readonly certificates?: string[];
  readonly internetFacing?: boolean;
}

export interface TargetGroupConfig {
  readonly host: string;
  readonly applicationPort: number;
  readonly healthCheckPath?: string;
  readonly healthCheckProtocol?: elbv2.Protocol;
  readonly protocolVersion?: elbv2.ApplicationProtocolVersion;
  readonly protocol?: elbv2.ApplicationProtocol;
  readonly healthCheckPort?: number;
  readonly priority?: number;
}

export interface VpcEndpointServiceNestedStackProps extends NestedStackProps {
  readonly vpc: ec2.Vpc;
  readonly vpcEndpointServiceConfigs: VpcEndpontServiceConfig[];
  readonly subnets: { [key: string]: ec2.Subnet[] };
}

export class VpcEndpointServiceNestedStack extends NestedStack {
  constructor(scope: Construct, id: string, props: VpcEndpointServiceNestedStackProps) {
    super(scope, id, props);

    // Create VPC endpoint services
    for (const vpcEndpointServiceConfig of props.vpcEndpointServiceConfigs) {
      this.addVpcEndpointService(vpcEndpointServiceConfig, props.vpc, props.subnets);
    }
  }

  private addVpcEndpointService(vpceServiceConfig: VpcEndpontServiceConfig, vpc: ec2.Vpc, subnets: { [key: string]: ec2.Subnet[] }) {
    const { alb, name, nlb, allowedPrincipals, acceptanceRequired, additionalTags } = vpceServiceConfig;
    let ALB: elbv2.ApplicationLoadBalancer;
    let NLB: elbv2.NetworkLoadBalancer;
    let vpcEndpointService: ec2.VpcEndpointService;
    let nlbTargetGroups: elbv2.INetworkTargetGroup[] = [];
    let albListeners: string[];
    let albListener: elbv2.IApplicationListener;
    let albOutputArn: string | undefined;
    let nlbOutputArn: string | undefined;

    const albVpcSubnets = alb.subnetGroupName
      ? this.mergeSubnetsByGroupNames(ec2.InterfaceVpcEndpointService, [alb.subnetGroupName], subnets)
      : undefined;

    const nlbSecurityGroup = this.createOrExistingSGWithRules('NLB', nlb.existingSecurityGroupId, nlb.securityGroupRules, name, vpc);
    const albSecurityGroup = this.createOrExistingSGWithRules('ALB', alb.existingSecurityGroupId, alb.securityGroupRules, name, vpc);
    albSecurityGroup.addIngressRule(nlbSecurityGroup, ec2.Port.HTTPS, 'allowNLBTraffic443');
    albSecurityGroup.addIngressRule(nlbSecurityGroup, ec2.Port.HTTP, 'allowNLBTraffic80');

    const nlbVpcSubnets = nlb.subnetGroupName
      ? this.mergeSubnetsByGroupNames(ec2.InterfaceVpcEndpointService, [nlb.subnetGroupName], subnets)
      : undefined;

    if (alb.existingArn == undefined) {
      ALB = new elbv2.ApplicationLoadBalancer(this, `${name}alb`, {
        vpc: vpc,
        internetFacing: alb?.internetFacing ? alb?.internetFacing : false,
        vpcSubnets: albVpcSubnets,
        securityGroup: albSecurityGroup,
      });
      const nlbTargetGroup = new elbv2.NetworkTargetGroup(this, `NLBTargetGroup${name}`, {
        port: 443,
        vpc: vpc,
        protocol: elbv2.Protocol.TCP,
        targets: [new targets.AlbArnTarget(ALB.loadBalancerArn, 443)],
      });
      nlbTargetGroups.push(nlbTargetGroup);
      albListener = ALB.addListener(`${name}-443-ALBListener`, {
        port: 443,
        certificates: alb.certificates ? alb.certificates.map((certiArn, index) => {
          return acm.Certificate.fromCertificateArn(this, `${name}-importAlbCert-${index}`, certiArn);
        }) : undefined,
        defaultAction: elbv2.ListenerAction.fixedResponse(503, {
          contentType: 'text/plain',
          messageBody: 'Service is temporarily unavailable.',
        }),
      });
      ALB.addListener(`${name}-HttpListener`, {
        port: 80,
        defaultAction: elbv2.ListenerAction.redirect({
          port: '443',
          protocol: elbv2.ApplicationProtocol.HTTPS,
          permanent: true,
        }),
      });
      albOutputArn = ALB.loadBalancerArn;
    } else {
      const nlbTargetGroup = new elbv2.NetworkTargetGroup(this, `NLBTargetGroup${name}`, {
        port: 443,
        vpc: vpc,
        protocol: elbv2.Protocol.TCP,
        targets: [new targets.AlbArnTarget(alb.existingArn, 443)],
      });
      nlbTargetGroups.push(nlbTargetGroup);
      albListeners = this.getLoadBalancerListener(alb.existingArn, true, name);
      albOutputArn = alb.existingArn;
    }

    NLB = new elbv2.NetworkLoadBalancer(this, `${name}nlb`, {
      vpc: vpc,
      vpcSubnets: nlbVpcSubnets,
      internetFacing: nlb.internetFacing ? nlb.internetFacing : false,
      securityGroups: [nlbSecurityGroup!],
    });

    if (nlb.certificates != undefined) {
      const certificates: acm.ICertificate[] = nlb.certificates.map((certiArn, index) => {
        return acm.Certificate.fromCertificateArn(this, `${name}-importNlbCert-${index}`, certiArn);
      });
      NLB.addListener(`${name}NLB443Listener`, {
        port: 443,
        certificates,
        protocol: elbv2.Protocol.HTTPS,
        defaultTargetGroups: nlbTargetGroups,
      });
      NLB.addListener(`${name}NLB80Listener`, {
        port: 80,
        protocol: elbv2.Protocol.HTTP,
        defaultTargetGroups: nlbTargetGroups,
      });
    } else {
      NLB.addListener(`${name}NLB443Listener`, {
        port: 443,
        protocol: elbv2.Protocol.TCP,
        defaultTargetGroups: nlbTargetGroups,
      });
      NLB.addListener(`${name}NLB80Listener`, {
        port: 80,
        protocol: elbv2.Protocol.TCP,
        defaultTargetGroups: nlbTargetGroups,
      });
    }

    vpcEndpointService = new ec2.VpcEndpointService(this, `${name}EndpointService`, {
      vpcEndpointServiceLoadBalancers: [NLB],
      acceptanceRequired: acceptanceRequired,
      allowedPrincipals: allowedPrincipals?.map((principal) => new iam.ArnPrincipal(principal)),
      contributorInsights: false,
    });
    nlbOutputArn = NLB.loadBalancerArn;
    this.createVPCEndpointServiceOutputs(vpcEndpointService, name, nlbOutputArn, albOutputArn);

    if (additionalTags) {
      Tags.of(vpcEndpointService).add('Name', name);
      Object.entries(additionalTags).forEach(([key, value]) => {
        Tags.of(vpcEndpointService).add(key, value);
      });
    }

    if (alb.targetGroups) {
      alb.targetGroups.forEach((tgConfig, index) => {
        const albTargetGroup = new elbv2.ApplicationTargetGroup(this, `${name}-AlbTargetGroup-${index}`, {
          vpc: vpc,
          protocolVersion: tgConfig.protocolVersion ? tgConfig.protocolVersion : elbv2.ApplicationProtocolVersion.HTTP1,
          protocol: tgConfig.protocol ? tgConfig.protocol : elbv2.ApplicationProtocol.HTTP,
          targetType: elbv2.TargetType.IP,
          port: tgConfig.applicationPort,
          healthCheck: {
            path: tgConfig.healthCheckPath,
            protocol: tgConfig.healthCheckProtocol ? tgConfig.healthCheckProtocol : elbv2.Protocol.HTTP,
            port: tgConfig.healthCheckPort ? `${tgConfig.healthCheckPort}` : `${tgConfig.applicationPort}`,
          },
        });
        if (alb.existingArn) {
          new elbv2.CfnListenerRule(this, `${name}-http-rule-${index}`, {
            listenerArn: albListeners[0],
            actions: [
              {
                type: 'forward',
                targetGroupArn: albTargetGroup.targetGroupArn,
              },
            ],
            conditions: [
              {
                field: 'host-header',
                hostHeaderConfig: {
                  values: [tgConfig.host],
                },
              },
            ],
            priority: tgConfig.priority ? tgConfig.priority : (index + 1),
          });
        } else {
          if (albListener != undefined) {
            albListener.addAction(`${name}-albAction-${index}`, {
              conditions: [
                elbv2.ListenerCondition.hostHeaders([tgConfig.host]),
              ],
              action: elbv2.ListenerAction.forward([albTargetGroup]),
              priority: tgConfig.priority ? tgConfig.priority : (index + 1),
            });
          }
        }
      });
    }
  }

  private createVPCEndpointServiceOutputs(
    vpcEndpointService: ec2.VpcEndpointService,
    name: string,
    nlb?: string,
    alb?: string,
  ) {
    new CfnOutput(this, `${name}VpcEndpointServiceName`, {
      value: vpcEndpointService.vpcEndpointServiceName,
      description: 'The name of the VPC Endpoint Service.',
    });
    if (alb != undefined) {
      new CfnOutput(this, `${name}AlbArn`, {
        value: alb,
        description: 'The ALB ARN of the Application Load Balancer.',
      });
    }

    if (nlb != undefined) {
      new CfnOutput(this, `${name}NlbArn`, {
        value: nlb,
        description: 'The NLB ARN of the Network Load Balancer.',
      });
    }
  }

  private getLoadBalancerListener(loadBalancerArn: string, sslEnabled: boolean, name: string) {
    const listeners = [];

    if (!sslEnabled) {
      listeners.push(elbv2.ApplicationListener.fromLookup(this, name + '-listener-http', {
        loadBalancerArn: loadBalancerArn,
        listenerProtocol: elbv2.ApplicationProtocol.HTTP,
      }).listenerArn);
    }

    if (sslEnabled) {
      listeners.push(elbv2.ApplicationListener.fromLookup(this, name + '-listener-https', {
        loadBalancerArn: loadBalancerArn,
        listenerProtocol: elbv2.ApplicationProtocol.HTTPS,
      }).listenerArn);
    }
    return listeners;
  }


  private createOrExistingSGWithRules(type: string, sgId?: string, rules?: SecurityGroupRule[], name?: string, vpc?: ec2.Vpc): ec2.SecurityGroup {
    const sg = sgId ? ec2.SecurityGroup.fromSecurityGroupId(
      this,
      `${name}${type}ExistingSecurityGroup`,
      sgId,
    ) as ec2.SecurityGroup
      : new ec2.SecurityGroup(this, `${name}-${type}-sg`, {
        vpc: vpc!,
        securityGroupName: `${name}-${type}-sg`,
        description: `Custom security group for ${name}`,
        allowAllOutbound: true, // Allow all outbound traffic by default
      });
    Tags.of(sg).add('Name', `${name}-${type}-sg`);
    // If rules are provided, add each rule to the security group
    if (rules) {
      for (const rule of rules) {
        sg.addIngressRule(rule.peer, rule.port, rule.description);
      }
    }

    return sg;
  }

  // Helper function to merge subnets based on subnet group names
  private mergeSubnetsByGroupNames(
    service: ec2.InterfaceVpcEndpointAwsService | ec2.GatewayVpcEndpointAwsService
      | ec2.InterfaceVpcEndpointService,
    subnetGroupNames: string[], subnets: { [key: string]: ec2.Subnet[] }): ec2.SelectedSubnets {
    // Check if subnetGroupNames is required and not empty for Interface VPC Endpoints
    if ((service instanceof ec2.InterfaceVpcEndpointAwsService || service instanceof ec2.InterfaceVpcEndpointService) &&
      (!subnetGroupNames || subnetGroupNames.length === 0)) {
      throw new Error('subnetGroupNames must contain at least one subnet group name for Interface VPC Endpoints.');
    }

    // Initialize an array to hold all the subnets
    let mergedSubnets: ec2.ISubnet[] = [];

    // Iterate over each subnet group name and select the subnets
    for (const groupName of subnetGroupNames) {
      const selectedSubnets = subnets[groupName];
      if (selectedSubnets) {
        mergedSubnets = mergedSubnets.concat(selectedSubnets); // Merge the subnets
      }
    }

    // Return the merged subnets as a SelectedSubnets object
    return {
      subnets: mergedSubnets,
      availabilityZones: [...new Set(mergedSubnets.map(subnet => subnet.availabilityZone))], // Deduplicate AZs
    } as ec2.SelectedSubnets;
  }
}
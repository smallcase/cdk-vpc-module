import {
  aws_certificatemanager as acm,
  aws_ec2 as ec2,
  aws_route53 as route53,
  CfnOutput,
  Fn,
  NestedStack,
  NestedStackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface HostedZoneConfig {
  readonly zoneName: string;
  readonly publicZone: boolean;
  readonly createAcmCertificate?: boolean;
}

export interface HostedZoneStackProps extends NestedStackProps {
  readonly hostedZones: HostedZoneConfig[];
  readonly vpc?: ec2.IVpc;
}

export class HostedZoneStack extends NestedStack {
  public readonly hostedZoneOutputs: { [key: string]: route53.IHostedZone } = {};
  public readonly certificateOutputs: { [key: string]: acm.Certificate } = {};

  constructor(scope: Construct, id: string, props: HostedZoneStackProps) {
    super(scope, id, props);

    props.hostedZones.forEach((hostedZoneConfig) => {
      this.addHostedZone(hostedZoneConfig, props.vpc);
    });
  }

  private addHostedZone(hostedZoneConfig: HostedZoneConfig, vpc?: ec2.IVpc) {
    const idPrefix = hostedZoneConfig.zoneName.replace(/[^A-Za-z0-9]/g, '');
    if (!hostedZoneConfig.publicZone && !vpc) {
      throw new Error(
        `Private hosted zone requires a VPC association: ${hostedZoneConfig.zoneName}`,
      );
    }
    if (!hostedZoneConfig.publicZone && hostedZoneConfig.createAcmCertificate) {
      throw new Error(
        `ACM certificate generation is supported only for public hosted zones: ${hostedZoneConfig.zoneName}`,
      );
    }

    const hostedZone = hostedZoneConfig.publicZone
      ? new route53.PublicHostedZone(this, `${idPrefix}PublicHostedZone`, {
        zoneName: hostedZoneConfig.zoneName,
      })
      : new route53.PrivateHostedZone(this, `${idPrefix}PrivateHostedZone`, {
        zoneName: hostedZoneConfig.zoneName,
        vpc: vpc!,
      });

    this.hostedZoneOutputs[hostedZoneConfig.zoneName] = hostedZone;
    new CfnOutput(this, `${idPrefix}HostedZoneId`, {
      value: hostedZone.hostedZoneId,
      description: `Hosted zone ID for ${hostedZoneConfig.zoneName}`,
    });
    if (hostedZoneConfig.publicZone) {
      new CfnOutput(this, `${idPrefix}NameServers`, {
        value: Fn.join(',', hostedZone.hostedZoneNameServers ?? []),
        description: `Name servers for ${hostedZoneConfig.zoneName}`,
      });
    }

    if (hostedZoneConfig.createAcmCertificate) {
      const certificate = new acm.Certificate(this, `${idPrefix}Certificate`, {
        domainName: hostedZoneConfig.zoneName,
        subjectAlternativeNames: [`*.${hostedZoneConfig.zoneName}`],
        validation: acm.CertificateValidation.fromDns(hostedZone),
      });
      this.certificateOutputs[hostedZoneConfig.zoneName] = certificate;
      new CfnOutput(this, `${idPrefix}CertificateArn`, {
        value: certificate.certificateArn,
        description: `ACM certificate ARN for ${hostedZoneConfig.zoneName}`,
      });
    }
  }
}

import {
  aws_certificatemanager as acm,
  aws_ec2 as ec2,
  aws_route53 as route53,
  CfnOutput,
  Fn,
  NestedStack,
  NestedStackProps,
  Tags,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface HostedZoneConfig {
  readonly zoneName: string;
  readonly publicZone: boolean;
  readonly createAcmCertificate?: boolean;
  readonly certificateValidationZoneName?: string;
  readonly tags?: Record<string, string>;
}

export interface HostedZoneStackProps extends NestedStackProps {
  readonly hostedZones: HostedZoneConfig[];
  readonly vpc?: ec2.IVpc;
  readonly hostedZoneTags?: Record<string, string>;
}

export class HostedZoneStack extends NestedStack {
  public readonly hostedZoneOutputs: { [key: string]: route53.IHostedZone } = {};
  public readonly certificateOutputs: { [key: string]: acm.Certificate } = {};
  private readonly publicValidationHostedZones: { [key: string]: route53.IHostedZone } = {};

  constructor(scope: Construct, id: string, props: HostedZoneStackProps) {
    super(scope, id, props);

    props.hostedZones.forEach((hostedZoneConfig) => {
      this.addHostedZone(hostedZoneConfig, props.vpc, props.hostedZoneTags);
    });
    props.hostedZones.forEach((hostedZoneConfig) => {
      this.addCertificate(hostedZoneConfig, props.hostedZoneTags);
    });
  }

  private addHostedZone(hostedZoneConfig: HostedZoneConfig, vpc?: ec2.IVpc, hostedZoneTags?: Record<string, string>) {
    const idPrefix = hostedZoneConfig.zoneName.replace(/[^A-Za-z0-9]/g, '');
    if (!hostedZoneConfig.publicZone && !vpc) {
      throw new Error(
        `Private hosted zone requires a VPC association: ${hostedZoneConfig.zoneName}`,
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
    this.applyTags(hostedZone, this.resolveTags(hostedZoneTags, hostedZoneConfig.tags));
    new CfnOutput(this, `${idPrefix}HostedZoneId`, {
      value: hostedZone.hostedZoneId,
      description: `Hosted zone ID for ${hostedZoneConfig.zoneName}`,
    });
    if (hostedZoneConfig.publicZone) {
      this.publicValidationHostedZones[hostedZoneConfig.zoneName] = hostedZone;
      new CfnOutput(this, `${idPrefix}NameServers`, {
        value: Fn.join(',', hostedZone.hostedZoneNameServers ?? []),
        description: `Name servers for ${hostedZoneConfig.zoneName}`,
      });
    }
  }

  private addCertificate(hostedZoneConfig: HostedZoneConfig, hostedZoneTags?: Record<string, string>) {
    if (hostedZoneConfig.createAcmCertificate) {
      const idPrefix = hostedZoneConfig.zoneName.replace(/[^A-Za-z0-9]/g, '');
      const validationHostedZone = this.getCertificateValidationHostedZone(hostedZoneConfig);
      const certificate = new acm.Certificate(this, `${idPrefix}Certificate`, {
        domainName: hostedZoneConfig.zoneName,
        subjectAlternativeNames: [`*.${hostedZoneConfig.zoneName}`],
        validation: acm.CertificateValidation.fromDns(validationHostedZone),
      });
      this.applyTags(certificate, this.resolveTags(hostedZoneTags, hostedZoneConfig.tags));
      this.certificateOutputs[hostedZoneConfig.zoneName] = certificate;
      new CfnOutput(this, `${idPrefix}CertificateArn`, {
        value: certificate.certificateArn,
        description: `ACM certificate ARN for ${hostedZoneConfig.zoneName}`,
      });
    }
  }

  private getCertificateValidationHostedZone(hostedZoneConfig: HostedZoneConfig): route53.IHostedZone {
    const validationZoneName = hostedZoneConfig.publicZone
      ? hostedZoneConfig.zoneName
      : hostedZoneConfig.certificateValidationZoneName;

    if (!validationZoneName) {
      throw new Error(
        `ACM certificate generation for private hosted zone requires certificateValidationZoneName: ${hostedZoneConfig.zoneName}`,
      );
    }

    if (this.publicValidationHostedZones[validationZoneName]) {
      return this.publicValidationHostedZones[validationZoneName];
    }

    const idPrefix = validationZoneName.replace(/[^A-Za-z0-9]/g, '');
    const validationHostedZone = route53.HostedZone.fromLookup(this, `${idPrefix}CertificateValidationHostedZone`, {
      domainName: validationZoneName,
      privateZone: false,
    });
    this.publicValidationHostedZones[validationZoneName] = validationHostedZone;
    return validationHostedZone;
  }

  private applyTags(scope: Construct, tags?: Record<string, string>) {
    if (!tags) {
      return;
    }

    Object.entries(tags).forEach(([key, value]) => {
      Tags.of(scope).add(key, value);
    });
  }

  private resolveTags(hostedZoneTags?: Record<string, string>, hostedZoneConfigTags?: Record<string, string>) {
    return {
      ...hostedZoneTags,
      ...hostedZoneConfigTags,
    };
  }
}

const { awscdk } = require('projen');
const { NpmAccess } = require('projen/lib/javascript');
const CDK_VERSION = '2.20.0';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Bharat Parmar',
  authorAddress: 'bharat.parmar@smallcase.com',
  cdkVersion: `${CDK_VERSION}`,
  cdkVersionPinning: true,
  constructsVersion: '10.0.5',
  constructsVersionPinning: true,
  releaseWorkflow: true,
  defaultReleaseBranch: 'main',
  release: true,
  packageName: '@smallcase/cdk-vpc-module',
  name: '@smallcase/cdk-vpc-module',
  repositoryUrl: 'git@github.com:smallcase/cdk-vpc-module.git',
  devDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  peerDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  npmAccess: NpmAccess.PUBLIC,
  releaseToNpm: true,
  releaseEveryCommit: true,
  licensed: true, /* Indicates if a license should be added. */
  dependabot: false, /* Include dependabot configuration. */
  mergify: false, /* Adds mergify configuration. */
  pullRequestTemplate: true, /* Include a GitHub pull request template. */
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();

const { AwsCdkConstructLibrary } = require('projen/lib/awscdk');
const { NpmAccess } = require('projen/lib/javascript');
const CDK_VERSION = '2.195.0';
const project = new AwsCdkConstructLibrary({
  author: 'Bharat Parmar',
  authorAddress: 'bharat.parmar@smallcase.com',
  cdkVersion: `${CDK_VERSION}`,
  cdkVersionPinning: false,
  constructsVersion: '10.0.5',
  constructsVersionPinning: false,
  releaseWorkflow: true,
  defaultReleaseBranch: 'main',
  release: true,
  packageName: '@smallcase/cdk-vpc-module',
  name: '@smallcase/cdk-vpc-module',
  repositoryUrl: 'https://github.com/smallcase/cdk-vpc-module.git',
  devDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  peerDeps: [
    `aws-cdk-lib@${CDK_VERSION}`,
  ],
  npmAccess: NpmAccess.PUBLIC,
  releaseToNpm: true,
  publishToPypi: {
    distName: 'cdk-vpc-module',
    module: 'cdk_vpc_module',
  },
  publishToGo: {
    gitUserName: 'sc-infra-bot',
    gitUserEmail: 'infra@smallcase.com',
    moduleName: 'github.com/smallcase/cdk-vpc-module-go',
  },
  releaseEveryCommit: true,
  licensed: true, /* Indicates if a license should be added. */
  dependabot: true,
  dependabotOptions: {
    scheduleInterval: 'weekly',
    versioningStrategy: 'lockfile-only',
    runsOn: 'arc-runner-set',
    allow: ['npm', 'github-actions'],
    ignore: ['aws-cdk-lib', 'constructs'],
    labels: ['dependencies', 'automerge'],
    assignees: [],
    reviewers: [],
  },
  mergify: false, /* Adds mergify configuration. */
  pullRequestTemplate: true, /* Include a GitHub pull request template. */
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();

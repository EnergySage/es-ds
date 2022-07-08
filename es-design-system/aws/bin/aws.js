#!/usr/bin/env node
// Must be logged into aws cli and have a named profile defined in ../.env.ENV

const cdk = require('aws-cdk-lib');
const path = require('path');
const { StaticWebStack } = require('../lib/stack-static');

// Expected directory from output of nuxt generate
const distPath = path.join(__dirname, '../../dist');
// TODO: Don't use this version
const { version } = require('../../package.json');

const app = new cdk.App();

// eslint-disable-next-line no-new
new StaticWebStack(app, 'DesignSystemStack', {
    stackName: `es-ds-stack-${process.env.BUILD_ENV}`,
    domainName: 'design.energysage.dev',
    // anything but prod results in ENV.design.energysage.dev
    subDomainName: process.env.BUILD_ENV !== 'prod' ? process.env.BUILD_ENV : '',
    version,
    distPath,

    env: {
        account: process.env.AWS_ACCOUNT_ID,
        region: 'us-east-1',
    },
});

app.synth();

#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { NuxtStaticStack } = require('../lib/stack-static');

const app = new cdk.App();

new NuxtStaticStack(app, 'DesignSystemStack', {
    stackName: 'es-design-system',
    env: {
        // The ID of your AWS account on which to deploy the stack.
        account: '453321834875',
        // The AWS region where to deploy the Nuxt app.
        region: 'us-east-1',
    },
});

app.synth();

#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NuxtStaticStack } from '../lib/static-stack';

import { name as stackName } from '../../package.json';

const app = new cdk.App();
const region = 'us-east-1';

const awsEnvs: Record<string, any> = {};

awsEnvs.int = {
    subDomain: 'v2',
    rootDomain: 'design.energysage.dev',
    env: {
        account: '453321834875',
    },
};

for (const [env, props] of Object.entries(awsEnvs)) {
    new NuxtStaticStack(app, env, {
        envName: env,
        stackName: `${stackName}-${env}`,
        ...props,
        env: {
            ...props.env,
            region,
        },
    });
}

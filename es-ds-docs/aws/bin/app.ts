#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NuxtStaticStack } from '../lib/static-stack';

import { name as stackName } from '../../package.json';

const app = new cdk.App();
const region = 'us-east-1';

const rootDomain = 'design.energysage.dev';
const accountID = '453321834875';

const awsEnvs: Record<string, any> = {
    int: {
        rootDomain,
        env: {
            account: accountID,
        },
    },
};

// Allow dynamic deployment environment name to be passed in via command line
// e.g. cdk deploy <ENV_NAME>
const deployEnv = process.env.DEPLOY_ENV ? process.env.DEPLOY_ENV : 'sandbox';

// set up for potential future PR deploys even though those aren't configured to run yet
if (deployEnv !== 'int' && deployEnv !== 'prod') {
    awsEnvs[deployEnv] = {
        subDomain: deployEnv,
        // On PRs we remove the bucket and objects on close
        autoDeleteObjects: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        rootDomain: rootDomain,
        env: {
            account: accountID,
        },
    };
}

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

import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { esNuxt } from 'es-cdk';
 
import { version } from '../../package.json';
import type { Construct } from 'constructs';
import type { DsProps } from './interfaces';

/**
 * A stack that sets up NuxtStatic
 */
 
export class NuxtStaticStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: DsProps) {
        super(scope, id, props);

         
        new esNuxt.NuxtStatic(this, 'DesignSystemApp', {
            // The domain (without the protocol) at which the Nuxt app shall be publicly available.
            rootDomain: props.rootDomain,
            subDomain: props.subDomain,
            version,
            // Used to determine where static files are located and what caching metadata to use
            nuxtConfig: {
                server: false,
                distDir: path.join(__dirname, '../../dist'),
            },
            csp: {
                directives: {
                    frameSrc: ['www.youtube.com'],
                    connectSrc: ['api.reviews.io'],
                    fontSrc: ['assets.reviews.io'],
                    scriptSrc: ["'unsafe-eval'", 'widget.reviews.io'],
                    styleSrc: ['data:', 'assets.reviews.io'],
                },
                sites: {
                    vwo: false,
                    gtag: false,
                    hubspot: false,
                    heap: false,
                    sentry: false,
                    datadog: false,
                    gfonts: true,
                    gmaps: false,
                    facebook: false,
                },
            },
        });

         
        new cdk.CfnOutput(this, 'Route53HostName', {
            value: `https://${props.subDomain ? `${props.subDomain}.` : ''}${props.rootDomain}`,
        });
    }
}

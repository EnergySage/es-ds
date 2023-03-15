// eslint-disable-next-line import/no-unresolved
const { esNuxt } = require('es-cdk');
const path = require('path');

const cdk = require('aws-cdk-lib');

/**
 * A stack that sets up NuxtStatic
 */
class NuxtStaticStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);

        // eslint-disable-next-line no-new
        new esNuxt.NuxtStatic(this, 'DesignSystemApp', {
            // The domain (without the protocol) at which the Nuxt app shall be publicly available.
            rootDomain: 'design.energysage.dev',
            subDomain: 'test',
            // Used to determine where static files are located and what caching metadata to use
            nuxtConfig: {
                server: false,
                distDir: path.join(__dirname, '../../dist'),
            },
            csp: {
                directives: {
                    scriptSrc: ["'unsafe-eval'"],
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
    }
}

module.exports = { NuxtStaticStack };

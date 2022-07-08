#!/usr/bin/env node

/* eslint-disable no-new */
const path = require('path');
const {
    // Services
    aws_route53: route53,
    aws_route53_targets: route53Targets,
    aws_certificatemanager: certManager,
    aws_s3: s3,
    aws_s3_deployment: s3Deploy,
    aws_cloudfront: cloudfront,
    aws_cloudfront_origins: cloudfrontOrigin,
    // Utilities
    CfnOutput: Logger,
    Duration,
    Stack,
} = require('aws-cdk-lib');

class StaticWebStack extends Stack {
    /**
     * Static web stack
     * Creates a static SPA stack using Route53 -> CloudFront -> S3
     *
     * @param {{
     *      domainName: string,
     *      subDomainName: string,
     *      version: string,
     *      region: string,
     *      distPath: filePath,
     * }} props properties of the stack
     */
    constructor(scope, id, props) {
        super(scope, id, props);

        // Final Vanity URL
        const hostname = `${props.subDomainName ? `${props.subDomainName}.` : ''}${props.domainName}`;
        // Default to index.html and let SPA handle routing
        const defaultRootObject = `/${props.version}/index.html`;

        // Check Route 53 For Hosted Domain
        const zone = route53.HostedZone.fromLookup(this, 'Route53Lookup', {
            domainName: props.domainName,
        });

        // Generate our TLS certificate
        const certificate = new certManager.DnsValidatedCertificate(this, 'SiteCertificate', {
            domainName: hostname,
            hostedZone: zone,
            region: props.region,
        });

        // Create/Update our S3 Bucket
        const bucket = new s3.Bucket(this, 'S3Bucket');

        // Function to handle returning index.html on directory requests
        // eg; /test/ returns /test/index.html
        const rewriteIndex = new cloudfront.Function(this, 'CloudFrontRewriteIndex', {
            code: cloudfront.FunctionCode.fromFile({ filePath: path.join(__dirname, './rewrite-index.js') }),
        });

        // Create/Update our Cloudfront CDN
        const distribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
            // Setup vanity domain and SSL
            domainNames: [hostname],
            certificate,
            minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,

            // SPA is always in charge of routing and error handling
            defaultRootObject,
            defaultBehavior: {
                origin: new cloudfrontOrigin.S3Origin(bucket),
                compress: true,
                // GET, HEAD and OPTIONS should be only necessary methods
                allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                // Redirect any http request to https
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                functionAssociations: [
                    {
                        function: rewriteIndex,
                        eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
                    },
                ],
            },
            // Return defaultRootObject on access and not found errors
            errorResponses: [
                {
                    httpStatus: 403,
                    responseHttpStatus: 200,
                    responsePagePath: defaultRootObject,
                    ttl: Duration.minutes(0), // Use of Duration is required
                },
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: defaultRootObject,
                    ttl: Duration.minutes(0),
                },
            ],
        });

        // Copy results of our build to S3 and invalidate Cloudfront
        new s3Deploy.BucketDeployment(this, 'S3Deploy', {
            sources: [s3Deploy.Source.asset(props.distPath)],
            distribution,
            distributionPaths: ['/*'],
            destinationBucket: bucket,
            destinationKeyPrefix: props.version,
        });

        // Create/Update Route53 alias record for the CloudFront distribution
        new route53.ARecord(this, 'Route53ARecord', {
            recordName: hostname,
            target: route53.RecordTarget.fromAlias(
                new route53Targets.CloudFrontTarget(distribution),
            ),
            zone,
        });

        // Debug Info
        new Logger(this, 'Site URL', { value: `https://${hostname}` });
        new Logger(this, 'Certificate', { value: certificate.certificateArn });
        new Logger(this, 'Cloud Front Domain', {
            value: `https://${distribution.domainName}`,
        });
        new Logger(this, 'Cloud Front DistID', {
            value: distribution.distributionId,
        });

        new Logger(this, 'S3 Bucket URL', { value: bucket.bucketWebsiteUrl });
        new Logger(this, 'S3 Bucket Name', { value: bucket.bucketName });
    }
}

module.exports = { StaticWebStack };

import type { StackProps, RemovalPolicy } from 'aws-cdk-lib';

export interface DsProps extends StackProps {
    readonly rootDomain: string;
    readonly envName: string;
    readonly disableResponseHeaders?: boolean;
    readonly subDomain?: string;
    readonly crawlable?: boolean;
    readonly autoDeleteObjects?: boolean;
    readonly removalPolicy?: RemovalPolicy;
}

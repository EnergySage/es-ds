/* eslint-disable import/prefer-default-export */
export { default as formMixins } from './forms';

// Export all validators as one object
export * as validators from './validators';

// Export each individual validator
export { required as requiredValdidator } from './validators';
export { email as emailValidator } from './validators';
export { phone as phoneValidator } from './validators';

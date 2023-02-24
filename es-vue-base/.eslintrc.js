module.exports = {
    settings: {
        'import/resolver': {
            webpack: {
                config: {
                    resolve: {
                        extensions: ['*', '.js', '.vue', '.json'],
                        alias: {
                            '~': __dirname,
                            '@': __dirname,
                        },
                    },
                },
            },
        },
    },
    extends: [
        'eslint-config-energysage',
    ],
    // Using one eslint file and overrides definition to handle sub directories
    // https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
    overrides: [
        {
            files: [
                '**/lib-icons/**',
            ],
            // Disable max length to allow for long paths in svg components
            rules: {
                'max-len': 'off',
            },
        },
        // https://github.com/jest-community/eslint-plugin-jest#readme
        {
            files: [
                '**/jest**',
                '**/*spec.*',
            ],
            env: {
                jest: true,
            },
            extends: [
                'plugin:jest/recommended',
                'plugin:jest/style',
            ],
            plugins: ['jest'],
            globals: {
                // From jest.vue.config.js
                testid: 'readonly',
                axe: 'readonly',
            },
            rules: {
                'jest/no-standalone-expect': [
                    'error',
                    { additionalTestBlockFunctions: ['test', 'each.test'] },
                ],
            },

        },
    ],
    rules: {
        // Disable/Enable any custom rules for your project
        'import/no-extraneous-dependencies': 'off',
    },
};

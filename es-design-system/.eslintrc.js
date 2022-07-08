module.exports = {
    root: true,
    // Adds mdx support
    parserOptions: {
        babelOptions: {
            presets: ['@babel/preset-react'],
        },
    },
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
        'plugin:nuxt/recommended',
    ],
    // Using one eslint file and overrides definition to handle sub directories
    // https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
    overrides: [
        {
            files: [
                '**/components/svg/**',
            ],
            // Disable max length to allow for long paths in svg components
            rules: {
                'max-len': 'off',
            },
        },
        {
            files: [
                '**/*stories.*',
                '**/*.mdx',
            ],
            extends: [
                'plugin:mdx/recommended',
                'plugin:storybook/recommended',
            ],
            rules: {
                // Semi breaks mdx
                // https://github.com/mdx-js/eslint-mdx/issues/182
                semi: 0,
                // Breaks storybook expected named exports
                'import/prefer-default-export': 0,
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
        'strict-vue/require-jsdoc': 'error',
        // Disable/Enable any custom rules for your project
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/*jest*',
                    '**/*spec*',
                    '**/.storybook/**',
                    '**/*.stories.*',
                ],
            },
        ],
    },
};

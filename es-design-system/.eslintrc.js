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
        'plugin:nuxt/recommended',
    ],
};

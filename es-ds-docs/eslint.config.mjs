import withNuxt from '.nuxt/eslint.config.mjs';

export default withNuxt({
    ignores: ['**/cdk.out/**'],
})
    .override('nuxt/vue/rules', {
        rules: {
            'vue/component-name-in-template-casing': [
                'error',
                'kebab-case',
                {
                    registeredComponentsOnly: false,
                    ignores: [],
                },
            ],
            'vue/block-order': [
                'error',
                {
                    order: [['script[setup]', 'script:not([setup])'], 'template', 'style'],
                },
            ],
            'vue/block-lang': [
                'error',
                {
                    script: {
                        lang: 'ts',
                    },
                },
            ],
            'vue/html-self-closing': 'off',
        },
    })
    .override('nuxt/typescript/rules', {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    });

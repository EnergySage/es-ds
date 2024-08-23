import antfu from '@antfu/eslint-config'

export default antfu({
    type: 'lib',
    stylistic: {
        indent: 4,
        quotes: 'single',
    },
    typescript: {
        tsconfigPath: './es-ds-docs/tsconfig.json',
    },
    vue: true,
    formatters: {
        html: true, // uses Prettier
    },
    ignores: [
        '.github/**',
        '.vscode/**',
        'es-ds-styles/build/**',
    ],
},
// Rules
{
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
    },
})

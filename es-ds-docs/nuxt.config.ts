// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    // https://nuxt.com/docs/getting-started/layers#usage
    extends: ['@energysage/es-ds-components'],

    // https://nuxt.com/docs/getting-started/deployment#static-hosting
    ssr: true,

    modules: ['./modules/auto-import-eslint.ts', '@nuxt/image', '@nuxt/eslint', 'motion-v/nuxt'],

    // Per suggestion from https://github.com/nuxt/nuxt/issues/26783#issuecomment-2058966800
    // See also:
    // - https://github.com/nuxt/nuxt/issues/24196#issuecomment-1853870504
    vite: {
        optimizeDeps: {
            include: [
                '@phosphor-icons/vue',
                'prismjs',
                'prismjs/components/prism-scss',
                'prismjs/components/prism-javascript',
                'prismjs/plugins/toolbar/prism-toolbar',
                'prismjs/plugins/line-numbers/prism-line-numbers',
                'prismjs/plugins/line-highlight/prism-line-highlight',
                'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard',
                'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace',
                'prismjs/plugins/autolinker/prism-autolinker',
                'prismjs/plugins/match-braces/prism-match-braces',
                'prismjs/plugins/highlight-keywords/prism-highlight-keywords',
            ],
        },
    },
});

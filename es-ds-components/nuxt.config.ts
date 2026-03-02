// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',

    // prevents "Cannot read properties of null (reading 'ce')" in SSR/SSG with reka-ui
    build: {
        transpile: ['reka-ui'],
    },

    // https://nuxt.com/docs/getting-started/styling#the-css-property
    css: ['@energysage/es-ds-styles/scss/bootstrap.scss'],

    // https://google-fonts.nuxtjs.org/options
    googleFonts: {
        preload: true,
        download: true,
        display: 'swap',
        families: {
            'Plus+Jakarta+Sans': {
                wght: '200..800',
                ital: '200..800',
            },
        },
    },

    // Configure how Nuxt auto-imports composables into your application.
    imports: {
        dirs: ['composables', 'types'],
    },

    modules: [
        // https://google-fonts.nuxtjs.org/getting-started/setup
        '@nuxtjs/google-fonts',
        // https://v3.primevue.org/nuxt
        'nuxt-primevue',
    ],

    primevue: {
        components: {
            include: [],
        },
        options: {
            unstyled: true,
        },
    },

    sourcemap: {
        server: true,
        client: true,
    },

    // Per suggestion from https://github.com/nuxt/nuxt/issues/26783#issuecomment-2058966800
    // See also:
    // - https://github.com/nuxt/nuxt/issues/24196#issuecomment-1853870504
    vite: {
        optimizeDeps: {
            include: [
                '@vue/devtools-core',
                '@vue/devtools-kit',
                '@vuelidate/core',
                '@vuelidate/validators',
                '@vueuse/core',
                'html-truncate',
                'primevue/config',
                'primevue/accordion',
                'primevue/accordiontab',
                'primevue/animateonscroll',
                'primevue/badgedirective',
                'primevue/breadcrumb',
                'primevue/button',
                'primevue/carousel',
                'primevue/column',
                'primevue/datatable',
                'primevue/dialog',
                'primevue/dropdown',
                'primevue/focustrap',
                'primevue/inputmask',
                'primevue/inputotp',
                'primevue/inputtext',
                'primevue/overlaypanel',
                'primevue/paginator',
                'primevue/panel',
                'primevue/progressbar',
                'primevue/radiobutton',
                'primevue/rating',
                'primevue/ripple',
                'primevue/selectbutton',
                'primevue/skeleton',
                'primevue/slider',
                'primevue/styleclass',
                'primevue/tabpanel',
                'primevue/tabview',
                'primevue/tooltip',
                'reka-ui',
            ],
        },
        css: {
            preprocessorOptions: {
                scss: {
                    // color functions will be deprecated in SASS 2.0: https://sass-lang.com/documentation/breaking-changes/color-functions/
                    silenceDeprecations: ['color-functions'],
                },
            },
        },
    },
    typescript: {
        typeCheck: true,
    },
});

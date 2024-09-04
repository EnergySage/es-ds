// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',

    // https://nuxt.com/docs/getting-started/styling#the-css-property
    css: ['@energysage/es-ds-styles/scss/bootstrap.scss'],

    // https://google-fonts.nuxtjs.org/options
    googleFonts: {
        preload: true,
        download: false,
        display: 'swap',
        families: {
            'Plus+Jakarta+Sans': {
                wght: '200..800',
                ital: '200..800',
            },
        },
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
                '@vuelidate/core',
                '@vuelidate/validators',
                'primevue/accordion',
                'primevue/accordiontab',
                'primevue/breadcrumb',
                'primevue/button',
                'primevue/column',
                'primevue/datatable',
                'primevue/dialog',
                'primevue/inputmask',
                'primevue/inputtext',
                'primevue/paginator',
                'primevue/panel',
                'primevue/progressbar',
                'primevue/radiobutton',
                'primevue/rating',
                'primevue/tabpanel',
                'primevue/tabview',
            ],
        },
    },
});

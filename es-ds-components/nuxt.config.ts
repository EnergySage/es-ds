// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    compatibilityDate: '2024-04-03',

    // https://nuxt.com/docs/getting-started/styling#the-css-property
    css: [
        '@energysage/es-ds-styles/scss/bootstrap.scss',
    ],

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
});

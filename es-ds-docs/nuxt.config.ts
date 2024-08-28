// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    devtools: { enabled: true },

    // https://nuxt.com/docs/getting-started/layers#usage
    extends: [
        '@energysage/es-ds-components',
    ],

    // https://nuxt.com/docs/getting-started/deployment#static-hosting
    ssr: true,

    // Per suggestion from https://github.com/nuxt/nuxt/issues/26783#issuecomment-2058966800
    // See also:
    // - https://github.com/nuxt/nuxt/issues/24196#issuecomment-1853870504
    vite: {
        optimizeDeps: {
            include: [
                'primevue/rating',
                'primevue/inputtext',
                'primevue/inputmask',
                'primevue/breadcrumb',
                'primevue/panel',
                'primevue/radiobutton',
                'primevue/accordion',
                'primevue/accordiontab',
                'primevue/datatable',
                'primevue/column',
                'primevue/dialog',
                'primevue/button',
                'primevue/progressbar',
            ]
        }
    }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    // https://nuxt.com/docs/getting-started/layers#usage
    extends: ['@energysage/es-ds-components'],

    // https://nuxt.com/docs/getting-started/deployment#static-hosting
    ssr: true,
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    modules: [
        // https://google-fonts.nuxtjs.org/getting-started/setup
        '@nuxtjs/google-fonts',
        // https://v3.primevue.org/nuxt
        'nuxt-primevue'
    ],
    primevue: {
        components: {
            name: ({ name }) => {
                // This avoids conflict between Prime's button and the native button having
                // the same name
                return name === 'Button' ? `Prime${name}` : name;
            },
        },
        options: {
            unstyled: true
        }
    },
});

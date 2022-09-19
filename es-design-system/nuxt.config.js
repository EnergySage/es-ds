import path from 'path';
import { version } from './package.json';

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&display=swap',
            },
        ],
    },
    ssr: false,
    server: {
        port: 8500,
    },
    router: {
        base: `/${version}/`,
    },
    target: 'static',
    build: {
        // analyze: true,
        extend(config) {
            /* eslint-disable no-param-reassign */
            // TODO: Prevents dupe vue instance but not sure where its actually coming from
            config.resolve.alias.vue$ = path.resolve(__dirname, 'node_modules/vue');
            // Prevents bootstrap-vue icons from being unitentionally included
            config.module.rules.push({
                test: /bootstrap-vue\/src\/icons\/icons/,
                use: 'null-loader',
            });

            /* eslint-enable no-param-reassign */
        },
    },
    publicRuntimeConfig: {
        version,
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/main.scss',
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '@/plugins/api.js' },
    ],
    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxt/postcss8',
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        // https://go.nuxtjs.dev/stylelint
        '@nuxtjs/stylelint-module',
        // https://github.com/nuxt-community/svg-module
        '@nuxtjs/svg',
        // https://bootstrap-vue.org/docs/#nuxtjs-module
        'bootstrap-vue/nuxt',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://i18n.nuxtjs.org
        '@nuxtjs/i18n',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:8500: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // https://i18n.nuxtjs.org
    i18n: {
        defaultLocale: 'en',
        langDir: 'locales/',
        locales: [{
            code: 'en',
            iso: 'en-US',
            file: 'en-US.json',
        }],
        vueI18n: {
            fallbackLocale: 'en',
        },
    },

    // https://bootstrap-vue.org/docs/#nuxtjs-module
    bootstrapVue: {
        bootstrapCSS: false,
        bootstrapVueCSS: false,
        icons: false,
        config: {
            breakpoints: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
        },
        components: [
            'BLink',
            'BContainer',
            'BNavbar',
            'BNavbarNav',
            'BNavItem',
            'BRow',
            'BCol',
            'BSidebar',
            'BForm',
            'BFormGroup',
            'BFormRadioGroup',
            'BFormCheckbox',
            'BSpinner',
            'BTable',
        ],
        componentPlugins: ['VBTogglePlugin'],
    },
};

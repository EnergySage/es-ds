/* eslint-disable no-param-reassign */
const { nuxifyStorybook } = require('../.nuxt-storybook/storybook/main');
const { version } = require('../package.json');

const publicPath = `/${version}/`;

function injectCustomPublicPath(configWebpack) {
    // Storybook requires some hacks to get it to serve from a sub directory
    // this will result in semanticly versioned deployments
    if (process.env.BUILD_ENV !== 'local') {
        configWebpack.output.publicPath = publicPath;
        const configHtmlWebPackPlugin = configWebpack.plugins.find(
            (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin',
        );
        configHtmlWebPackPlugin.options.publicPath = publicPath;
        configHtmlWebPackPlugin.options.templateParameters.globals.PREVIEW_URL = `${publicPath}iframe.html`;
    }

    // Support @nuxtjs/svg https://github.com/nuxt-community/svg-module/blob/master/lib/module.js
    const svgRule = configWebpack.module.rules.find((rule) => rule.test?.test('.svg'));
    if (svgRule) {
        svgRule.test = /\.(png|jpe?g|gif|webp)$/;

        configWebpack.module.rules.push({
            test: /\.svg$/i,
            oneOf: [
                {
                    resourceQuery: /inline/,
                    use: 'vue-svg-loader',
                },
                {
                    resourceQuery: /data/,
                    use: {
                        loader: 'url-loader',
                        options: { esModule: false },
                    },
                },
                {
                    resourceQuery: /raw/,
                    use: {
                        loader: 'raw-loader',
                        options: { esModule: false },
                    },
                },
                {
                    resourceQuery: /sprite/,
                    use: {
                        loader: 'svg-sprite-loader',
                    },
                },
                {
                    use: {
                        loader: 'file-loader',
                        options: { esModule: false },
                    },
                },
            ],
        });
    }
}

module.exports = nuxifyStorybook({
    webpackFinal: async (config) => ({
        ...config,
        ...injectCustomPublicPath(config),
    }),
    managerWebpack: async (config) => ({
        ...config,
        ...injectCustomPublicPath(config),
    }),
    stories: [
        '../**/*.stories.mdx',
    ],
    addons: [
        '@storybook/addon-console',
        '@storybook/addon-links',
        'storybook-dark-mode',
        '@whitespace/storybook-addon-html',
    ],
    core: {
        disableTelemetry: true,
    },
});

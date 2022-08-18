// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
    .toString()
    .split('\n')
    .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config')
    .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
    input: 'src/entry.js',
    plugins: {
        preVue: [
            alias({
                entries: [
                    {
                        find: '@',
                        replacement: `${path.resolve(projectRoot)}`,
                    },
                ],
            }),
            image(),
        ],
        replace: {
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'),
        },
        vue: {
            css: true,
            style: {
                postcssPlugins: [autoprefixer()],
                preprocessOptions: {
                    scss: {
                        importer: [
                            // TODO: There has to be a better way to do this
                            // We are trying to get '~' to resolve to the relative node_modules directory
                            function scssImporter(url) {
                                return {
                                    file: url
                                        .replace(/^~/, `${path.resolve(projectRoot)}/node_modules/`),
                                };
                            },
                        ],
                    },
                },
            },
            template: {
                isProduction: true,
            },
        },
        postVue: [
            resolve({
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            }),
            commonjs(),
        ],
        babel: {
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            babelHelpers: 'bundled',
        },
    },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
    // list external dependencies, exactly the way it is written in the import statement.
    // eg. 'jquery'
    'vue',
    'bootstrap-vue',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
    // Provide global variable names to replace your external imports
    // eg. jquery: '$'
    vue: 'Vue',
    'bootstrap-vue': 'bootstrapVue',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
    const esConfig = {
        ...baseConfig,
        input: 'src/entry.esm.js',
        external,
        output: {
            file: 'dist/es-vue-base.esm.js',
            format: 'esm',
            exports: 'named',
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel({
                ...baseConfig.plugins.babel,
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            ...babelPresetEnvConfig,
                            targets: esbrowserslist,
                        },
                    ],
                ],
            }),
        ],
    };
    buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
    const umdConfig = {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: 'dist/es-vue-base.ssr.js',
            format: 'cjs',
            name: 'EsVueBase',
            exports: 'named',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue({
                ...baseConfig.plugins.vue,
                template: {
                    ...baseConfig.plugins.vue.template,
                },
            }),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
        ],
    };
    buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
    const unpkgConfig = {
        ...baseConfig,
        external,
        output: {
            compact: true,
            file: 'dist/es-vue-base.min.js',
            format: 'iife',
            name: 'EsVueBase',
            exports: 'named',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue(baseConfig.plugins.vue),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
            terser({
                output: {
                    ecma: 5,
                },
            }),
        ],
    };
    buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;

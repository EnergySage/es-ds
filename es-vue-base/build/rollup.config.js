// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import autoprefixer from 'autoprefixer';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import babel from '@rollup/plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';
import minimist from 'minimist';
import {
    main as mainFileName,
    browser as browserFileName,
    module as moduleFileName,
} from '../package.json';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
    .toString()
    .split('\n');

// Extract babel preset-env config, to combine with esbrowserslist
const babelPresetEnvConfig = require('../babel.config')
    .presets.filter((entry) => entry[0] === '@babel/preset-env')[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
    input: 'src/entry.js',
    output: {
        name: 'EsVueBase',
        sourcemap: true,
        exports: 'named',
    },
    plugins: {
        preVue: [
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

// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
    // list external dependencies, exactly the way it is written in the import statement.
    // eg. 'jquery'
];

// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
    // Provide global variable names to replace your external imports
    // eg. jquery: '$'
    vue: 'Vue',
    'bootstrap-vue': 'bootstrapVue',
};

// UMD Build: https://github.com/umdjs/umd
const buildFormats = [];
if (!argv.format || argv.format === 'umd') {
    const umdConfig = {
        ...baseConfig,
        external,
        output: {
            ...baseConfig.output,
            format: 'umd',
            globals,
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

    // Minified build is default
    buildFormats.push({
        ...umdConfig,
        output: {
            ...umdConfig.output,
            compact: true,
            file: browserFileName,
        },
        plugins: [
            ...umdConfig.plugins,
            terser({
                output: {
                    ecma: 5,
                },
            }),
        ],
    });

    buildFormats.push({
        ...umdConfig,
        output: {
            ...umdConfig.output,
            file: browserFileName.replace('min.', ''),
        },
    });
}

// ESM Build: https://github.com/standard-things/esm
if (!argv.format || argv.format === 'es') {
    const esConfig = {
        ...baseConfig,
        input: 'src/entry.esm.js',
        external,
        output: {
            ...baseConfig.output,
            format: 'esm',
        },
        plugins: [
            visualizer(), // Outputs bundle info to ./stats.html
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue({
                ...baseConfig.plugins.vue,
                template: {
                    optimizeSSR: true,
                    ...baseConfig.plugins.vue.template,
                },
            }),
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

    // Minified build is default
    buildFormats.push({
        ...esConfig,
        output: {
            ...esConfig.output,
            compact: true,
            file: moduleFileName,
        },
        plugins: [
            ...esConfig.plugins,
            terser({
                output: {
                    ecma: 5,
                },
            }),
        ],
    });

    buildFormats.push({
        ...esConfig,
        output: {
            ...esConfig.output,
            file: moduleFileName.replace('min.', ''),
        },
    });
}

// CommonJS Build: https://requirejs.org/docs/commonjs.html
if (!argv.format || argv.format === 'cjs') {
    const cjsConfig = {
        ...baseConfig,
        external,
        output: {
            ...baseConfig.output,
            format: 'cjs',
            globals,
        },
        plugins: [
            replace(baseConfig.plugins.replace),
            ...baseConfig.plugins.preVue,
            vue({
                ...baseConfig.plugins.vue,
                template: {
                    optimizeSSR: true,
                    ...baseConfig.plugins.vue.template,
                },
            }),
            ...baseConfig.plugins.postVue,
            babel(baseConfig.plugins.babel),
        ],
    };

    // Minified build is default
    buildFormats.push({
        ...cjsConfig,
        output: {
            ...cjsConfig.output,
            compact: true,
            file: mainFileName,
        },
        plugins: [
            ...cjsConfig.plugins,
            terser({
                output: {
                    ecma: 5,
                },
            }),
        ],
    });

    buildFormats.push({
        ...cjsConfig,
        output: {
            ...cjsConfig.output,
            file: mainFileName.replace('min.', ''),
        },
    });
}

// Export config
export default buildFormats;

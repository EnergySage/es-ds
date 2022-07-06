// Possible Component Sizes
export const designStages = ['Atom', 'Molecule', 'Organism', 'Template', 'Page'];

// eslint-disable-next-line import/no-webpack-loader-syntax, global-require, max-len
// export const bsVariables = require('sass-extract-loader?{"plugins":["extract-sass-to-js"]}!@/assets/scss/includes.scss');

// eslint-disable-next-line import/no-webpack-loader-syntax, global-require, max-len
// export const bsVariables = require('sass-extract-loader?{"plugins":["extract-sass-to-js"]}!@energysage/es-bs-extends/scss/_variables.scss');

// eslint-disable-next-line import/no-webpack-loader-syntax, global-require, max-len
// export const bsVariables = require('sass-extract-loader?{"plugins":["extract-sass-to-js"]}!../assets/scss/includes.scss');
export const bsVariables = {};

export default {
    designStages,
    // bsVariables,
};

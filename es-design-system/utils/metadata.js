// import sassThemeColors from '@energysage/es-bs-extends/scss/variables/_theme-colors.scss';

// Possible Component Sizes
export const designStages = ['Atom', 'Molecule', 'Organism', 'Template', 'Page'];

// TODO: font-family values should come from: '@energysage/es-bs-extends/scss/variables/_font-family.scss';
const fontFamilies = {
    // eslint-disable-next-line max-len
    fontFamilySansSerif: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    fontFamilyMonospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};
fontFamilies.fontFamilyBase = fontFamilies.fontFamilySansSerif;

// const themeColors = sassThemeColors;

export const bsVariables = {
    ...fontFamilies,
    // themeColors,
};

export default {
    designStages,
    bsVariables,
};

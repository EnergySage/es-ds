import { bsVariables } from '@/utils/metadata';
import { version } from '@/package.json';

// Defaults dark/light based on browser/os setting
export default {
    // https://github.com/hipstersmoothie/storybook-dark-mode/issues/157
    // TODO: Fix this; workaround doesn't work
    brandTitle: version,
    brandUrl: '/',
    brandImage: './logo.svg',
    brandTarget: '_self',

    // Typography
    fontBase: bsVariables.fontFamilyBase,
    fontCode: bsVariables.fontFamilyMonospace,
};

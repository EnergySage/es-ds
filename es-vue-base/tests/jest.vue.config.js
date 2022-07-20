import { createLocalVue } from '@vue/test-utils';
import BootstrapVue from 'bootstrap-vue';
import { configureAxe } from 'jest-axe';

/**
 * Returns an attribute selector for data-testid.
 * Use like `wrapper.find(testid('myElement'))` for `<div data-testid="myElement">`
 * @see https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change
 * @see https://github.com/vuejs/vue-test-utils/issues/1500
 * @param {string} id Value of attribute
 * @returns {string}
 */
global.testid = (id) => `[data-testid="${id}"]`;

// Global jest-axe configuration
// https://github.com/nickcolley/jest-axe
const axe = configureAxe({
    rules: {
        // region isn't valid for component tests
        // https://dequeuniversity.com/rules/axe/4.4/region?application=axeAPI
        region: { enabled: false },
    },
});

global.axe = axe;

const localVue = createLocalVue();

localVue.use(BootstrapVue);

export default {
    localVue,
};

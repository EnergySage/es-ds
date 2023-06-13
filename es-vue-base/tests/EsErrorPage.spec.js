import { mount } from '@vue/test-utils';
import EsErrorPage from '@/src/lib-components/EsErrorPage.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsErrorPage', () => {
    // Basic test; should exist for most components
    test('<EsErrorPage />', async () => {
        const wrapper = mount(EsErrorPage, {
            ...jestVue,
            slots: {
                errorType: '<h1>404</h1>',
                errorMsg: '<h2>Oops!</h2>',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test slots are there
    test('errorType and errorMsg slots exist inside EsErrorPage', async () => {
        const wrapper = mount(EsErrorPage, {
            ...jestVue,
            slots: {
                errorType: '<h1>404</h1>',
                errorMsg: '<h2>Oops!</h2>',
            },
        });
        expect(wrapper.html()).toContain('<h1>404</h1>');
        expect(wrapper.html()).toContain('<h2>Oops!</h2>');
    });
});

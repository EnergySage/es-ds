import { mount } from '@vue/test-utils';
import EsErrorPage from '@/src/lib-components/EsErrorPage.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsErrorPage', () => {
    // Basic test; should exist for most components
    test('<EsErrorPage />', async () => {
        const wrapper = mount(EsErrorPage, {
            ...jestVue,
            propsData: {
                errorType: '403',
                required: true,
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test props exist
    test('<EsErrorPage props />', async () => {
        const wrapper = mount(EsErrorPage, {
            ...jestVue,
            propsData: {
                errorType: '403',
                required: true,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('errorType')).toBe('403');
    });

    // Test Error 403
    test('EsErrorPage 403 error message text', async () => {
        const wrapper = mount(EsErrorPage, {
            ...jestVue,
            propsData: {
                errorType: '403',
                required: true,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.find('#msgError').exists()).toBe(true);
    });

    // Test Error Generic
    test('EsErrorPage Generic error message text', async () => {
        const wrapper = mount(EsErrorPage, {
            ...jestVue,
            propsData: {
                errorType: '301',
                required: true,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.find('#msgError').exists()).toBe(true);
    });
});

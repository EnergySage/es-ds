import { mount } from '@vue/test-utils';
import EsBreadcrumbs from '@/src/lib-components/EsBreadcrumbs.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsBreadcrumb', () => {
    // Basic test; should exist for most components
    test('<EsBreadcrumb />', async () => {
        const wrapper = mount(EsBreadcrumbs, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('check for <EsBreadcrumb />', async () => {
        const wrapper = mount(EsBreadcrumbs, {
            ...jestVue,
        });

        expect(wrapper.find('.breadcrumb').exists()).toBe(true);
    });
});

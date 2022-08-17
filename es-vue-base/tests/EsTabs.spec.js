import { mount } from '@vue/test-utils';
import EsTabs from '@/src/lib-components/molecules/EsTabs.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsTabs', () => {
    // Basic test; should exist for most components
    test('<EsTabs />', async () => {
        const wrapper = mount(EsTabs, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test border prop is there
    test('<EsTabs border=false />', async () => {
        const wrapper = mount(EsTabs, {
            ...jestVue,
            propsData: {
                border: false,
            },
        });
        expect(wrapper.props('border')).toBe(false);
        expect(wrapper.html()).toMatchSnapshot();
    });

    // Test slot is there
    test('<EsTabs>My Content</EsTabs>', async () => {
        const wrapper = mount(EsTabs, {
            ...jestVue,
            slots: {
                default: 'My Content',
            },
        });

        expect(wrapper.vm.$slots.default[0].text).toBe('My Content');
        expect(wrapper.html()).toMatchSnapshot();
    });
});

import { mount } from '@vue/test-utils';
import EsTab from '@/src/lib-components/molecules/EsTab.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsTab', () => {
    // Basic test; should exist for most components
    test('<EsTab />', async () => {
        const wrapper = mount(EsTab, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test props are there
    test('<EsTab title="Title"/>', async () => {
        const wrapper = mount(EsTab, {
            ...jestVue,
            propsData: {
                title: 'Title',
            },
        });

        expect(wrapper.props('title')).toBe('Title');
        expect(wrapper.html()).toMatchSnapshot();
    });

    // Test slot is there
    test('<EsTab>My Content</EsTab>', async () => {
        const wrapper = mount(EsTab, {
            ...jestVue,
            slots: {
                default: 'My Content',
            },
        });

        expect(wrapper.vm.$slots.default[0].text).toBe('My Content');
        expect(wrapper.html()).toMatchSnapshot();
    });
});

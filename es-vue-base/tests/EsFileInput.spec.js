import { mount } from '@vue/test-utils';
import EsFileInput from '@/src/lib-components/EsFileInput.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFileInput', () => {
    // Basic test; should exist for most components
    test('<EsFileInput fileTypes={[\'image/png\']} />', async () => {
        const wrapper = mount(EsFileInput, {
            ...jestVue,
            propsData: {
                fileTypes: ['image/png'],
            },
        });

        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.props('fileTypes')).toStrictEqual(['image/png']);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test slot is there
    test('<EsFileInput fileTypes={[\'image/png\']}>My Content</EsFileInput>', async () => {
        const wrapper = mount(EsFileInput, {
            ...jestVue,
            slots: {
                default: 'My Content',
            },
            propsData: {
                fileTypes: ['image/png'],
            },
        });

        expect(wrapper.vm.$slots.default[0].text).toBe('My Content');
        expect(wrapper.html()).toMatchSnapshot();
    });
});

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

        // We do not check a11y here because the design of the component has nested interactive elements

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.props('fileTypes')).toStrictEqual(['image/png']);
        expect(wrapper.html()).toMatchSnapshot();
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

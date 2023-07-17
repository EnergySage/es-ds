import { mount } from '@vue/test-utils';
import EsFileUpload from '@/src/lib-components/EsFileUpload.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFileUpload', () => {
    // Basic test; should exist for most components
    test('<EsFileUpload fileTypes={[\'image/png\']} />', async () => {
        const wrapper = mount(EsFileUpload, {
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
    test('<EsFileUpload fileTypes={[\'image/png\']}>My Content</EsFileUpload>', async () => {
        const wrapper = mount(EsFileUpload, {
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

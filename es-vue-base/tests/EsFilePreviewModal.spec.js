import { mount } from '@vue/test-utils';
import EsFilePreviewModal from '@/src/lib-components/EsFilePreviewModal.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFilePreviewModal', () => {
    test('<EsFilePreviewModal />', async () => {
        const wrapper = mount(EsFilePreviewModal, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('check for <EsFilePreviewModal />', async () => {
        const wrapper = mount(EsFilePreviewModal, {
            ...jestVue,
        });

        expect(wrapper.findComponent(EsFilePreviewModal).exists()).toBe(true);
    });
});

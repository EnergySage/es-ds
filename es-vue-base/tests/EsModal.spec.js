import { mount } from '@vue/test-utils';
import EsModal from '@/src/lib-components/EsModal.vue';
import jestVue from '@/tests/jest.vue.config';

const slots = {
    'modal-title': 'Reviews',
    default: '<h3>Great experience!</h3>',
    'modal-footer': 'Close',
};

describe('EsModal', () => {
    // Basic test; should exist for most components
    test('<EsModal />', async () => {
        const wrapper = mount(EsModal, {
            attachTo: document.body,
            ...jestVue,
            propsData: {
                id: 'es-modal',
            },
        });
        await wrapper.vm.$nextTick();
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test slots are there
    test('<EsModal><title><body><footer></EsModal>', async () => {
        const wrapper = mount(EsModal, {
            attachTo: document.body,
            ...jestVue,
            propsData: {
                id: 'es-modal',
            },
            slots,
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.html()).toContain('Reviews');
        expect(wrapper.html()).toContain('<h3>Great experience!</h3>');
        expect(wrapper.html()).toContain('Close');
    });

    // Test custom props/default prop values are there
    test('<EsModal hideFooter />', async () => {
        const wrapper = mount(EsModal, {
            attachTo: document.body,
            ...jestVue,
            propsData: {
                id: 'es-modal',
            },
        });
        await wrapper.vm.$nextTick();
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.props('hideFooter')).toBe(false);
        expect(wrapper.props('scrollable')).toBe(true);
    });
});

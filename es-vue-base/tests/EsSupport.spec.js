import { mount } from '@vue/test-utils';
import EsSupport from '@/src/lib-components/EsSupport.vue';
import jestVue from '@/tests/jest.vue.config';
import { BImg } from 'bootstrap-vue';

describe('EsSupport', () => {
    // Basic test; should exist for most components
    const slots = {
        default: 'Need help signing up?',
    };

    test('<EsSupport />', async () => {
        const wrapper = mount(EsSupport, {
            ...jestVue,
            slots,
            propsData: {
                link: 'https://www.google.com/',
                src: 'https://via.placeholder.com/200x100',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test Support Title works
    test('Support title slot exists', async () => {
        const wrapper = mount(EsSupport, {
            ...jestVue,
            slots,
            propsData: {
                link: 'https://www.google.com/',
                src: 'https://via.placeholder.com/200x100',
            },
        });

        const titleSlot = wrapper.vm.$slots.default;
        expect(titleSlot[0].text).toBe('Need help signing up?');
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    // Support text exists
    test('Support text exists', async () => {
        const wrapper = mount(EsSupport, {
            ...jestVue,
            slots,
            propsData: {
                link: 'https://www.google.com/',
                src: 'https://via.placeholder.com/200x100',
            },
        });

        const supportLink = wrapper.find('.supportLink');
        expect(supportLink.text()).toBe('Schedule a free call with your EnergySage Advisor.');
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    // Image component exists
    test('Image exists', async () => {
        const wrapper = mount(EsSupport, {
            ...jestVue,
            slots,
            propsData: {
                link: 'https://www.google.com/',
                src: 'https://via.placeholder.com/200x100',
            },
        });

        expect(wrapper.findComponent(BImg).exists()).toBe(true);
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });
});

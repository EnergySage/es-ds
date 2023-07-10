import { mount } from '@vue/test-utils';
import EsProgressCircle from '@/src/lib-components/EsProgressCircle.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsProgressCircle', () => {
    test('<EsProgressCircle />', async () => {
        const wrapper = mount(EsProgressCircle, {
            ...jestVue,
            propsData: {
                value: 55,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('check for <EsProgressCircle />', async () => {
        const wrapper = mount(EsProgressCircle, {
            ...jestVue,
            propsData: {
                value: 55,
            },
        });

        expect(wrapper.find('circle').exists()).toBe(true);
    });

    // test default prop values
    test('<EsProgressCircle /> default prop values', async () => {
        const wrapper = mount(EsProgressCircle, {
            ...jestVue,
            propsData: {
                value: 55,
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('showPercentage')).toBe(true);
    });

    test('<EsProgressCircle /> updates prop values', async () => {
        const wrapper = mount(EsProgressCircle, {
            ...jestVue,
            propsData: {
                showPercentage: false,
                value: 21,
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('showPercentage')).toBe(false);
    });
});

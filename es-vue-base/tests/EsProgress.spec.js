import { mount } from '@vue/test-utils';
import EsProgress from '@/src/lib-components/EsProgress.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsProgress', () => {
    test('<EsProgress />', async () => {
        const wrapper = mount(EsProgress, {
            ...jestVue,
            propsData: {
                value: 55,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('check for <EsProgress />', async () => {
        const wrapper = mount(EsProgress, {
            ...jestVue,
            propsData: {
                value: 55,
            },
        });

        expect(wrapper.find('.progress').exists()).toBe(true);
    });

    // test default prop values
    test('<EsProgress /> default prop values', async () => {
        const wrapper = mount(EsProgress, {
            ...jestVue,
            propsData: {
                value: 55,
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('circle')).toBe(false);
        expect(wrapper.props('showPercentage')).toBe(true);
    });

    // test circular variant
    test('<EsProgress /> circular variant', async () => {
        const wrapper = mount(EsProgress, {
            ...jestVue,
            propsData: {
                circle: true,
                showPercentage: false,
                value: 21,
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('circle')).toBe(true);
        expect(wrapper.props('showPercentage')).toBe(false);
    });
});

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
});

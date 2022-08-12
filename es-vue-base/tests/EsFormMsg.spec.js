import { mount } from '@vue/test-utils';
import EsFormMsg from '@/src/lib-components/EsFormMsg.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFormMsg', () => {
    // Basic test; should exist for most components
    test('<EsFormMsg />', async () => {
        const wrapper = mount(EsFormMsg, {
            ...jestVue,
            propsData: {
                message: 'Test form msg',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
});

import { mount } from '@vue/test-utils';
import EsHorizontalList from '@/src/lib-components/EsHorizontalList.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsHorizontalList', () => {
    // Basic test; should exist for most components
    test('<EsHorizontalList />', async () => {
        const wrapper = mount(EsHorizontalList, {
            ...jestVue,
            propsData: {
                id: 'testId',
            },
            slots: {
                default: '<div>Test</div>',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
});

import { mount } from '@vue/test-utils';
import EsPagination from '@/src/lib-components/EsPagination.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsPagination', () => {
    // Basic test; should exist for most components
    test('<EsPagination />', async () => {
        const wrapper = mount(EsPagination, {
            ...jestVue,
            propsData: {
                listId: '#test',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
});

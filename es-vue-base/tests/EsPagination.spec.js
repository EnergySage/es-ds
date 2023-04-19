import { mount } from '@vue/test-utils';
import EsPagination from '@/src/lib-components/EsPagination.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsPagination', () => {
    // Basic test; should exist for most components
    test('<EsPagination />', async () => {
        const wrapper = mount(EsPagination, {
            ...jestVue,
            template: `
                <ul id="paginated-list">
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
                <EsPagination
                v-model="1"
                :total-rows="2"
                :per-page="1"
                align="center"
                list-id="paginated-list" />
            `,
            components: {
                EsPagination,
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
});

import { mount } from '@vue/test-utils';
import EsRating from '@/src/lib-components/EsRating.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsRating', () => {
    // Basic test; should exist for most components
    test('<EsRating />', async () => {
        const wrapper = mount(EsRating, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('B-form-rating component exists', () => {
        const wrapper = mount(EsRating, {
            ...jestVue,
        });
        const content = wrapper.find('[data-testid="rating-test"]');
        expect(content).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });
});

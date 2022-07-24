import { mount } from '@vue/test-utils';
import EsBadge from '@/src/lib-components/EsBadge.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsBadge', () => {
    // Basic test; should exist for most components
    const variantOptions = ['primary', 'secondary', 'danger', 'warning', 'info', 'light', 'dark', 'link'];
    const outlineOptions = [true, false];
    const slots = {
        default: 'Main Content',
    };
    const paramaters = [];
    variantOptions.forEach((variant) => {
        outlineOptions.forEach((outline) => {
            paramaters.push({
                variant,
                outline,
            });
        });
    });

    test.each(paramaters)(
        '<es-badge variant="$variant" outline="$outline" />',
        async ({
            variant, outline,
        }) => {
            const wrapper = mount(EsBadge, {
                ...jestVue,
                slots,
                propsData: {
                    variant,
                    outline,
                },
            });
            const a11y = await axe(wrapper.element);

            expect(wrapper.vm).toBeTruthy();
            expect(wrapper.html()).toMatchSnapshot();
            expect(a11y).toHaveNoViolations();
        },
    );

    test('<EsBadge />', async () => {
        const wrapper = mount(EsBadge, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('check for <EsBadge />', async () => {
        const wrapper = mount(EsBadge, {
            ...jestVue,
        });

        expect(wrapper.find('.badge').exists()).toBe(true);
    });

    test('Check default text is equivalent to slot default', async () => {
        const wrapper = mount(EsBadge, {
            ...jestVue,
            slots,
        });

        expect(wrapper.text()).toBe('Main Content');
    });
});

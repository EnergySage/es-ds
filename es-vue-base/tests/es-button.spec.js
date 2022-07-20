import { mount } from '@vue/test-utils';
import EsButton from '../src/lib-components/es-button.vue';
import jestVue from './jest.vue.config';


describe('EsButton', () => {
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
        '<es-button variant="$variant" outline="$outline" />',
        async ({
            variant, outline,
        }) => {
            const wrapper = mount(EsButton, {
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

    test('<EsButton uppercase="true" />', () => {
        const wrapper = mount(EsButton, {
            ...jestVue,
            slots,
            propsData: {
                outline: true,
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('<EsButton size="sm" />', () => {
        const wrapper = mount(EsButton, {
            ...jestVue,
            slots,
            propsData: {
                size: 'sm',
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });
});

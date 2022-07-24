import { mount } from '@vue/test-utils';
import EsSlider from '@/src/lib-components/EsSlider.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsSlider', () => {
    // Basic test; should exist for most components
    test(`<EsSlider
            :startingValue="100"
            :data="[0,100,500]"
            :marks="[0,500]"
            :min="100"
            :max="500"
            ariaLabel="Select a number" />`, async () => {
        const wrapper = mount(EsSlider, {
            ...jestVue,
            propsData: {
                startingValue: 300,
                data: [100, 300, 500],
                marks: () => [100, 500],
                min: 100,
                max: 500,
                ariaLabel: 'Select a number',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('<EsSlider :startingValue="50" />', async () => {
        const wrapper = mount(EsSlider, {
            ...jestVue,
            propsData: {
                startingValue: 50,
                data: [],
                marks: () => [],
                min: 0,
                max: 100,
                ariaLabel: 'Select a number',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();

        const tooltip = wrapper.find('div.slider-tooltip');
        expect(tooltip.text()).toContain('50');
        expect(wrapper.vm.sliderValue).toBe(50);
    });

    test('<EsSlider variant="secondary" />', async () => {
        const wrapper = mount(EsSlider, {
            ...jestVue,
            propsData: {
                startingValue: 50,
                data: [],
                marks: () => [],
                min: 0,
                max: 100,
                ariaLabel: 'Select a number',
                variant: 'secondary',
            },
        });
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('<EsSlider /> tooltipFormatter works', async () => {
        const wrapper = mount(EsSlider, {
            ...jestVue,
            propsData: {
                startingValue: 50,
                data: [],
                marks: () => [],
                min: 0,
                max: 100,
                ariaLabel: 'Select a number',
                tooltipFormatter: (v) => `$${v}`,
            },
        });

        expect(wrapper.html()).toMatchSnapshot();

        const tooltip = wrapper.find('div.slider-tooltip');
        expect(tooltip.text()).toContain('$');
    });
});

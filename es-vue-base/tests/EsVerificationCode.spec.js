import { mount } from '@vue/test-utils';
import EsVerificationCode from '@/src/lib-components/EsVerificationCode.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsVerificationCode', () => {
    beforeAll(() => {
        // JSDom does not implement this and an error was being
        // thrown from jest-axe because of it.
        window.getComputedStyle = () => {};
    });
    // Basic test; should exist for most components
    test('<EsVerificationCode />', async () => {
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('<EsVerificationCode has the correct number of inputs />', async () => {
        const charCount = 5;
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
            propsData: {
                charCount,
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.findAll('.code-input')).toHaveLength(charCount);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('<EsVerificationCode emits input />', async () => {
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);
        const fisrtInput = wrapper.find('.code-input');

        fisrtInput.element.value = 1;
        fisrtInput.trigger('input');

        expect(wrapper.emitted().input).toEqual([[['1', '', '', '', '']]]);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('<EsVerificationCode emits valid-code false when invalid />', async () => {
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);
        const codeInputs = wrapper.findAll('.code-input');
        const chars = ['a', '/', '+', 'B', '?'];

        codeInputs.wrappers.forEach((input, index) => {
            // eslint-disable-next-line no-param-reassign
            input.element.value = chars[index];
            input.trigger('input');
        });

        expect(wrapper.emitted()['valid-code']).toEqual([[false], [false], [false], [false], [false]]);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('<EsVerificationCode emits valid-code true when valid />', async () => {
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);
        const codeInputs = wrapper.findAll('.code-input');

        codeInputs.wrappers.forEach((input) => {
            // eslint-disable-next-line no-param-reassign
            input.element.value = 1;
            input.trigger('input');
        });

        expect(wrapper.emitted()['valid-code']).toEqual([[false], [false], [false], [false], [true]]);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // TODO: Simulate Paste
});

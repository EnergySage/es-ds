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

    test('<EsVerificationCode emits update-code />', async () => {
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);
        const fisrtInput = wrapper.find('.code-input');

        fisrtInput.element.value = 1;
        fisrtInput.trigger('input');

        expect(wrapper.emitted()['update-code']).toEqual([['1']]);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    const chars = ['a', '/', '+', 'B', '?'];
    test.each([chars])('<EsVerificationCode does not accept non numeric: $char />', async (char) => {
        const wrapper = mount(EsVerificationCode, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);
        const fisrtInput = wrapper.find('.code-input');

        fisrtInput.element.value = char;
        fisrtInput.trigger('input');

        expect(wrapper.emitted()['update-code']).toBeUndefined();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('<EsVerificationCode emits valid-code />', async () => {
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

        expect(wrapper.emitted()['valid-code']).toEqual([['11111']]);
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // TODO: Simulate Paste
});

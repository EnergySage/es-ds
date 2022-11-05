import { mount, createLocalVue } from '@vue/test-utils';
import EsFormInput from '@/src/lib-components/EsFormInput.vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import * as validators from '../src/lib-validators';

describe('hasNumber', () => {
    test.concurrent.each([
        ['asdf', false],
        ['', false],
        [123, true],
        ['123', true],
        [1, true],
        ['1', true],
        ['asdf1', true],
        ['1asdf', true],
        ['as1df', true],
    ])('for %s is %s', async (value, expected) => {
        expect(validators.hasNumber(value)).toBe(expected);
    });
});

describe('hasSpecialCharacter', () => {
    test.concurrent.each([
        ['asdf', false],
        ['', false],
        [123, false],
        ['123', false],
        [1, false],
        ['1', false],
        ['asdf1', false],
        ['1asdf', false],
        ['as1df', false],
        ['a$sdf', true],
        ['@', true],
        ['12!3', true],
    ])('for %s is %s', async (value, expected) => {
        expect(validators.hasSpecialCharacter(value)).toBe(expected);
    });
});

describe('hasUppercaseLetter', () => {
    test.concurrent.each([
        ['asdf', false],
        ['', false],
        [123, false],
        ['123', false],
        [1, false],
        ['1', false],
        ['asdf1', false],
        ['1asdf', false],
        ['as1df', false],
        ['a$sdf', false],
        ['@', false],
        ['12!3', false],
        ['aSdf1', true],
        ['1asDf', true],
        ['ASDF', true],
        ['a$sdF', true],
    ])('for %s is %s', async (value, expected) => {
        expect(validators.hasUppercaseLetter(value)).toBe(expected);
    });
});

describe('hasLowercaseLetter', () => {
    test.concurrent.each([
        ['asdf', true],
        ['', false],
        [123, false],
        ['a$sdF', true],
        ['', false],
        [123, false],
        ['a$sdF', true],
        ['d', true],
    ])('for %s is %s', async (value, expected) => {
        expect(validators.hasLowercaseLetter(value)).toBe(expected);
    });
});

const vueWithVuelidate = createLocalVue();
vueWithVuelidate.use(BootstrapVue);
vueWithVuelidate.use(Vuelidate);

describe('vuelidateHasNumber', () => {
    test.concurrent.each([
        [
            'vuelidateHasNumber',
            'asdf',
            {
                required: validators.vuelidateRequired,
                vuelidateHasNumber: validators.vuelidateHasNumber,
            },
            true,
        ],
        [
            'vuelidateHasNumber',
            'as1df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasNumber: validators.vuelidateHasNumber,
            },
            false,
        ],
        [
            'vuelidateHasSpecialCharacter',
            'as1df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasSpecialCharacter: validators.vuelidateHasSpecialCharacter,
            },
            true,
        ],
        [
            'vuelidateHasSpecialCharacter',
            'as@df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasSpecialCharacter: validators.vuelidateHasSpecialCharacter,
            },
            false,
        ],
        [
            'vuelidateHasUppercaseLetter',
            'as@df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasUppercaseLetter: validators.vuelidateHasUppercaseLetter,
            },
            true,
        ],
        [
            'vuelidateHasUppercaseLetter',
            'as@Df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasUppercaseLetter: validators.vuelidateHasUppercaseLetter,
            },
            false,
        ],
        [
            'vuelidateHasLowercaseLetter',
            'ASDF',
            {
                required: validators.vuelidateRequired,
                vuelidateHasLowercaseLetter: validators.vuelidateHasLowercaseLetter,
            },
            true,
        ],
        [
            'vuelidateHasLowercaseLetter',
            'ASDf',
            {
                required: validators.vuelidateRequired,
                vuelidateHasLowercaseLetter: validators.vuelidateHasLowercaseLetter,
            },
            false,
        ],
    ])('with %s and %s value', async (vuelidateFuncName, inputValue, vuelidateFunctions, hasErrors) => {
        const wrapper = mount(EsFormInput, {
            localVue: vueWithVuelidate,
            data() {
                return {
                    value: '',
                };
            },
            validations: {
                value: {
                    ...vuelidateFunctions,
                },
            },
            slots: {
                label: vuelidateFuncName,
            },
            propsData: {
                id: 'myId',
            },
        });
        wrapper.setData({ value: inputValue });
        wrapper.vm.$v.$touch();
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.$v.$anyError).toBe(hasErrors);
    });
});

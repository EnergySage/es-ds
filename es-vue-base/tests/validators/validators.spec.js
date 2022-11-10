import { mount, createLocalVue } from '@vue/test-utils';
import EsFormInput from '@/src/lib-components/EsFormInput.vue';
import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import * as validators from '../../src/lib-validators';

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
                vuelidateHasNumber: validators.vuelidateHasNumber(1),
            },
            true,
        ],
        [
            'vuelidateHasNumber',
            'as1df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasNumber: validators.vuelidateHasNumber(1),
            },
            false,
        ],
        [
            'vuelidateHasSpecialCharacter',
            'as1df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasSpecialCharacter: validators.vuelidateHasSpecialCharacter(1),
            },
            true,
        ],
        [
            'vuelidateHasSpecialCharacter',
            'as@df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasSpecialCharacter: validators.vuelidateHasSpecialCharacter(1),
            },
            false,
        ],
        [
            'vuelidateHasUppercaseLetter',
            'as@df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasUppercaseLetter: validators.vuelidateHasUppercaseLetter(1),
            },
            true,
        ],
        [
            'vuelidateHasUppercaseLetter',
            'as@Df',
            {
                required: validators.vuelidateRequired,
                vuelidateHasUppercaseLetter: validators.vuelidateHasUppercaseLetter(1),
            },
            false,
        ],
        [
            'vuelidateHasLowercaseLetter',
            'ASDF',
            {
                required: validators.vuelidateRequired,
                vuelidateHasLowercaseLetter: validators.vuelidateHasLowercaseLetter(1),
            },
            true,
        ],
        [
            'vuelidateHasLowercaseLetter',
            'ASDf',
            {
                required: validators.vuelidateRequired,
                vuelidateHasLowercaseLetter: validators.vuelidateHasLowercaseLetter(1),
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

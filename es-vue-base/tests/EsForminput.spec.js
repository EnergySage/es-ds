import { mount } from '@vue/test-utils';
import EsFormInput from '@/src/lib-components/molecules/EsFormInput.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFormInput', () => {
    // Basic test; should exist for most components
    test('<EsFormInput />', async () => {
        const wrapper = mount(EsFormInput, {
            ...jestVue,
            slots: {
                label: 'Account Number',
            },
            propsData: {
                id: 'myID',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test slots are there
    test('<EsFormInput>slots</EsFormInput>', async () => {
        const wrapper = mount(EsFormInput, {
            ...jestVue,
            slots: {
                label: 'Account Number',
                message: 'Please enter your account number.',
                errorMessage: 'Please enter a valid account number.',
                successMessage: 'Your account number has been submitted successfully.',
            },
            propsData: {
                id: 'myID',

            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.vm.$slots.label[0].text).toBe('Account Number');
        expect(wrapper.vm.$slots.message[0].text).toBe('Please enter your account number.');
        expect(wrapper.vm.$slots.errorMessage[0].text).toBe('Please enter a valid account number.');
        expect(wrapper.vm.$slots.successMessage[0].text).toBe('Your account number has been submitted successfully.');
    });

    // Test label structure
    test('<EsFormInput <label /> />', async () => {
        const wrapper = mount(EsFormInput, {
            ...jestVue,
            propsData: {
                id: 'myID',
                required: true,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        const label = wrapper.find('label');
        expect(label.exists()).toBe(true);
        expect(label.find('*').exists()).toBe(true);
    });

    // Test props
    test('<EsFormInput props />', async () => {
        const wrapper = mount(EsFormInput, {
            ...jestVue,
            propsData: {
                id: 'myID',
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('id')).toBe('myID');
        expect(wrapper.props('state')).toBeNull();
    });
});

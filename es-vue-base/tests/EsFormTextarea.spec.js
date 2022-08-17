import { mount } from '@vue/test-utils';
import EsFormTextarea from '@/src/lib-components/molecules/EsFormTextarea.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFormTextarea', () => {
    // Basic test; should exist for most components
    test('<EsFormTextarea />', async () => {
        const wrapper = mount(EsFormTextarea, {
            ...jestVue,
            slots: {
                label: 'Notes',
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
    test('<EsFormTextarea>slots</EsFormTextarea>', async () => {
        const wrapper = mount(EsFormTextarea, {
            ...jestVue,
            slots: {
                label: 'Notes',
                message: 'Enter your notes here.',
                errorMessage: 'Please enter a valid value.',
                successMessage: 'Your response has been submitted successfully.',
            },
            propsData: {
                id: 'myID',

            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.vm.$slots.label[0].text).toBe('Notes');
        expect(wrapper.vm.$slots.message[0].text).toBe('Enter your notes here.');
        expect(wrapper.vm.$slots.errorMessage[0].text).toBe('Please enter a valid value.');
        expect(wrapper.vm.$slots.successMessage[0].text).toBe('Your response has been submitted successfully.');
    });

    // Test label structure
    test('<EsFormTextarea <label /> />', async () => {
        const wrapper = mount(EsFormTextarea, {
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
    test('<EsFormTextarea props />', async () => {
        const wrapper = mount(EsFormTextarea, {
            ...jestVue,
            propsData: {
                id: 'myID',
                required: true,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('id')).toBe('myID');
        expect(wrapper.props('state')).toBeNull();
    });
});

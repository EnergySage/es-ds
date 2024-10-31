import { mount } from '@vue/test-utils';
import EsZipCodeForm from '@/src/lib-components/EsZipCodeForm.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsZipCodeForm', () => {
    test('updates input value correctly after a delay', async () => {
        // Mount the component
        const wrapper = mount(EsZipCodeForm, {
            ...jestVue,
            propsData: {
                zipCodeValue: '', // Start with an empty initial value
            },
        });

        // Set a new value for the zip code after a delay
        const newValue = '54321';
        wrapper.vm.zipCodeValue = newValue;

        // Simulate a delay (e.g., 2 seconds)
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });

        // Assert that the zip code input value is updated correctly after the delay
        expect(wrapper.vm.zipCode).toBe(newValue);
    });
});

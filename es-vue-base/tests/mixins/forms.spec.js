import { shallowMount } from '@vue/test-utils';
import { formMixins } from '../../src/lib-mixins';

test('validateState doesn\'t throw error', () => {
    const Component = {
        data() {
            return {
                form: {
                    firstName: '',
                },
            };
        },
        render() {},
        mixins: [formMixins],
        validations: {},
        mounted() {
            this.validateState('firstName');
        },
    };
    const wrapper = shallowMount(Component);
    expect(wrapper).toBeTruthy();
});

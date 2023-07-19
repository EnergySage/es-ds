import { mount } from '@vue/test-utils';
import EsFormMsg from '@/src/lib-components/EsFormMsg.vue';

describe('EsFormMsg', () => {
    const variantOptions = ['danger', 'success', 'primary'];
    const slots = {
        default: 'Main Content',
    };

    variantOptions.forEach((variant) => {
        test(`<EsFormMsg variant="${variant}" show="true" />`, async () => {
            const wrapper = mount(EsFormMsg, {
                slots,
                propsData: {
                    variant,
                    show: true,
                },
            });

            expect(wrapper.vm).toBeTruthy();
            expect(wrapper.html()).toMatchSnapshot();
        });

        test(`<EsFormMsg variant="${variant}" show="false" />`, async () => {
            const wrapper = mount(EsFormMsg, {
                slots,
                propsData: {
                    variant,
                    show: false,
                },
            });

            expect(wrapper.vm).toBeTruthy();
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});

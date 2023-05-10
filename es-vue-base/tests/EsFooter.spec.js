import { mount } from '@vue/test-utils';
import EsFooter from '@/src/lib-components/EsFooter.vue';
import getEsFooterContent from '@/src/lib-utils/footer-content';
import jestVue from '@/tests/jest.vue.config';

describe('EsFooter', () => {
    // Basic test; should exist for most components
    test('<EsFooter />', async () => {
        const wrapper = mount(EsFooter, {
            ...jestVue,
            propsData: {
                content: getEsFooterContent(),
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
});

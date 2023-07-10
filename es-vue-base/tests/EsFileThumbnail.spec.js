import { mount } from '@vue/test-utils';
import EsFileThumbnail from '@/src/lib-components/EsFileThumbnail.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFileThumbnail', () => {
    test('<EsFileThumbnail />', async () => {
        const wrapper = mount(EsFileThumbnail, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('check for <EsFileThumbnail />', async () => {
        const wrapper = mount(EsFileThumbnail, {
            ...jestVue,
        });

        expect(wrapper.find('.mobile-preview').exists()).toBe(true);
        expect(wrapper.find('.desktop-preview').exists()).toBe(true);
    });

    // test default prop values
    test('<EsFileThumbnail /> default prop values', async () => {
        const wrapper = mount(EsFileThumbnail, {
            ...jestVue,
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('percentLoaded')).toBe(0);
        expect(wrapper.props('previewText')).toBe('View preview');
    });
});

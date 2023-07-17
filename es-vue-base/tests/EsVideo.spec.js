import { mount } from '@vue/test-utils';
import EsVideo from '@/src/lib-components/EsVideo.vue';
import jestVue from '@/tests/jest.vue.config';
import { BImg, BEmbed } from 'bootstrap-vue';

describe('EsVideo', () => {
    // Basic test; should exist for most components
    test('<EsVideo />', async () => {
        const wrapper = mount(EsVideo, {
            ...jestVue,
            propsData: {
                altText: 'Community solar: Everything you want to know before you join',
                coverImageUrl: '../es-design-system/assets/placeholder/energysage_thumbnail.png',
                embedUrl: 'https://www.youtube.com/embed/hgmZG3GLLNg',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
    // Image component exists
    test('Image exists', async () => {
        const wrapper = mount(EsVideo, {
            ...jestVue,
            propsData: {
                altText: 'Community solar: Everything you want to know before you join',
                coverImageUrl: '../es-design-system/assets/placeholder/energysage_thumbnail.png',
                embedUrl: 'https://www.youtube.com/embed/hgmZG3GLLNg',
            },
        });

        expect(wrapper.findComponent(BImg).exists()).toBe(true);
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });
    // Embed component exists when show video is true
    test('Embed exists', async () => {
        const wrapper = mount(EsVideo, {
            ...jestVue,
            propsData: {
                altText: 'Community solar: Everything you want to know before you join',
                coverImageUrl: '../es-design-system/assets/placeholder/energysage_thumbnail.png',
                embedUrl: 'https://www.youtube.com/embed/hgmZG3GLLNg',
            },
            data() {
                return {
                    showVideo: true,
                };
            },
        });

        expect(wrapper.findComponent(BEmbed).exists()).toBe(true);
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });
    // Test props
    test('<EsVideo props />', async () => {
        const wrapper = mount(EsVideo, {
            ...jestVue,
            propsData: {
                altText: 'Community solar: Everything you want to know before you join',
                coverImageUrl: '../es-design-system/assets/placeholder/energysage_thumbnail.png',
                embedUrl: 'https://www.youtube.com/embed/hgmZG3GLLNg',
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('altText')).toBe('Community solar: Everything you want to know before you join');
        expect(wrapper.props('coverImageUrl')).toBe('../es-design-system/assets/placeholder/energysage_thumbnail.png');
        expect(wrapper.props('embedUrl')).toBe('https://www.youtube.com/embed/hgmZG3GLLNg');
    });
});

import { mount } from '@vue/test-utils';
import EsCard from '@/src/lib-components/EsCard.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsCard', () => {
    // Basic test; should exist for most components
    test('<EsCard />', async () => {
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('DIV');
        expect(card.classes()).toContain('display');
        expect(card.text()).toBe('Card content');
    });

    // Paragraph tag is honored for display variant
    test('EsCard paragraph tag', async () => {
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
                tag: 'p',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('P');
        expect(card.classes()).toContain('display');
        expect(card.text()).toBe('Card content');
    });

    // Default interactive variant
    test('EsCard default interactive variant', async () => {
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
                variant: 'interactive',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('BUTTON');
        expect(card.classes()).toContain('interactive');
        expect(card.text()).toBe('Card content');
    });

    // Interactive from href, no variant specified
    test('EsCard becomes interactive when href is passed and variant is omitted', async () => {
        const href = 'https://www.energysage.com/';
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
                href,
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('A');
        expect(card.classes()).toContain('interactive');
        expect(card.attributes().href).toBe(href);
        expect(card.text()).toBe('Card content');
    });

    // Interactive from href, display variant specified
    test('EsCard becomes interactive when href is passed and display variant is passed', async () => {
        const href = 'https://www.energysage.com/';
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
                href,
                variant: 'display', // this should be ignored, due to href
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('A');
        expect(card.classes()).toContain('interactive');
        expect(card.attributes().href).toBe(href);
        expect(card.text()).toBe('Card content');
    });

    // Interactive from variant and href
    test('EsCard interactive with href', async () => {
        const href = 'https://www.energysage.com/';
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
                href,
                variant: 'interactive',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('A');
        expect(card.classes()).toContain('interactive');
        expect(card.attributes().href).toBe(href);
        expect(card.text()).toBe('Card content');
    });

    // Tag is honored when passed to interactive variant with href
    test('EsCard tag is honored when passed to interactive variant with href', async () => {
        const href = 'https://www.energysage.com/';
        const wrapper = mount(EsCard, {
            ...jestVue,
            slots: {
                default: 'Card content',
            },
            propsData: {
                id: 'card-id',
                href,
                tag: 'p', // invalid html with href, but suitable test proxy for nuxt-link
                variant: 'interactive',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        const card = wrapper.findComponent(EsCard);
        expect(card.element.tagName).toBe('P');
        expect(card.classes()).toContain('interactive');
        expect(card.attributes().href).toBe(href);
        expect(card.text()).toBe('Card content');
    });
});

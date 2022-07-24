import { mount } from '@vue/test-utils';
import EsCollapse from '@/src/lib-components/EsCollapse.vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import ArrowCollapseIcon from '@/src/lib-components/icons/chevron-down.vue';
import ArrowExpandIcon from '@/src/lib-components/icons/chevron-up.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsCollapse', () => {
    // Basic test; should exist for most components
    test('<EsCollapse />', async () => {
        const wrapper = mount(EsCollapse, {
            ...jestVue,
            slots: {
                title: 'My Title',
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            },
            propsData: {
                id: 'myId',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('EsButton exists', () => {
        const wrapper = mount(EsCollapse, {
            ...jestVue,
            slots: {
                title: 'My Title',
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            },
            propsData: {
                id: 'myId',
            },
        });
        expect(wrapper.findComponent(EsButton).exists()).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Title and default slot exist inside EsButton', async () => {
        const wrapper = mount(EsCollapse, {
            ...jestVue,
            slots: {
                title: 'My Title',
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            },
            propsData: {
                id: 'myId',
            },
        });
        const box = wrapper.findComponent(EsButton);
        await box.trigger('click');
        expect(box.text()).toContain('My Title');
        expect(wrapper.text()).toBe('My Title  Lorem ipsum dolor sit amet, consectetur adipiscing.');
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Icons switch upon button click', async () => {
        const wrapper = mount(EsCollapse, {
            ...jestVue,
            slots: {
                title: 'My Title',
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            },
            propsData: {
                id: 'myId',
            },
        });
        const box = wrapper.findComponent(EsButton);
        const content = wrapper.find('.collapse');

        expect(content.isVisible()).toBe(false);
        expect(wrapper.findComponent(ArrowCollapseIcon).exists()).toBe(true);
        expect(wrapper.findComponent(ArrowExpandIcon).exists()).toBe(false);
        await box.trigger('click');
        expect(content.isVisible()).toBe(true);
        expect(wrapper.findComponent(ArrowExpandIcon).exists()).toBe(true);
        expect(wrapper.findComponent(ArrowCollapseIcon).exists()).toBe(false);
        expect(wrapper.html()).toMatchSnapshot();
    });
});

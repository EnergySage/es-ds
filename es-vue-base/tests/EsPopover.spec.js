import { mount } from '@vue/test-utils';
import EsPopover from '@/src/lib-components/EsPopover.vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsPopover', () => {
    const PopoverStub = {
        components: {
            EsButton,
            EsPopover,
        },
        template: '<span><EsButton id="myTarget">Button</EsButton><EsPopover target="myTarget"/></span>',
    };
    // Basic test; should exist for most components
    test('<EsPopover />', async () => {
        const wrapper = mount(PopoverStub, {
            attachTo: document.body,
            ...jestVue,
            propsData: {
                target: 'target',
                show: true,
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // passing
    test('Title slot exists', async () => {
        const wrapper = mount(PopoverStub, {
            ...jestVue,
            slots: {
                title: 'Test title',
            },
            propsData: {
                target: 'target',
            },
        });

        const titleSlot = wrapper.vm.$slots.title;
        expect(titleSlot[0].text).toBe('Test title');
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    // passing
    test('Content slot exists', async () => {
        const wrapper = mount(PopoverStub, {
            ...jestVue,
            slots: {
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            },
            propsData: {
                target: 'target',
            },
        });

        const contentSlot = wrapper.vm.$slots.default;
        expect(contentSlot[0].text).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing.');
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Close button exists', async () => {
        const wrapper = mount(PopoverStub, {
            ...jestVue,
            propsData: {
                target: 'target',
            },
        });
        const button = wrapper.findComponent(EsButton);
        expect(button).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });

    // TODO: Popover does not get added to DOM on show
    // https://github.com/bootstrap-vue/bootstrap-vue/blob/dev/src/components/popover/popover.spec.js
});

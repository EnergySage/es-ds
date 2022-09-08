/* eslint-disable no-console */
import { mount } from '@vue/test-utils';
import EsPopover from '@/src/lib-components/EsPopover.vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import XIcon from '@/src/lib-icons/x.vue';
import { waitRAF, waitNT } from './utils';

// https://github.com/bootstrap-vue/bootstrap-vue/blob/dev/src/components/popover/popover.spec.js

// Our test application definition
const App = {
    props: [
        'triggers',
        'show',
        'target',
        'customClass',
        'titleAttr',
        'btnDisabled',
    ],
    render(h) {
        return h('article', { attrs: { id: 'wrapper' } }, [
            h(
                'button',
                {
                    attrs: {
                        id: 'triggerButton',
                        type: 'button',
                        disabled: this.btnDisabled || null,
                        title: this.titleAttr || null,
                    },
                },
                'text',
            ),
            h(
                EsPopover,
                {
                    attrs: {
                        id: 'esPopover',
                    },
                    props: {
                        target: 'triggerButton',
                        triggers: this.triggers,
                        show: this.show,
                        customClass: this.customClass,
                    },
                },
                [h('template', { slot: 'title' }, this.$slots.title), this.$slots.default || ''],
            ),
        ]);
    },
};

describe('EsPopover', () => {
    const originalCreateRange = document.createRange;
    const origGetBCR = Element.prototype.getBoundingClientRect;

    beforeEach(() => {
        // https://github.com/FezVrasta/popper.js/issues/478#issuecomment-407422016
        // Hack to make Popover not bork out during tests
        // Note popover still does not do any positioning calculation in JSDOM though
        // So we cannot test actual positioning, just detect when it is open
        document.createRange = () => ({
            setStart: () => {},
            setEnd: () => {},
            commonAncestorContainer: {
                nodeName: 'BODY',
                ownerDocument: document,
            },
        });
        // Mock `getBoundingClientRect()` so that the `isVisible(el)` test returns `true`
        // Needed for visibility checks of trigger element, etc
        Element.prototype.getBoundingClientRect = jest.fn(() => ({
            width: 24,
            height: 24,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }));
    });

    afterEach(async () => {
        // Reset overrides
        jest.setTimeout(() => {
            document.createRange = originalCreateRange;
            Element.prototype.getBoundingClientRect = origGetBCR;
            waitRAF();
        }, 10000);
    });

    it('has expected default structure and props', async () => {
        const wrapper = mount(App, {
            attachTo: document.body,
            propsData: {
                triggers: 'click',
                customClass: 'es-popover-light',
            },
            slots: {
                title: 'title',
                default: 'content',
            },
        });
        expect(wrapper.vm).toBeDefined();
        await waitNT(wrapper.vm);

        expect(wrapper.element.tagName).toBe('ARTICLE');
        expect(wrapper.attributes('id')).toBeDefined();
        expect(wrapper.attributes('id')).toBe('wrapper');

        // The trigger button
        const $button = wrapper.find('button');
        expect($button.exists()).toBe(true);
        expect($button.attributes('id')).toBeDefined();
        expect($button.attributes('id')).toBe('triggerButton');
        expect($button.attributes('aria-describedby')).toBeUndefined();

        // <es-popover> wrapper
        const $popover = wrapper.findComponent(EsPopover);
        expect($popover.exists()).toBe(true);
        expect($popover.element.nodeType).toEqual(Node.COMMENT_NODE);
        expect($popover.selector.props.show.default).toBe(false);
        expect($popover.selector.props.placement.default).toBe('auto');
        expect($popover.selector.props.triggers.default).toBe('focus');
        expect($popover.selector.props.customClass.default).toBe('es-popover-dark');
        expect($popover.props().target).toBe('triggerButton');
        expect($popover.props().customClass).toBe('es-popover-light');

        // Close button on popover
        const $closeButton = $popover.findComponent(EsButton);
        expect($closeButton).not.toBeNull();

        // XIcon on popover
        const $xIcon = $popover.findComponent(XIcon);
        expect($xIcon).not.toBeNull();

        wrapper.destroy();
    });

    it('initially open has expected structure', async () => {
        jest.useFakeTimers();
        const wrapper = mount(App, {
            attachTo: document.body,
            propsData: {
                triggers: 'click',
                show: true,
            },
            slots: {
                title: 'title',
                default: 'content',
            },
        });

        expect(wrapper.vm).toBeDefined();
        jest.setTimeout(() => {
            waitNT(wrapper.vm);
            waitRAF();
            waitNT(wrapper.vm);
            waitRAF();
            jest.runOnlyPendingTimers();
            waitNT(wrapper.vm);
        }, 10000);

        expect(wrapper.element.tagName).toBe('ARTICLE');
        expect(wrapper.attributes('id')).toBeDefined();
        expect(wrapper.attributes('id')).toBe('wrapper');

        // The trigger button
        const $button = wrapper.find('button');
        expect($button.exists()).toBe(true);
        expect($button.attributes('id')).toBeDefined();
        expect($button.attributes('id')).toBe('triggerButton');

        // <es-popover> wrapper
        const $popover = wrapper.findComponent(EsPopover);
        expect($popover.props().show).toBe(true);
        expect($popover.exists()).toBe(true);
        expect($popover.element.nodeType).toEqual(Node.COMMENT_NODE);
        expect($popover.props().show).toBe(true);

        // Hide the Popover
        await wrapper.setProps({
            show: false,
        });
        jest.setTimeout(() => {
            waitNT(wrapper.vm);
            waitRAF();
            waitNT(wrapper.vm);
            waitRAF();
            jest.runOnlyPendingTimers();
        }, 10000);

        // Popover element should not be in the document
        expect($popover.props().show).toBe(false);

        wrapper.destroy();
    });
});

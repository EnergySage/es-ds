import { mount } from '@vue/test-utils';
import EsViewMore from '@/src/lib-components/molecules/EsViewMore.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsViewMore', () => {
    const defaultText = 'Hello world!';
    const htmlText = '<h1>Hello world!</h1>';

    // Basic test; should exist for most components
    test('<EsViewMore />', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                length: 20,
                content: 'Lorem ipsum dolor amet.',
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // =========== Basic Tests ===========
    test('character truncation breaks at correct spot', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 8,
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('Hello wo...');
    });

    test('text shorter than length is not truncated', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 20,
            },
        });

        // If there is no truncation, we don't show clamp button
        expect(wrapper.find('button').exists()).toBe(false);

        expect(wrapper.text()).toMatch(defaultText);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('<EsViewMore clamp="testMore"', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 6,
                clamp: 'testMore',
            },
        });

        const showMoreButton = wrapper.findComponent('button');

        expect(showMoreButton.text()).toMatch('testMore');
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('<EsViewMore less="testLess', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 6,
                less: 'testLess',
            },
        });

        const showMoreButton = wrapper.findComponent('button');

        await showMoreButton.trigger('click');

        expect(showMoreButton.text()).toMatch('testLess');
        expect(wrapper.html()).toMatchSnapshot();
    });

    // =========== HTML truncation tests ===========
    test('character truncation with HTML tags only truncates text content', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: htmlText,
                length: 1,
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('H...');
        expect(wrapper.html()).toMatch('<h1>H...</h1>');
    });

    // =========== $emit tests ===========
    test('"Show more" button emits on click', async () => {
        const click = jest.fn();
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            listeners: {
                click,
            },
            propsData: {
                content: defaultText,
                length: 10,
            },
        });

        const showMoreButton = wrapper.findComponent('button');

        showMoreButton.trigger('click');

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.emitted('click')).toBeTruthy();
    });

    test('"Show more" does not emit if not listening for it', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 10,
            },
        });

        const showMoreButton = wrapper.findComponent('button');

        showMoreButton.trigger('click');

        await wrapper.vm.$nextTick();

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.emitted('click')).toBeFalsy();
    });
});

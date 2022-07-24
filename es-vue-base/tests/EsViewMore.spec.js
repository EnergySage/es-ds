import { mount } from '@vue/test-utils';
import EsViewMore from '@/src/lib-components/EsViewMore.vue';
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
    test('wordFit truncation breaks at correct spot', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 6,
                break: 'wordFit',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('Hello...');
    });

    test('character truncation breaks at correct spot', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 8,
                break: 'character',
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
                break: 'character',
            },
        });

        // If there is no truncation, we don't show clamp button
        expect(wrapper.find('button').exists()).toBe(false);

        expect(wrapper.text()).toMatch(defaultText);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('clicking "Show More" button reveals more text', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 6,
                break: 'wordFit',
            },
        });
        const showMoreButton = wrapper.findComponent('button');

        // Confirm starts truncated
        expect(wrapper.text()).toMatch('Hello...');

        await showMoreButton.trigger('click');

        // After click, all text is shown
        expect(wrapper.text()).toMatch(defaultText);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('clicking "Show Less" button hides text to the break point', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: defaultText,
                length: 6,
                break: 'wordFit',
            },
        });
        const showMoreButton = wrapper.findComponent('button');

        // Starts truncated
        expect(wrapper.text()).toMatch('Hello...');

        // Click to show all text
        await showMoreButton.trigger('click');

        // After click, all text is shown
        expect(wrapper.text()).toMatch(defaultText);

        // Click again to hide text
        await showMoreButton.trigger('click');

        // Confirm text hidden again
        expect(wrapper.text()).toMatch('Hello...');
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
                break: 'character',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('H...');
        expect(wrapper.html()).toMatch('<h1>H...</h1>');
    });

    test('wordFit truncation with HTML tags only truncates text content', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: htmlText,
                length: 1,
                break: 'wordFit',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('Hello...');
        expect(wrapper.html()).toMatch('<h1>Hello...</h1>');
    });

    test('wordCount truncation with HTML tags only truncates text content', async () => {
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: htmlText,
                length: 1,
                break: 'wordCount',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('Hello...');
        expect(wrapper.html()).toMatch('<h1>Hello...</h1>');
    });

    // =========== wordFit break edge case tests ===========
    test('wordFit truncation works with one character', async () => {
        const oneCharacterText = 'H';
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: oneCharacterText,
                length: 10,
                break: 'wordFit',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('H');
    });

    test('wordFit truncation with only one word that is longer than length will render word', async () => {
        const oneWordText = 'Hello';
        const wrapper = mount(EsViewMore, {
            ...jestVue,
            propsData: {
                content: oneWordText,
                length: 1,
                break: 'wordFit',
            },
        });

        expect(wrapper.html()).toMatchSnapshot();
        expect(wrapper.text()).toMatch('Hello');
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

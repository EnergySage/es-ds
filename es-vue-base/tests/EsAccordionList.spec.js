import { mount } from '@vue/test-utils';
import EsAccordionList from '@/src/lib-components/EsAccordionList.vue';
import EsAccordion from '@/src/lib-components/EsAccordion.vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsAccordion', () => {
    // Basic test; should exist for most components
    test('<EsAccordionList />', async () => {
        const wrapper = mount(EsAccordionList, {
            ...jestVue,
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();

        // verify prop values are their default values
        expect(wrapper.props('allowMultipleExpand')).toBe(false);
        expect(wrapper.props('initialExpandedId')).toBe('');
    });

    test('EsAccordionList mounts with initial expand; collapse also works', async () => {
        const id = 'accordion-id';
        const title = 'My Title';
        const content = 'My content.';
        const wrapper = mount(EsAccordionList, {
            ...jestVue,
            propsData: {
                initialExpandedId: id,
            },
            slots: {
                default: `
                    <es-accordion id="${id}">
                        <template #title>${title}</template>
                        <p>${content}</p>
                    </es-accordion>
                `,
            },
            stubs: {
                'es-accordion': EsAccordion,
            },
        });

        // verify prop value is correct
        expect(wrapper.props('initialExpandedId')).toBe(id);

        // verify snapshot is correct
        expect(wrapper.html()).toMatchSnapshot();

        // verify title slot
        const button = wrapper.findComponent(EsButton);
        expect(button.text()).toContain(title);

        // verify title and content slots together
        expect(wrapper.text()).toBe(`${title}   ${content}`);

        // verify that the content is visible
        const paragraph = wrapper.find('p');
        expect(paragraph.exists()).toBe(true);
        expect(paragraph.isVisible()).toBe(true);

        // collapse the accordion
        await button.trigger('click');

        // verify that the content is not visible anymore
        expect(paragraph.isVisible()).toBe(false);
    });

    test('EsAccordionList expands one item and collapses another', async () => {
        const accordions = [
            {
                id: 'accordion-id-1',
                title: 'My Title 1',
                content: 'My content 1.',
            },
            {
                id: 'accordion-id-2',
                title: 'My Title 2',
                content: 'My content 2.',
            },
        ];

        const wrapper = mount(EsAccordionList, {
            ...jestVue,
            propsData: {
                initialExpandedId: accordions[1].id,
            },
            slots: {
                default: accordions.map((accordion) => `
                    <es-accordion id="${accordion.id}">
                        <template #title>${accordion.title}</template>
                        <p>${accordion.content}</p>
                    </es-accordion>
                `).join(''),
            },
            stubs: {
                'es-accordion': EsAccordion,
            },
        });

        // verify prop value is correct
        expect(wrapper.props('initialExpandedId')).toBe(accordions[1].id);

        // verify snapshot is correct
        expect(wrapper.html()).toMatchSnapshot();

        // verify the first item is not expanded
        const firstItem = wrapper.find(`#${accordions[0].id}`);
        expect(firstItem.exists()).toBe(true);
        const firstItemContent = firstItem.find('p');
        expect(firstItemContent.exists()).toBe(true);
        expect(firstItemContent.isVisible()).toBe(false);

        // verify the second item is expanded
        const secondItem = wrapper.find(`#${accordions[1].id}`);
        expect(secondItem.exists()).toBe(true);
        const secondItemContent = secondItem.find('p');
        expect(secondItemContent.exists()).toBe(true);
        expect(secondItemContent.isVisible()).toBe(true);

        // find and click the first item's button to expand it
        const firstAccordion = wrapper.findAllComponents(EsAccordion).at(0);
        expect(firstAccordion.exists()).toBe(true);
        const firstButton = firstAccordion.findComponent(EsButton);
        expect(firstButton.exists()).toBe(true);
        await firstButton.trigger('click');

        // verify the first item is expanded
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is not expanded
        expect(secondItemContent.isVisible()).toBe(false);
    });

    test('EsAccordionList performs multi-expand correctly', async () => {
        const accordions = [
            {
                id: 'accordion-id-1',
                title: 'My Title 1',
                content: 'My content 1.',
            },
            {
                id: 'accordion-id-2',
                title: 'My Title 2',
                content: 'My content 2.',
            },
        ];

        const wrapper = mount(EsAccordionList, {
            ...jestVue,
            propsData: {
                allowMultipleExpand: true,
                initialExpandedId: accordions[0].id,
            },
            slots: {
                default: accordions.map((accordion) => `
                    <es-accordion id="${accordion.id}">
                        <template #title>${accordion.title}</template>
                        <p>${accordion.content}</p>
                    </es-accordion>
                `).join(''),
            },
            stubs: {
                'es-accordion': EsAccordion,
            },
        });

        // verify prop values are correct
        expect(wrapper.props('allowMultipleExpand')).toBe(true);
        expect(wrapper.props('initialExpandedId')).toBe(accordions[0].id);

        // verify snapshot is correct
        expect(wrapper.html()).toMatchSnapshot();

        // verify the first item is expanded
        const firstItem = wrapper.find(`#${accordions[0].id}`);
        expect(firstItem.exists()).toBe(true);
        const firstItemContent = firstItem.find('p');
        expect(firstItemContent.exists()).toBe(true);
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is not expanded
        const secondItem = wrapper.find(`#${accordions[1].id}`);
        expect(secondItem.exists()).toBe(true);
        const secondItemContent = secondItem.find('p');
        expect(secondItemContent.exists()).toBe(true);
        expect(secondItemContent.isVisible()).toBe(false);

        // find and click the second item's button to expand it
        const secondAccordion = wrapper.findAllComponents(EsAccordion).at(1);
        expect(secondAccordion.exists()).toBe(true);
        const secondButton = secondAccordion.findComponent(EsButton);
        expect(secondButton.exists()).toBe(true);
        await secondButton.trigger('click');

        // verify the first item is expanded
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is also expanded
        expect(secondItemContent.isVisible()).toBe(true);
    });
});

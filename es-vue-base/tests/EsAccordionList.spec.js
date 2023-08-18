import { mount } from '@vue/test-utils';
import EsAccordionList from '@/src/lib-components/EsAccordionList.vue';
import EsAccordion from '@/src/lib-components/EsAccordion.vue';
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
        const heading = wrapper.find('h3');
        expect(heading.text()).toContain(title);

        // verify title and content slots together
        expect(wrapper.text()).toBe(`${title}  collapse  ${content}`);

        // verify that the content is visible
        const paragraph = wrapper.find('p');
        expect(paragraph.exists()).toBe(true);
        expect(paragraph.isVisible()).toBe(true);

        const button = wrapper.find('button');
        // collapse the accordion
        await button.trigger('click');

        // verify that the content is not visible anymore
        expect(paragraph.isVisible()).toBe(false);
    });

    test('EsAccordionList items has the correct heading tag', async () => {
        const id = 'accordion-id';
        const title = 'My Title';
        const content = 'My content.';
        const headingTag = 'h4';
        const wrapper = mount(EsAccordionList, {
            ...jestVue,
            propsData: {
                initialExpandedId: id,
            },
            slots: {
                default: `
                    <es-accordion id="${id}" headingTag="${headingTag}">
                        <template #title>${title}</template>
                        <p>${content}</p>
                    </es-accordion>
                `,
            },
            stubs: {
                'es-accordion': EsAccordion,
            },
        });
        const heading = wrapper.find('h4');
        expect(heading.exists()).toBe(true);
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
                default: accordions
                    .map(
                        (accordion) => `
                    <es-accordion id="${accordion.id}">
                        <template #title>${accordion.title}</template>
                        <p>${accordion.content}</p>
                    </es-accordion>
                `,
                    )
                    .join(''),
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
        const firstButton = firstAccordion.find('button');
        expect(firstButton.exists()).toBe(true);
        await firstButton.trigger('click');

        // verify the first item is expanded
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is not expanded
        expect(secondItemContent.isVisible()).toBe(false);
    });

    test('EsAccordionList v-model test', async () => {
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

        const wrapper = mount({
            ...jestVue,
            data() {
                return {
                    expandedId: accordions[0].id,
                };
            },
            methods: {
                expandFirstAccordion() {
                    this.expandedId = accordions[0].id;
                },
            },
            template: `
                <es-accordion-list data-testid="testInput" id="testId" v-model="expandedId">
                    <es-accordion id="${accordions[0].id}">
                        <template #title>
                            ${accordions[0].title}
                        </template>
                        <p>${accordions[0].content}</p>
                    </es-accordion>
                    <es-accordion id="${accordions[1].id}">
                        <template #title>
                            ${accordions[1].title}
                        </template>
                        <p>${accordions[1].content}</p>
                    </es-accordion>
                </es-accordion-list>
            `,
            components: {
                EsAccordion,
                EsAccordionList,
            },
            stubs: {
                'es-accordion': EsAccordion,
                'es-accordion-list': EsAccordionList,
            },
        });

        // verify snapshot is correct
        expect(wrapper.html()).toMatchSnapshot();

        // verify the first item is expanded
        const firstItem = wrapper.find(`#${accordions[0].id}`);
        expect(firstItem.exists()).toBe(true);
        const firstItemContent = firstItem.find('p');
        expect(firstItemContent.exists()).toBe(true);
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is collapsed
        const secondItem = wrapper.find(`#${accordions[1].id}`);
        expect(secondItem.exists()).toBe(true);
        const secondItemContent = secondItem.find('p');
        expect(secondItemContent.exists()).toBe(true);
        expect(secondItemContent.isVisible()).toBe(false);

        // find and click the second item's button to expand it
        const secondAccordion = wrapper.findAllComponents(EsAccordion).at(1);
        expect(secondAccordion.exists()).toBe(true);
        const secondButton = secondAccordion.find('button');
        expect(secondButton.exists()).toBe(true);
        await secondButton.trigger('click');

        // verify the v-model data is now set to the second accordion's id
        expect(wrapper.vm.expandedId).toBe(accordions[1].id);

        // verify the first item is collapsed
        expect(firstItemContent.isVisible()).toBe(false);

        // verify the second item is expanded
        expect(secondItemContent.isVisible()).toBe(true);

        // programmatically set the v-model data to the id of the first accordion
        await wrapper.vm.expandFirstAccordion();

        // verify the data value is now set to the first accordion's id
        expect(wrapper.vm.expandedId).toBe(accordions[0].id);

        // verify the first item is expanded
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is collapsed
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
                default: accordions
                    .map(
                        (accordion) => `
                    <es-accordion id="${accordion.id}">
                        <template #title>${accordion.title}</template>
                        <p>${accordion.content}</p>
                    </es-accordion>
                `,
                    )
                    .join(''),
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
        const secondButton = secondAccordion.findComponent('button');
        expect(secondButton.exists()).toBe(true);
        await secondButton.trigger('click');

        // verify the first item is expanded
        expect(firstItemContent.isVisible()).toBe(true);

        // verify the second item is also expanded
        expect(secondItemContent.isVisible()).toBe(true);
    });
});

<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

interface Props {
    allowMultipleExpand?: boolean;
    initialExpandedId?: string;
    variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
    allowMultipleExpand: false,
    initialExpandedId: '',
    variant: 'default',
});

const model = defineModel<string>();

// get the list of elements provided as children to the default slot
const initialChildren = useSlots().default?.() || [];
const children: any[] = [];
initialChildren.forEach((child) => {
    // unless this has a v-for element and we instead need to access its children
    if (typeof child.type === 'symbol' && Array.isArray(child.children)) {
        children.push(...child.children);
    } else {
        children.push(child);
    }
});

type ActiveChildren = null | number | number[];

const activeIndex: Ref<ActiveChildren> = ref(null);

watch(model, (newVal) => {
    if (newVal) {
        activeIndex.value = children.findIndex((child) => child.props.id === newVal);
    }
});

const accordionTabs = children.map((child, index) => {
    if (child.props.id === props.initialExpandedId || child.props.id === model.value) {
        if (props.allowMultipleExpand) {
            activeIndex.value = [index];
        } else {
            activeIndex.value = index;
        }
    }
    return child.children;
});

const updateActiveIndex = (index: ActiveChildren) => {
    if (model.value) {
        if (typeof index === 'number') {
            model.value = children[index]?.props.id || '';
        } else if (index === null) {
            model.value = '';
        }
        // There's another case where index will be an array. In that case, v-model is unsupported as specified
        // in the documentation, so no update is made
    }
};
</script>

<template>
    <!-- @vue-expect-error PrimeVue's type information is wrong -->
    <accordion
        :multiple="allowMultipleExpand"
        :active-index="activeIndex"
        :pt="{
            root: {
                class: `es-accordion-list es-accordion-list--${variant}`,
            },
        }"
        @update:active-index="updateActiveIndex">
        <template #collapseicon> </template>
        <template #expandicon> </template>
        <accordion-tab
            v-for="(tab, index) in accordionTabs"
            :key="index"
            :pt="{
                root: ({ context }) => ({
                    class: [
                        `es-accordion es-accordion--${variant}`,
                        {
                            expanded: context.active,
                        },
                    ],
                }),
                header: {
                    class: 'position-relative d-block',
                },
                headerAction: ({ context }) => ({
                    class: [
                        // eslint-disable-next-line max-len
                        'es-accordion-heading mb-0 align-items-center d-flex font-weight-bold justify-content-between py-100',
                        {
                            'es-accordion-heading--visible': context.active,
                            'font-size-100 px-100 px-sm-200': variant !== 'minimal',
                            'h3 px-0': variant === 'minimal',
                        },
                    ],
                }),
                transition: {
                    name: 'v-transition',
                },
                content: {
                    class: [
                        'es-accordion-content pb-25',
                        {
                            'bg-white pt-100 px-100 px-sm-200': variant !== 'minimal',
                        },
                    ],
                },
            }">
            <template #header>
                <span
                    role="heading"
                    aria-level="3"
                    :class="{ 'h3 mb-0': variant === 'minimal' }">
                    <component
                        :is="item"
                        v-for="item in tab.title()"
                        :key="item" />
                </span>
                <icon-chevron-down class="es-accordion-icon flex-shrink-0 ml-200" />
            </template>
            <component
                :is="item"
                v-for="item in tab.default()"
                :key="item" />
        </accordion-tab>
    </accordion>
</template>

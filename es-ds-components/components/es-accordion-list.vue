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

// eslint-disable-next-line vue/require-prop-types
const model = defineModel();

const children = useSlots().default?.() || [];

const activeIndex = ref();

watch(model, (newVal) => {
    if (newVal) {
        // @ts-expect-error not sure
        activeIndex.value = children.findIndex((child) => child.props.id === newVal);
    }
});

const accordionTabs = children.map((child, index) => {
    // @ts-expect-error not sure
    if (child.props.id === props.initialExpandedId || child.props.id === model.value) {
        activeIndex.value = index;
    }
    return child.children;
});

const updateActiveIndex = (index: any) => {
    if (model.value) {
        // @ts-expect-error not sure
        model.value = children[index]?.props.id || '';
    }
};
</script>

<template>
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
                    <!-- @vue-expect-error -->
                    <component
                        :is="item"
                        v-for="item in tab.title()"
                        :key="item" />
                </span>
                <icon-chevron-down class="es-accordion-icon flex-shrink-0 ml-200" />
            </template>
            <!-- @vue-expect-error -->
            <component
                :is="item"
                v-for="item in tab.default()"
                :key="item" />
        </accordion-tab>
    </accordion>
</template>

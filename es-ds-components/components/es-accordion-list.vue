<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from "primevue/accordiontab";

interface Props {
    allowMultipleExpand?: boolean;
    initialExpandedId?: string;
    variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
    allowMultipleExpand: false,
    initialExpandedId: '',
    variant: "default",
});

const model = defineModel();

const children = useSlots().default?.() || [];

const activeIndex = ref();

watch(model, (newVal, oldVal) => {
    if (newVal) {
        activeIndex.value = children.findIndex((child) => child.props.id === newVal);
    }
})

const accordionTabs = children.map((child, index) => {
    if (child.props.id === props.initialExpandedId) {
        activeIndex.value = index;
    } else if (child.props.id === model.value) {
        activeIndex.value = index;
    }
    return child.children;
});

const updateActiveIndex = (index) => {
    if (model.value) {
        model.value = children[index]?.props.id || '';
    }
};
</script>

<template>
    <accordion :multiple="allowMultipleExpand" :active-index="activeIndex" @update:active-index="updateActiveIndex" :pt="{
        root: {
            role: 'tablist',
            class: 'es-accordion-list es-accordion-list--default',
        },
    }">
        <accordion-tab v-for="(tab, index) in accordionTabs" :key="index" :pt="{
            root: ({ context }) => ({
                role: 'tab',
                class: [
                    'es-accordion es-accordion--default',
                    {
                        'expanded': context.active,
                    },
                ],
            }),
            header: {
                class: 'position-relative d-block',
            },
            headerAction: {
                class: 'es-accordion-heading mb-0 align-items-center d-flex font-weight-bold justify-content-between py-100 es-accordion-heading--visible font-size-100 px-100 px-sm-200',
            },
            transition: {
                name: 'v-transition',
            },
            content: {
                class: 'es-accordion-content pb-25 bg-white pt-100 px-100 px-sm-200',
            },
        }">
            <template #header>
                <span>
                    <component v-for="item in tab.title()" :is="item" />
                </span>
            </template>
            <component v-for="item in tab.default()" :is="item" />
        </accordion-tab>
    </accordion>
</template>

<style scoped lang="scss">
// https://vuejs.org/guide/built-ins/transition

:deep(.v-transition-enter-active), :deep(.v-transition-leave-active) {
    max-height: 100px;
    overflow: hidden;
    transition: max-height .35s ease;
}

:deep(.v-transition-enter-from), :deep(.v-transition-leave-to) {
    max-height: 0;
}
</style>

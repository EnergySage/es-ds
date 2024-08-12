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

let activeIndex;

watch(model, (newVal, oldVal) => {
    if (newVal) {
        activeIndex = children.findIndex((child) => child.props.id === newVal);
    }
})

const accordionTabs = children.map((child, index) => {
    if (child.props.id === props.initialExpandedId) {
        activeIndex = index;
    } else if (child.props.id === model.value) {
        activeIndex = index;
    }
    return child.children;
});

const updateActiveIndex = (index) => {
    if (model.value) {
        model.value = children[index].props.id;
    }
};
</script>

<template>
    <accordion :multiple="allowMultipleExpand" :active-index="activeIndex" @update:active-index="updateActiveIndex">
        <accordion-tab v-for="(tab, index) in accordionTabs" :key="index">
            <template #header>
                <span>
                    <component v-for="item in tab.title()" :is="item" />
                </span>
            </template>
            <component v-for="item in tab.default()" :is="item" />
        </accordion-tab>
    </accordion>
</template>

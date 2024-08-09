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

const children = useSlots().default?.() || [];
let activeIndex;
const accordionTabs = children.map((child, index) => {
    if (child.props.id === props.initialExpandedId) {
        activeIndex = index;
    }
    return child.children;
});
</script>

<template>
    <accordion :multiple="allowMultipleExpand" :active-index="activeIndex">
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

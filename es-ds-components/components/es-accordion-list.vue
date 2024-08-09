<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionTab from "primevue/accordiontab";
import type {VNodeArrayChildren} from "vue";

interface Props {
    allowMultipleExpand?: boolean;
    initialExpandedId?: string;
    variant?: string;
}

const props = withDefaults(defineProps<Props>(), {
    allowMultipleExpand: false,
    initialExpandedId: '0',
    variant: "default",
});

const children = useSlots().default?.() || [];
const accordionTabs = children.map((child) => {
    return child.children;
});
</script>

<template>
    <accordion>
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

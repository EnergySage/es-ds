<script setup lang="ts">
import Accordion from 'primevue/accordiontab';

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
</script>

<template>
    <accordion>
        <slot></slot>
    </accordion>
</template>

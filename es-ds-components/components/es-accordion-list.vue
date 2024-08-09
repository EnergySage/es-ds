<script setup lang="ts">
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
    <p>hey from accordion-list</p>
    <accordion>
        <slot></slot>
    </accordion>
</template>

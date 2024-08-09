<script setup lang="ts">
interface Props {
    id: string;
    headingTag?: "h3" | "h4";
}

const props = withDefaults(defineProps<Props>(), {
    headingTag: "h3",
});
</script>

<template>
    <p>hello from es-accordion</p>
    <accordion-tab>
        <slot></slot>
    </accordion-tab>
</template>

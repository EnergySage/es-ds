<script setup lang="ts">
const props = defineProps<{
    cols?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
}>();

const undefinedSize = !(props.cols || props.sm || props.md || props.lg || props.xl || props.xxl);
</script>

<template>
    <div
        :class="{
            col: undefinedSize,
            [`col-${cols}`]: cols,
            [`col-sm${sm ? `-${sm}` : ''}`]: sm !== undefined,
            [`col-md${md ? `-${md}` : ''}`]: md !== undefined,
            [`col-lg${lg ? `-${lg}` : ''}`]: lg !== undefined,
            [`col-xl${xl ? `-${xl}` : ''}`]: xl !== undefined,
            [`col-xxl${xxl ? `-${xxl}` : ''}`]: xxl !== undefined,
        }">
        <slot />
    </div>
</template>

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
            'col': undefinedSize,
            [`col-${cols}`]: cols,
            [`col-sm-${sm}`]: sm,
            [`col-md-${md}`]: md,
            [`col-lg-${lg}`]: lg,
            [`col-xl-${xl}`]: xl,
            [`col-xxl-${xxl}`]: xxl,
        }">
        <slot />
    </div>
</template>

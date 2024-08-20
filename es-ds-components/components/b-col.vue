<template>
    <div
        class="col"
        :class="{
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

<script setup lang="ts">
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const props = defineProps<{
  cols?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
  xxl?: string
}>();
</script>

<script setup lang="ts">
interface IProps {
    height?: number;
}
const props = withDefaults(defineProps<IProps>(), {
    height: 4,
});

const heightPx = computed(() => `${props.height}px`);
</script>

<template>
    <div class="d-flex w-100">
        <div class="es-color-band-item primary bg-dark-blue flex-grow-1"></div>
        <div class="es-color-band-item primary bg-warm-orange flex-grow-1"></div>
        <div class="es-color-band-item bg-blue-300 flex-grow-1"></div>
        <div class="es-color-band-item bg-blue-100 flex-grow-1"></div>
        <div class="es-color-band-item bg-success-900 flex-grow-1"></div>
        <div class="es-color-band-item bg-warning-900 flex-grow-1"></div>
    </div>
</template>

<style lang="scss" scoped>
.es-color-band-item {
    height: v-bind(heightPx);
    width: 12.5%;

    &.primary {
        width: 25%;
    }
}
</style>

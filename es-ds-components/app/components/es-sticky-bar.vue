<script setup lang="ts">
const isBarVisible = ref(true);
</script>

<template>
    <div
        class="es-sticky-bar bg-white position-fixed"
        :class="{
            'hidden': !isBarVisible
        }">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-sticky-bar {
    box-shadow: 0 1px 6px 0 rgba(34, 38, 51, 0.25);
    left: 0;
    right: 0;
    top: 0;
    transform: translateY(0%);
    z-index: 100;

    @media not (prefers-reduced-motion) {
        transition: variables.$transition-base;
    }

    &.hidden {
        transform: translateY(-100%);
    }
}
</style>

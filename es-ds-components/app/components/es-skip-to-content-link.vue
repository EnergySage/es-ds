<script setup lang="ts">
interface IProps {
    href?: string;
}
withDefaults(defineProps<IProps>(), {
    href: '#main-content',
});
</script>

<template>
    <a
        :href="href"
        class="es-skip-to-content-link font-size-75 font-weight-semibold sr-only"
        >Skip to main content</a
    >
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables';

.es-skip-to-content-link:focus-visible {
    /* increase contrast for the times when it appears above the logo */
    background-color: variables.$white;
    /* undo all the sr-only class styles */
    clip: auto;
    height: auto;
    left: 0.5rem;
    margin: 0;
    position: absolute;
    top: 0.5rem;
    width: auto;
    /* bring it above the nav so it's actually visible */
    z-index: 1001;
}
</style>

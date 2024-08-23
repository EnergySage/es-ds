<script lang="js">
export default {
    name: 'DsResponsiveTable',
}
</script>

<template>
    <div class="responsive-table">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@use "@energysage/es-ds-styles/scss/variables" as variables;
@use "@energysage/es-ds-styles/scss/mixins/breakpoints" as breakpoints;

.responsive-table {
    border-top: variables.$border-width solid variables.$border-color;
}

@include breakpoints.media-breakpoint-up(md) {
    .responsive-table {
        /* undo mobile styles */
        border-top-style: none;
    }
}
</style>

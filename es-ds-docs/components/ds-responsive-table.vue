<template>
    <div class="responsive-table">
        <slot />
    </div>
</template>

<script lang="js">
export default {
    name: 'DsResponsiveTable',
};
</script>

<style lang="scss" scoped>
@use "@energysage/es-bs-base/scss/variables" as variables;
@use "@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;

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

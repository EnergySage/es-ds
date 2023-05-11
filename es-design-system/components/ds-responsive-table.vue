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
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

.responsive-table {
    border-top: $border-width solid $border-color;
}

@include media-breakpoint-up(md) {
    .responsive-table {
        /* undo mobile styles */
        border-top-style: none;
    }
}
</style>

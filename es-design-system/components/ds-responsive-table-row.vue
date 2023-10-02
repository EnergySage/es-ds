<template>
    <div class="responsive-table-row">
        <slot />
    </div>
</template>

<script lang="js">
export default {
    name: 'DsResponsiveTableRow',
};
</script>

<style lang="scss" scoped>
@import '@energysage/es-bs-base/scss/bootstrap';
@import "@energysage/es-bs-base/scss/variables";

.responsive-table-row {
    border-bottom: $border-width solid $border-color;
    padding: 0.5rem 0.5rem 0;

    &:nth-child(even) {
        background-color: $gray-200;
    }
}

@include media-breakpoint-up(md) {
    .responsive-table-row {
        /* undo mobile styles */
        border-bottom-style: none;
        display: flex;
        padding: 0;

        &:nth-child(even) {
            background-color: transparent;
        }

        &:first-child {
            ::v-deep dl {
                display: flex;
                flex-flow: column;
            }

            ::v-deep dt {
                border-bottom: $border-width solid $border-color;
                border-top: $border-width solid $border-color;
                padding: 0.5rem 0;
            }

            ::v-deep dd {
                flex-grow: 1;
                height: auto;
            }
        }

        /* visually hide table columns within all rows except the first */
        &:not(:first-child) {
            ::v-deep dt {
                /* don't use display none because then screen readers won't read out the label */
                left: -9999em;
                position: absolute;
            }
        }

        /* zebra-stripe every odd row */
        &:nth-child(odd) {
            ::v-deep dd {
                background-color: $gray-200;
            }
        }
    }
}

</style>

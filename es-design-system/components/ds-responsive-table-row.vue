<template>
    <div
        class="responsive-table-row"
        :class="{
            'vertically-center-content': verticallyCenterContent,
            'zebra': zebraStripes
        }">
        <slot />
    </div>
</template>

<script lang="js">
export default {
    name: 'DsResponsiveTableRow',
    props: {
        verticallyCenterContent: {
            type: Boolean,
            default: false,
        },
        zebraStripes: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@use "~@energysage/es-bs-base/scss/variables" as variables;
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;

.responsive-table-row {
    border-bottom: variables.$border-width solid variables.$border-color;
    padding: 0.5rem 0.5rem 0;

    &.vertically-center-content ::v-deep dd,
    &.vertically-center-content ::v-deep dt {
        display: flex;
        flex-flow: column;
        justify-content: center;
    }

    &.zebra:nth-child(even) {
        background-color: variables.$gray-50;
    }

    &:last-child {
        border-bottom-style: none;
    }
}

@include breakpoints.media-breakpoint-up(md) {
    .responsive-table-row {
        /* undo mobile styles */
        border-bottom-style: none;
        display: flex;
        padding: 0;

        &.zebra:nth-child(even) {
            background-color: transparent;
        }

        &:first-child {
            ::v-deep dl {
                display: flex;
                flex-flow: column;
            }

            ::v-deep dt {
                border-bottom: variables.$border-width solid variables.$border-color;
                border-top: variables.$border-width solid variables.$border-color;
                padding-bottom: 0.5rem;
                padding-top: 0.5rem;
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

        /* zebra-stripe every odd row, if enabled */
        &.zebra:nth-child(odd) {
            ::v-deep dd {
                background-color: variables.$gray-50;
            }
        }

        /* if zebra striping disabled, add a border below each row */
        &:not(.zebra):not(:last-child) ::v-deep .responsive-table-column {
            border-bottom: variables.$border-width solid variables.$border-color;
        }
    }
}

</style>

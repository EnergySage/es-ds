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
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

.responsive-table-row {
    border-bottom: $border-width solid $border-color;
    padding: 0.5rem 0.5rem 0;

    &:nth-child(even) {
        background-color: $gray-200;
    }

    ::v-deep dl {
        display: flex;
        margin: 0;

        dt {
            width: 30%;
        }

        dd {
            width: 70%;
        }
    }
}

@include media-breakpoint-up(sm) {
    .responsive-table-row {
        ::v-deep dl {
            dt {
                width: 24%;
            }

            dd {
                width: 76%;
            }
        }
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

        ::v-deep dl,
        ::v-deep dt,
        ::v-deep dd {
            margin: 0;
            padding: 0;
        }

        /* ensure background is full height of row */
        ::v-deep dd {
            height: 100%;
            padding: 0.5rem 0;
        }

        /* undo mobile styles */
        ::v-deep dl {
            display: block;

            dt,
            dd {
                width: auto;
            }
        }

        /* column widths */
        ::v-deep dl:nth-child(1) {
            width: 26%;
        }

        ::v-deep dl:nth-child(2) {
            width: 12%;
        }

        ::v-deep dl:nth-child(3) {
            width: 62%;
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

        /* side padding on left-most cells */
        ::v-deep dl:first-child {
            dd,
            dt {
                padding-left: 0.5rem;
            }
        }

        /* side padding on right-most cells */
        ::v-deep dl:last-child {
            dd,
            dt {
                padding-right: 0.5rem;
            }
        }
    }
}

@include media-breakpoint-up(xl) {
    .responsive-table-row {
        /* column widths */
        ::v-deep dl:nth-child(1) {
            width: 20%;
        }

        ::v-deep dl:nth-child(2) {
            width: 10%;
        }

        ::v-deep dl:nth-child(3) {
            width: 70%;
        }
    }
}

@include media-breakpoint-up(xxl) {
    .responsive-table-row {
        /* column widths */
        ::v-deep dl:nth-child(1) {
            width: 16%;
        }

        ::v-deep dl:nth-child(2) {
            width: 10%;
        }

        ::v-deep dl:nth-child(3) {
            width: 74%;
        }
    }
}

</style>

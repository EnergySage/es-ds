<template>
    <dl :class="columnClass">
        <dt>
            <slot name="name" />
        </dt>
        <dd>
            <slot name="value" />
        </dd>
    </dl>
</template>

<script lang="js">
export default {
    name: 'DsResponsiveTableColumn',
    props: {
        md: {
            type: String,
            default: '4',
        },
        lg: {
            type: String,
            default: '',
        },
        xl: {
            type: String,
            default: '',
        },
        xxl: {
            type: String,
            default: '',
        },
    },
    computed: {
        columnClass() {
            const classes = [
                'responsive-table-column',
                'col',
                `col-md-${this.md}`,
            ];

            if (this.lg) {
                classes.push(`col-lg-${this.lg}`);
            }

            if (this.xl) {
                classes.push(`col-xl-${this.xl}`);
            }

            if (this.xxl) {
                classes.push(`col-xxl-${this.xxl}`);
            }

            return classes.join(' ');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

.responsive-table-column {
    display: flex;
    margin: 0;
    /* override the padding of the various col classes */
    padding: 0 !important;

    dt {
        width: 30%;
    }

    dd {
        width: 70%;
    }
}

@include media-breakpoint-up(sm) {
    .responsive-table-column {
        dt {
            width: 24%;
        }

        dd {
            width: 76%;
        }
    }
}

@include media-breakpoint-up(md) {
    .responsive-table-column {
        /* undo mobile styles */
        display: block;
        margin: 0;
        padding: 0;

        dt,
        dd {
            margin: 0;
            padding: 0;
            width: auto;
        }

        /* ensure background is full height of row */
        dd {
            height: 100%;
            padding: 0.5rem 0;
        }

        /* side padding on left-most cells */
        &:first-child {
            dd,
            dt {
                padding-left: 0.5rem;
            }
        }

        /* side padding on right-most cells */
        &:last-child {
            dd,
            dt {
                padding-right: 0.5rem;
            }
        }
    }
}
</style>

<template>
    <b-table
        table-class="font-size-75 font-size-md-100"
        responsive
        class="data-table border"
        :class="{ rounded }"
        :no-border-collapse="stickyFirstCol"
        :sticky-header="stickyHeader"
        :fields="computedFields"
        :items="items" />
</template>

<script lang="js">
export default {
    name: 'EsDataTable',
    props: {
        fields: {
            type: Array,
            default: null,
        },
        items: {
            type: Array,
            required: true,
        },
        rounded: {
            type: Boolean,
            default: false,
        },
        stickyFirstCol: {
            type: Boolean,
            default: false,
        },
        stickyHeader: {
            type: [Boolean, String],
            default: false,
        },
    },
    computed: {
        computedFields() {
            // Set 1st column as sticky if property set
            if (!this.fields) {
                // Leave fields to be interpolated if not provided
                return null;
            }
            return this.fields.map((field, index) => {
                if (index === 0) {
                    let fieldObj;
                    if (typeof field === 'string') {
                        fieldObj = { key: field };
                    } else {
                        fieldObj = { ...field };
                    }
                    fieldObj.stickyColumn = this.stickyFirstCol;
                    return fieldObj;
                }
                return field;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import '~@energysage/es-bs-base/scss/variables';

.data-table {
    ::v-deep th {
        font-weight: $font-weight-bold;
    }

    ::v-deep {
        td, th {
            border-right: 1px solid $gray-300;
            padding-block: 8px;

            .table-b-table-default {
                color: $black;
            }

            &:last-of-type {
                border-right: 0;
            }
        }
    }

    ::v-deep .table thead th {
        background-color: $gray-200;
        border-bottom: 0;
        border-top: 0;
        color: $black;
        padding-block: 8px;

        @include media-breakpoint-up(md) {
            color: $gray-700;
        }
    }

    ::v-deep tbody tr {
        color: $black;

        .table-b-table-default {
            color: $black;
        }
    }

    ::v-deep tbody tr:nth-of-type(odd) {
        background-color: $white;

        .table-b-table-default {
            background-color: $white;
        }
    }

    ::v-deep tbody tr:nth-of-type(even) {
        background-color: $gray-150;

        .table-b-table-default {
            background-color: $gray-150;
        }
    }
}
</style>

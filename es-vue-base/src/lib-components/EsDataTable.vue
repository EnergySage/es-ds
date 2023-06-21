<template>
    <b-table
        table-class="font-size-75 font-size-md-100"
        class="data-table border"
        :class="{ rounded }"
        :no-border-collapse="stickyFirstCol"
        :responsive="responsive"
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
        responsive: {
            type: Boolean,
            default: false,
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
            type: Boolean,
            default: false,
        },
    },
    computed: {
        computedFields() {
            return null;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import '~@energysage/es-bs-base/scss/variables';

.data-table {
    ::v-deep th {
        border-right: 1px solid $gray-300;
        font-weight: $font-weight-bold;

        &:last-of-type {
            border-right: 0;
        }
    }

    ::v-deep td {
        border-right: 1px solid $gray-300;

        .table-b-table-default {
            color: $black;
        }

        &:last-of-type {
            border-right: 0;
        }
    }

    ::v-deep .table thead th {
        background-color: $gray-200;
        border-bottom: 0;
        border-top: 0;
        color: $black;

        @include media-breakpoint-up(lg) {
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

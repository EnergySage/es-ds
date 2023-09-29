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
    mounted() {
        // HACK: boostrap-vue applies position-relative to non-sortable columns when sorted.
        // This can dynamically remove that class when used with a mutation observer.
        function removeClass(mutations) {
            // If position-relative class was added in a mutation, remove it
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.target.classList.contains('position-relative')) {
                    mutation.target.classList.remove('position-relative');
                }
            });
        }
        if (this.stickyHeader) {
            // Remove position-relative from headers of sortable columns so they will be sticky
            const headers = this.$el.querySelector('thead').querySelector('tr').querySelectorAll('th');
            headers.forEach((element) => {
                element.classList.remove('position-relative');
            });

            // Watch header row for changes to attirbutes in its subtree
            const headerRow = this.$el.querySelector('thead').querySelector('tr');
            const observeOptions = { attributes: true, subtree: true };
            // Start watching & reacting to changes on header row
            const observer = new MutationObserver(removeClass);
            observer.observe(headerRow, observeOptions);
        }
    },
};
</script>
<style lang="scss" scoped>
@use "sass:map";
@import '@energysage/es-bs-base/scss/bootstrap';
@import '@energysage/es-bs-base/scss/variables';

.data-table {
    :deep(th) {
        font-weight: $font-weight-bold;
    }

    :deep(td, th) {
        border-right: 1px solid $gray-300;
        padding-block: map.get($spacers, 50);

        .table-b-table-default {
            color: $black;
        }

        &:last-of-type {
            border-right: 0;
        }
    }

    :deep(.table thead th) {
        background-color: $gray-200;
        border-bottom: 0;
        border-top: 0;
        color: $black;
        padding-block: map.get($spacers, 50);

        @include media-breakpoint-up(md) {
            color: $gray-700;
        }
    }

    :deep(tbody tr) {
        color: $black;

        .table-b-table-default {
            color: $black;
        }
    }

    :deep(tbody tr:nth-of-type(odd)) {
        background-color: $white;

        .table-b-table-default {
            background-color: $white;
        }
    }

    :deep(tbody tr:nth-of-type(even)) {
        background-color: $gray-150;

        .table-b-table-default {
            background-color: $gray-150;
        }
    }
}
</style>

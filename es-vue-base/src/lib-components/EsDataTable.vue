<template>
    <b-table
        table-class="font-size-75 font-size-md-100"
        responsive
        class="border table__data-table"
        :class="{ rounded }"
        :no-border-collapse="stickyFirstCol"
        :sticky-header="stickyHeader"
        :fields="computedFields"
        :items="items" />
</template>

<script lang="js">
import { BTable } from 'bootstrap-vue';

export default {
    name: 'EsDataTable',
    components: {
        BTable,
    },
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

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps({
    fields: {
        type: Array,
        default: null,
    },
    items: {
        type: Array,
        required: true,
    },
    stickyFirstCol: {
        type: Boolean,
        default: false,
    },
    stickyHeader: {
        type: [Boolean, String],
        default: false,
    },
});

const checkFrozenRow = (index) => {
    if (index === 0 && props.stickyFirstCol) {
        return true;
    }
    return false;
};

const label = (col) => {
    if (typeof col === 'string') {
        return startCase(col);
    }
    return col?.label ? col.label : startCase(col?.key);
};

// Code is taken from BootStrap Vue to implemnt <b-table> feature that automatically
// samples the first row to extract field name and "humanize" by converting kebab-case,
// snake_case, and camelCase to individual words and capitalizes each word.
// Doc: https://bootstrap-vue.org/docs/components/table
// Source Code: https://github.com/bootstrap-vue/bootstrap-vue/blob/5173dd19f6f46dc9d125cd7233fb59ccd2ef9296/src/utils/string.js#L30
const startCase = (str) => str
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, (str, $1, $2) => `${$1} ${$2}`)
    .replace(/(\s|^)(\w)/g, (str, $1, $2) => $1 + $2.toUpperCase());

const columns = computed(() => {
    if (props.fields) {
        return props.fields;
    }
    return Object.keys(props.items[0]);
});

const scrollHeight = computed(() => {
    if (props.stickyHeader) {
        if (typeof props.stickyHeader === 'string') {
            return props.stickyHeader;
        }
        return '300px';
    }
    return '';
});

</script>
<template>
    <data-table
        scrollable
        :pt="{
            table: {
                class: 'font-size-75 font-size-md-100',
                style: 'border-collapse: separate; border-spacing: 0;'
            },
            wrapper: {
                style: 'border-radius: inherit'
            },
            thead:{
                style: 'top: 0px; z-index: 2'
            }
        }"
        :value="props.items"
        class="border table__data-table table-spacing table"
        :scroll-height="scrollHeight">
        <column
            v-for="(col,index) of columns"
            :key="col?.key ? col.key : col"
            :field="col?.key ? col.key : col"
            :header="label(col)"
            :sortable="col?.sortable"
            :frozen="checkFrozenRow(index)"
            align-frozen="left"
            :pt="{
                sortIcon:{
                    style: 'display: none'
                },
                headerCell: (options)  => ({
                    class:[
                        {
                            'sortable': options.props.sortable,
                            'stickyFirstColHeader': options.props.frozen,
                        }
                    ],
                }),
                bodyCell: (options)  => ({
                    class:[
                        {
                            'stickyFirstCol': options.props.frozen,
                        }
                    ],
                }),
            }">
        </column>
    </data-table>
</template>
<style scoped lang="scss">
:deep(.stickyFirstColHeader){
    position: sticky !important;
}
:deep(.stickyFirstCol){
    position: sticky !important;
    background: inherit;
}
:deep(.sortable){
    cursor: pointer !important;
}
</style>

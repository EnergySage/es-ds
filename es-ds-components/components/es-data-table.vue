<template>
    <DataTable
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
        :scrollHeight="scrollHeight"
    >
    <Column v-for="(col,index) of columns" :key="col?.key ? col.key : col" :field="col?.key ? col.key : col" :header="label(col)" 
        :sortable="col?.sortable"
        :frozen="checkFrozenRow(index)" alignFrozen="left"
        :pt="{
            sortIcon:{
                style: 'display: none'
            }, 
            headerCell: (options)  => ({
                class:[
                    {
                        'stickyFirstCol': options.props.frozen,
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
        }"
        >
    </Column>
    </DataTable>
</template>
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
    if (typeof col == 'string') {
        return capitalizeFirstLetter(col);
    }
    return col?.label? col.label : capitalizeFirstLetter(col?.key);
};

// Make first letter of string uppercase
const capitalizeFirstLetter = (string) => {
    if (typeof string == 'string') {
        return string.charAt(0).toUpperCase() + string.slice(1);;
    }
    return string;
    
}
const columns = computed(() => {
    if (props.fields ) {
        return props.fields;
    }
    
    return Object.keys(props.items[0]);
});

const scrollHeight = computed(() => {
    if (props.stickyHeader) {
        if(typeof props.stickyHeader == 'string'){
            return props.stickyHeader;
        }
        return '300px';
    }
    return '';
});

</script>
<style>
.stickyFirstCol{
    position: sticky !important;
    background: inherit;
}
</style>
<!-- :no-border-collapse="stickyFirstCol"
        :sticky-header="stickyHeader"
        :fields="computedFields" -->
<template>
    <DataTable
        :scrollable="true"
        tableStyle="font-size-75 font-size-md-100"
        pt:wrapper:style="border-radius: inherit;"
        :value="items"
        class="border table__data-table table-spacing table stickyHeader"
        :scrollHeight="scrollHeight"
        
    >
    <Column v-for="(col,index) of columns" :key="col?.key ? col.key : col" :field="col" :header="makeLabel(col)" :frozen="checkFrozenRow(index)" alignFrozen="left">
    </Column>
    </DataTable>
</template>
<script setup lang="ts">
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
    console.log(props.stickyFirstCol)
    if (index === 0 && props.stickyFirstCol) {
        console.log("frozen!")
        return true;
    }
    return false;
};
const makeLabel = (col) => {
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
    if (props.fields) {
        // Make objects a String array 
        const result = props.fields.map(field => typeof field === 'object' ? field?.key : field);
        return result;
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

// const computedFields = computed(() => {
//     // Set 1st column as sticky if property set
//     if (!props.fields) {
//         // Leave fields to be interpolated if not provided
//         return null;
//     }
//     return props.fields.map((field, index) => {
//         if (index === 0) {
//             let fieldObj;
//             if (typeof field === 'string') {
//                 fieldObj = { key: field };
//             } else {
//                 fieldObj = { ...field };
//             }
//             fieldObj.stickyColumn = props.stickyFirstCol;
//             return fieldObj;
//         }
//         return field;
//     });
// });

    // mounted() {
    //     // HACK: boostrap-vue applies position-relative to non-sortable columns when sorted.
    //     // This can dynamically remove that class when used with a mutation observer.
    //     function removeClass(mutations) {
    //         // If position-relative class was added in a mutation, remove it
    //         mutations.forEach((mutation) => {
    //             if (mutation.type === 'attributes' && mutation.target.classList.contains('position-relative')) {
    //                 mutation.target.classList.remove('position-relative');
    //             }
    //         });
    //     }
    //     if (this.stickyHeader) {
    //         // Remove position-relative from headers of sortable columns so they will be sticky
    //         const headers = this.$el.querySelector('thead').querySelector('tr').querySelectorAll('th');
    //         headers.forEach((element) => {
    //             element.classList.remove('position-relative');
    //         });

    //         // Watch header row for changes to attirbutes in its subtree
    //         const headerRow = this.$el.querySelector('thead').querySelector('tr');
    //         const observeOptions = { attributes: true, subtree: true };
    //         // Start watching & reacting to changes on header row
    //         const observer = new MutationObserver(removeClass);
    //         observer.observe(headerRow, observeOptions);
    //     }
    // },
</script>
<style>
.stickyHeader {
    thead {
        top: 0px !important;
    }
}
</style>



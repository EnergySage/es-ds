<script setup lang="ts">
import DataTable from 'primevue/datatable';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    scrollable: {
        type: Boolean,
        default: false,
    },
    scrollHeight: {
        type: String,
        default: '',
    },
});

// avoid passing in default scrollHeight value when scrollable is false
// otherwise it will limit the height when we don't want it to
const defaultScrollHeight = computed(() => {
    if (props.scrollable) {
        return props.scrollHeight || '305px';
    }

    return '';
});
</script>

<template>
    <data-table
        class="border table__data-table table-spacing table"
        :pt="{
            table: {
                class: 'font-size-75 font-size-md-100 w-100',
                style: 'border-collapse: separate; border-spacing: 0;',
            },
            wrapper: {
                style: 'border-radius: inherit',
            },
            thead: {
                style: 'top: 0px; z-index: 2',
            },
        }"
        :scrollable="scrollable"
        :scroll-height="defaultScrollHeight"
        :value="items">
        <slot />
    </data-table>
</template>

<style scoped lang="scss">
:deep(th[data-p-sortable-column='true']) {
    cursor: pointer;
    user-select: none;

    div[data-pc-section='headercontent'] {
        align-items: center;
        display: flex;
    }
    span[data-pc-section='sort'] {
        display: inline-block;
        margin-left: 0.5rem;
    }
}

:deep(td[data-p-frozen-column='true']),
:deep(th[data-p-frozen-column='true']) {
    position: sticky !important;
}

:deep(td[data-p-frozen-column='true']) {
    background: inherit;
}
</style>

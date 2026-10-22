<script setup lang="ts">
import { ES_DATA_TABLE_CELL_CONTEXT_KEY, ES_DATA_TABLE_SORT_KEY } from '../utils/data-table';

interface Props {
    field?: string;
    header?: string;
    sortable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    field: '',
    header: '',
    sortable: false,
});

const cellContext = inject(ES_DATA_TABLE_CELL_CONTEXT_KEY);
const sortContext = inject(ES_DATA_TABLE_SORT_KEY);

// provide misconfiguration warnings in the console on local dev
if (import.meta.dev && cellContext?.value.type === 'header') {
    const warnings: string[] = [];
    if (props.sortable && !props.field) {
        warnings.push('`sortable` requires `field`, which identifies the column for sorting.');
    }
    warnings.forEach((warning) => console.warn(`EsDataTableColumn: ${warning}`));
}

// field identifies the column for sorting, so a sortable column without one renders as non-sortable
const isSortable = computed(() => props.sortable && !!props.field);

// keeps track of this column's sort direction, or null when sort is off or on another column
const columnSortOrder = computed(() => {
    const sortState = sortContext?.sortState.value;
    return sortState?.field === props.field ? sortState.order : null;
});
</script>

<template>
    <th
        v-if="cellContext?.type === 'header'"
        scope="col"
        class="es-data-table-column-th">
        <button
            v-if="isSortable"
            class="table-sort-button data-table-flex-header"
            title="Toggle sort direction for column"
            @click="sortContext?.toggleSort(field)">
            {{ header }}
            <template v-if="columnSortOrder === 1">
                <span
                    class="sort-direction-arrow"
                    aria-hidden="true">
                    ↑
                </span>
                <span class="sr-only"> Sorted ascending </span>
            </template>
            <template v-else-if="columnSortOrder === -1">
                <span
                    class="sort-direction-arrow"
                    aria-hidden="true">
                    ↓
                </span>
                <span class="sr-only"> Sorted descending </span>
            </template>
            <template v-else>
                <span
                    class="sort-direction-arrow"
                    aria-hidden="true">
                    ↕
                </span>
            </template>
        </button>
        <!-- This invisible-text code is a somewhat hacky way to force the table columns
        to be the right width. Otherwise, when the header is an absolutely positioned
        button, the size of the header will not adjust to longer headers. -->
        <!-- When the column is not sortable, the div just holds the text and doesn't have anything
        special about it. -->
        <div v-bind="isSortable ? { class: 'invisible-text data-table-flex-header', 'aria-hidden': true } : {}">
            {{ header }}
        </div>
    </th>
    <td v-else-if="cellContext?.type === 'body'">
        {{ cellContext.row[field] }}
    </td>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables';

.es-data-table-column-th {
    position: relative;
}
</style>

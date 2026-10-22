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
        class="es-data-table-column-header">
        <button
            v-if="isSortable"
            class="es-data-table-column-sort-button align-items-end d-flex justify-between h-100 position-absolute pr-200 text-left w-100"
            title="Toggle sort direction for column"
            @click="sortContext?.toggleSort(field)">
            {{ header }}
            <template v-if="columnSortOrder === 1">
                <span
                    class="es-data-table-column-sort-direction-arrow position-absolute"
                    aria-hidden="true">
                    ↑
                </span>
                <span class="sr-only"> Sorted ascending </span>
            </template>
            <template v-else-if="columnSortOrder === -1">
                <span
                    class="es-data-table-column-sort-direction-arrow position-absolute"
                    aria-hidden="true">
                    ↓
                </span>
                <span class="sr-only"> Sorted descending </span>
            </template>
            <template v-else>
                <span
                    class="es-data-table-column-sort-direction-arrow position-absolute"
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
        <div
            v-bind="
                isSortable
                    ? {
                          class: 'es-data-table-column-invisible-text align-items-end d-flex h-100 justify-between pr-200 w-100',
                          'aria-hidden': true,
                      }
                    : {}
            ">
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

.es-data-table-column {
    &-header {
        /* defined here so parent can override if first column is frozen */
        position: relative;
    }

    &-sort-button {
        background: none;
        border: none;
        color: variables.$body-color;
        padding: variables.$table-cell-padding;
        padding-block: map.get(variables.$spacers, 50);
        font: inherit;
        top: 0;
        left: 0;

        &:hover {
            background-color: variables.$blue-200;
        }
    }

    &-sort-direction-arrow {
        bottom: 0.5rem;
        right: 1rem;
    }

    &-invisible-text {
        color: transparent;
    }
}
</style>

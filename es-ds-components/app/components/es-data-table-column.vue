<script setup lang="ts">
import { ES_DATA_TABLE_CELL_CONTEXT_KEY } from '../utils/data-table';

interface Props {
    field?: string;
    header?: string;
    sortable?: boolean;
}

withDefaults(defineProps<Props>(), {
    field: '',
    header: '',
    sortable: false,
});

const cellContext = inject(ES_DATA_TABLE_CELL_CONTEXT_KEY);
</script>

<template>
    <th
        v-if="cellContext?.type === 'header'"
        scope="col"
        class="es-data-table-column-th">
        <button
            v-if="sortable"
            class="table-sort-button data-table-flex-header"
            title="Toggle sort direction for column"
            @click="() => toggleSort(index)">
            text
            <template v-if="index === sortHeaderIndex && sortHeaderDirection === 'asc'">
                <span
                    class="sort-direction-arrow"
                    aria-hidden="true">
                    ↑
                </span>
                <span class="sr-only"> Sorted ascending </span>
            </template>
            <template v-else-if="index === sortHeaderIndex && sortHeaderDirection === 'desc'">
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
        <div
            v-bind="
                isSortActiveForColumn(index, sortable, sortableColumnNumbers)
                    ? { class: 'invisible-text data-table-flex-header', 'aria-hidden': true }
                    : {}
            ">
            <rich-text-component
                :allow-data-tokens="allowDataTokens"
                :content="{
                    type: 'doc',
                    content: item.value,
                }"
                strip-tables />
        </div>
    </th>
    <td
        v-else-if="cellContext?.type === 'body'"
        :class="{ 'sticky-column': stickyFirstColumn && cellIndex === 0 }">
        <rich-text-component
            :allow-data-tokens="allowDataTokens"
            :content="{
                type: 'doc',
                content: cell.value,
            }"
            strip-tables />
    </td>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables';

.es-data-table-column-th {
    position: relative;
}
</style>

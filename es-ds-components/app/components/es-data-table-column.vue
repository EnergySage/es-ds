<script setup lang="ts">
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
</script>

<template>
    <th
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
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables';

.es-data-table-column-th {
    position: relative;
}
</style>

<script setup lang="ts">
import type { ISbComponentType } from 'storyblok-js-client';
import type { RichTextTableInterface } from '#imports';

interface Props {
    allowDataTokens?: boolean;
    maxHeight?: number;
    sortable?: boolean;
    sortableColumnNumbers?: number[];
    stickyFirstColumn?: boolean;
    table: RichTextTableInterface;
}

const props = withDefaults(defineProps<Props>(), {
    allowDataTokens: true,
    maxHeight: -1,
    sortable: false,
    sortableColumnNumbers: () => [],
    stickyFirstColumn: false,
});

const sortHeaderIndex: Ref<number | null> = ref(null);
const sortHeaderDirection: Ref<'asc' | 'desc' | null> = ref(null);

/**
 * Internal Types
 */

export interface StringifiedRichTextTableColumnInterface extends ISbComponentType<string> {
    value: string;
}

export interface StringifiedRichTextTableRowInterface extends ISbComponentType<string> {
    body: StringifiedRichTextTableColumnInterface[];
    originalIndex: number;
}

/**
 * Functions
 */

const extractNumber = (str: string) => {
    // Match the first number in the string, handling commas between digits as well as decimals
    const match = str.match(/[+-]?[\d,]+(\.\d+)?/);

    if (!match) return null;

    return match[0].replaceAll(',', '');
};

const isSortActiveForColumn = (columnIndex: number, sortable: boolean, sortableColumnNumbers: number[]) =>
    sortable && (!sortableColumnNumbers.length || sortableColumnNumbers.includes(columnIndex + 1));

const sortTableData = (a: string, b: string) => {
    // The sorting algorithm is fairly simple. We first try to extract a number from inside the string
    // (e.g. 3.04 from $3.04/watt), and sort those numbers. But if there's not a number in the
    // string, we fall back on localeCompare which is a basic string sort.
    const aPossibleFloat = extractNumber(a);
    const bPossibleFloat = extractNumber(b);
    let comp: number;
    if (aPossibleFloat && bPossibleFloat) {
        comp = parseFloat(aPossibleFloat) - parseFloat(bPossibleFloat);
    } else {
        comp = a.localeCompare(b);
    }
    if (sortHeaderDirection.value === 'desc') {
        comp = -comp;
    }
    return comp;
};

const toggleSort = (index: number) => {
    if (sortHeaderIndex.value === index) {
        switch (sortHeaderDirection.value) {
            case null: {
                sortHeaderDirection.value = 'asc';
                break;
            }
            case 'asc': {
                sortHeaderDirection.value = 'desc';
                break;
            }
            case 'desc': {
                sortHeaderDirection.value = null;
                break;
            }
        }
    } else {
        sortHeaderIndex.value = index;
        sortHeaderDirection.value = 'asc';
    }
};

/**
 * Computed Values
 */

const maxHeightPx = computed(() => (props.maxHeight ? `${props.maxHeight}px` : ''));

// convert all rich text cells to simple strings so they can be sorted
// note: this is only used for sorting; it is never rendered, as the rich text would lose all its richness
const stringifiedTableRows = computed(() => {
    const result: StringifiedRichTextTableRowInterface[] = JSON.parse(JSON.stringify(props.table.tbody)).map(
        (tableRow: RichTextTableRowInterface, index: number) => ({
            body: tableRow.body.map((cell: RichTextTableColumnInterface) => {
                const str = convertHtmlToPlainText(
                    renderRichTextWithDataTokens({
                        type: 'doc',
                        content: cell.value,
                    }),
                );

                return {
                    value: str,
                };
            }),
            originalIndex: index,
        }),
    );

    return result;
});

// sorted version of the stringified (sortable) table rows
// note: this is only used for sorting; it is never rendered, as the rich text would lose all its richness
const sortedStringifiedTableRows = computed(() => {
    const sorted: StringifiedRichTextTableRowInterface[] = JSON.parse(JSON.stringify(stringifiedTableRows.value));
    if (sortHeaderIndex.value !== null && sortHeaderDirection.value) {
        sorted.sort((a, b) => {
            const aTarget = a.body[sortHeaderIndex.value || 0]!.value;
            const bTarget = b.body[sortHeaderIndex.value || 0]!.value;
            return sortTableData(aTarget, bTarget);
        });
    }
    return sorted;
});

// these are the rows that are actually rendered
const sortedTableRows = computed(() => {
    if (!props.sortable) {
        return props.table.tbody;
    }

    // if we need to sort, reorder the rich text rows in the same order as the sorted stringified rows
    const result: RichTextTableRowInterface[] = [];
    sortedStringifiedTableRows.value.forEach((stringifiedRow: StringifiedRichTextTableRowInterface) => {
        result.push(props.table.tbody[stringifiedRow.originalIndex]!);
    });
    return result;
});
</script>

<template>
    <div
        class="border table__data-table mb-200 table-responsive"
        :class="{ 'sticky-data-table': maxHeight }">
        <table class="rich-text-table table b-table font-size-75 font-size-md-100 b-table-no-border-collapse">
            <thead class="thead">
                <tr>
                    <th
                        v-for="(item, index) in table.thead"
                        :key="index"
                        :class="{ 'sticky-column': stickyFirstColumn && index === 0 }"
                        scope="col"
                        class="data-table-th">
                        <button
                            v-if="isSortActiveForColumn(index, sortable, sortableColumnNumbers)"
                            class="table-sort-button data-table-flex-header"
                            title="Toggle sort direction for column"
                            @click="() => toggleSort(index)">
                            <rich-text-component
                                :allow-data-tokens="allowDataTokens"
                                :content="{
                                    type: 'doc',
                                    content: item.value,
                                }"
                                strip-tables />
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
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in sortedTableRows"
                    :key="rowIndex">
                    <td
                        v-for="(cell, cellIndex) in row.body"
                        :key="cellIndex"
                        :class="{ 'sticky-column': stickyFirstColumn && cellIndex === 0 }">
                        <rich-text-component
                            :allow-data-tokens="allowDataTokens"
                            :content="{
                                type: 'doc',
                                content: cell.value,
                            }"
                            strip-tables />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables';

.rich-text-table {
    :deep(ul:last-child),
    :deep(li:last-child),
    :deep(p:last-child) {
        margin-bottom: 0;
    }
}

.data-table-th {
    position: relative;
}

.sticky-column {
    position: sticky;
    left: 0;
    z-index: 1;
}

thead .sticky-column {
    background: variables.$soft-blue; // keep in sync with the table header background
}

tbody .sticky-column {
    background: inherit; // preserve row striping
}

.sticky-data-table {
    max-height: v-bind('maxHeightPx');

    thead {
        position: sticky;
        top: 0;
        z-index: 2;
    }
}

.table-sort-button {
    background: none;
    border: none;
    color: variables.$body-color;
    padding: variables.$table-cell-padding;
    padding-block: map.get(variables.$spacers, 50);
    font: inherit;
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;

    &:hover {
        background-color: variables.$blue-200;
    }
}

.invisible-text {
    color: transparent;
}

.data-table-flex-header {
    align-items: flex-end;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    padding-right: 2rem;
    width: 100%;

    .sort-direction-arrow {
        bottom: 0.5rem;
        position: absolute;
        right: 1rem;
    }
}
</style>

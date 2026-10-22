<script setup lang="ts">
import type { PropType } from 'vue';
import type { EsDataTableSortEvent, EsDataTableSortOrder, EsDataTableSortState } from '../types';
import {
    ES_DATA_TABLE_CELL_CONTEXT_KEY,
    ES_DATA_TABLE_SORT_KEY,
    type EsDataTableCellContext,
} from '../utils/data-table';

interface Props {
    freezeFirstColumn?: boolean;
    freezeHeaders?: boolean;
    items: any[];
    /** the field of the column the table is initially sorted by; later changes are ignored */
    sortField?: string;
    /** the direction the table is initially sorted in; later changes are ignored */
    sortOrder?: EsDataTableSortOrder;
    useInternalSorting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    freezeFirstColumn: false,
    freezeHeaders: false,
    sortField: '',
    sortOrder: 1,
    useInternalSorting: true,
});

const emit = defineEmits<{
    sort: [event: EsDataTableSortEvent];
}>();

// source of truth for which column is sorted and in which direction
const sortState = ref<EsDataTableSortState>(
    props.sortField ? { field: props.sortField, order: props.sortOrder } : null,
);

// toggles a column between ascending and descending, starting with ascending
const toggleSort = (field: string) => {
    // field is required to enable sorting, so the internal sort knows what to sort on, and so
    // external sort knows which column to sort
    if (!field) {
        return;
    }
    const order = sortState.value?.field === field && sortState.value.order === 1 ? -1 : 1;
    sortState.value = { field, order };
    emit('sort', { sortField: field, sortOrder: order });
};

provide(ES_DATA_TABLE_SORT_KEY, { sortState: readonly(sortState), toggleSort });

const sortedItems = computed(() => props.items);
const rowsToRender = computed(() => (props.useInternalSorting ? sortedItems.value : props.items));

// defined inline rather than as its own file so Nuxt doesn't auto-register it as a public component;
// the context stays reactive because rows are keyed by index and reuse instances when the row changes
const CellContext = defineComponent({
    props: {
        context: {
            type: Object as PropType<EsDataTableCellContext>,
            required: true,
        },
    },
    setup(cellContextProps, { slots }) {
        provide(ES_DATA_TABLE_CELL_CONTEXT_KEY, toRef(cellContextProps, 'context'));
        return () => slots.default?.();
    },
});
</script>

<template>
    <div class="border table__data-table mb-200 table-responsive">
        <table
            class="es-data-table table b-table font-size-75 font-size-md-100 b-table-no-border-collapse"
            :class="{
                'es-data-table--freeze-first-column': freezeFirstColumn,
            }">
            <thead class="thead">
                <tr>
                    <cell-context :context="{ type: 'header' }">
                        <slot />
                    </cell-context>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in rowsToRender"
                    :key="rowIndex">
                    <cell-context :context="{ type: 'body', row, rowIndex }">
                        <slot />
                    </cell-context>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables';

.es-data-table {
    &--freeze-first-column {
        thead :deep(th:first-child),
        tbody :deep(td:first-child) {
            position: sticky;
            left: 0;
            z-index: 1;
        }

        thead :deep(th) {
            background: variables.$soft-blue; // keep in sync with the table header background
        }

        tbody :deep(td) {
            background: inherit; // preserve row striping
        }
    }
}
</style>

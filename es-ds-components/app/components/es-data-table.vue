<script setup lang="ts">
import type { PropType } from 'vue';
import { ES_DATA_TABLE_CELL_CONTEXT_KEY, type EsDataTableCellContext } from '../utils/data-table';

interface Props {
    freezeFirstColumn?: boolean;
    freezeHeaders?: boolean;
    items: any[];
    sortField?: string;
    sortOrder?: 1 | -1;
    useInternalSorting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    freezeFirstColumn: false,
    freezeHeaders: false,
    sortField: '',
    sortOrder: 1,
    useInternalSorting: true,
});

const sortedItems = computed(() => props.items);
const rowsToRender = computed(() => props.useInternalSorting ? sortedItems.value : props.items);

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
.es-data-table {
    &--freeze-first-column {
        thead th:first-child,
        tbody td:first-child {
            position: sticky;
            left: 0;
            z-index: 1;
        }
    }
}
</style>

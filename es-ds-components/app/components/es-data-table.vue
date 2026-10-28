<script setup lang="ts">
import { Comment, Fragment, Text, type PropType, type VNode } from 'vue';
import type { EsDataTableSortEvent, EsDataTableSortOrder, EsDataTableSortState } from '../types';
import {
    ES_DATA_TABLE_CELL_CONTEXT_KEY,
    ES_DATA_TABLE_SORT_KEY,
    type EsDataTableCellContext,
} from '../utils/data-table';

interface Props {
    freezeFirstColumn?: boolean;
    freezeHeaders?: boolean;
    freezeHeadersStartingAtBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    items: any[];
    /** the field of the column the table is initially sorted by; later changes are ignored */
    sortField?: string;
    /** the direction the table is initially sorted in; later changes are ignored */
    sortOrder?: EsDataTableSortOrder;
    useInternalSorting?: boolean;
    useRoundedCorners?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    freezeFirstColumn: false,
    freezeHeaders: false,
    freezeHeadersStartingAtBreakpoint: 'xs',
    sortField: '',
    sortOrder: 1,
    useInternalSorting: true,
    useRoundedCorners: true,
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

// numbers compare numerically; everything else compares as strings
const compareValues = (a: unknown, b: unknown) =>
    typeof a === 'number' && typeof b === 'number' ? a - b : String(a ?? '').localeCompare(String(b ?? ''));

// with internal sorting off, the parent sorts items itself in response to the sort event
const rowsToRender = computed(() => {
    const sort = sortState.value;
    if (!props.useInternalSorting || !sort) {
        return props.items;
    }
    // copied so sorting never mutates the parent's array
    return [...props.items].sort((a, b) => compareValues(a[sort.field], b[sort.field]) * sort.order);
});

const slots = useSlots();

// the empty row's cell spans every column, so it counts the columns in the default slot,
// looking inside the fragments v-for creates and skipping the comments a false v-if leaves
const countColumns = (vnodes: VNode[] = slots.default?.() ?? []): number =>
    vnodes.reduce((count, vnode) => {
        if (vnode.type === Fragment) {
            return count + countColumns(vnode.children as VNode[]);
        }
        return vnode.type === Comment || vnode.type === Text ? count : count + 1;
    }, 0);

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
    <div
        class="border table__data-table mb-200 table-responsive"
        :class="{
            'es-data-table--freeze-first-column': freezeFirstColumn,
            [`es-data-table--freeze-headers-${freezeHeadersStartingAtBreakpoint}`]: freezeHeaders,
            'es-data-table--angled-corners': !useRoundedCorners,
        }">
        <table class="es-data-table table b-table font-size-75 font-size-md-100 b-table-no-border-collapse">
            <thead class="thead">
                <tr>
                    <cell-context :context="{ type: 'header' }">
                        <slot />
                    </cell-context>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!rowsToRender.length">
                    <td :colspan="countColumns()">
                        <slot name="empty">
                            <div class="text-center p-100">No rows to display</div>
                        </slot>
                    </td>
                </tr>
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
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables';
@use '@energysage/es-ds-styles/scss/mixins/breakpoints';

.es-data-table {
    &--freeze-first-column {
        thead :deep(th:first-child),
        tbody :deep(td:first-child) {
            position: sticky;
            left: 0;
            z-index: 1;
        }

        thead :deep(th:first-child) {
            z-index: 2;
        }

        thead :deep(th) {
            background: variables.$soft-blue; // keep in sync with the table header background
        }

        tbody :deep(td) {
            background: inherit; // preserve row striping
        }
    }

    // named by breakpoint rather than infix, since the xs infix is empty
    @each $breakpoint in map.keys(variables.$grid-breakpoints) {
        &--freeze-headers-#{$breakpoint} {
            @include breakpoints.media-breakpoint-up($breakpoint) {
                // clips to the rounded corners without becoming the container sticky headers stick within
                overflow: clip;

                thead :deep(th) {
                    position: sticky;
                    top: 0;
                    z-index: 1;
                }
            }
        }
    }

    &--angled-corners {
        border-radius: 0;
    }
}
</style>

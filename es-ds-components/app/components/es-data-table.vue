<script setup lang="ts">
import { Comment, Fragment, Text, type PropType, type VNode } from 'vue';
import type { EsDataTableSortEvent, EsDataTableSortOrder, EsDataTableSortState } from '../types';
import {
    ES_DATA_TABLE_CELL_CONTEXT_KEY,
    ES_DATA_TABLE_SORT_KEY,
    type EsDataTableCellContext,
} from '../utils/data-table';

interface Props {
    /** names the table for screen readers, and the scrollable region around it when it scrolls horizontally */
    ariaLabel?: string;
    /** the field, or dot-separated path like 'user.id', that uniquely identifies each row */
    dataKey?: string;
    freezeFirstColumn?: boolean;
    freezeHeaders?: boolean;
    freezeHeadersStartingAtBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    items: any[];
    limitInitialRowsDisplayed?: boolean;
    /** the most rows shown before "Show more"; only used with limitInitialRowsDisplayed */
    numInitialRowsDisplayed?: number;
    showMoreButtonText?: string;
    /** the field of the column the table is initially sorted by; later changes are ignored */
    sortField?: string;
    /** the direction the table is initially sorted in; later changes are ignored */
    sortOrder?: EsDataTableSortOrder;
    useInternalSorting?: boolean;
    useRoundedCorners?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    ariaLabel: '',
    dataKey: '',
    freezeFirstColumn: false,
    freezeHeaders: false,
    freezeHeadersStartingAtBreakpoint: 'xs',
    limitInitialRowsDisplayed: false,
    numInitialRowsDisplayed: 10,
    showMoreButtonText: 'Show more',
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
const sortedRows = computed(() => {
    const sort = sortState.value;
    if (!props.useInternalSorting || !sort) {
        return props.items;
    }
    // copied so sorting never mutates the parent's array
    return [...props.items].sort((a, b) => compareValues(a[sort.field], b[sort.field]) * sort.order);
});

// provide misconfiguration warnings in the console on local dev
if (import.meta.dev) {
    const warnings: string[] = [];
    if (props.limitInitialRowsDisplayed && props.numInitialRowsDisplayed < 1) {
        warnings.push('`numInitialRowsDisplayed` must be at least 1 to limit the rows displayed.');
    }
    warnings.forEach((warning) => console.warn(`EsDataTable: ${warning}`));
}

const isShowingAllRows = ref(false);

const tableBody = useTemplateRef<HTMLTableSectionElement>('tableBody');

// the first row Show more reveals, which takes focus because the button it replaces leaves the page
const firstRevealedRowIndex = ref<number | null>(null);

const showAllRows = async () => {
    firstRevealedRowIndex.value = props.numInitialRowsDisplayed;
    isShowingAllRows.value = true;
    await nextTick();
    (tableBody.value?.children[firstRevealedRowIndex.value] as HTMLElement | undefined)?.focus();
};

// a limit below 1 would hide every row, so it falls back to displaying all of them
const hasHiddenRows = computed(
    () =>
        props.limitInitialRowsDisplayed &&
        props.numInitialRowsDisplayed >= 1 &&
        !isShowingAllRows.value &&
        sortedRows.value.length > props.numInitialRowsDisplayed,
);

// the limit applies after sorting, so the rows shown are the top of the current sort order
const rowsToRender = computed(() =>
    hasHiddenRows.value ? sortedRows.value.slice(0, props.numInitialRowsDisplayed) : sortedRows.value,
);

const hiddenRowCount = computed(() => sortedRows.value.length - rowsToRender.value.length);

// a row keyed by dataKey keeps its cells' component state when sorting moves it;
// without dataKey, rows are keyed by position
const rowKey = (row: any, rowIndex: number) =>
    props.dataKey ? props.dataKey.split('.').reduce((value, key) => value?.[key], row) : rowIndex;

const scrollContainer = useTemplateRef<HTMLDivElement>('scrollContainer');

// whether the table scrolls horizontally, and whether columns are hidden past either edge
const horizontalOverflow = reactive({ isScrollable: false, hasHiddenLeft: false, hasHiddenRight: false });

// where the edge shadows sit, inside the container's border and above its horizontal scrollbar
const edgeShadowBounds = reactive({ top: 0, height: 0, left: 0, right: 0 });

const updateHorizontalOverflow = () => {
    const container = scrollContainer.value;
    if (!container) {
        return;
    }
    const { clientHeight, clientLeft, clientTop, clientWidth, offsetWidth, scrollLeft, scrollWidth } = container;
    // frozen headers clip the table instead of scrolling it from their breakpoint up
    const isScrollable = scrollWidth > clientWidth && getComputedStyle(container).overflowX !== 'clip';
    // assigned key by key, so a scroll that changes no value skips re-rendering the table and every cell in it
    Object.assign(horizontalOverflow, {
        isScrollable,
        // a pixel of tolerance absorbs subpixel scroll positions at either end
        hasHiddenLeft: isScrollable && scrollLeft > 1,
        hasHiddenRight: isScrollable && scrollLeft + clientWidth < scrollWidth - 1,
    });
    // a frozen first column never scrolls, so the left shadow starts at its right edge, measured unrounded since
    // column widths are often fractional and a rounded width leaves a visible gap on high-density screens
    const frozenColumnWidth = props.freezeFirstColumn
        ? (container.querySelector('th')?.getBoundingClientRect().width ?? 0)
        : 0;
    Object.assign(edgeShadowBounds, {
        top: clientTop,
        height: clientHeight,
        left: clientLeft + frozenColumnWidth,
        right: offsetWidth - clientLeft - clientWidth,
    });
};

let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
    updateHorizontalOverflow();
    // the overflow can start or end without a scroll, when the container resizes or the table's contents change
    resizeObserver = new ResizeObserver(updateHorizontalOverflow);
    const container = scrollContainer.value;
    if (container) {
        resizeObserver.observe(container);
        const table = container.querySelector('table');
        if (table) {
            resizeObserver.observe(table);
        }
    }
});

onBeforeUnmount(() => resizeObserver?.disconnect());

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
// the context stays reactive because rows keyed by index reuse instances when the row at that index changes
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
    <!-- positions the show more overlay and edge shadows over the table, outside the horizontal scroll -->
    <div class="mb-200 position-relative">
        <!-- keyboard users scroll the table by focusing it, so it's focusable only while there's something to scroll -->
        <div
            ref="scrollContainer"
            class="border es-data-table-scroll-container table__data-table table-responsive"
            :class="{
                'es-data-table--freeze-first-column': freezeFirstColumn,
                [`es-data-table--freeze-headers-${freezeHeadersStartingAtBreakpoint}`]: freezeHeaders,
                'es-data-table--angled-corners': !useRoundedCorners,
            }"
            v-bind="
                horizontalOverflow.isScrollable
                    ? { tabindex: 0, role: 'region', 'aria-label': ariaLabel || 'Scrollable table' }
                    : {}
            "
            @scroll="updateHorizontalOverflow">
            <!-- while rows are hidden, screen readers that support aria-rowcount announce the full table's
            size, counting the header row, and aria-rowindex places each rendered row within it -->
            <table
                class="es-data-table table font-size-75 font-size-md-100"
                :aria-label="ariaLabel || undefined"
                :aria-rowcount="hasHiddenRows ? sortedRows.length + 1 : undefined">
                <thead class="thead">
                    <tr :aria-rowindex="hasHiddenRows ? 1 : undefined">
                        <cell-context :context="{ type: 'header' }">
                            <slot />
                        </cell-context>
                    </tr>
                </thead>
                <tbody ref="tableBody">
                    <tr v-if="!rowsToRender.length">
                        <td :colspan="countColumns()">
                            <slot name="empty">
                                <div class="text-center p-100">No rows to display</div>
                            </slot>
                        </td>
                    </tr>
                    <tr
                        v-for="(row, rowIndex) in rowsToRender"
                        :key="rowKey(row, rowIndex)"
                        :tabindex="rowIndex === firstRevealedRowIndex ? -1 : undefined"
                        :aria-rowindex="hasHiddenRows ? rowIndex + 2 : undefined">
                        <cell-context :context="{ type: 'body', row, rowIndex }">
                            <slot />
                        </cell-context>
                    </tr>
                </tbody>
            </table>
        </div>
        <div
            v-if="horizontalOverflow.hasHiddenLeft"
            class="es-data-table-edge-shadow es-data-table-edge-shadow--left position-absolute"
            :style="{
                top: `${edgeShadowBounds.top}px`,
                height: `${edgeShadowBounds.height}px`,
                left: `${edgeShadowBounds.left}px`,
            }" />
        <div
            v-if="horizontalOverflow.hasHiddenRight"
            class="es-data-table-edge-shadow es-data-table-edge-shadow--right position-absolute"
            :style="{
                top: `${edgeShadowBounds.top}px`,
                height: `${edgeShadowBounds.height}px`,
                right: `${edgeShadowBounds.right}px`,
            }" />
        <div
            v-if="hasHiddenRows"
            class="es-data-table-show-more align-items-end d-flex justify-content-center pb-200 position-absolute w-100">
            <!-- the collapsed state is announced here, since screen readers don't all support aria-rowcount -->
            <es-button
                outline
                size="sm"
                @click="showAllRows">
                {{ showMoreButtonText
                }}<span class="sr-only">, {{ hiddenRowCount }} more {{ hiddenRowCount === 1 ? 'row' : 'rows' }}</span>
            </es-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables';
@use '@energysage/es-ds-styles/scss/mixins/breakpoints';

.es-data-table {
    /* collapsed borders would detach from sticky header and first-column cells as they scroll */
    border-collapse: separate;
    border-spacing: 0;

    /* an overscroll bounce would carry the frozen first column away from the left edge shadow,
    which sits outside the scroll */
    &-scroll-container {
        overscroll-behavior-x: none;
    }

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
            background: variables.$soft-blue; /* keep in sync with the table header background */
        }

        tbody :deep(td) {
            background: inherit; /* preserve row striping */
        }
    }

    /* named by breakpoint rather than infix, since the xs infix is empty */
    @each $breakpoint in map.keys(variables.$grid-breakpoints) {
        &--freeze-headers-#{$breakpoint} {
            @include breakpoints.media-breakpoint-up($breakpoint) {
                /* clips to the rounded corners without becoming the container sticky headers stick within */
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

    /* EsStickyBar's shadow color and blur, cast inward from the edge; the negative spread
    keeps it off the top and bottom edges */
    &-edge-shadow {
        pointer-events: none;
        width: 1rem;
        z-index: 3; /* above the frozen first column and headers */

        /* matches the container's inner corners, which sit inside its 1px border */
        &--left {
            box-shadow: inset 6px 0 6px -3px rgba(variables.$gray-900, 0.2);
            border-radius: calc(#{variables.$table-border-radius} - 1px) 0 0
                calc(#{variables.$table-border-radius} - 1px);
        }

        &--right {
            box-shadow: inset -6px 0 6px -3px rgba(variables.$gray-900, 0.2);
            border-radius: 0 calc(#{variables.$table-border-radius} - 1px)
                calc(#{variables.$table-border-radius} - 1px) 0;
        }
    }

    /* square corners, and a left shadow that starts at the frozen column rather than the container's corner */
    &--angled-corners ~ &-edge-shadow,
    &--freeze-first-column ~ &-edge-shadow--left {
        border-radius: 0;
    }

    &-show-more {
        background: linear-gradient(rgba(variables.$white, 0), variables.$white 75%);
        bottom: 0;
        height: 8rem;
        left: 0;
        /* lets clicks through the gradient reach the rows it partially covers */
        pointer-events: none;
        z-index: 3; /* above the frozen first column and headers */

        > * {
            pointer-events: auto;
        }
    }
}
</style>

<script setup lang="ts">
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
const rowsToRender = computed(() => props.useInternalSorting ? sortedItems : props.items);
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
                    <slot />
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(row, rowIndex) in rowsToRender"
                    :key="rowIndex">
                    <slot />
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

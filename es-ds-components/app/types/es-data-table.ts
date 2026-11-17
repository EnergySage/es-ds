export type EsDataTableSortOrder = 1 | -1;

/** null when the table is unsorted */
export type EsDataTableSortState = { field: string; order: EsDataTableSortOrder } | null;

export interface EsDataTableSortEvent {
    sortField: string;
    sortOrder: EsDataTableSortOrder;
}

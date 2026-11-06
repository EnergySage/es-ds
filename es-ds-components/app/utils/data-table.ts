import type { InjectionKey, Ref } from 'vue';
import type { EsDataTableSortState } from '../types';

// EsDataTable renders its default slot twice so EsDataTableColumn can render both as
// the column header cell and the body row cell. This context allows EsDataTable to tell
// EsDataTableColumn how to render.
export type EsDataTableCellContext = { type: 'header' } | { type: 'body'; row: any; rowIndex: number };
export const ES_DATA_TABLE_CELL_CONTEXT_KEY: InjectionKey<Ref<EsDataTableCellContext>> =
    Symbol('esDataTableCellContext');

// sort state is identical for the header and every row, so EsDataTable provides it once for all columns
export const ES_DATA_TABLE_SORT_KEY: InjectionKey<{
    sortState: Readonly<Ref<EsDataTableSortState>>;
    toggleSort: (field: string) => void;
}> = Symbol('esDataTableSort');

// resolves a column field or dataKey, which can be a dot-separated path like 'user.name' into nested objects;
// named for the data table since Nuxt auto-imports every util into consuming apps
export const resolveEsDataTableField = (row: any, field: string) =>
    field.split('.').reduce((value, key) => value?.[key], row);

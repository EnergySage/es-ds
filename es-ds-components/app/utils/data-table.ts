import type { InjectionKey, Ref } from 'vue';

// EsDataTable renders its default slot twice so EsDataTableColumn can render both as
// the column header cell and the body row cell. This context allows EsDataTable to tell
// EsDataTableColumn how to render.
export type EsDataTableCellContext = { type: 'header' } | { type: 'body'; row: any; rowIndex: number };
export const ES_DATA_TABLE_CELL_CONTEXT_KEY: InjectionKey<Ref<EsDataTableCellContext>> =
    Symbol('esDataTableCellContext');

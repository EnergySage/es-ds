import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { h } from 'vue';
import EsDataTable from './es-data-table.vue';
import EsDataTableColumn from './es-data-table-column.vue';

const ITEMS = [
    { name: 'Maine', capital: 'Augusta', abbreviation: 'ME' },
    { name: 'Ohio', capital: 'Columbus', abbreviation: 'OH' },
];

interface ColumnProps {
    field?: string;
    header?: string;
    sortable?: boolean;
}

const COLUMNS: ColumnProps[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'capital', header: 'Capital', sortable: true },
    { field: 'abbreviation', header: 'Abbreviation' },
];

function mountTable(tableProps: Record<string, unknown> = {}, columns: ColumnProps[] = COLUMNS) {
    return mountSuspended(EsDataTable, {
        props: { items: ITEMS, ...tableProps },
        slots: { default: () => columns.map((column) => h(EsDataTableColumn, column)) },
    });
}

const headerCell = (wrapper: VueWrapper, header: string) => {
    const cell = wrapper.findAll('thead th').find((th) => th.text().includes(header));
    if (!cell) {
        throw new Error(`no header cell for ${header}`);
    }
    return cell;
};

/** the sort arrow a header shows, or null when the header isn't sortable */
const arrow = (wrapper: VueWrapper, header: string) => {
    const button = headerCell(wrapper, header).find('button');
    return button.exists() ? button.find('.es-data-table-column-sort-direction-arrow').text() : null;
};

const clickHeader = (wrapper: VueWrapper, header: string) =>
    headerCell(wrapper, header).find('button').trigger('click');

const columnWarnings = (warn: MockInstance<typeof console.warn>) =>
    warn.mock.calls.filter(([message]) => String(message).startsWith('EsDataTableColumn:'));

afterEach(() => {
    vi.restoreAllMocks();
});

describe('EsDataTable cell rendering', () => {
    it('renders each column as a header cell in thead and a body cell in every tbody row', async () => {
        const wrapper = await mountTable();
        expect(wrapper.findAll('thead th').map((th) => th.text())).toEqual([
            expect.stringContaining('Name'),
            expect.stringContaining('Capital'),
            expect.stringContaining('Abbreviation'),
        ]);
        expect(wrapper.find('thead td').exists()).toBe(false);
        expect(wrapper.findAll('tbody tr').map((tr) => tr.findAll('td').map((td) => td.text()))).toEqual([
            ['Maine', 'Augusta', 'ME'],
            ['Ohio', 'Columbus', 'OH'],
        ]);
        expect(wrapper.find('tbody th').exists()).toBe(false);
    });

    it('renders nothing for a column outside a table', async () => {
        const wrapper = await mountSuspended(EsDataTableColumn, { props: { field: 'name', header: 'Name' } });
        expect(wrapper.find('th').exists()).toBe(false);
        expect(wrapper.find('td').exists()).toBe(false);
    });
});

describe('EsDataTable initial sort', () => {
    it('shows every sortable column as unsorted without a sortField', async () => {
        const wrapper = await mountTable();
        expect(arrow(wrapper, 'Name')).toBe('↕');
        expect(arrow(wrapper, 'Capital')).toBe('↕');
        expect(arrow(wrapper, 'Abbreviation')).toBeNull();
    });

    it('stays unsorted without a sortField even when sortOrder is set', async () => {
        const wrapper = await mountTable({ sortOrder: -1 });
        expect(arrow(wrapper, 'Name')).toBe('↕');
        expect(arrow(wrapper, 'Capital')).toBe('↕');
    });

    it('marks the sortField column in sortOrder', async () => {
        const wrapper = await mountTable({ sortField: 'capital', sortOrder: -1 });
        expect(arrow(wrapper, 'Name')).toBe('↕');
        expect(arrow(wrapper, 'Capital')).toBe('↓');
        expect(headerCell(wrapper, 'Capital').text()).toContain('Sorted descending');
    });
});

describe('EsDataTable header clicks', () => {
    it('toggles a column between ascending and descending', async () => {
        const wrapper = await mountTable();
        await clickHeader(wrapper, 'Name');
        expect(arrow(wrapper, 'Name')).toBe('↑');
        expect(headerCell(wrapper, 'Name').text()).toContain('Sorted ascending');
        await clickHeader(wrapper, 'Name');
        expect(arrow(wrapper, 'Name')).toBe('↓');
        await clickHeader(wrapper, 'Name');
        expect(arrow(wrapper, 'Name')).toBe('↑');
        expect(wrapper.emitted('sort')).toEqual([
            [{ sortField: 'name', sortOrder: 1 }],
            [{ sortField: 'name', sortOrder: -1 }],
            [{ sortField: 'name', sortOrder: 1 }],
        ]);
    });

    it('toggles from the initial sortField and sortOrder', async () => {
        const wrapper = await mountTable({ sortField: 'name', sortOrder: -1 });
        await clickHeader(wrapper, 'Name');
        expect(arrow(wrapper, 'Name')).toBe('↑');
    });

    it('starts a different column at ascending and clears the previous one', async () => {
        const wrapper = await mountTable({ sortField: 'name', sortOrder: -1 });
        await clickHeader(wrapper, 'Capital');
        expect(arrow(wrapper, 'Name')).toBe('↕');
        expect(arrow(wrapper, 'Capital')).toBe('↑');
        expect(wrapper.emitted('sort')).toEqual([[{ sortField: 'capital', sortOrder: 1 }]]);
    });
});

describe('EsDataTable sort props', () => {
    it('ignores changes to sortField and sortOrder after mounting', async () => {
        const wrapper = await mountTable({ sortField: 'name' });
        await wrapper.setProps({ sortField: 'capital', sortOrder: -1 });
        expect(arrow(wrapper, 'Name')).toBe('↑');
        expect(arrow(wrapper, 'Capital')).toBe('↕');
        expect(wrapper.emitted('sort')).toBeUndefined();
    });

    it("keeps the user's choice when the parent changes sortField and sortOrder", async () => {
        const wrapper = await mountTable({ sortField: 'name' });
        await clickHeader(wrapper, 'Capital');
        await wrapper.setProps({ sortField: 'name', sortOrder: -1 });
        expect(arrow(wrapper, 'Name')).toBe('↕');
        expect(arrow(wrapper, 'Capital')).toBe('↑');
    });
});

// ranks where string order (10, 100, 9) differs from numeric order (9, 10, 100)
const RANKED_ITEMS = [
    { name: 'Ohio', rank: 10 },
    { name: 'Maine', rank: 9 },
    { name: 'Texas', rank: 100 },
];

const RANKED_COLUMNS: ColumnProps[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'rank', header: 'Rank', sortable: true },
];

const mountRankedTable = (tableProps: Record<string, unknown> = {}) =>
    mountTable({ items: RANKED_ITEMS, ...tableProps }, RANKED_COLUMNS);

/** the rendered name of each row, top to bottom */
const renderedNames = (wrapper: VueWrapper) => wrapper.findAll('tbody tr').map((tr) => tr.find('td').text());

describe('EsDataTable internal sorting', () => {
    it('renders items in the order given while unsorted', async () => {
        const wrapper = await mountRankedTable();
        expect(renderedNames(wrapper)).toEqual(['Ohio', 'Maine', 'Texas']);
    });

    it('sorts by the initial sortField and sortOrder', async () => {
        const wrapper = await mountRankedTable({ sortField: 'name', sortOrder: -1 });
        expect(renderedNames(wrapper)).toEqual(['Texas', 'Ohio', 'Maine']);
    });

    it('sorts strings ascending, then descending', async () => {
        const wrapper = await mountRankedTable();
        await clickHeader(wrapper, 'Name');
        expect(renderedNames(wrapper)).toEqual(['Maine', 'Ohio', 'Texas']);
        await clickHeader(wrapper, 'Name');
        expect(renderedNames(wrapper)).toEqual(['Texas', 'Ohio', 'Maine']);
    });

    it('sorts numbers numerically rather than as strings', async () => {
        const wrapper = await mountRankedTable();
        await clickHeader(wrapper, 'Rank');
        expect(renderedNames(wrapper)).toEqual(['Maine', 'Ohio', 'Texas']);
        await clickHeader(wrapper, 'Rank');
        expect(renderedNames(wrapper)).toEqual(['Texas', 'Ohio', 'Maine']);
    });

    it('re-sorts when the parent replaces items', async () => {
        const wrapper = await mountRankedTable({ sortField: 'name' });
        await wrapper.setProps({ items: [...RANKED_ITEMS, { name: 'Alaska', rank: 50 }] });
        expect(renderedNames(wrapper)).toEqual(['Alaska', 'Maine', 'Ohio', 'Texas']);
    });

    it("doesn't reorder the parent's items array", async () => {
        const items = [...RANKED_ITEMS];
        const wrapper = await mountRankedTable({ items });
        await clickHeader(wrapper, 'Name');
        expect(items).toEqual(RANKED_ITEMS);
    });
});

describe('EsDataTable external sorting', () => {
    it('renders items in the order given, even when sorted', async () => {
        const wrapper = await mountRankedTable({ sortField: 'name', useInternalSorting: false });
        expect(renderedNames(wrapper)).toEqual(['Ohio', 'Maine', 'Texas']);
        await clickHeader(wrapper, 'Rank');
        expect(arrow(wrapper, 'Rank')).toBe('↑');
        expect(renderedNames(wrapper)).toEqual(['Ohio', 'Maine', 'Texas']);
        expect(wrapper.emitted('sort')).toEqual([[{ sortField: 'rank', sortOrder: 1 }]]);
    });

    it('renders the items the parent passes in response to the sort event', async () => {
        const wrapper = await mountRankedTable({
            useInternalSorting: false,
            // sorts by name length, which internal sorting would never produce
            onSort: () => wrapper.setProps({ items: [...RANKED_ITEMS].sort((a, b) => a.name.length - b.name.length) }),
        });
        await clickHeader(wrapper, 'Name');
        expect(renderedNames(wrapper)).toEqual(['Ohio', 'Maine', 'Texas']);
    });
});

describe('EsDataTableColumn sortable configuration', () => {
    it('renders a sortable column without a field as a plain header and warns once', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const wrapper = await mountTable({}, [{ header: 'Name', sortable: true }]);
        expect(arrow(wrapper, 'Name')).toBeNull();
        // once for the header, not again for each of the rows
        expect(columnWarnings(warn)).toEqual([
            ['EsDataTableColumn: `sortable` requires `field`, which identifies the column for sorting.'],
        ]);
    });

    it('does not warn for valid column configurations', async () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
        await mountTable({}, [...COLUMNS, { header: 'Custom' }]);
        expect(columnWarnings(warn)).toEqual([]);
    });
});

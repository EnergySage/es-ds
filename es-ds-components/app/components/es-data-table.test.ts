import { mountSuspended } from '@nuxt/test-utils/runtime';
import type { VueWrapper } from '@vue/test-utils';
import { afterEach, describe, expect, it, type MockInstance, vi } from 'vitest';
import { h, type VNodeChild } from 'vue';
import EsDataTable from './es-data-table.vue';
import EsDataTableColumn from './es-data-table-column.vue';

const ITEMS = [
    { name: 'Maine', capital: 'Augusta', abbreviation: 'ME' },
    { name: 'Ohio', capital: 'Columbus', abbreviation: 'OH' },
];

/** EsDataTableColumn props, plus optional header and body slots */
interface ColumnConfig {
    field?: string;
    header?: string;
    sortable?: boolean;
    body?: (slotProps: { data: any; index: number }) => VNodeChild;
    headerSlot?: () => VNodeChild;
}

const COLUMNS: ColumnConfig[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'capital', header: 'Capital', sortable: true },
    { field: 'abbreviation', header: 'Abbreviation' },
];

function mountTable(tableProps: Record<string, unknown> = {}, columns: ColumnConfig[] = COLUMNS) {
    return mountSuspended(EsDataTable, {
        props: { items: ITEMS, ...tableProps },
        slots: {
            default: () =>
                columns.map(({ body, headerSlot, ...column }) =>
                    h(EsDataTableColumn, column, {
                        ...(body && { body }),
                        ...(headerSlot && { header: headerSlot }),
                    }),
                ),
        },
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

describe('EsDataTable freezeHeaders', () => {
    const freezeHeaderClasses = (wrapper: VueWrapper) =>
        wrapper.classes().filter((className) => className.startsWith('es-data-table--freeze-headers'));

    it('freezes nothing without freezeHeaders, even with a breakpoint', async () => {
        const wrapper = await mountTable({ freezeHeadersStartingAtBreakpoint: 'lg' });
        expect(freezeHeaderClasses(wrapper)).toEqual([]);
    });

    it('freezes headers at every breakpoint by default', async () => {
        const wrapper = await mountTable({ freezeHeaders: true });
        expect(freezeHeaderClasses(wrapper)).toEqual(['es-data-table--freeze-headers-xs']);
    });

    it('freezes headers starting at the given breakpoint', async () => {
        const wrapper = await mountTable({ freezeHeaders: true, freezeHeadersStartingAtBreakpoint: 'md' });
        expect(freezeHeaderClasses(wrapper)).toEqual(['es-data-table--freeze-headers-md']);
    });
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

    it('renders the body slot with the row as data in place of the field value', async () => {
        const wrapper = await mountTable({}, [
            {
                header: 'State',
                body: ({ data }) => h('a', { href: `/states/${data.abbreviation}` }, data.name),
            },
            { field: 'capital', header: 'Capital' },
        ]);
        expect(wrapper.findAll('thead th').map((th) => th.text())).toEqual(['State', 'Capital']);
        const links = wrapper.findAll('tbody td a');
        expect(links.map((a) => [a.attributes('href'), a.text()])).toEqual([
            ['/states/ME', 'Maine'],
            ['/states/OH', 'Ohio'],
        ]);
        expect(wrapper.findAll('tbody tr').map((tr) => tr.findAll('td')[1]!.text())).toEqual(['Augusta', 'Columbus']);
    });

    it('renders the body slot instead of the field value when a column has both', async () => {
        const wrapper = await mountTable({}, [
            { field: 'name', header: 'Name', body: ({ data }) => data.name.toUpperCase() },
        ]);
        expect(wrapper.findAll('tbody td').map((td) => td.text())).toEqual(['MAINE', 'OHIO']);
    });

    it('passes each row its rendered position as index', async () => {
        const wrapper = await mountTable({ sortField: 'name', sortOrder: -1 }, [
            { field: 'name', header: 'Name', body: ({ data, index }) => `${index}: ${data.name}` },
        ]);
        expect(wrapper.findAll('tbody td').map((td) => td.text())).toEqual(['0: Ohio', '1: Maine']);
    });

    it('sorts a body slot column by its field rather than its rendered content', async () => {
        // rendered as "#9", "#10", "#100", which would sort differently as strings
        const wrapper = await mountTable({ items: RANKED_ITEMS }, [
            { field: 'rank', header: 'Rank', sortable: true, body: ({ data }) => `#${data.rank}` },
        ]);
        await clickHeader(wrapper, 'Rank');
        expect(wrapper.findAll('tbody td').map((td) => td.text())).toEqual(['#9', '#10', '#100']);
    });

    it('renders the header slot in place of the header prop', async () => {
        const wrapper = await mountTable({}, [
            { field: 'name', header: 'Name', headerSlot: () => h('strong', 'State name') },
            { field: 'capital', header: 'Capital' },
        ]);
        const [custom, plain] = wrapper.findAll('thead th');
        expect(custom!.find('strong').text()).toBe('State name');
        expect(custom!.text()).toBe('State name');
        expect(plain!.text()).toBe('Capital');
    });

    it('renders the header slot in a sortable header that still toggles sorting', async () => {
        const wrapper = await mountTable({}, [
            { field: 'name', header: 'Name', sortable: true, headerSlot: () => h('strong', 'State name') },
        ]);
        // once in the button and once in the sizing div that sets the column width
        expect(wrapper.findAll('thead th strong')).toHaveLength(2);
        const button = wrapper.find('thead th button');
        expect(button.find('strong').text()).toBe('State name');
        expect(button.text()).not.toContain('Name');
        await button.trigger('click');
        expect(wrapper.emitted('sort')).toEqual([[{ sortField: 'name', sortOrder: 1 }]]);
    });

    it('renders nothing for a column outside a table', async () => {
        const wrapper = await mountSuspended(EsDataTableColumn, { props: { field: 'name', header: 'Name' } });
        expect(wrapper.find('th').exists()).toBe(false);
        expect(wrapper.find('td').exists()).toBe(false);
    });
});

describe('EsDataTable empty slot', () => {
    const emptySlot = () => h('p', 'No data found');

    it('renders the empty slot in one cell spanning every column when there are no items', async () => {
        const wrapper = await mountSuspended(EsDataTable, {
            props: { items: [] },
            slots: {
                default: () => COLUMNS.map((column) => h(EsDataTableColumn, column)),
                empty: emptySlot,
            },
        });
        const cells = wrapper.findAll('tbody td');
        expect(cells).toHaveLength(1);
        expect(cells[0]!.attributes('colspan')).toBe('3');
        expect(cells[0]!.find('p').text()).toBe('No data found');
        expect(cells[0]!.text()).not.toContain('No data to display');
        expect(wrapper.findAll('thead th')).toHaveLength(3);
    });

    it('counts columns rendered with v-for and skips columns hidden with v-if', async () => {
        const wrapper = await mountSuspended(EsDataTable, {
            props: { items: [] },
            slots: {
                // an array child becomes a v-for fragment, and null becomes a false v-if's comment
                default: () => [
                    h(EsDataTableColumn, COLUMNS[0]),
                    COLUMNS.slice(1).map((column) => h(EsDataTableColumn, column)),
                    null,
                ],
                empty: emptySlot,
            },
        });
        expect(wrapper.find('tbody td').attributes('colspan')).toBe('3');
    });

    it('renders no empty row when there are items', async () => {
        const wrapper = await mountSuspended(EsDataTable, {
            props: { items: ITEMS },
            slots: {
                default: () => COLUMNS.map((column) => h(EsDataTableColumn, column)),
                empty: emptySlot,
            },
        });
        expect(wrapper.find('tbody p').exists()).toBe(false);
        expect(wrapper.findAll('tbody tr')).toHaveLength(ITEMS.length);
    });

    it('renders default text spanning every column without the empty slot', async () => {
        const wrapper = await mountTable({ items: [] });
        const cells = wrapper.findAll('tbody td');
        expect(cells).toHaveLength(1);
        expect(cells[0]!.attributes('colspan')).toBe('3');
        expect(cells[0]!.text()).toBe('No data to display');
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

const RANKED_COLUMNS: ColumnConfig[] = [
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

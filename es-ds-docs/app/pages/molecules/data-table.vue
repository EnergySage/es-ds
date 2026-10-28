<script setup lang="ts">
const esDataTableProps = [
    [
        'freeze-first-column',
        'Boolean',
        'false',
        'If true, allows the other columns to scroll horizontally while keeping the first column visible.',
    ],
    ['freeze-headers', 'Boolean', 'false', 'If true, the table header will stay visible while scrolling the page.'],
    [
        'freeze-headers-starting-at-breakpoint',
        'String',
        'xs',
        'The smallest breakpoint (xs, sm, md, lg, xl, or xxl) at which freeze-headers applies. Frozen headers prevent horizontal scrolling, so below this breakpoint the table scrolls horizontally instead and its headers are not frozen.',
    ],
    ['items', 'Array', 'n/a', 'Required. An array of objects to display.'],
    ['sort-field', 'String', "''", 'If provided, sets the initial column that should start with sorting applied.'],
    ['sort-order', '-1 or 1', '1', 'Sets the initial sort order, with 1 for ascending and -1 for descending.'],
    [
        'use-internal-sorting',
        'Boolean',
        'true',
        'Uses a simple number and string sorting algorithm by default. Set to false if you need to use a more complex sorting algorithm.',
    ],
    ['use-rounded-corners', 'Boolean', 'true', 'By default, the corners of the data table are rounded to match other elements in the design system. Use this to turn it off in special cases.'],
];

const esDataTableSlots = [
    [
        'empty',
        "'No rows to display'",
        'Allows you to customize the contents of the table body when there are no items to display.',
    ],
];

const esDataTableColumnProps = [
    [
        'field',
        'String',
        "''",
        'Determines which key of the items object to render in this column. Optional, as you can use the body slot to turn on custom rendering for this column instead. Needed in order to enable sorting on a column, regardless of rendering mode.',
    ],
    [
        'header',
        'String',
        "''",
        'The text to display in the column header. Optional, as you can use the header slot to turn on custom rendering for this column instead.',
    ],
    ['sortable', 'Boolean', 'false', 'If true and field is provided, enables sorting for this column.'],
];

const esDataTableColumnSlots = [
    ['header', 'n/a', 'Allows you to customize the contents of the column header.'],
    ['body', 'n/a', 'Allows you to customize the contents of the table cells in that column.'],
];

const prosConsTable = [
    {
        advantages: 'Saves money on electricity',
        disadvantages: 'Savings are lower than with a solar loan or cash purchases',
    },
    {
        advantages: 'Low or no upfront costs',
        disadvantages: "Can't take advantage of state and local incentives",
    },
    {
        advantages: 'May be an attractive feature to some homebuyers',
        disadvantages: 'Complicates selling your home',
    },
    {
        advantages: 'No maintenance responsibilities',
        disadvantages: 'Leasing companies sometimes neglect their maintenance responsibilities',
    },
];

const averageCostTable = [
    {
        costAfter: 8000,
        costBefore: 10000,
        incentive: 'Local rebate',
        url: '/atoms/color',
    },
    {
        costAfter: 10000,
        costBefore: 20000,
        incentive: 'State tax credit',
        url: '/atoms/spacing',
    },
    {
        costAfter: 20000,
        costBefore: 30000,
        incentive: 'Larger state tax credit',
        url: '/atoms/typography',
    },
];

const stateInfoTable = [
    {
        abbreviation: 'AL',
        capital: 'Montgomery',
        name: 'Alabama',
        yearAdmitted: '1819',
    },
    {
        abbreviation: 'AK',
        capital: 'Juneau',
        name: 'Alaska',
        yearAdmitted: '1959',
    },
    {
        abbreviation: 'AZ',
        capital: 'Phoeniz',
        name: 'Arizona',
        yearAdmitted: '1912',
    },
    {
        abbreviation: 'AR',
        capital: 'Little Rock',
        name: 'Arkansas',
        yearAdmitted: '1836',
    },
    {
        abbreviation: 'CA',
        capital: 'Sacramento',
        name: 'California',
        yearAdmitted: '1850',
    },
    {
        abbreviation: 'CO',
        capital: 'Denver',
        name: 'Colorado',
        yearAdmitted: '1876',
    },
    {
        abbreviation: 'CT',
        capital: 'Hartford',
        name: 'Connecticut',
        yearAdmitted: '1788',
    },
    {
        abbreviation: 'DE',
        capital: 'Dover',
        name: 'Delaware',
        yearAdmitted: '1787',
    },
    {
        abbreviation: 'FL',
        capital: 'Tallahassee',
        name: 'Florida',
        yearAdmitted: '1845',
    },
    {
        abbreviation: 'GA',
        capital: 'Atlanta',
        name: 'Georgia',
        yearAdmitted: '1788',
    },
    {
        abbreviation: 'HI',
        capital: 'Honolulu',
        name: 'Hawaii',
        yearAdmitted: '1959',
    },
    {
        abbreviation: 'ID',
        capital: 'Boise',
        name: 'Idaho',
        yearAdmitted: '1890',
    },
    {
        abbreviation: 'IA',
        capital: 'Des Moines',
        name: 'Iowa',
        yearAdmitted: '1846',
    },
    {
        abbreviation: 'IL',
        capital: 'Springfield',
        name: 'Illinois',
        yearAdmitted: '1818',
    },
    {
        abbreviation: 'IN',
        capital: 'Indianapolis',
        name: 'Indiana',
        yearAdmitted: '1816',
    },
    {
        abbreviation: 'KS',
        capital: 'Topeka',
        name: 'Kansas',
        yearAdmitted: '1861',
    },
    {
        abbreviation: 'KY',
        capital: 'Frankfort',
        name: 'Kentucky',
        yearAdmitted: '1792',
    },
];

const customerTable = [
    {
        city: 'Boston, MA',
        name: 'Avery Johnson',
        quoteUrl: '/atoms/color',
        status: 'Installed',
        systemSize: 7.2,
    },
    {
        city: 'Austin, TX',
        name: 'Jordan Lee',
        quoteUrl: '/atoms/corners',
        status: 'Pending',
        systemSize: 10.4,
    },
    {
        city: 'Denver, CO',
        name: 'Sam Rivera',
        quoteUrl: '/atoms/icons',
        status: 'Cancelled',
        systemSize: 5.8,
    },
    {
        city: 'Phoenix, AZ',
        name: 'Taylor Kim',
        quoteUrl: '/atoms/layout',
        status: 'Installed',
        systemSize: 12.1,
    },
    {
        city: 'Portland, OR',
        name: 'Morgan Patel',
        quoteUrl: '/atoms/spacing',
        status: 'Pending',
        systemSize: 8.6,
    },
];

const usDollarNumberFormat = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
    maximumFractionDigits: 0,
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-data-table.vue?raw');

        const docSource = await import('./data-table.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Data table</h1>

        <div class="mb-500">
            <h2 class="mb-200">Basic example</h2>
            <es-data-table :items="prosConsTable">
                <es-data-table-column
                    field="advantages"
                    header="Advantages" />
                <es-data-table-column
                    field="disadvantages"
                    header="Disadvantages" />
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2>Custom rendering</h2>
            <p>
                You can customize the rendering of both column headers and table cells. This is most commonly done to
                support bold text, italic text, or links.
            </p>
            <p class="mb-200">
                <strong>Important:</strong> if you enable sorting on a column, that will turn the column header into an
                interactive button. If you customize the headers on a sortable column, be sure NOT to include anything
                interactive (like a link or button), as having a link or button within a button can lead to unexpected
                behavior.
            </p>
            <es-data-table :items="averageCostTable">
                <es-data-table-column header="Incentive">
                    <template #body="slotProps">
                        <nuxt-link :to="slotProps.data.url">{{ slotProps.data.incentive }}</nuxt-link>
                    </template>
                </es-data-table-column>
                <es-data-table-column>
                    <template #header>
                        <span class="align-items-center d-flex">
                            Cost before
                            <es-tooltip trigger-class="ml-25">
                                <template #trigger>
                                    <icon-info
                                        width="20px"
                                        height="20px" />
                                </template>
                                <p class="mb-0">Additional information about upfront cost</p>
                            </es-tooltip>
                        </span>
                    </template>
                    <template #body="slotProps">
                        {{ usDollarNumberFormat.format(slotProps.data.costBefore) }}
                    </template>
                </es-data-table-column>
                <es-data-table-column header="Cost after">
                    <template #header>
                        <span class="align-items-center d-flex">
                            Cost after
                            <es-tooltip trigger-class="ml-25">
                                <template #trigger>
                                    <icon-info
                                        width="20px"
                                        height="20px" />
                                </template>
                                <p class="mb-0">Additional information about how you can realize the savings</p>
                            </es-tooltip>
                        </span>
                    </template>
                    <template #body="slotProps">
                        {{ usDollarNumberFormat.format(slotProps.data.costAfter) }}
                    </template>
                </es-data-table-column>
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2>Sortable</h2>
            <p class="mb-200">
                Apply the <code>sortable</code> prop to a column to indicate that the user should be able to change the
                sort order of the rows based on that column's data. To set the initial state of the table to be sorted
                by a particular column, use the <code>sortField</code> and <code>sortOrder</code> props of the data
                table.
            </p>
            <es-data-table
                :items="stateInfoTable"
                sort-field="name"
                :sort-order="1">
                <es-data-table-column
                    field="name"
                    header="Name"
                    sortable />
                <es-data-table-column
                    field="abbreviation"
                    header="Abbreviation"
                    sortable />
                <es-data-table-column
                    field="capital"
                    header="Capital"
                    sortable />
                <es-data-table-column
                    field="yearAdmitted"
                    header="Year admitted"
                    sortable />
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2>Freeze first column</h2>
            <p class="mb-200">
                Freezing the first column ensures it stays visible while scrolling the table contents horizontally.
                This feature is especially useful on mobile when the first column contains primary information that is
                important to reference when reading the contents of the subsequent columns.
            </p>
            <es-row>
                <es-col
                    sm="8"
                    md="6"
                    lg="5">
                    <es-data-table
                        freeze-first-column
                        :items="stateInfoTable">
                        <es-data-table-column
                            field="name"
                            header="Name" />
                        <es-data-table-column
                            field="abbreviation"
                            header="Abbreviation" />
                        <es-data-table-column
                            field="capital"
                            header="Capital" />
                        <es-data-table-column
                            field="yearAdmitted"
                            header="Year admitted" />
                    </es-data-table>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>Freeze headers</h2>
            <p>
                Freezing the headers keeps them visible as you scroll down the page so you can reference the column
                headers as you browse the table content.
            </p>
            <p>
                <strong>Important:</strong> due to browser limitations, this will disable horizontal scrolling on the
                table, impacting both the "freeze first column" functionality and the automatic horizontal scroll when
                there isn't enough page width to show the full table, so use this feature carefully.
            </p>
            <p class="mb-200">
                The example below has been configured to start freezing the headers at the <code>sm</code> breakpoint,
                so the horizontal scroll and the "freeze first column" functionality will work on mobile. Choose the
                appropriate breakpoint for your table by observing when the full table contents can be viewed without
                needing a horizontal scroll.
            </p>
            <es-data-table
                freeze-first-column
                freeze-headers
                freeze-headers-starting-at-breakpoint="sm"
                :items="stateInfoTable">
                <es-data-table-column
                    field="name"
                    header="Name" />
                <es-data-table-column
                    field="abbreviation"
                    header="Abbreviation" />
                <es-data-table-column
                    field="capital"
                    header="Capital" />
                <es-data-table-column
                    field="yearAdmitted"
                    header="Year admitted" />
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2>Turning off rounded corners</h2>
            <p class="mb-200">
                Rounded corners should be used in most cases to match other elements in the design system, but can be
                turned off to reduce clutter on denser, more interactive screens, especially when the table itself
                contains rounded elements.
            </p>
            <es-data-table
                freeze-first-column
                :items="customerTable"
                :use-rounded-corners="false">
                <es-data-table-column
                    field="name"
                    header="Customer"
                    sortable />
                <es-data-table-column
                    field="city"
                    header="City"
                    sortable />
                <es-data-table-column
                    field="systemSize"
                    sortable>
                    <template #header>
                        <span class="text-right w-100"> System size (kW) </span>
                    </template>
                    <template #body="slotProps">
                        <div class="text-right">
                            {{ slotProps.data.systemSize }}
                        </div>
                    </template>
                </es-data-table-column>
                <es-data-table-column
                    field="status"
                    header="Status"
                    sortable>
                    <template #body="slotProps">
                        <es-badge
                            :variant="
                                slotProps.data.status === 'Success'
                                    ? 'success'
                                    : slotProps.data.status === 'Pending'
                                      ? 'warning'
                                      : slotProps.data.status === 'Cancelled'
                                        ? 'danger'
                                        : 'primary'
                            ">
                            {{ slotProps.data.status }}
                        </es-badge>
                    </template>
                </es-data-table-column>
                <es-data-table-column header="Quote">
                    <template #body="slotProps">
                        <nuxt-link :to="slotProps.data.quoteUrl"> View quote </nuxt-link>
                    </template>
                </es-data-table-column>
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2>Empty example</h2>
            <p class="mb-200">
                When there are no rows to display, the table will show a message to make it clear the table is empty.
            </p>
            <es-data-table :items="[]">
                <es-data-table-column header="Name" />
                <es-data-table-column header="Upfront cost" />
                <es-data-table-column header="25 year savings" />
            </es-data-table>
            <p class="mb-200">You can also customize how the empty state looks.</p>
            <es-data-table :items="[]">
                <es-data-table-column header="Name" />
                <es-data-table-column header="Upfront cost" />
                <es-data-table-column header="25 year savings" />
                <template #empty>
                    <div class="align-items-center d-flex flex-column p-200 text-center">
                        <icon-rooftop-solar
                            class="mb-50"
                            height="64px"
                            width="64px" />
                        Installers are working on custom quotes based on your needs.
                    </div>
                </template>
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2>EsDataTable props</h2>
            <ds-prop-table :rows="esDataTableProps" />
        </div>

        <div class="mb-500">
            <h2>EsDataTable slots</h2>
            <ds-prop-table
                :columns="['Name', 'Default', 'Description']"
                :rows="esDataTableSlots"
                :widths="{
                    md: ['3', '4', '5'],
                }" />
        </div>

        <div class="mb-500">
            <h2>EsDataTableColumn props</h2>
            <ds-prop-table :rows="esDataTableColumnProps" />
        </div>

        <div class="mb-500">
            <h2>EsDataTableColumn slots</h2>
            <ds-prop-table
                :columns="['Name', 'Default', 'Description']"
                :rows="esDataTableColumnSlots"
                :widths="{
                    md: ['3', '4', '5'],
                }" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-data-table.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/data-table.vue" />
    </div>
</template>

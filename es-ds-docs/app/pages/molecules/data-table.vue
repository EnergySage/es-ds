<script setup lang="ts">
const propTableRows = [
    ['items', 'Array', 'n/a', 'Required. An array of objects to display.'],
    ['scrollable', 'Boolean', 'false', 'When specified, limits the height of the table and enables scrolling.'],
    ['scrollHeight', 'String', '305px', 'Height of the scrollable table. Only applies when scrollable is true.'],
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
        <p class="mb-500">
            Extended from
            <nuxt-link
                to="https://v3.primevue.org/datatable/"
                target="_blank">
                PrimeVue DataTable
            </nuxt-link>
        </p>

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
            <h2 class="mb-200">Empty example</h2>
            <es-data-table :items="[]">
                <es-data-table-column
                    field="advantages"
                    header="Advantages" />
                <es-data-table-column
                    field="disadvantages"
                    header="Disadvantages" />
                <template #empty>
                    <div class="text-center p-4">No data found</div>
                </template>
            </es-data-table>
        </div>

        <div class="mb-500">
            <h2 class="mb-200">Custom rendering</h2>
            <es-data-table :items="averageCostTable">
                <es-data-table-column>
                    <template #body="slotProps">
                        <nuxt-link :to="slotProps.data.url">{{ slotProps.data.incentive }}</nuxt-link>
                    </template>
                </es-data-table-column>
                <es-data-table-column header="Cost before">
                    <template #body="slotProps">
                        {{ usDollarNumberFormat.format(slotProps.data.costBefore) }}
                    </template>
                </es-data-table-column>
                <es-data-table-column header="Cost after">
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
            <h2>Limited height with sticky header</h2>
            <p>
                For long tables, it's possible to show a limited number of rows by setting a fixed height. The user can
                then scroll within the table to see the remaining rows.
            </p>
            <p class="mb-200">
                It's best to use this sparingly, since this causes a situation of double scrolling and can make it
                difficult for users on touch devices to scroll past the table without scrolling to the end of the
                table. If it must be used, try to set the fixed height such that a partial row is visible, to indicate
                to the user there is more content that can be scrolled into view.
            </p>
            <es-data-table
                scrollable
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
            <h2>Freeze one column</h2>
            <p class="mb-200">
                This example shows how to use the <code>frozen</code> prop on a column to ensure it stays visible while
                scrolling the table contents horizontally. This feature is especially useful on mobile when the first
                column contains primary information that is important to reference when reading the contents of the
                subsequent columns.
            </p>
            <es-row>
                <es-col
                    sm="8"
                    md="6"
                    lg="5">
                    <es-data-table
                        sticky-first-col
                        :items="stateInfoTable">
                        <es-data-table-column
                            field="name"
                            frozen
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
            <h2>EsDataTable props</h2>
            <p>
                For additional EsDataTable props beyond the ones listed below, please reference the
                <nuxt-link
                    href="https://v3.primevue.org/datatable/#api.datatable.props"
                    target="_blank"
                    >PrimeVue DataTable</nuxt-link
                >
                props. Note that styling for features of the data table not demonstrated above may not be supported.
            </p>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <div class="mb-500">
            <h2>EsDataTableColumn props</h2>
            <p>
                For the props available to pass into EsDataTableColumn, please reference the
                <nuxt-link
                    href="https://v3.primevue.org/datatable/#api.column"
                    target="_blank"
                    >PrimeVue Column</nuxt-link
                >
                props.
            </p>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-data-table.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/data-table.vue" />
    </div>
</template>

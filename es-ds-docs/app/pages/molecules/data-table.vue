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

    </div>
</template>

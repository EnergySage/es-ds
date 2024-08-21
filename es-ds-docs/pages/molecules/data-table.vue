<template>
    <div>
        <h1>
            Data table
        </h1>
        <p class="mb-500">
            A responsive table using the <nuxt-link to="https://v3.primevue.org/datatable/">PrimeVue DataTable</nuxt-link>.
            For further details about the properties used, refer to the
            <nuxt-link
                to="https://v3.primevue.org/datatable/"
                target="_blank">official PrimeVue documentation</nuxt-link>.
            Familiarity with the capabilities of the base component is <strong>strongly recommended</strong> if
            expanding the functionality of this table.
        </p>
        <div class="mb-500">
            <h2 class="mb-200">
                Basic version, headers inferred from 1st item
            </h2>
            <es-data-table :items="dataTableItems" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">
                Height limited to 150px w/sticky header
            </h2>
            <es-data-table
                sticky-header="150px" 
                :fields="dataTableFields"
                :items="dataTableItems" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">
                Height limited to default 300px w/sticky header, sticky first column
            </h2>
            <es-data-table
                sticky-header
                sticky-first-col
                :fields="dataTableFields"
                :items="dataTableItems" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-data-table.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/data-table.vue" />
    </div>
</template>

<script  setup>

const dataTableFields = [
    {   
        key: 'name',
        sortable: true,
    },
    'type',
    'required',
    'default',
    'description',
]; 
const dataTableItems = [
    {
        name: 'fields',
        type: 'Array',
        default: 'null',
        description: `
            List of strings to use as column names, or objects with column 'name' and additional
            information about each column. Refer to official documentation for more details.
        `,
    },
    {
        name: 'items',
        type: 'Array',
        required: true,
        description: `
            List of dictionaries (1 per row) with keys representing column names and values representing
            row data. Missing keys are allowed. Refer to official documentation for more details.
        `,
    },
    {
        name: 'stickyFirstCol',
        type: 'Boolean',
        default: false,
        description: `
            Make the first column of the data stick on the left side when the table is horizontally
            scrolled.
        `,
    },
    {
        name: 'stickyHeader',
        type: 'Boolean | String',
        default: false,
        description: `
            When set, makes the table vertically scrollable with a sticky header row. The max height of the
            table defaults to 300px, unless a string with a max height is used for this property.
        `,
    },
];
          
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-data-table.vue?raw');
    const docSource = await import('./data-table.vue?raw');
   
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>
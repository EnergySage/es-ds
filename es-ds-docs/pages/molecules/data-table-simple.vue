<script setup>
const fields = ['Field name 1', 'Field name 2', 'Field name 3', 'Field name 4'];
const items = ['Item value 1', 'Item value 2', 'Item value 3', 'Item value 4'];
const propTableColumns = ['Name', 'Type', 'Default', 'Description'];
const propTableRows = [
    ['fields', 'Array', 'null', 'List of strings to use as field names.'],
    ['items', 'Array', '[]', 'List of values to display.'],
    ['tableClass', 'Array|String', 'null', 'CSS class (or classes) to apply to the table element.'],
    ['striped', 'Boolean', 'false', 'Add zebra-striping to the table rows.'],
];

const propTableWidths = { md: ['2', '2', '2', '6'] };
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        // eslint-disable-next-line import/no-unresolved
        const compSource = await import('@energysage/es-ds-components/components/es-data-table-simple.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./data-table-simple.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>
<template>
    <div>
        <h1>Data table simple</h1>
        <p class="mb-500">
            A responsive table using
            <nuxt-link
                href="https://getbootstrap.com/docs/4.6/content/tables/"
                target="_blank">
                Bootstrap table </nuxt-link
            >. For further details about the properties used, refer to the official
            <nuxt-link
                href="https://getbootstrap.com/docs/4.6/content/tables/"
                target="_blank">
                Bootstrap documentation</nuxt-link
            >.
            <!-- eslint-disable-next-line max-len -->
            Familiarity with the capabilities of the base component is <strong>strongly recommended</strong> if
            expanding the functionality of this table.
        </p>
        <div class="mb-500">
            <h2 class="mb-200">Basic version</h2>
            <es-data-table-simple
                table-class="font-size-100"
                :fields="fields"
                :items="items" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">Striped</h2>
            <es-data-table-simple
                table-class="font-size-100"
                :fields="fields"
                :items="items"
                striped />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">Side by side</h2>
            <div class="row p-0">
                <div class="col-md-6 col-12 p-0">
                    <es-data-table-simple
                        class="mb-sm-0"
                        table-class="font-size-100"
                        :fields="fields"
                        :items="items" />
                </div>
                <div class="col-md-6 col-12 p-0">
                    <es-data-table-simple
                        table-class="font-size-100"
                        :fields="fields"
                        :items="items" />
                </div>
            </div>
        </div>
        <div class="mb-500">
            <h2 class="mb-200">Values only</h2>
            <es-data-table-simple
                table-class="font-size-100"
                :items="items" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">Slot content</h2>
            <es-data-table-simple
                table-class="font-size-100"
                striped>
                <thead>
                    <tr>
                        <th>Header text goes here</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Field name 1</th>
                        <td>Item value 1</td>
                    </tr>
                    <tr>
                        <th>Field name 2</th>
                        <td>Item value 2</td>
                    </tr>
                    <tr>
                        <th>Field name 3</th>
                        <td>Item value 3</td>
                    </tr>
                </tbody>
            </es-data-table-simple>
        </div>
        <div class="my-500">
            <h2 class="mb-200">EsDataTableSimple Props</h2>
            <ds-prop-table
                :columns="propTableColumns"
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-data-table-simple.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/data-table-simple.vue" />
    </div>
</template>

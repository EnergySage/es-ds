<template>
    <div>
        <h1>
            Data Table
        </h1>
        <p class="mb-450">
            A responsive table using the <a href="https://bootstrap-vue.org/docs/components/table">bootstrap-vue table</a>.
            For further details about the properties used, refer to the
            <a href="https://bootstrap-vue.org/docs/components/table">official bootstrap-vue documentation</a>.
            Familiarity with the capabilities of the base component is <strong>strongly recommended</strong> if
            expanding the functionality of this table.
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                Basic version, rounded corners, headers inferred from 1st item
            </h2>
            <es-data-table
                rounded
                :items="dataTableItems" />
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                Height limited to 150px w/sticky header
            </h2>
            <es-data-table
                sticky-header="150px"
                :fields="dataTableFields"
                :items="dataTableItems" />
        </div>
        <div class="mb-450">
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
            comp-source="es-vue-base/src/lib-components/EsDataTable.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-data-table.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsDataTableDocs',
    data() {
        return {
            dataTableFields: [
                {
                    key: 'name',
                    sortable: true,
                },
                'type',
                'required',
                'default',
                'description',
            ],
            dataTableItems: [
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
                    name: 'rounded',
                    type: 'Boolean',
                    default: false,
                    description: 'Display the table with rounded corners.',
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
            ],
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-data-table.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsDataTable.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

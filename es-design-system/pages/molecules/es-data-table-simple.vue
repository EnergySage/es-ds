<template>
    <div>
        <h1>
            Data table simple
        </h1>
        <p class="mb-500">
            A responsive table using the <a href="https://bootstrap-vue.org/docs/components/table#simple-tables">bootstrap-vue table simple</a>.
            For further details about the properties used, refer to the
            <a
                href="https://bootstrap-vue.org/docs/components/table#simple-tables"
                target="_blank">official bootstrap-vue documentation</a>.
            Familiarity with the capabilities of the base component is <strong>strongly recommended</strong> if
            expanding the functionality of this table.
        </p>
        <div class="mb-500">
            <h2 class="mb-200">
                Basic version
            </h2>
            <es-data-table-simple
                table-class="font-size-100"
                :fields="fields"
                :items="items" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">
                Striped
            </h2>
            <es-data-table-simple
                table-class="font-size-100"
                striped
                :fields="fields"
                :items="items" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">
                Side by side
            </h2>
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
            <h2 class="mb-200">
                Values only
            </h2>
            <es-data-table-simple
                table-class="font-size-100"
                :items="items" />
        </div>
        <div class="mb-500">
            <h2 class="mb-200">
                Slot content
            </h2>
            <es-data-table-simple
                table-class="font-size-100"
                striped>
                <b-thead>
                    <b-tr>
                        <b-th>
                            Header text goes here
                        </b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr>
                        <b-th>
                            Field name 1
                        </b-th>
                        <b-td>
                            Item value 1
                        </b-td>
                    </b-tr>
                    <b-tr>
                        <b-th>
                            Field name 2
                        </b-th>
                        <b-td>
                            Item value 2
                        </b-td>
                    </b-tr>
                    <b-tr>
                        <b-th>
                            Field name 3
                        </b-th>
                        <b-td>
                            Item value 3
                        </b-td>
                    </b-tr>
                </b-tbody>
            </es-data-table-simple>
        </div>
        <div class="my-500">
            <h2 class="mb-200">
                Props
            </h2>
            <ds-prop-table
                :columns="propTableColumns"
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsDataTableSimple.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-data-table-simple.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsDataTableSimpleDocs',
    data() {
        return {
            fields: ['Field name 1', 'Field name 2', 'Field name 3', 'Field name 4'],
            items: ['Item value 1', 'Item value 2', 'Item value 3', 'Item value 4'],
            propTableColumns: ['Name', 'Type', 'Default', 'Description'],
            propTableRows: [
                [
                    'fields',
                    'Array',
                    'null',
                    'List of strings to use as field names.',
                ],
                [
                    'items',
                    'Array',
                    '[]',
                    'List of values to display.',
                ],
                [
                    'tableClass',
                    'Array|String',
                    'null',
                    'CSS class (or classes) to apply to the table element.',
                ],
                [
                    'striped',
                    'Boolean',
                    'false',
                    'Add zebra-striping to the table rows.',
                ],
            ],
            propTableWidths: {
                md: ['2', '2', '2', '6'],
            },
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-data-table-simple.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsDataTableSimple.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

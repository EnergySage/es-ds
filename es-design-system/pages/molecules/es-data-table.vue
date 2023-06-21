<template>
    <div>
        <h1>
            Data Table
        </h1>
        <p class="mb-450">
            Description and variant summary
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                Version 1
            </h2>
            <es-data-table
                :fields="dataTableFields"
                :items="dataTableItems"
                responsive
                rounded
                sticky-first-col
                sticky-header />
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
                {
                    key: 'default',
                },
                'description',
                'topic',
            ],
            dataTableItems: [
                {
                    name: 'items',
                    default: '1',
                    topic: 'blue',
                    description: `
                        Required. List of dictionaries (1 per row) with keys representing header names and values
                        representing row data. Missing keys are allowed.
                    `,
                },
                {
                    name: 'fields',
                    description: `
                        Optional. List of fields to use as header names.
                        See https://bootstrap-vue.org/docs/components/table#fields-column-definitions for more info.
                    `,
                },
                {
                    name: 'other',
                    default: '0',
                    description: `
                        Required. Used to uniquely identify the item on the page. This value can also be passed to
                        EsAccordionList to signify that this item should start out expanded.
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

<template>
    <div>
        <h1>
            Card
        </h1>
        <p class="mb-450">
            Cards are used to visually group related information on a page. There are two variants:
            display (default) and interactive.
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                Display card
            </h2>
            <es-card>
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                Interactive card
            </h2>
            <es-card
                href="https://www.energysage.com"
                tag="b-link"
                target="_blank"
                variant="interactive">
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
        </div>
        <div class="mb-450">
            <h2>
                EsCard props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>tag</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>'div'</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The name of the tag or component the card should render as.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>variant</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>'display'</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The styling variant to use. Possible values are <code>'display'</code> and
                            <code>'interactive'</code>.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCard.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-card.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsCardDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            columnWidths: {
                md: ['2', '2', '8'],
            },
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('./es-card.vue?raw');
            const compSource = await import('@energysage/es-vue-base/src/lib-components/EsCard.vue?raw');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

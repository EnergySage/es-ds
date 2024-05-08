<template>
    <div>
        <h1>
            Card
        </h1>
        <p class="mb-500">
            Cards are used to visually group related information on a page. There are two variants:
            display (default) and interactive.
        </p>

        <div class="mb-500">
            <h2>
                Display
            </h2>
            <p>
                This is the default styling for a card.
            </p>
            <es-card>
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
        </div>

        <div class="mb-500">
            <h2>
                Interactive (button)
            </h2>
            <p>
                Use <code>variant="interactive"</code> to change the card's visual treatment to
                indicate that it's clickable. By default, it will automatically become a button.
            </p>
            <es-card
                variant="interactive"
                @click="modalVisible = true">
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
            <es-modal
                id="button-modal"
                hide-footer
                :visible="modalVisible"
                @hidden="modalVisible = false">
                <template #modal-title>
                    Success
                </template>
                <template #default>
                    <p class="mb-0">
                        The interactive card has been clicked.
                    </p>
                </template>
            </es-modal>
        </div>

        <div class="mb-500">
            <h2>
                Interactive (link)
            </h2>
            <p>
                Use <code>variant="interactive"</code> and pass in <code>href</code> to turn the card into
                a link.
            </p>
            <es-card
                class="mb-100"
                href="https://www.energysage.com"
                target="_blank"
                variant="interactive">
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
            <p>
                If you pass in <code>href</code> and forget to specify <code>variant="interactive"</code>,
                the card will detect this and automatically become an interactive link.
            </p>
            <es-card
                class="mb-100"
                href="https://www.energysage.com"
                target="_blank">
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
            <p>
                You can also use the <code>tag</code> prop to tell the card what HTML element or Vue component
                to render as, while still getting the same interactive card treatment by setting
                <code>variant="interactive"</code>.
            </p>
            <p>
                Below is an example of using <code>tag="nuxt-link"</code> to make the card an internal navigation
                link to another page in the same Nuxt app (in this case, the CTA card page).
            </p>
            <es-card
                tag="nuxt-link"
                to="/organisms/es-cta-card"
                variant="interactive">
                <h3>
                    Card title
                </h3>
                <p class="mb-0">
                    Card contents
                </p>
            </es-card>
        </div>

        <div class="mb-500">
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
                            <code>href</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>undefined</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            If card is intended to be a link, the URL destination should be passed in here.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
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
            modalVisible: false,
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-card.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCard.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

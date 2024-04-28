<template>
    <div>
        <h1>
            Textarea
        </h1>
        <p>
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/form-textarea"
                target="_blank">
                bootstrap-vue form-textarea
            </b-link>
        </p>
        <p>
            When using a form textarea, please ensure that the label style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
        </p>
        <b-row class="my-450">
            <b-col
                cols="12"
                lg="6">
                <es-form-textarea
                    id="myId"
                    v-model="docTextarea">
                    <template #label>
                        My notes
                    </template>
                    <template #message>
                        Please enter your notes.
                    </template>
                    <template #errorMessage>
                        Please enter some notes.
                    </template>
                    <template #successMessage>
                        Your notes has been submitted successfully.
                    </template>
                </es-form-textarea>
            </b-col>
        </b-row>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormTextarea.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-textarea.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsFormTextareaDocs',
    data() {
        return {
            docTextarea: 'Example text',
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-form-textarea.vue');
            // eslint-disable-next-line max-len
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsFormTextarea.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

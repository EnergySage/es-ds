<template>
    <div>
        <h1>
            Input
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/form-input">
                bootstrap-vue form-input
            </b-link>
        </p>
        <p>
            When using a form input, please ensure that the label style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
        </p>
        <b-row class="my-5">
            <b-col
                cols="12"
                lg="6">
                <es-form-input
                    id="myId"
                    v-model="docInput">
                    <template #label>
                        Account number
                    </template>
                    <template #message>
                        Please enter your account number.
                    </template>
                    <template #errorMessage>
                        Please enter a valid account number.
                    </template>
                    <template #successMessage>
                        Your account number has been submitted successfully.
                    </template>
                </es-form-input>
            </b-col>
        </b-row>
        <b-row class="mt-4">
            <b-col
                cols="12"
                lg="6">
                <es-form-input
                    id="myId2"
                    v-model="example2">
                    <template #label>
                        Account Number
                    </template>
                    <template #extraContext>
                        Extra Context Goes Here
                    </template>
                    <template #message>
                        Please enter your account number.
                    </template>
                    <template #errorMessage>
                        Please enter a valid account number.
                    </template>
                    <template #successMessage>
                        Your account number has been submitted successfully.
                    </template>
                </es-form-input>
            </b-col>
        </b-row>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormInput.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-input.vue" />
    </div>
</template>
<script>
export default {
    name: 'EsFormInputDocs',
    data() {
        return {
            docInput: 'Example text',
            example2: 'Example two',
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-form-input.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsFormInput.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

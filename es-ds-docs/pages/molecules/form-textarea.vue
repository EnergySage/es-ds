<script setup>
const docTextarea = ref('');
const successValue = ref('My experience was great!');

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-form-textarea.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./form-textarea.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const propTableRows = [
    ['id', 'String', 'n/a', 'Required. The id of the input.'],
    ['v-model', 'String', 'n/a', 'Required. The v-model directive binds the input to a data property.'],
    ['disabled', 'Boolean', 'false', 'Specifies that the input should be disabled.'],
    ['required', 'Boolean', 'false', 'Specifies that the input is required.'],
    [
        'state',
        'Boolean',
        'null',
        'Specifies the validity of the input. Can be true (success), false (error), or null (default).',
    ],
];
</script>

<template>
    <div>
        <h1>Textarea</h1>
        <p>
            When using a form textarea, please ensure that the label style is
            <nuxt-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </nuxt-link>
        </p>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Basic example</h2>
                <es-form-textarea
                    id="basic-example"
                    v-model="docTextarea">
                    <template #label> Notes </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Required</h2>
                <es-form-textarea
                    id="required-example"
                    v-model="docTextarea"
                    required>
                    <template #label> Notes </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Error state</h2>
                <es-form-textarea
                    id="error-example"
                    v-model="docTextarea"
                    required
                    :state="false">
                    <template #label> Notes </template>
                    <template #errorMessage> This field is required. </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Success state</h2>
                <es-form-textarea
                    id="success-example"
                    v-model="successValue"
                    required
                    :state="true">
                    <template #label> Notes </template>
                    <template #errorMessage> This field is required. </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Success state with message</h2>
                <es-form-textarea
                    id="success-message-example"
                    v-model="successValue"
                    required
                    :state="true">
                    <template #label> Notes </template>
                    <template #message> Please enter your notes. </template>
                    <template #errorMessage> This field is required. </template>
                    <template #successMessage> Your notes have been entered successfully. </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Disabled state</h2>
                <es-form-textarea
                    id="disabled-example"
                    v-model="docTextarea"
                    disabled>
                    <template #label> Notes </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col
                cols="12"
                lg="6">
                <h2>Context message</h2>
                <es-form-textarea
                    id="context-message-example"
                    v-model="docTextarea"
                    required>
                    <template #label> Notes </template>
                    <template #message> Please enter your notes. </template>
                    <template #errorMessage> This field is required. </template>
                    <template #successMessage> Your notes have been entered successfully. </template>
                </es-form-textarea>
            </b-col>
        </b-row>

        <div class="mb-500">
            <h2>EsFormTextarea props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-form-textarea.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/form-textarea.vue" />
    </div>
</template>

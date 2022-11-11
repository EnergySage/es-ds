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
        <b-row>
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
    </div>
</template>
<script>
// TODO: Add input state/msg validation example
import { EsFormInput } from '@energysage/es-vue-base';

export default {
    name: 'EsFormInputDocs',
    components: {
        EsFormInput,
    },
    data() {
        return {
            docInput: 'Example text',
            example2: 'Example two',
        };
    },
};
</script>

<template>
    <b-row>
        <b-col
            cols="12"
            lg="6">
            <es-form-input
                id="myId"
                v-model="docInput">
                <template #label>
                    Account Number
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
</template>
<script>
// TODO: Add input state/msg validation example
import { BCol, BRow } from 'bootstrap-vue';
import { EsFormInput } from '@energysage/es-vue-base';

export default {
    name: 'EsFormInputDocs',
    components: {
        BCol,
        BRow,
        EsFormInput,
    },
    data() {
        return {
            docInput: 'Example text',
        };
    },
};
</script>

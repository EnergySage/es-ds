<template>
    <b-row>
        <b-col
            cols="12"
            lg="6">
            <es-form-textarea
                id="myId"
                v-model="docTextarea">
                <template #label>
                    Notes
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
</template>
<script>
// TODO: Add input state/msg validation example
import { BCol, BRow } from 'bootstrap-vue';
import { EsFormTextarea } from '@energysage/es-vue-base';

export default {
    name: 'EsFormTextareaDocs',
    components: {
        BCol,
        BRow,
        EsFormTextarea,
    },
    data() {
        return {
            docTextarea: 'Example text',
        };
    },
};
</script>

<template>
    <div>
        <h1>
            Textarea
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/form-textarea">
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
        <b-row>
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
    </div>
</template>
<script>
// TODO: Add input state/msg validation example
import { EsFormTextarea } from '@energysage/es-vue-base';

export default {
    name: 'EsFormTextareaDocs',
    components: {
        EsFormTextarea,
    },
    data() {
        return {
            docTextarea: 'Example text',
        };
    },
};
</script>

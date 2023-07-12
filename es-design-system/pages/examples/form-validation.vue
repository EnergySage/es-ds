<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>
                    Form with (form level) Validation
                </h1>
                <p>
                    See
                    <b-link
                        :to="{ name: 'examples-form-field-validation___en' }">
                        Form Field Validation
                    </b-link> for field level validation example
                </p>
                <h2>
                    UX Guidelines
                </h2>
                <p>
                    <ul>
                        <li>
                            Show loading spinner on button during server request
                        </li>
                        <li>
                            Use <b-link :to="{ name: 'molecules-es-form-msg___en' }">
                                EsFormMsg
                            </b-link>
                            for displaying of server-side form-level errors
                        </li>
                    </ul>
                </p>
            </b-col>
        </b-row>
        <b-row class="border-top pt-200 my-50">
            <b-col
                cols="12"
                lg="8">
                <b-form
                    @submit.stop.prevent="onSubmit">
                    <es-form-msg
                        class="my-450"
                        :show="formShowError"
                        :variant="formMsgVariant"
                        @hidden="formShowError=false">
                        The server responded with an error and
                        we were unable to complete your request. Please try again
                    </es-form-msg>
                    <es-form-input
                        id="form-input-name"
                        v-model="form.name"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label>
                            Name
                        </template>
                    </es-form-input>
                    <div class="d-flex flex-grow-1 justify-content-end mt-100">
                        <es-button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :disabled="isSubmitInProgress">
                            <span class="w-100 min-width-6">
                                <span
                                    v-if="isSubmitInProgress">
                                    <b-spinner
                                        role="status"
                                        label="Loading" />
                                </span>
                                <span
                                    :class="{'sr-only': isSubmitInProgress }">
                                    Submit
                                </span>
                            </span>
                        </es-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { formMixins } from '@energysage/es-vue-base';

export default {
    name: 'EsFormDocs',
    mixins: [formMixins],
    data() {
        return {
            form: {
                name: '',
            },
        };
    },
    methods: {
        async asyncTimeout(seconds = 3) {
            const millisecondTimeout = seconds * 1000;
            return new Promise((resolve) => {
                setTimeout(resolve, millisecondTimeout);
            });
        },
        /**
        * Simulate a request to a server
        */
        async fakeServerRequest() {
            await this.asyncTimeout();
            this.showFormError(); // This method via formMixins
        },
        async onSubmit() {
            this.startSubmit(); // This method via formMixins, will set this.submitInProgress to true
            await this.fakeServerRequest();
            this.stopSubmit(); // This method via formMixins, will set this.submitInProgress to false
        },
    },
};
</script>

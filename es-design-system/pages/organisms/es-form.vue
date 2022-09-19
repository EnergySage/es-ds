<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>
                    Forms
                </h1>
                <b-form-checkbox
                    id="inline-form"
                    v-model="inline"
                    name="inline-form">
                    Inline Form
                </b-form-checkbox>
            </b-col>
        </b-row>
        <b-row class="my-5 border-top pt-5">
            <b-col
                cols="12"
                lg="8">
                <b-form
                    :inline="inline"
                    @submit.stop.prevent="onSubmit">
                    <es-form-input
                        id="email"
                        v-model="$v.form.email.$model"
                        :state="validateState('email')"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label>
                            Email Address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="phone"
                        v-model="$v.form.phone.$model"
                        :state="validateState('phone')"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label>
                            Phone Number
                        </template>
                        <template #errorMessage>
                            Please enter a valid phone number.
                        </template>
                    </es-form-input>
                    <es-form-textarea
                        id="notes"
                        v-model="$v.form.notes.$model"
                        :disabled="isSubmitInProgress"
                        :state="validateState('notes')"
                        required>
                        <template #label>
                            Notes
                        </template>
                    </es-form-textarea>
                    <es-form-msg
                        class="mt-3"
                        :variant="formMsgVariant"
                        :message="formMsg"
                        @hidden="formMsg = ''" />
                    <div class="d-flex flex-grow-1 justify-content-end mt-3">
                        <es-button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :loading="isSubmitInProgress"
                            :disabled="isSubmitInProgress">
                            <span class="position-relative d-inline-block w-100">
                                <span
                                    v-if="isSubmitInProgress"
                                    class="button-spinner position-absolute d-inline-block h-100 w-100">
                                    <b-spinner
                                        role="status"
                                        aria-hidden="true"
                                        label="Loading" />
                                </span>
                                Submit
                            </span>
                        </es-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
        <b-row class="my-5 border-top pt-5">
            <b-col>
                <h2>
                    Data Mixins
                </h2>
                <b-table
                    striped
                    :items="dataMixins" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h2>
                    Method Mixins
                </h2>
                <b-table
                    striped
                    :items="methodMixins" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h2>
                    Validators
                </h2>
                <b-table
                    striped
                    :items="validatorMixins" />
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {
    EsFormInput, EsFormTextarea, EsButton, EsFormMsg, formMixins, vuelidateRequired, vuelidatePhone, vuelidateEmail,
} from '@energysage/es-vue-base';

export default {
    name: 'EsFormDocs',
    components: {
        EsFormMsg,
        EsFormInput,
        EsFormTextarea,
        EsButton,
    },
    mixins: [formMixins],
    data() {
        return {
            inline: false,
            validatorMixins: [
                {
                    name: 'vuelidateRequired',
                    arguments: '',
                    description: 'check if the field has a value',
                },
                {
                    name: 'vuelidateRequiredIf',
                    arguments: 'function',
                    description: 'a function with access to string; expected to return a boolean',
                },
                {
                    name: 'vuelidateMinValue',
                    arguments: 'minimum',
                    description: 'check if number is greater than minimum',
                },
                {
                    name: 'vuelidateMaxValue',
                    arguments: 'maximum',
                    description: 'check if number is less than maximum',
                },
                {
                    name: 'vuelidateMinLength',
                    arguments: 'minimum',
                    description: 'check if string has at least the mimimum characters count',
                },
                {
                    name: 'vuelidateMaxValue',
                    arguments: 'maximum',
                    description: 'check if string has less than the maximum characters count',
                },
                {
                    name: 'vuelidateNumeric',
                    arguments: '',
                    description: 'check if the value is a number',
                },
                {
                    name: 'vuelidateEmail',
                    arguments: '',
                    description: 'check if the string is a valid email address',
                },
                {
                    name: 'vuelidatePhone',
                    arguments: '',
                    description: 'check if the string is a valid US phone number',
                },
            ],
            dataMixins: [
                {
                    name: 'isSubmitInProgress',
                    type: 'Boolean',
                    description: 'Is true when startSubmit is called; false when endSubmit is called',
                },
                { name: 'formMsg', type: 'String', description: 'Text to display in EsFormMsg' },
                { name: 'formMsgVariant', type: 'enum [success,danger]', description: 'Variant to use in EsFormMsg' },
            ],
            methodMixins: [
                {
                    name: 'validateState',
                    arguments: 'v-model',
                    description: 'checks if the current v-model value is valid; return boolean',
                },
                {
                    name: 'showFormError',
                    arguments: 'text',
                    description: 'Text to display in EsFormMsg with danger variant',
                },
                {
                    name: 'showFormSuccess',
                    arguments: 'text',
                    description: 'Text to display in EsFormMsg with success variant',
                },
                {
                    name: 'startSubmit',
                    arguments: '',
                    description: 'Starts submit process; updates state and sets isSubmitInProgress to true',
                },
                {
                    name: 'endSubmit',
                    arguments: '',
                    description: 'Ends submit process; updates state and sets isSubmitInProgress to false',
                },
            ],
            form: {
                phone: null,
                email: null,
                notes: null,
            },
        };
    },
    validations: {
        form: {
            phone: {
                required: vuelidateRequired,
                phone: vuelidatePhone,
            },
            email: {
                required: vuelidateRequired,
                email: vuelidateEmail,
            },
            notes: {
                required: vuelidateRequired,
            },
        },
    },
    methods: {
        onSubmit() {
            this.startSubmit();

            this.$v.form.$touch();
            if (this.$v.form.$anyError) {
                this.stopSubmit();
                return;
            }

            // Fake Server Transaction Time
            setTimeout(() => {
                this.stopSubmit();
                if (Math.random() < 0.5) {
                    this.showFormSuccess();
                } else {
                    this.showFormError();
                }
            }, 5000);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

@include media-breakpoint-up(md) {
    .w-lg-auto {
        width: auto !important;
    }
}

.button-spinner {
  right: 0;
  top: -28%;
}
</style>

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
                    Documentation
                </h2>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {
    BForm, BContainer, BRow, BCol, BFormCheckbox, BSpinner,
} from 'bootstrap-vue';
import {
    EsFormInput, EsFormTextarea, EsButton, EsFormMsg, formMixins, validators,
} from '@energysage/es-vue-base';

export default {
    name: 'EsFormDocs',
    components: {
        BForm,
        BContainer,
        BRow,
        BFormCheckbox,
        BCol,
        BSpinner,
        EsFormMsg,
        EsFormInput,
        EsFormTextarea,
        EsButton,
    },
    mixins: [formMixins],
    data() {
        return {
            inline: false,
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
                required: validators.required,
                phone: validators.phone,
            },
            email: {
                required: validators.required,
                email: validators.email,
            },
            notes: {
                required: validators.required,
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
@import '~@energysage/es-bs-extends/scss/includes';

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

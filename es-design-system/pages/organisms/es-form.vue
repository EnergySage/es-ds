<template>
    <b-container>
        <b-row>
            <b-col
                cols="12"
                lg="8">
                <b-form @submit.stop.prevent="onSubmit">
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
                    <b-row class="justify-content-end my-3">
                        <b-col
                            cols="12"
                            lg="4">
                            <es-button
                                type="submit"
                                class="w-100"
                                :loading="isSubmitInProgress"
                                :disabled="isSubmitInProgress">
                                Submit
                            </es-button>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {
    BForm, BContainer, BRow, BCol,
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
        BCol,
        EsFormMsg,
        EsFormInput,
        EsFormTextarea,
        EsButton,
    },
    mixins: [formMixins],
    data() {
        return {
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
                this.showFormError();
                return;
            }

            // Fake Server Transaction Time
            setTimeout(() => {
                this.stopSubmit();
                this.showFormSuccess();
            }, 5000);
        },
    },
};
</script>

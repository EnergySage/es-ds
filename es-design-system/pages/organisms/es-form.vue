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
        <b-row class="my-500 border-top pt-500">
            <b-col
                cols="12"
                lg="8">
                <b-form
                    :inline="inline"
                    @submit.stop.prevent="onSubmit">
                    <es-form-input
                        id="email"
                        v-model="$v.form.email.$model"
                        :state="validateState('form.email')"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="password"
                        v-model="$v.form.password.$model"
                        :state="validateState('form.password')"
                        :disabled="isSubmitInProgress"
                        required
                        type="tel">
                        <template #label>
                            Password
                        </template>
                        <template #errorMessage>
                            <div
                                v-for="error in formErrors.password"
                                :key="error">
                                {{ error }}
                            </div>
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="phone"
                        v-model="$v.form.phone.$model"
                        :state="validateState('form.phone')"
                        :disabled="isSubmitInProgress"
                        required
                        type="tel">
                        <template #label>
                            Phone number
                        </template>
                        <template #errorMessage>
                            Please enter a valid phone number.
                        </template>
                    </es-form-input>
                    <es-form-textarea
                        id="notes"
                        v-model="$v.form.notes.$model"
                        :disabled="isSubmitInProgress"
                        :state="validateState('form.notes')"
                        required>
                        <template #label>
                            Notes
                        </template>
                    </es-form-textarea>
                    <es-form-msg
                        class="mt-100"
                        :variant="formMsgVariant"
                        :message="formMsg"
                        @hidden="formMsg = ''" />
                    <div class="d-flex flex-grow-1 justify-content-end mt-100">
                        <es-button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :disabled="isSubmitInProgress">
                            <span class="position-relative d-inline-block w-100">
                                <span
                                    v-if="isSubmitInProgress"
                                    class="button-spinner position-absolute d-inline-block h-100 w-100">
                                    <b-spinner
                                        role="status"
                                        label="Loading" />
                                </span>
                                Submit
                            </span>
                        </es-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
        <b-row class="my-500 border-top pt-500">
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
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-form.vue" />
    </b-container>
</template>

<script>
import {
    formMixins,
    vuelidateKeys,
    vuelidateRequired,
    vuelidatePhone,
    vuelidateEmail,
    vuelidateMinLength,
    vuelidateHasNumber,
    vuelidateHasSpecialCharacter,
    vuelidateHasUppercaseLetter,
    vuelidateHasLowercaseLetter,
} from '@energysage/es-vue-base';

export default {
    name: 'EsFormDocs',
    mixins: [formMixins],
    data() {
        return {
            inline: false,
            validatorMixins: [
                {
                    name: vuelidateKeys.REQUIRED,
                    arguments: '',
                    description: 'check if the field has a value',
                },
                {
                    name: vuelidateKeys.REQUIRED_IF,
                    arguments: 'function',
                    description: 'a function with access to string; expected to return a boolean',
                },
                {
                    name: vuelidateKeys.MIN_VALUE,
                    arguments: 'minimum',
                    description: 'check if number is greater than minimum',
                },
                {
                    name: vuelidateKeys.MAX_VALUE,
                    arguments: 'maximum',
                    description: 'check if number is less than maximum',
                },
                {
                    name: vuelidateKeys.MIN_LENGTH,
                    arguments: '',
                    description: 'This field must be at least 8 characters',
                },
                {
                    name: vuelidateKeys.MAX_LENGTH,
                    arguments: 'maximum',
                    description: 'check if string has less than the maximum characters count',
                },
                {
                    name: vuelidateKeys.NUMERIC,
                    arguments: '',
                    description: 'check if the value is a number',
                },
                {
                    name: vuelidateKeys.EMAIL,
                    arguments: '',
                    description: 'check if the string is a valid email address',
                },
                {
                    name: vuelidateKeys.PHONE,
                    arguments: '',
                    description: 'check if the string is a valid US phone number',
                },
                {
                    name: vuelidateKeys.HAS_NUMBER,
                    arguments: '',
                    description: 'check if the string contains a number',
                },
                {
                    name: vuelidateKeys.HAS_SPECIAL_CHARACTER,
                    arguments: '',
                    description: 'check if the string contains a special character',
                },
                {
                    name: vuelidateKeys.HAS_UPPERCASE_LETTER,
                    arguments: '',
                    description: 'check if the string contains an uppercase character',
                },
                {
                    name: vuelidateKeys.HAS_LOWERCASE_LETTER,
                    arguments: '',
                    description: 'check if the string contains a lowercase character',
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
                password: null,
            },
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-form.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
    validations: {
        form: {
            phone: {
                [vuelidateKeys.REQUIRED]: vuelidateRequired,
                [vuelidateKeys.PHONE]: vuelidatePhone,
            },
            email: {
                [vuelidateKeys.REQUIRED]: vuelidateRequired,
                [vuelidateKeys.EMAIL]: vuelidateEmail,
            },
            notes: {
                [vuelidateKeys.REQUIRED]: vuelidateRequired,
            },
            password: {
                [vuelidateKeys.REQUIRED]: vuelidateRequired,
                [vuelidateKeys.MIN_LENGTH]: vuelidateMinLength(8),
                [vuelidateKeys.HAS_NUMBER]: vuelidateHasNumber(1),
                [vuelidateKeys.HAS_SPECIAL_CHARACTER]: vuelidateHasSpecialCharacter(1),
                [vuelidateKeys.HAS_UPPERCASE_LETTER]: vuelidateHasUppercaseLetter(1),
                [vuelidateKeys.HAS_LOWERCASE_LETTER]: vuelidateHasLowercaseLetter(1),
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
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;

@include breakpoints.media-breakpoint-up(md) {
    .w-lg-auto {
        width: auto !important;
    }
}

.button-spinner {
  right: 0;
  top: -28%;
}
</style>

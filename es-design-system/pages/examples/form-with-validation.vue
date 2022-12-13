<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>
                    Form with Validation
                </h1>
                <h2>
                    UX Guidelines
                </h2>
                <p>
                    <ul>
                        <li>
                            Validation should initially trigger <em>on-blur</em>.<br>
                            Subsequent validation should trigger <em>on-input-change</em>.
                        </li>
                        <li>
                            Validation for password fields should always trigger <em>on-input-change</em>
                        </li>
                    </ul>
                </p>
            </b-col>
        </b-row>
        <b-row class="border-top pt-4 my-2">
            <b-col
                cols="12"
                lg="8">
                <b-form
                    @submit.stop.prevent="onSubmit">
                    <es-form-input
                        id="email"
                        v-model="form.email"
                        :disabled="isSubmitInProgress"
                        required
                        :state="validateState('form.email')"
                        @change="touchOnChange('form.email')"
                        @blur="$v.form.email.$touch">
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
                        type="password">
                        <template #label>
                            Password
                        </template>
                        <template #errorMessage>
                            <div
                                v-for="error in formErrors.password"
                                :key="error">
                                {{ getErrorMessage(error) }}
                            </div>
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="phone"
                        v-model="form.phone"
                        :state="validateState('form.phone')"
                        :disabled="isSubmitInProgress"
                        required
                        type="tel"
                        @change="touchOnChange('form.phone')"
                        @blur="$v.form.phone.$touch">
                        <template #label>
                            Phone number
                        </template>
                        <template #errorMessage>
                            Please enter a valid phone number.
                        </template>
                    </es-form-input>
                    <es-form-textarea
                        id="notes"
                        v-model="form.notes"
                        :disabled="isSubmitInProgress"
                        :state="validateState('form.notes')"
                        required
                        @change="touchOnChange('form.notes')"
                        @blur="$v.form.notes.$touch">
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
    </b-container>
</template>

<script>
import {
    EsFormInput,
    EsFormTextarea,
    EsButton,
    EsFormMsg,
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
    components: {
        EsFormMsg,
        EsFormInput,
        EsFormTextarea,
        EsButton,
    },
    mixins: [formMixins],
    data() {
        return {
            // TODO: toggle server validation errors via queryString
            triggerServerValidationErrors: false,
            serverValidationErrors: [],
            form: {
                phone: null,
                email: null,
                notes: null,
                password: null,
            },
        };
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
        async fakeServerRequest(isSuccess = false) {
            const threeSecondTimeout = async (func) => setTimeout(func, 3000);
            await threeSecondTimeout(() => {
                if (isSuccess) {
                    this.showFormSuccess();
                } else {
                    this.showFormError();
                }
            });
            this.startSubmit();
        },
        async onSubmit() {
            this.startSubmit();
            this.$v.form.$touch();
            if (!this.$v.form.$anyError) {
                await this.fakeServerRequest();
            }
            this.stopSubmit();
        },
        getErrorMessage(validatorName) {
            const ERROR_MESSAGES = {
                [vuelidateKeys.REQUIRED]: () => 'This field is required',
                [vuelidateKeys.MIN_LENGTH]: (min = 8) => `This field must be at least ${min} characters`,
                [vuelidateKeys.HAS_NUMBER]: () => 'This field must include a number',
                [vuelidateKeys.HAS_SPECIAL_CHARACTER]: () => 'This field must include a special character',
                [vuelidateKeys.HAS_UPPERCASE_LETTER]: () => 'This field must include an uppercase letter',
                [vuelidateKeys.HAS_LOWERCASE_LETTER]: () => 'This field must include a lowercase letter',
            };
            const msgFunc = ERROR_MESSAGES[validatorName];
            if (msgFunc) {
                return msgFunc();
            }
            return '';
        },
    },
};
</script>

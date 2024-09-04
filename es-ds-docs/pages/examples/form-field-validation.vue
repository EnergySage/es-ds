<script setup lang="ts">
const state = reactive({
    form: {
        email: '',
        password: '',
        phone: '',
        maskedPhoneNumber: '',
        // notes: '',
    },
});

const rules = {
    form: {
        phone: {
            [vuelidateKeys.REQUIRED]: vuelidateRequired,
            [vuelidateKeys.PHONE]: vuelidatePhone,
        },
        email: {
            [vuelidateKeys.REQUIRED]: vuelidateRequired,
            [vuelidateKeys.EMAIL]: vuelidateEmail,
        },
        // notes: {
        //     [vuelidateKeys.REQUIRED]: vuelidateRequired,
        // },
        password: {
            [vuelidateKeys.REQUIRED]: vuelidateRequired,
            [vuelidateKeys.MIN_LENGTH]: vuelidateMinLength(8),
            [vuelidateKeys.HAS_NUMBER]: vuelidateHasNumber(1),
            [vuelidateKeys.HAS_SPECIAL_CHARACTER]: vuelidateHasSpecialCharacter(1),
            [vuelidateKeys.HAS_UPPERCASE_LETTER]: vuelidateHasUppercaseLetter(1),
            [vuelidateKeys.HAS_LOWERCASE_LETTER]: vuelidateHasLowercaseLetter(1),
        },
        maskedPhoneNumber: {
            [vuelidateKeys.REQUIRED]: vuelidateRequired,
            [vuelidateKeys.PHONE]: vuelidatePhone,
        },
    },
};

const {
    v$, formErrors, validateState, touchOnChange, isSubmitInProgress, startSubmit, stopSubmit,
} = useEsForms(rules, state);

const asyncTimeout = async (seconds = 3) => {
    const millisecondTimeout = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondTimeout);
    });
};

const fakeServerRequest = async () => {
    await asyncTimeout();
    // eslint-disable-next-line no-console
    console.log('Submit Complete!');
};

const onSubmit = async () => {
    startSubmit();
    const correct = await v$.value.$validate();
    if (correct) {
        await fakeServerRequest();
    }
    stopSubmit();
};

const getErrorMessage = (validatorName) => {
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
};

const { $prism } = useNuxtApp();
const docCode = ref('');
if ($prism) {
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./form-field-validation.vue?raw');

    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>
                    Form with client-side validation
                </h1>
                <h2>
                    UX Guidelines
                </h2>
                <ul>
                    <li>
                        Validation should initially trigger <em>on blur</em>.
                    </li>
                    <li>
                        Subsequent validation should trigger <em>on change</em>.
                    </li>
                    <li>
                        Validation for password fields should always trigger <em>on change</em>.
                    </li>
                    <li>
                        You'll also want to provide feedback from a server response. For guidance on
                        how to do this, see the
                        <nuxt-link to="/examples/form-validation">
                            Form with server error
                        </nuxt-link> example.
                    </li>
                </ul>
            </b-col>
        </b-row>
        <b-row class="border-top pt-200 my-50">
            <b-col
                cols="12"
                lg="8">
                <form
                    @submit.stop.prevent="onSubmit">
                    <es-form-input
                        id="email"
                        v-model="state.form.email"
                        :disabled="isSubmitInProgress"
                        required
                        :state="validateState('form.email')"
                        @change="touchOnChange('form.email')"
                        @blur="v$.form.email.$touch">
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="password"
                        v-model="v$.form.password.$model"
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
                        v-model="state.form.phone"
                        :state="validateState('form.phone')"
                        :disabled="isSubmitInProgress"
                        required
                        type="tel"
                        @change="touchOnChange('form.phone')"
                        @blur="v$.form.phone.$touch">
                        <template #label>
                            Phone number
                        </template>
                        <template #errorMessage>
                            Please enter a valid phone number.
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="maskedPhoneNumber"
                        v-model="state.form.maskedPhoneNumber"
                        :state="validateState('form.maskedPhoneNumber')"
                        :disabled="isSubmitInProgress"
                        required
                        type="maskedTel"
                        @change="touchOnChange('form.maskedPhoneNumber')"
                        @blur="v$.form.maskedPhoneNumber.$touch">
                        <template #label>
                            Masked phone number
                        </template>
                        <template #errorMessage>
                            Please enter a valid phone number.
                        </template>
                    </es-form-input>
                    <!--                    <es-form-textarea-->
                    <!--                        id="notes"-->
                    <!--                        v-model="form.notes"-->
                    <!--                        :disabled="isSubmitInProgress"-->
                    <!--                        :state="validateState('form.notes')"-->
                    <!--                        required-->
                    <!--                        @change="touchOnChange('form.notes')"-->
                    <!--                        @blur="$v.form.notes.$touch">-->
                    <!--                        <template #label>-->
                    <!--                            Notes-->
                    <!--                        </template>-->
                    <!--                    </es-form-textarea-->
                    <div class="d-flex flex-grow-1 justify-content-end mt-200">
                        <es-button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :disabled="isSubmitInProgress">
                            <span class="w-100">
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
                </form>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <ds-doc-source
                    :doc-code="docCode"
                    doc-source="es-ds-docs/pages/examples/form-field-validation.vue" />
                <es-collapse class="mt-500">
                    <template #title>
                        <h2>
                            Migration from ESDS 2.0/Nuxt 2
                        </h2>
                    </template>
                    <p>
                        Previously, these form utilities were exposed as a mixin which you added to the
                        <code>mixins</code> of your component. Mixins are no longer recommended by Vue,
                        and are not compatible with the composition API. Therefore, these form utilities
                        are now provided as a
                        <nuxt-link to="https://vuejs.org/guide/reusability/composables">
                            composable
                        </nuxt-link>.
                    </p>
                    <p>
                        To use the composable, call <code>useEsForms</code> within your script,
                        as shown in the documentation source. Parameters are
                        your validation rules and the reactive state that includes your form. You will get back
                        all the functions and reactive refs that were previously accessible on <code>this</code>
                        as a result of using the mixin.
                        You will also get back the Vuelidate object, now called <code>v$</code> instead of
                        <code>$v</code> due to a restriction within Vue 3.
                    </p>
                    <p>
                        If you're still using the options API, please refer to the
                        <nuxt-link to="https://vuejs.org/guide/reusability/composables#using-composables-in-options-api">
                            Vue documentation
                        </nuxt-link>
                        for using a composable with the options API.
                    </p>
                    <p>
                        Note that while the API for functions in this composable have not changed from the version
                        in the old mixin, there <b>are</b> upstream changes in Vuelidate which may require
                        manual handling. At a minimum, <code>$v</code> is now <code>v$</code> as previously mentioned.
                        Please refer to the
                        <nuxt-link to="https://vuelidate-next.netlify.app/migration_guide.html">
                            Vuelidate Migration Guide
                        </nuxt-link>
                        for more information.
                    </p>
                </es-collapse>
            </b-col>
        </b-row>
    </b-container>
</template>

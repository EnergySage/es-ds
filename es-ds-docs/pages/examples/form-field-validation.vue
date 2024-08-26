<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

const form = reactive({
    email: '',
    password: '',
    phone: '',
    maskedPhoneNumber: '',
    notes: '',
});

/**
 * @param { string } pattern
 * @returns { Function } a function that takes a number, and returns another function which takes a string param
 * that will ultimately be what you're comparing the pattern against N times.
 */
// eslint-disable-next-line max-len
const matchesPatternNTimes = (pattern) => (N = 1) => (param) => [...String(param).matchAll(pattern)].length >= N;

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasNumber(1)('s0me string')
 */
const hasNumber = matchesPatternNTimes(/[0-9]/g);

/**
 * @param { string } param
 * @returns { boolean } if not required or string contains a number
 */
const vuelidateHasNumber = (X) => helpers.withMessage(
    'This field must include a number',
    helpers.withParams(
        { type: 'xTimes', value: X },
        (value) => !helpers.req(value) || hasNumber(X)(value),
    ),
);

const rules = {
    email: { required, email },
    password: { required, minLength: minLength(8), hasNumber: vuelidateHasNumber(1) },
    phone: { required },
    maskedPhoneNumber: { required },
    notes: { required },
};

const v$ = useVuelidate(rules, form);

// TODO
const onSubmit = () => {};
const touchOnChange = (bla) => {};
const isSubmitInProgress = false;
//

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
<!--                            <b-link to="/examples/form-validation">-->
<!--                                Form with server error-->
<!--                            </b-link> example.-->
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
                        v-model="form.email"
                        :disabled="isSubmitInProgress"
                        required
                        :state="!v$.email.$error"
                        @change="touchOnChange('form.email')"
                        @blur="v$.email.$touch">
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                    <es-form-input
                        id="password"
                        v-model="v$.password.$model"
                        :state="!v$.password.$error"
                        :disabled="isSubmitInProgress"
                        required
                        type="password">
                        <template #label>
                            Password
                        </template>
                        <template #errorMessage>
                            <div
                                v-for="error in v$.password.$errors"
                                :key="error">
                                {{ error.$message }}
                            </div>
                        </template>
                    </es-form-input>
<!--                    <es-form-input-->
<!--                        id="phone"-->
<!--                        v-model="form.phone"-->
<!--                        :state="validateState('form.phone')"-->
<!--                        :disabled="isSubmitInProgress"-->
<!--                        required-->
<!--                        type="tel"-->
<!--                        @change="touchOnChange('form.phone')"-->
<!--                        @blur="$v.form.phone.$touch">-->
<!--                        <template #label>-->
<!--                            Phone number-->
<!--                        </template>-->
<!--                        <template #errorMessage>-->
<!--                            Please enter a valid phone number.-->
<!--                        </template>-->
<!--                    </es-form-input>-->
<!--                    <es-form-input-->
<!--                        id="maskedPhoneNumber"-->
<!--                        v-model="form.maskedPhoneNumber"-->
<!--                        :state="validateState('form.maskedPhoneNumber')"-->
<!--                        :disabled="isSubmitInProgress"-->
<!--                        required-->
<!--                        type="maskedTel"-->
<!--                        @change="touchOnChange('form.maskedPhoneNumber')"-->
<!--                        @blur="$v.form.maskedPhoneNumber.$touch">-->
<!--                        <template #label>-->
<!--                            Masked phone number-->
<!--                        </template>-->
<!--                        <template #errorMessage>-->
<!--                            Please enter a valid phone number.-->
<!--                        </template>-->
<!--                    </es-form-input>-->
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
<!--                    </es-form-textarea>-->
                    <div class="d-flex flex-grow-1 justify-content-end mt-200">
                        <button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :disabled="isSubmitInProgress">
                            <span class="position-relative d-inline-block w-100">
                                <span
                                    v-if="isSubmitInProgress"
                                    class="form-actions__button-spinner position-absolute d-inline-block h-100 w-100">
                                    b-spinner
<!--                                    <b-spinner-->
<!--                                        role="status"-->
<!--                                        label="Loading" />-->
                                </span>
                                <span
                                    :class="{'sr-only': isSubmitInProgress }">
                                    Submit
                                </span>
                            </span>
                        </button>
                    </div>
                </form>
            </b-col>
        </b-row>
    </b-container>
</template>

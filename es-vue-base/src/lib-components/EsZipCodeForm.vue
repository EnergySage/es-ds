<template>
    <div
        class="EsZipCodeForm d-flex flex-column"
        :class="[
            { 'text-white': dark },
            defaultStackClasses,
            `align-items-${stackBreak}${align} text-${stackBreak}${textAlign}`,
        ]"
        v-bind="$attrs"
        v-on="$listeners">
        <b-form
            ref="ctaForm"
            class="align-items-center"
            :class="[{ invalid: $v.$dirty && $v.$invalid }, `d-${stackBreak}flex`]"
            :action="url"
            method="get"
            novalidate
            :target="newTab ? '_blank' : '_self'"
            @submit.prevent.stop="handleSubmit">
            <es-form-input
                :id="inputId"
                v-model="zipCode"
                :class="`mr-${stackBreak}25`"
                name="zip_code"
                autocomplete="postal-code"
                inputmode="numeric"
                label-sr-only
                maxlength="5"
                pattern="\d*"
                placeholder="ZIP code"
                required
                :state="validateState('zipCode')">
                <template #prefixIcon>
                    <icon-location class="text-gray-800" />
                </template>
                <template #label>
                    ZIP code
                </template>
                <template #errorMessage>
                    {{ errorDescription }}
                </template>
            </es-form-input>
            <es-button
                class="w-100"
                :class="[{ 'mb-50': showPrivacyPolicy }, `ml-${stackBreak}25 w-${stackBreak}auto`]"
                type="submit">
                {{ buttonText }}
            </es-button>
        </b-form>
        <div v-if="showPrivacyPolicy">
            <span v-if="privacyPolicyText">
                {{ privacyPolicyText }}
            </span>
            <icon-lock-on
                v-else
                class="privacy-lock-icon mr-25 position-relative"
                height="1.125rem"
                width="1.125rem" />
            <a
                :href="privacyPolicyLink"
                class="text-nowrap"
                :class="dark ? 'text-white' : 'text-dark'">{{ privacyPolicyLinkText }}</a>
        </div>
    </div>
</template>

<script lang="js">
import { formMixins } from '../lib-mixins';
import {
    vuelidateMinLength,
    vuelidateMaxLength,
    vuelidateNumeric,
    vuelidateRequired,
} from '../lib-validators';
import EsButton from './EsButton.vue';
import EsFormInput from './EsFormInput.vue';
import IconLocation from '../lib-icons/icon-location.vue';
import IconLockOn from '../lib-icons/icon-lock-on.vue';

export default {
    name: 'EsZipCodeForm',
    components: {
        EsButton,
        EsFormInput,
        IconLocation,
        IconLockOn,
    },
    mixins: [formMixins],
    props: {
        align: {
            type: String,
            default: 'center',
        },
        buttonText: {
            type: String,
            required: true,
        },
        dark: {
            type: Boolean,
            default: false,
        },
        errorDescription: {
            type: String,
            default: 'Please enter a 5-digit zip code.',
        },
        inputId: {
            type: String,
            required: true,
        },
        newTab: {
            type: Boolean,
            default: false,
        },
        privacyPolicyLink: {
            type: String,
            required: true,
        },
        privacyPolicyLinkText: {
            type: String,
            default: 'Privacy Policy',
        },
        privacyPolicyNewTab: {
            type: Boolean,
            default: false,
        },
        privacyPolicyText: {
            type: String,
            default: 'Your information is safe with us.',
        },
        showPrivacyPolicy: {
            type: Boolean,
            default: true,
        },
        stackAlign: {
            type: String,
            default: 'center',
        },
        stackUntil: {
            type: String,
            default: 'sm',
        },
        url: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            zipCode: '',
        };
    },
    computed: {
        stackBreak() {
            return this.stackUntil ? `${this.stackUntil}-` : '';
        },
        defaultStackClasses() {
            // Classes to use on the stacked form, up to the stackUntil breakpoint
            return this.stackUntil ? `align-items-${this.stackAlign} text-${this.stackAlign}` : '';
        },
        textAlign() {
            return { start: 'left', center: 'center', end: 'right' }[this.align];
        },
    },
    methods: {
        handleSubmit() {
            if (this?.$v?.$invalid) {
                // if form is invalid, touch to display errors and get out
                this.$v.$touch();
            } else {
                this.$refs.ctaForm.submit();
            }
        },
    },
    validations: {
        zipCode: {
            maxLength: vuelidateMaxLength(5),
            minLength: vuelidateMinLength(5),
            numeric: vuelidateNumeric,
            required: vuelidateRequired,
        },
    },
};
</script>
<style lang="scss" scoped>
.EsZipCodeForm {
    .privacy-lock-icon {
        top: -0.1em;
    }
}
</style>

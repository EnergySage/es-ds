<template>
    <div
        class="EsZipCodeForm align-items-center d-flex flex-column text-center"
        :class="{
            'text-white': dark,
            'align-items-center text-center': stackUntil,
        }"
        v-bind="$attrs"
        v-on="$listeners">
        <b-form
            ref="ctaForm"
            class="justify-content-center w-100"
            :class="{
                invalid: $v.$dirty && $v.$invalid,
                [`d-${stackBreak}flex`]: stackUntil,
                'mb-100': showPrivacySection,
            }"
            :action="url"
            method="get"
            novalidate
            :target="newTab ? '_blank' : '_self'"
            @submit.prevent.stop="handleSubmit">
            <es-form-input
                :id="inputId"
                v-model="zipCode"
                :class="{
                    [`mb-${stackBreak}0 mr-${stackBreak}25`]: stackUntil,
                }"
                :name="fieldName"
                autocomplete="postal-code"
                inputmode="numeric"
                label-sr-only
                maxlength="5"
                pattern="\d*"
                :placeholder="placeholder"
                required
                :state="validateState('zipCode')">
                <template #prefixIcon>
                    <icon-location class="text-gray-800" />
                </template>
                <template #label>
                    {{ placeholder }}
                </template>
                <template #errorMessage>
                    <span :class="{ 'text-white': dark }">
                        <slot name="errorMessage"> Please enter a 5-digit zip code. </slot>
                    </span>
                </template>
            </es-form-input>
            <input
                v-if="selectedProduct"
                type="hidden"
                name="product"
                :value="selectedProduct" />
            <es-button
                class="text-nowrap w-100"
                :class="{
                    [`ml-${stackBreak}25 w-${stackBreak}auto`]: stackUntil,
                    'px-100': constrained,
                }"
                type="submit">
                <slot name="buttonText">
                    Submit
                </slot>
            </es-button>
        </b-form>
        <div
            v-if="showPrivacySection"
            :class="{ 'font-size-75': constrained }">
            <icon-lock-on
                class="privacy-lock-icon mr-25 position-relative"
                height="1.125rem"
                width="1.125rem" />
            <span>
                <slot name="privacyExplanation"> Your information is safe with us. </slot>
            </span>
            <b-link
                v-if="privacyPolicyLink"
                :href="privacyPolicyLink"
                class="text-nowrap"
                :class="dark ? 'text-white' : 'text-dark'"
                :target="privacyPolicyNewTab ? '_blank' : '_self'">
                <slot name="privacyPolicyLinkText">
                    Privacy Policy
                </slot>
            </b-link>
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
        constrained: {
            type: Boolean,
            default: false,
        },
        dark: {
            type: Boolean,
            default: false,
        },
        fieldName: {
            type: String,
            default: 'zip_code',
        },
        inputId: {
            type: String,
            required: true,
        },
        newTab: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: 'ZIP code',
        },
        showPrivacySection: {
            type: Boolean,
            default: true,
        },
        privacyPolicyLink: {
            type: String,
            default: '',
        },
        privacyPolicyNewTab: {
            type: Boolean,
            default: false,
        },
        stackUntil: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            required: true,
        },
        zipCodeInitialValue: {
            type: String,
            default: '',
        },
        selectedProduct: {
            type: String,
            required: false,
        },
    },
    data() {
        return {
            zipCode: this.zipCodeInitialValue,
        };
    },
    computed: {
        stackBreak() {
            let { stackUntil } = this;
            if (stackUntil === 'xs') {
                stackUntil = '';
            }
            return stackUntil ? `${stackUntil}-` : '';
        },
    },
    watch: {
        zipCodeInitialValue(newVal) {
            this.zipCode = newVal;
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

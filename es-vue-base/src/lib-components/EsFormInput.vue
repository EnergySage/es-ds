<template>
    <div
        class="input-wrapper justify-content-end polite-mb-50"
        :required="required">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="id"
            class="label font-weight-semibold justify-content-start"
            :class="{ 'sr-only': labelSrOnly }">
            <slot name="label" />
            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>
        <p
            v-if="hasExtraContext"
            class="mb-25 font-size-75">
            <slot name="extraContext" />
        </p>
        <div class="input-holder position-relative">
            <!-- prefix icons are decorative only so are aria-hidden -->
            <span
                v-if="$slots.prefixIcon"
                aria-hidden="true"
                class="prefix-icon position-absolute">
                <slot name="prefixIcon" />
            </span>
            <b-form-input
                :id="id"
                v-bind="$attrs"
                v-mask="type === 'maskedTel' ? maskValue : null"
                :type="type === 'maskedTel' ? 'tel' : type"
                class="es-form-input w-100"
                :class="{ 'has-prefix-icon': $slots.prefixIcon }"
                :disabled="disabled"
                :state="state"
                v-on="$listeners" />
            <b-form-text v-if="hasMessage && ((!hasSuccess && state) || state == null)">
                <slot name="message" />
            </b-form-text>
            <b-form-invalid-feedback v-if="hasError || required">
                <slot
                    v-if="hasError"
                    name="errorMessage" />
                <template v-else-if="required">
                    This field is required.
                </template>
            </b-form-invalid-feedback>
            <b-form-valid-feedback v-if="hasSuccess">
                <slot name="successMessage" />
            </b-form-valid-feedback>
        </div>
    </div>
</template>

<script lang="js">
import { mask } from 'vue-the-mask';
import {
    BFormText,
    BFormInput,
    BFormInvalidFeedback,
    BFormValidFeedback,
} from 'bootstrap-vue';

export default {
    name: 'EsFormInput',
    components: {
        BFormText,
        BFormInput,
        BFormInvalidFeedback,
        BFormValidFeedback,
    },
    directives: {
        mask: {
            bind(el, binding, vnode) {
                if (binding.value && mask) {
                    mask(el, binding, vnode); // Apply the mask if a valid mask pattern is provided
                }
            },
        },
    },
    // Prevents attributes from being applied to first <div>
    // v-bind="$attr" is on the input instead
    inheritAttrs: false,
    props: {
        /**
         * Required
         */
        required: {
            type: Boolean,
            default: false,
        },
        /**
         * Disabled
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Type
         */
        type: {
            type: String,
            default: 'text',
            validator: (val) => [
                'text',
                'number',
                'email',
                'number',
                'password',
                'tel',
                'maskedTel',
            ].includes(val),
        },
        /**
         * ID
         * required
         */
        id: {
            type: String,
            required: true,
        },
        /**
         * state
         */
        state: {
            type: [Boolean, null],
            default: null,
        },
        /**
         * inline
         */
        inline: {
            type: Boolean,
            default: false,
            required: false,
        },
        labelSrOnly: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return { maskValue: '(###)-###-####' };
    },
    computed: {
        hasSuccess() {
            return !!this.$slots.successMessage;
        },
        hasMessage() {
            return !!this.$slots.message;
        },
        hasError() {
            return !!this.$slots.errorMessage;
        },
        hasExtraContext() {
            return !!this.$slots.extraContext;
        },
    },
};
</script>
<style lang="scss" scoped>
@use "~@energysage/es-bs-base/scss/variables" as variables;

// TODO: Move to es-bs-base
.is-invalid {
    color: variables.$danger;
}

.es-form-input:disabled, .es-form-input[readonly] {
    border: 0;
}

.form-inline .input-wrapper {
    display: flex;
    flex: 0 0 100%;

    label {
        flex: 0 0 30%;
    }

    .input-holder {
        flex: 0 0 70%;
    }
}

.has-prefix-icon {
    /* match the padding right of valid/invalid state icons */
    padding-left: variables.$input-height-inner !important;
}

.prefix-icon {
    /* match the padding left of normal inputs */
    left: variables.$input-padding-x;
    /* allow clicks to pass through and give the input focus */
    pointer-events: none;
    /* vertically center within the input container */
    top: calc(variables.$input-height * 0.5);
    transform: translateY(-50%);
}

.polite-mb-50 {
    margin-bottom: 0.5rem;
}

</style>

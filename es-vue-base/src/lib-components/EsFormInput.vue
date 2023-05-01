<template>
    <div
        class="input-wrapper justify-content-end mb-50"
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
                :type="type"
                class="es-form-input w-100"
                :class="{ 'has-prefix-icon': $slots.prefixIcon }"
                :disabled="disabled"
                :state="state"
                v-bind="$attrs"
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
@import '~@energysage/es-bs-base/scss/includes';

// TODO: Move to es-bs-base
.is-invalid {
    color: $danger;
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
    padding-left: $input-height-inner !important;
}

.prefix-icon {
    /* match the padding left of normal inputs */
    left: $input-padding-x;
    /* allow clicks to pass through and give the input focus */
    pointer-events: none;
    /* vertically center within the input container */
    top: calc($input-height * 0.5);
    transform: translateY(-50%);
}

</style>

<template>
    <div
        class="input-wrapper justify-content-end mb-2"
        :required="required">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="id"
            class="label font-weight-semibold justify-content-start">
            <slot name="label" />
            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>
        <p
            v-if="hasExtraContext"
            class="mb-1">
            <slot name="extraContext" />
        </p>
        <div class="input-holder">
            <b-form-input
                :id="id"
                :type="type"
                class="es-form-input w-100"
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

</style>

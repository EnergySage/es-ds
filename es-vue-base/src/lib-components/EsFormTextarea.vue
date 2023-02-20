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

        <div class="input-holder">
            <b-form-textarea
                :id="id"
                v-bind="$attrs"
                class="es-form-textarea w-100"
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
import {
    BFormText,
    BFormTextarea,
    BFormInvalidFeedback,
    BFormValidFeedback,
} from 'bootstrap-vue';

export default {
    name: 'EsFormTextarea',
    components: {
        BFormText,
        BFormTextarea,
        BFormInvalidFeedback,
        BFormValidFeedback,
    },
    // Prevents attributes from being applied to first <div>
    // v-bind="$attr" is on the textarea instead
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

.es-form-textarea {
    min-height: 8.125rem;
}

.es-form-textarea:disabled, .es-form-textarea[readonly] {
    border: 0;
}

// TODO: Move to es-bs-base
.is-invalid {
    color: $danger;
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

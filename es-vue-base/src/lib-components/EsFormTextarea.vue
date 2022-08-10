<template>
    <div
        :required="required">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="id"
            class="label font-weight-bold">
            <slot name="label" />

            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>
        <div>
            <b-form-textarea
                :id="id"
                v-bind="$attrs"
                class="es-form-textarea"
                :disabled="disabled"
                :state="state"
                v-on="$listeners" />
            <b-form-text v-if="(!hasSuccess && state) || state == null">
                <slot name="message" />
            </b-form-text>
            <b-form-invalid-feedback>
                <slot
                    v-if="hasError"
                    name="errorMessage" />
                <template v-else>
                    This field is required.
                </template>
            </b-form-invalid-feedback>
            <b-form-valid-feedback>
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
        hasError() {
            return !!this.$slots.errorMessage;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-extends/scss/includes';

.es-form-textarea {
    min-height: 8.125rem;
}

// TODO: Move to es-bs-extends
.is-invalid {
    color: $danger;
}
</style>

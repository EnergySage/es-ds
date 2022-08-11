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
                class="es-form-textarea"
                :disabled="disabled"
                :state="state" />
            <b-form-text v-if="state == null">
                <slot name="message" />
            </b-form-text>
            <b-form-invalid-feedback>
                <slot name="errorMessage" />
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
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-extends/scss/includes';

.es-form-textarea {
    min-height: 8.125rem;
}
</style>

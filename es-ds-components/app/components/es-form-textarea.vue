<script setup lang="ts">
// Prevents attributes from being applied to first <div>
// v-bind="$attr" is on the input instead
defineOptions({
    inheritAttrs: false,
});

defineProps({
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
});
const model = defineModel<string>();

const slots = useSlots();

const hasSuccess = () => !!slots.successMessage;
const hasMessage = () => !!slots.message;
const hasError = () => !!slots.errorMessage;
</script>

<template>
    <div
        class="input-wrapper justify-content-end"
        :required="required">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="id"
            class="label justify-content-start">
            <slot name="label" />

            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>

        <div class="input-holder">
            <textarea
                :id="id"
                v-model="model"
                v-bind="$attrs"
                class="es-form-textarea w-100 form-control"
                :class="{ 'is-invalid': state === false }"
                :disabled="disabled"
                :invalid="state === false" />
            <small
                v-if="hasMessage() && ((!hasSuccess() && state) || state == null)"
                class="text-muted">
                <slot name="message" />
            </small>
            <small
                v-if="state === false && (hasError() || required)"
                class="text-danger">
                <slot
                    v-if="hasError()"
                    name="errorMessage" />
                <template v-else-if="required"> This field is required. </template>
            </small>
            <small
                v-if="state && hasSuccess()"
                class="text-success">
                <slot name="successMessage" />
            </small>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-form-textarea {
    min-height: 8.125rem;
}

.es-form-textarea:disabled,
.es-form-textarea[readonly] {
    border: 0;
}

.is-invalid {
    color: variables.$danger;
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

<script setup lang="ts">
// Prevents attributes from being applied to first <div>
// v-bind="$attr" is on the input instead
defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
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
        :required="props.required">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="props.id"
            class="label justify-content-start">
            <slot name="label" />

            <span
                v-if="props.required"
                class="text-danger">
                *
            </span>
        </label>

        <div class="input-holder">
            <textarea
                :id="props.id"
                v-model="model"
                v-bind="$attrs"
                class="es-form-textarea w-100 form-control"
                :class="{ 'is-invalid': props.state === false }"
                :disabled="props.disabled"
                :invalid="props.state === false" />
            <small
                v-if="hasMessage() && ((!hasSuccess() && props.state) || props.state == null)"
                class="text-muted">
                <slot name="message" />
            </small>
            <small
                v-if="props.state === false && (hasError() || props.required)"
                class="text-danger">
                <slot
                    v-if="hasError()"
                    name="errorMessage" />
                <template v-else-if="props.required"> This field is required. </template>
            </small>
            <small
                v-if="props.state && hasSuccess()"
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

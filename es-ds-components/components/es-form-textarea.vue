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
     * modelValue
     */
    modelValue: {
        type: String,
        required: true,
        default: "",
    },
    /**
     * state
     */
    state: {
        type: [Boolean, null],
        default: null,
    },
});

const emit = defineEmits(['update:modelValue']);
const localValue = ref(props.modelValue);
// Watch for changes to the local value and emit them
watch(localValue, (newValue) => {
    emit('update:modelValue', newValue);
});
// Watch for prop changes and update the local value
watch(() => props.modelValue, (newValue) => {
    localValue.value = newValue;
});

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
                class="es-form-textarea w-100 form-control"
                :class="{ 'is-invalid': state === false }"
                v-model="localValue"
                :id="id"
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

// TODO: Move to es-bs-base
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

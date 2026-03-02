<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { vMaska } from 'maska/vue';

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
     * Type
     */
    type: {
        type: String,
        default: 'text',
        validator: (val: string) => ['text', 'email', 'number', 'password', 'tel', 'maskedTel'].includes(val),
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
    labelSrOnly: {
        type: Boolean,
        default: false,
    },
    phoneMaskValue: {
        type: String,
        default: '(###) ###-####',
        required: false,
    },
});

const slots = useSlots();

const hasSuccess = () => !!slots.successMessage;
const hasMessage = () => !!slots.message;
const hasError = () => !!slots.errorMessage;
const hasExtraContext = () => !!slots.extraContext;
</script>

<template>
    <div
        class="input-wrapper justify-content-end"
        :class="$attrs.class"
        :required="required">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="id"
            class="label justify-content-start"
            :class="{ 'sr-only': labelSrOnly }">
            <slot name="label" />
            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>
        <p
            v-if="hasExtraContext()"
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
            <input-text
                :id="id"
                v-bind="{ ...$attrs, class: undefined }"
                v-maska:mask="type === 'maskedTel' ? phoneMaskValue : ''"
                class="es-form-input form-control w-100"
                :class="{
                    'has-prefix-icon': $slots.prefixIcon,
                    'is-invalid': state === false,
                }"
                :disabled="disabled"
                :invalid="state === false"
                :type="type" />
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

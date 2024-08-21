
<script setup lang="ts">
import InputText from 'primevue/inputtext';

// Prevents attributes from being applied to first <div>
// v-bind="$attr" is on the input instead
// inheritAttrs: false,
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
     * Type
     */
    type: {
        type: String,
        default: 'text',
        validator: (val: string) => [
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
    phoneMaskValue: {
        type: String,
        default: '(###) ###-####',
        required: false,
    },
});

const slots = useSlots();

const hasSuccess = () => {
    return !!slots.successMessage;
}
const hasMessage = () => {
    return !!slots.message;
}
const hasError = () => {
    return !!slots.errorMessage;
}
const hasExtraContext = () => {
    return !!slots.extraContext;
}

</script>

<template>
    <div
        class="input-wrapper justify-content-end"
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
            <!-- <input-text
                v-mask="type === 'maskedTel' ? phoneMaskValue : null"
                v-on="$listeners" /> -->
            <InputMask
                v-if="type === 'maskedTel'"
                :id="id"
                v-bind="$attrs"
                mask="(999) 999-9999"
                placeholder="(XXX) XXX-XXXX"
                :disabled="disabled"
                :invalid="hasError()"
                :state="state" />
            <input-text
                v-else
                :id="id"
                v-bind="$attrs"
                :type="type"
                class="es-form-input form-control w-100"
                :class="{
                    'has-prefix-icon': $slots.prefixIcon,
                    'is-invalid': hasError()
                }"
                :disabled="disabled"
                :invalid="hasError()"
                :state="state" />
            <small
                v-if="hasMessage() && ((!hasSuccess() && state) || state == null)"
                class="text-muted" >
                <slot name="message" />
            </small>
            <small
                v-if="hasError() || required"
                class="text-danger">
                <slot
                    v-if="hasError()"
                    name="errorMessage" />
                <template v-else-if="required">
                    This field is required.
                </template>
            </small>
            <small
                v-if="hasSuccess()"
                class="text-success">
                <slot name="successMessage" />
            </small>
        </div>
    </div>
</template>

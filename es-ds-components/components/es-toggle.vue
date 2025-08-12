<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui';

const model = defineModel<boolean>({
    default: false,
});

defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    ariaLabel: {
        type: String,
        default: 'es-toggle',
        required: false,
    },
    label: {
        type: String,
        default: '',
        required: false,
    },
});

// Workaround: Reka UI components don't play nice with the Nuxt 3.16+ dev server side rendering while using NPM link
const wrappingComponent = import.meta.dev ? resolveComponent('ClientOnly') : 'span';
</script>

<template>
    <component :is="wrappingComponent">
        <div
            class="d-flex"
            :class="{ 'has-text': $slots.text }">
            <div
                class="d-flex flex-column align-items-center"
                :class="{ 'has-value': label }">
                <switch-root
                    v-model="model"
                    :disabled="disabled"
                    :aria-label="ariaLabel"
                    :aria-labelledby="label ? 'es-toggle-value' : undefined"
                    class="es-toggle">
                    <switch-thumb class="es-toggle-thumb" />
                </switch-root>
                <p
                    v-if="label"
                    id="es-toggle-value"
                    class="es-toggle-value">
                    {{ label }}
                </p>
            </div>
            <div
                v-if="$slots.text"
                :class="{ 'cursor-pointer': !disabled }"
                @click="!disabled && (model = !model)">
                <slot name="text" />
            </div>
        </div>
    </component>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/variables' as variables;

.has-text {
    gap: 16px;
    align-items: center;
}

.has-value {
    gap: 8px;
}

.es-toggle-value {
    color: variables.$gray-700;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 16px;
}

.es-toggle {
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 68px;
    background-color: variables.$gray-400;
    border: 2px solid variables.$gray-400;

    // Active checked state
    &[data-state='checked']:not([data-disabled]) {
        background-color: variables.$blue-900;
        border-color: variables.$blue-900;
    }

    // Disabled states
    &[data-disabled] {
        cursor: not-allowed;

        &:not([data-state='checked']) {
            background: variables.$gray-300;
            border-color: variables.$gray-300;
        }

        &[data-state='checked'] {
            background-color: variables.$gray-500;
            border-color: variables.$gray-500;
        }
    }
}

.es-toggle-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    top: -2px;
    left: -2px;
    border: 2px solid variables.$blue-900;
    background-color: variables.$white;
    transition: all 0.2s ease;
    cursor: pointer;

    // Checked state
    .es-toggle[data-state='checked'] & {
        transform: translateX(20px);
    }

    // Disabled unchecked state
    .es-toggle:not([data-state='checked'])[data-disabled] & {
        border-color: variables.$gray-300;
        background-color: variables.$gray-500;
        cursor: not-allowed;
    }

    // Disabled checked state
    .es-toggle[data-state='checked'][data-disabled] & {
        border-color: variables.$gray-500;
        background-color: variables.$gray-300;
        cursor: not-allowed;
    }

    // Hover state
    .es-toggle:hover:not([data-disabled]) & {
        box-shadow: 0 0 0 9px variables.$blue-50;
    }

    // Focus state and active (clicked) state
    .es-toggle:focus-visible:not([data-disabled]) &,
    .es-toggle:active:not([data-disabled]) & {
        box-shadow: 0 0 0 9px rgba(133, 178, 255, 0.85);
    }
}

.cursor-pointer {
    cursor: pointer;
}
</style>

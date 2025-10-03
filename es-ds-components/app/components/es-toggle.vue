<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui';
// Prevents attributes from being applied to first <div>
defineOptions({
    inheritAttrs: false,
});

const switchId = useId();
const model = defineModel<boolean>({
    default: false,
});

interface Props {
    disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
    disabled: false,
});

// Workaround: Reka UI components don't play nice with the Nuxt 3.16+ dev server side rendering while using NPM link
const wrappingComponent = import.meta.dev ? resolveComponent('ClientOnly') : 'div';
</script>

<template>
    <component :is="wrappingComponent">
        <div
            class="d-flex flex-row"
            :class="{
                'has-label': $slots.label,
            }"
            v-bind="$attrs">
            <switch-root
                :id="switchId"
                v-model="model"
                :disabled="disabled"
                class="es-toggle">
                <switch-thumb class="es-toggle-thumb" />
            </switch-root>
            <label
                v-if="$slots.label"
                :for="switchId"
                class="es-toggle-label">
                <slot name="label" />
            </label>
        </div>
    </component>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/variables' as variables;

.has-label {
    gap: 16px;
    align-items: center;

    .es-toggle[data-disabled] ~ .es-toggle-label {
        opacity: 0.5;

        :deep(*) {
            opacity: inherit;
        }
    }
}

.es-toggle-label {
    margin-top: 8px;
    user-select: none;
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

    // Disabled states
    .es-toggle[data-disabled] & {
        cursor: default;

        &:not([data-state='checked']) {
            border-color: variables.$gray-300;
            background-color: variables.$gray-500;
        }

        &[data-state='checked'] {
            border-color: variables.$gray-500;
            background-color: variables.$gray-300;
        }
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
</style>

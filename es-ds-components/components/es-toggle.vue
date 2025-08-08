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
});
</script>

<template>
    <SwitchRoot
        v-model="model"
        :disabled="disabled"
        class="es-toggle">
        <SwitchThumb class="es-toggle-thumb" />
    </SwitchRoot>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-toggle {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    border-radius: 68px;
    background-color: variables.$gray-400;
    border: 2px solid variables.$gray-400;

    // Focus state - track
    &:focus-visible {
        background-color: variables.$gray-400;
        border: 2px solid variables.$gray-400;
        box-shadow: none;
    }

    // Checked state - track
    &[data-state='checked'] {
        background-color: variables.$blue-900;
        border-color: variables.$blue-900;
    }

    // Hide default box shadow on hover
    &:hover,
    &:not([data-disabled]):hover {
        box-shadow: none;
    }

    // Disabled state
    &[data-disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.es-toggle-thumb {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: variables.$white;
    border: 2px solid variables.$blue-900;
    transition: all 0.2s ease;
    cursor: pointer;

    // Checked state - thumb
    .es-toggle[data-state='checked'] & {
        width: 16px;
        height: 16px;
        top: 0px;
        left: 2px;
        transform: translateX(18px);
        border: 0;
    }

    // Hover states - unchecked
    .es-toggle:hover:not([data-disabled]) & {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        top: -2px;
        left: -2px;
        border: 2px solid variables.$blue-900;
        box-shadow: 0 0 0 9px variables.$blue-50;
    }

    // Active states - unchecked
    .es-toggle:active:not([data-disabled]) & {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        top: -2px;
        left: -2px;
        border: 2px solid variables.$blue-900;
        box-shadow: 0 0 0 9px variables.$blue-50;
    }

    // Hover states - checked
    .es-toggle[data-state='checked']:hover:not([data-disabled]) & {
        width: 20px;
        height: 20px;
        border: 2px solid variables.$blue-900;
        top: -2px;
        left: 2px;
        transform: translateX(18px);
        box-shadow: 0 0 0 9px variables.$blue-50;
    }

    // Active states - checked
    .es-toggle[data-state='checked']:active:not([data-disabled]) & {
        width: 20px;
        height: 20px;
        border: 2px solid variables.$blue-900;
        top: -2px;
        left: 2px;
        transform: translateX(18px);
        box-shadow: 0 0 0 9px variables.$blue-50;
    }

    // Focus states - unchecked
    .es-toggle:focus-visible & {
        box-shadow: 0 0 0 9px rgba(133, 178, 255, 0.85);
    }

    // Focus states - checked
    .es-toggle[data-state='checked']:focus-visible & {
        width: 20px;
        height: 20px;
        top: -2px;
        left: 2px;
        border: 2px solid variables.$blue-900;
        box-shadow: 0 0 0 9px rgba(133, 178, 255, 0.85);
        transform: translateX(18px);
    }

    // Disabled state
    .es-toggle[data-disabled] & {
        cursor: not-allowed;
    }
}
</style>

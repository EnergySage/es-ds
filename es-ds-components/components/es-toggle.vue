<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch';

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
    <div>
        <input-switch
            :class="[
                'es-toggle',
                {
                    disabled: disabled,
                },
            ]"
            v-model="model"
            :disabled="disabled" />
    </div>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-toggle {
    // Spacing between switch and label
    .custom-control-label {
        padding-left: 12px;
    }

    // SWITCH BACKGROUND STYLING
    // Unchecked - default state
    .custom-control-label::before {
        width: 40px;
        height: 20px;
        border-radius: 68px;
        background-color: variables.$gray-400;
        border: 2px solid variables.$gray-400;
    }
    // Unchecked - focus and active states
    .custom-control-input:focus ~ .custom-control-label::before,
    .custom-control-input:active ~ .custom-control-label::before {
        background-color: variables.$gray-400;
        border: 2px solid variables.$gray-400;
        box-shadow: none;
    }
    // Checked - default state
    .custom-control-input:checked ~ .custom-control-label::before {
        background-color: variables.$blue-900;
        border-color: variables.$blue-900;
    }
    // Hide deafult box shadow
    .custom-control-input:hover ~ .custom-control-label::before,
    .custom-control-input:not(:disabled):not(:focus) ~ .custom-control-label:hover::before {
        box-shadow: none;
    }

    // SWITCH THUMB STYLING
    // Unchecked - default state
    .custom-control-label::after {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        top: 12px;
        left: -44px;
        border: 2px solid variables.$blue-900;
        background-color: variables.$white;
    }
    // Unchecked - hover and active states
    .custom-control-input:hover ~ .custom-control-label::after,
    .custom-control-input:active ~ .custom-control-label::after {
        width: 20px;
        height: 20px;
        border-radius: 100%;
        top: 12px;
        left: -44px;
        border: 2px solid variables.$blue-900;
        box-shadow: 0 0 0 9px variables.$blue-50;
    }
    // Checked - default state
    .custom-control-input:checked ~ .custom-control-label::after {
        border: 0;
        width: 16px;
        height: 16px;
        top: 14px;
        left: -40px;
        transform: translateX(18px);
    }
    // Unchecked - focus state
    .custom-control-input:focus ~ .custom-control-label::after {
        box-shadow: 0 0 0 9px rgba(133, 178, 255, 0.85);
    }
    // Checked - hover and active states
    .custom-control-input:checked:hover ~ .custom-control-label::after,
    .custom-control-input:checked:active ~ .custom-control-label::after {
        width: 20px;
        height: 20px;
        border: 2px solid variables.$blue-900;
        top: 12px;
        left: -42px;
    }
    // Checked - focus state
    .custom-control-input:checked:focus ~ .custom-control-label::after {
        width: 20px;
        height: 20px;
        top: 12px;
        left: -42px;
        border: 2px solid variables.$blue-900;
        box-shadow: 0 0 0 9px rgba(133, 178, 255, 0.85);
    }
}
</style>

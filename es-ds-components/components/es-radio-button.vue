<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';

defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    displayName: {
        type: String,
        required: true,
        default: '',
    },
    groupName: {
        type: String,
        required: false,
        default: '',
    },
    inline: {
        type: Boolean,
        default: false,
    },
    value: {
        type: String,
        required: true,
        default: '',
    },
});
</script>

<template>
    <div :class="`custom-control custom-radio custom-control${inline ? '-inline' : ''}`">
        <radio-button
            class="custom-control-input"
            input-class="custom-radio-input"
            v-bind="$attrs"
            :disabled="disabled"
            :input-id="`${value}-${groupName}`"
            :name="groupName"
            :value="value" />
        <label
            :for="`${value}-${groupName}`"
            class="custom-control-label">{{ displayName }}</label>
    </div>
</template>

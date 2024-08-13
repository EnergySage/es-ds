<template>
    <div :class="`custom-control custom-radio custom-control${props.inline ? '-inline' : ''}`">
        <radio-button
            class="custom-control-input"
            input-class="custom-radio-input"
            v-model="localValue"
            :disabled="disabled"
            :input-id="`${value}-${groupName}`"
            :name="groupName"
            :value="value" />
        <label :for="`${value}-${groupName}`" class="custom-control-label">{{ displayName }}</label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    displayName: {
        type: String,
        required: true,
        default: "",
    },
    groupName: {
        type: String,
        required: false,
        default: "",
    },
    inline: {
        type: Boolean,
        default: false,
    },
    modelValue: {
        type: String,
        required: true,
        default: "",
    },
    value: {
        type: String,
        required: true,
        default: "",
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

</script>

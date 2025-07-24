<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
        required: false,
    },
    options: {
        type: Array,
        default: () => [],
        required: false,
    },
    modelValue: {
        type: [String, Number, Object],
        default: null,
        required: false,
    },
    optionLabel: {
        type: String,
        default: undefined,
        required: false,
    },
    optionValue: {
        type: String,
        default: undefined,
        required: false,
    },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="dropdown-wrapper">
        <label v-if="props.title" class="form-label">
            {{ props.title }}
        </label>
        <dropdown
            class="es-dropdown-input"
            :model-value="modelValue"
            :placeholder="props.placeholder"
            :options="props.options"
            :option-label="props.optionLabel"
            :option-value="props.optionValue"
            @update:model-value="emit('update:modelValue', $event)"
        >
            <template #value="slotProps">
                <span v-if="slotProps.value">{{ slotProps.value }}</span>
                <span v-else class="placeholder-text">{{ props.placeholder }}</span>
            </template>
            <template #dropdownicon>
                <i class="fas fa-chevron-down chevron-icon"></i>
            </template>
        </dropdown>
    </div>
</template>

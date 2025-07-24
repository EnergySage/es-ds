<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import ChevronDown from './icon/chevron-down.vue';
import Check from './icon/check.vue';

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
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const isSelected = (option: any) => {
    // Handle object options with optionValue
    if (props.optionValue && typeof option === 'object' && option !== null) {
        return option[props.optionValue] === props.modelValue;
    }

    // Handle simple string/number options
    return option === props.modelValue;
};
</script>

<template>
    <div class="dropdown-wrapper">
        <label v-if="props.title" class="form-label">
            {{ props.title }}
        </label>
        <dropdown
            :class="['es-dropdown-input', { 'disabled': props.disabled }]"
            :model-value="modelValue"
            :placeholder="props.placeholder"
            :options="props.options"
            :option-label="props.optionLabel"
            :option-value="props.optionValue"
            :disabled="props.disabled"
            @update:model-value="emit('update:modelValue', $event)"
        >
            <template #value="slotProps">
                <span v-if="slotProps.value">{{ slotProps.value }}</span>
                <span v-else class="placeholder-text">{{ props.placeholder }}</span>
            </template>
            <template #dropdownicon>
                <chevron-down class="chevron-icon" />
            </template>
            <template #option="slotProps">
                <div class="dropdown-option-content">
                    <span>{{
                        props.optionLabel
                            ? slotProps.option[props.optionLabel]
                            : slotProps.option
                    }}</span>
                    <check v-if="isSelected(slotProps.option)" class="check-icon" />
                </div>
            </template>
        </dropdown>
    </div>
</template>

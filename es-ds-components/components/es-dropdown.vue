<script setup lang="ts">
import { ref } from 'vue';
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
        type: null,
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

const isOpen = ref(false);

const isSelected = (option: any) => {
    // Handle object options with optionValue
    if (props.optionValue && typeof option === 'object' && option !== null) {
        return option[props.optionValue] === props.modelValue;
    }

    // Handle simple string/number options
    return option === props.modelValue;
};

const onShow = () => {
    isOpen.value = true;
};

const onHide = () => {
    isOpen.value = false;
};

</script>

<template>
    <div class="dropdown-wrapper">
        <label
            v-if="props.title"
            class="form-label">
            {{ props.title }}
        </label>
        <dropdown
            :class="[
                'es-dropdown-input',
                {
                    disabled: props.disabled,
                    'es-dropdown-open': isOpen,
                },
            ]"
            :model-value="modelValue"
            :placeholder="props.placeholder"
            :options="props.options"
            :option-label="props.optionLabel"
            :option-value="props.optionValue"
            :disabled="props.disabled"
            append-to="self"
            scroll-height="300px"
            :pt="{
                root: { class: 'es-dropdown-root' },
                panel: { class: 'es-dropdown-panel' },
                wrapper: { class: 'es-dropdown-wrapper' },
                list: { class: 'es-dropdown-list list-unstyled' },
                item: { class: 'es-dropdown-item' },
            }"
            @update:model-value="emit('update:modelValue', $event)"
            @show="onShow"
            @hide="onHide">
            <template #dropdownicon>
                <chevron-down class="chevron-icon" />
            </template>
            <template #option="slotProps">
                <div class="dropdown-option-content">
                    <span>{{ props.optionLabel ? slotProps.option[props.optionLabel] : slotProps.option }}</span>
                    <check
                        v-if="isSelected(slotProps.option)"
                        class="check-icon" />
                </div>
            </template>
        </dropdown>
    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

interface Props {
    disabled?: boolean;
    modelValue?: any;
    options?: string[];
    placeholder?: string;
    title: string;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    modelValue: undefined,
    options: () => [],
    placeholder: '',
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const isSelected = (option: any) => option === props.modelValue;

const id = useId();
</script>

<template>
    <div class="dropdown-wrapper">
        <label
            :for="id"
            class="form-label">
            {{ props.title }}
        </label>
        <dropdown
            :id="id"
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
            @update:model-value="emit('update:modelValue', $event)">
            <template #dropdownicon>
                <icon-chevron-down class="chevron-icon" />
            </template>
            <template #option="slotProps">
                <div class="dropdown-option-content">
                    <span>{{ slotProps.option }}</span>
                    <icon-check
                        v-if="isSelected(slotProps.option)"
                        class="check-icon" />
                </div>
            </template>
        </dropdown>
    </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

interface Props {
    disabled?: boolean;
    modelValue?: any;
    options?: string[] | { label: string; value: string }[];
    placeholder?: string;
    label?: string;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    modelValue: undefined,
    options: () => [],
    placeholder: '',
    label: '',
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const isFocused = ref(false);

const isSelected = (option: any) => option === props.modelValue;

const id = useId();
</script>

<template>
    <div
        class="input-wrapper justify-content-end"
        :class="$attrs.class">
        <label
            v-if="label !== ''"
            :for="id">
            {{ label }}
        </label>
        <label
            v-else
            :for="id"
            class="sr-only">
            Select an option
        </label>
        <dropdown
            :input-id="id"
            :class="[
                'es-dropdown-input d-flex align-items-center bg-white rounded-xs justify-content-between p-100',
                {
                    disabled: disabled,
                    'es-dropdown-open': isOpen,
                    'focused': isFocused,
                },
            ]"
            :model-value="modelValue"
            :option-label="options.length > 0 && typeof options[0] === 'object' ? 'label' : undefined"
            :placeholder="placeholder"
            :options="options"
            :disabled="disabled"
            append-to="self"
            scroll-height="18rem"
            :pt="{
                panel: { class: 'es-dropdown-panel bg-white rounded-xs w-100' },
                wrapper: { class: 'es-dropdown-wrapper' },
                list: { class: 'p-0 m-0 list-unstyled' },
                item: { class: 'es-dropdown-item d-flex justify-content-between p-100 pl-200' },
            }"
            @update:model-value="emit('update:modelValue', $event)"
            @blur="isFocused = false"
            @focus="isFocused = true"
            @hide="isOpen = false"
            @show="isOpen = true" >
            <template #dropdownicon>
                <icon-chevron-down
                    aria-hidden="true"
                    height="1.125rem"
                    :class="`${disabled ? 'text-gray-500' : 'text-gray-900'}`" />
            </template>
            <template #option="slotProps">
                <span>{{ slotProps.option.label ? slotProps.option.label : slotProps.option }}</span>
                <icon-check
                    v-if="isSelected(slotProps.option)"
                    height="1.5rem"
                    class="text-gray-700" />
            </template>
        </dropdown>
    </div>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-dropdown-input {
    background-clip: padding-box;
    border: variables.$border-width solid variables.$gray-900;
    height: variables.$input-btn-height;
    transition: variables.$input-transition;
    user-select: none;

    &:hover,
    &:active {
        border-color: variables.$blue-300;
        .es-dropdown-panel {
            border-top: variables.$border-width solid variables.$blue-300;
        }
    }

    &.focused {
        border-color: variables.$blue-600;
        outline: 0.125rem solid variables.$blue-600;
        outline-offset: 0.125rem;
        span[data-pc-section='input'] {
            outline: 0;
        }
    }

    span[data-pc-section='input'] {
        color: variables.$input-color-placeholder;
    }

    &:disabled,
    &.disabled {
        background-color: variables.$gray-50;
        border-color: variables.$gray-500;
        cursor: not-allowed;
        span[data-pc-section='input'] {
            color: variables.$gray-500;
        }
    }

    &.es-dropdown-open {
        border-bottom: none;
        // Bottom corners have no radius so that it visually merges with the dropdown
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
}

.es-dropdown-panel {
    border: variables.$border-width solid variables.$gray-500;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    box-shadow: variables.$popover-box-shadow;
    overflow: hidden;
    left: 15px !important;
    top: calc(100% - 56px) !important;
    transform-origin: center top;

    // matched animation to PrimeVue styled mode
    &.p-connected-overlay-enter-from {
        opacity: 0;
        transform: scaleY(0.8);
    }

    &.p-connected-overlay-enter-active {
        transition:
            transform 0.12s cubic-bezier(0, 0, 0.2, 1),
            opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
    }

    &.p-connected-overlay-leave-active {
        transition: opacity 0.1s linear;
    }

    &.p-connected-overlay-leave-to {
        opacity: 0;
    }
}

.es-dropdown-wrapper {
    max-height: 18.75rem;
    overflow-y: auto;
}

.es-dropdown-item {
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover, &[data-p-focused='true'] {
        background-color: variables.$blue-50;
        outline: 0;
    }

    &:active {
        background-color: variables.$blue-100;
        font-weight: variables.$font-weight-bold;
    }

    &:last-child {
        // Prevent overlapping corners
        border-bottom-left-radius: variables.$border-radius-xs;
        border-bottom-right-radius: variables.$border-radius-xs;
    }
}
</style>

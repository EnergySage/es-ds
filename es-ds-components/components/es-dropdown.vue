<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

interface Props {
    disabled?: boolean;
    modelValue?: any;
    options?: string[];
    placeholder?: string;
    label?: string;
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
            v-if="label"
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
                },
            ]"
            :model-value="modelValue"
            :placeholder="placeholder"
            :options="options"
            :disabled="disabled"
            append-to="self"
            scroll-height="300px"
            :pt="{
                panel: { class: 'es-dropdown-panel bg-white rounded-xs w-100' },
                wrapper: { class: 'es-dropdown-wrapper' },
                list: { class: 'p-0 m-0 list-unstyled' },
                item: { class: 'es-dropdown-item d-flex justify-content-between p-100 pl-200' },
            }"
            @update:model-value="emit('update:modelValue', $event)"
            @show="isOpen = true"
            @hide="isOpen = false">
            <template #dropdownicon>
                <icon-chevron-down
                    aria-hidden="true"
                    height="1.125rem"
                    :class="`${disabled ? 'text-gray-500' : 'text-gray-900'}`" />
            </template>
            <template #option="slotProps">
                <span>{{ slotProps.option }}</span>
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
    border: variables.$border-width solid variables.$gray-500;
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

    &:focus-visible {
        border-color: variables.$gray-500;
        outline: 0;
        font-weight: variables.$font-weight-bold;
    }

    span[data-pc-section='input'] {
        color: variables.$input-color-placeholder;
        &:focus-visible {
            outline: 0;
            font-weight: variables.$font-weight-bold;
        }
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
    overflow: hidden;
    left: 15px !important;
    // top: calc(100% - 57px) !important;
    transform: translateY(2rem);
    transform-origin: center top;

    // matched from PrimeVue styled mode
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

    &:hover {
        background-color: variables.$blue-50;
    }

    &:active {
        background-color: variables.$blue-100;
        font-weight: variables.$font-weight-bold;
    }

    &:focus-visible {
        outline: 0;
        font-weight: variables.$font-weight-bold;
    }

    &:last-child {
        // Prevent overlapping corners
        border-bottom-left-radius: variables.$border-radius-xs;
        border-bottom-right-radius: variables.$border-radius-xs;
    }
}
</style>

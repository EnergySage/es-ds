<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

interface Props {
    disabled?: boolean;
    label?: string;
    modelValue?: any;
    noOptionsText?: string;
    options?: string[] | { label: string; value: string }[];
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    modelValue: undefined,
    noOptionsText: 'No available options',
    options: () => [],
    placeholder: '',
    label: '',
    required: false,
    state: null,
});

const slots = useSlots();
const hasError = () => !!slots.errorMessage;

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const isFocused = ref(false);
const isInputClicked = ref(false);
const isLabelClicked = ref(false);
const isDisabled = computed(() => props.disabled || props.options.length === 0);

const isSelected = (option: any) => {
    const compareOption = props.options.length > 0 && typeof props.options[0] === 'object' ? option.value : option;
    return compareOption === props.modelValue;
};

const id = useId();
const labelId = useId();

const blur = () => {
    if (!isOpen.value && (isInputClicked.value || isLabelClicked.value)) {
        isInputClicked.value = false;
        isLabelClicked.value = false;
    }
    isFocused.value = false;
};

const hide = () => {
    isOpen.value = false;

    if (!isFocused.value) {
        isInputClicked.value = false;
        isLabelClicked.value = false;
    }
};
</script>

<template>
    <div
        class="input-wrapper justify-content-end"
        :class="$attrs.class">
        <label
            :id="labelId"
            :for="id"
            :class="{ 'sr-only': !label }"
            @click="isLabelClicked = true">
            {{ label || 'Select an option' }}
            <span
                v-if="required && label !== ''"
                class="text-danger">
                *
            </span>
        </label>
        <dropdown
            :input-id="id"
            :class="[
                'es-dropdown es-form-input form-control align-items-center d-flex justify-content-between position-relative',
                {
                    disabled: isDisabled,
                    focused: isFocused && !isInputClicked && !isOpen && !isLabelClicked,
                    'focused-on-click': isOpen || isLabelClicked || isInputClicked,
                    'is-invalid': state === false,
                },
            ]"
            append-to="self"
            :aria-labelledby="labelId"
            :disabled="isDisabled"
            :focus-on-hover="false"
            :model-value="modelValue"
            :option-label="options.length > 0 && typeof options[0] === 'object' ? 'label' : undefined"
            :option-value="options.length > 0 && typeof options[0] === 'object' ? 'value' : undefined"
            :options="options"
            :placeholder="options.length === 0 ? props.noOptionsText : placeholder"
            :pt="{
                panel: { class: 'es-dropdown-panel bg-white rounded-xs w-100' },
                wrapper: { class: 'es-dropdown-wrapper' },
                list: { class: 'list-unstyled m-0 p-0' },
                input: {
                    class: [
                        'es-dropdown-input h-100 text-truncate',
                        {
                            'es-dropdown-input--placeholder': modelValue === undefined && state !== false,
                        },
                    ],
                },
                item: {
                    class: [
                        'es-dropdown-item align-items-center d-flex justify-content-between p-100 pl-200 position-relative',
                        {
                            'input-focused position-relative': isFocused && !isInputClicked && !isLabelClicked,
                        },
                    ],
                },
                trigger: { class: 'h-100' },
            }"
            scroll-height="15.75rem"
            v-bind="$attrs"
            @update:model-value="emit('update:modelValue', $event)"
            @blur="blur"
            @focus="isFocused = true"
            @click="isInputClicked = true"
            @hide="hide"
            @show="isOpen = true">
            <template #dropdownicon>
                <icon-chevron-down
                    aria-hidden="true"
                    height="1.125rem"
                    :class="[
                        {
                            'text-gray-500': isDisabled,
                            'text-gray-900': !isDisabled && state !== false,
                        },
                    ]" />
            </template>
            <template #option="slotProps">
                <span class="option-label pr-200">{{
                    slotProps.option.label ? slotProps.option.label : slotProps.option
                }}</span>
                <icon-check
                    v-if="isSelected(slotProps.option)"
                    height="1.5rem"
                    class="icon-check position-absolute text-gray-700" />
            </template>
        </dropdown>
        <small
            v-if="state === false && (hasError() || required)"
            class="text-danger">
            <slot
                v-if="hasError()"
                name="errorMessage" />
            <template v-else-if="required"> This field is required. </template>
        </small>
    </div>
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-dropdown {
    user-select: none;

    &:hover,
    &:active,
    &.focused-on-click {
        border-color: variables.$blue-300;
    }

    &.focused {
        border-color: variables.$blue-600;
        outline: 0.125rem solid variables.$blue-600;
        outline-offset: 0.125rem;
    }

    .es-dropdown-input {
        &:focus-visible {
            outline: 0;
        }

        &--placeholder {
            color: variables.$input-color-placeholder;
        }
    }

    &:disabled,
    &.disabled {
        background-color: variables.$gray-50;
        border-color: variables.$gray-500;
        cursor: not-allowed;
        .es-dropdown-input {
            color: variables.$gray-500;
        }
    }
}

.es-dropdown-panel {
    border: variables.$border-width solid variables.$gray-500;
    box-shadow: variables.$popover-box-shadow;
    overflow: hidden;

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
    overflow-y: auto;
}

.es-dropdown-item {
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    .icon-check {
        right: 1rem;
    }

    .option-label {
        overflow-wrap: anywhere;
    }

    &:hover,
    &:not(.input-focused)[data-p-focused='true'] {
        background-color: variables.$blue-50;
    }

    &.input-focused[data-p-focused='true']::after {
        border: 2px solid variables.$blue-600;
        border-radius: variables.$border-radius-xs;
        bottom: 2px;
        content: '';
        left: 2px;
        position: absolute;
        right: 2px;
        top: 2px;
    }

    &:active {
        background-color: variables.$blue-100;
    }
}
</style>

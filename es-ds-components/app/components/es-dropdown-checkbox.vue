<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const dropdownId = `dropdown-checkbox-${Math.random().toString(36).slice(2)}`;

interface Props {
    disabled?: boolean;
    hasOptions?: boolean;
    modelValue?: any[];
    options?: string[] | { label: string; value: string }[];
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
    label?: string;
}
const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    hasOptions: true,
    modelValue: () => [],
    options: () => [],
    placeholder: 'Select options',
    required: false,
    state: null,
    label: '',
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();
const hasError = () => !!slots.errorMessage;

const dropdownRef = ref();
const isOpen = ref(false);
const isFocused = ref(false);
const isInputClicked = ref(false);
const isLabelClicked = ref(false);
const isCheckboxClick = ref(false);

const isDisabled = computed(() => props.disabled || !props.hasOptions);

const getOptionLabel = (option: any) => {
    return typeof option === 'object' ? option.label : option;
};

const getOptionValue = (option: any) => {
    return typeof option === 'object' ? option.value : option;
};

const isChecked = (option: any) => {
    return props.modelValue.includes(option);
};

const selectedCount = computed(() => {
    return props.modelValue.length;
});

const displayText = computed(() => {
    if (selectedCount.value === 0) {
        return props.placeholder;
    }
    return `${selectedCount.value} selected`;
});

const toggleOption = (option: any) => {
    const value = getOptionValue(option);
    if (isChecked(option)) {
        props.modelValue.splice(props.modelValue.indexOf(value), 1);
    } else {
        props.modelValue.push(value);
    }
    console.log('selected:', props.modelValue);
};

const selectAll = () => {
    const allValues = props.options.map((option: any) => getOptionValue(option));
    emit('update:modelValue', allValues);
};

const clearAll = () => {
    emit('update:modelValue', []);
};

const blur = () => {
    if (!isOpen.value && (isInputClicked.value || isLabelClicked.value)) {
        isInputClicked.value = false;
        isLabelClicked.value = false;
    }
    isFocused.value = false;
};

const hide = () => {
    if (isCheckboxClick.value) {
        isCheckboxClick.value = false;
        nextTick(() => {
            dropdownRef.value?.show();
        });
        return;
    }

    isOpen.value = false;

    if (!isFocused.value) {
        isInputClicked.value = false;
        isLabelClicked.value = false;
    }
};

const onOptionSelect = (event: any) => {
    isCheckboxClick.value = true;
    if (event.value !== undefined) {
        const option = props.options.find(
            (opt: any) => getOptionValue(opt) === event.value || opt === event.value,
        );
        if (option) {
            toggleOption(option);
        }
    }
};
</script>

<template>
    <div
        class="es-dropdown-checkbox-wrapper"
        :class="$attrs.class">
        <label
            :for="dropdownId"
            :class="{ 'sr-only': !label }"
            @click="isLabelClicked = true">
            {{ label || 'Select options' }}
            <span
                v-if="required && label !== ''"
                class="text-danger">
                *
            </span>
        </label>
        <dropdown
            ref="dropdownRef"
            :input-id="dropdownId"
            :class="[
                'es-dropdown-checkbox es-form-input form-control align-items-center d-flex justify-content-between position-relative',
                {
                    disabled: isDisabled,
                    focused: isFocused && !isInputClicked && !isOpen && !isLabelClicked,
                    'focused-on-click': isOpen || isLabelClicked || isInputClicked,
                    'is-invalid': state === false,
                },
            ]"
            append-to="self"
            :disabled="isDisabled"
            :focus-on-hover="false"
            :option-label="options.length > 0 && typeof options[0] === 'object' ? 'label' : undefined"
            :option-value="options.length > 0 && typeof options[0] === 'object' ? 'value' : undefined"
            :options="options"
            :placeholder="displayText"
            :pt="{
                panel: { class: 'es-dropdown-checkbox-panel bg-white rounded-xs w-100' },
                wrapper: { class: 'es-dropdown-checkbox-wrapper-inner' },
                list: { class: 'list-unstyled m-0 p-0' },
                input: {
                    class: [
                        'es-dropdown-checkbox-input h-100 text-truncate',
                        {
                            'es-dropdown-checkbox-input--placeholder': selectedCount === 0,
                        },
                    ],
                },
                item: {
                    class: [
                        'es-dropdown-checkbox-item align-items-center d-flex p-100 pl-200 position-relative',
                    ],
                },
                trigger: { class: 'h-100' },
            }"
            scroll-height="15.75rem"
            v-bind="$attrs"
            @change="onOptionSelect"
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
            <template #header>
                <div
                    class="es-dropdown-checkbox-actions p-100 py-50"
                    style="display: flex; justify-content: space-between; padding: 16px 32px; border-bottom: 1px solid #cfd1df">
                    <button
                        type="button"
                        class="btn btn-link p-0"
                        style="color: #2e46b9; font-size: 14px"
                        @click.stop="selectAll">
                        Select All
                    </button>
                    <button
                        type="button"
                        class="btn btn-link p-0"
                        style="color: #2e46b9; font-size: 14px"
                        @click.stop="clearAll">
                        Clear All
                    </button>
                </div>
            </template>
            <template #option="slotProps">
                <div class="custom-control custom-checkbox">
                    <input
                        :id="`${dropdownId}-option-${slotProps.index}`"
                        type="checkbox"
                        class="custom-control-input"
                        :checked="isChecked(slotProps.option)"
                        :disabled="disabled"
                        @click.stop />
                    <label
                        :for="`${dropdownId}-option-${slotProps.index}`"
                        class="custom-control-label"
                        v-html="getOptionLabel(slotProps.option)" />
                </div>
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

.es-dropdown-checkbox-wrapper {
    width: 350px;
}

.es-dropdown-checkbox {
    cursor: pointer;

    &:focus {
        border-color: variables.$blue-600;
        outline: 0.125rem solid variables.$blue-600;
        outline-offset: 0.125rem;
    }

    &:hover,
    &:active,
    &.focused-on-click {
        border-color: variables.$blue-300;
    }

    .es-dropdown-checkbox-input {
        font-weight: 700;

        &--placeholder {
            color: variables.$input-color-placeholder;
        }
    }

    &:disabled,
    &.disabled {
        background-color: variables.$gray-50;
        border-color: variables.$gray-500;
        cursor: not-allowed;
    }
}

.es-dropdown-checkbox-panel {
    border: variables.$border-width solid variables.$gray-500;
    box-shadow: variables.$popover-box-shadow;
    overflow: hidden;

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

.es-dropdown-checkbox-wrapper-inner {
    overflow-y: auto;
}

.es-dropdown-checkbox-item {
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
    padding: 0px;

    &:hover {
        background-color: #eef0ff;
    }

    .custom-control-label {
        cursor: pointer;
        color: #222633;
    }
}

.es-dropdown-checkbox-actions {
    .btn-link {
        text-decoration: none;
        font-weight: 600;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>

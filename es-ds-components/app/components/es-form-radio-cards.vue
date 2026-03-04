<script setup lang="ts">
interface Option {
    disabled?: boolean;
    id: string;
    inline?: boolean;
    text: string;
    value: any;
}

interface Props {
    hasIcon?: boolean;
    id: string;
    label: string;
    labelClass?: string;
    labelSrOnly?: boolean;
    modelValue?: any;
    name?: string;
    options?: Option[];
    inline?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    hasIcon: false,
    inline: false,
    labelClass: 'font-size-h3',
    labelSrOnly: false,
    modelValue: undefined,
    name: '',
    options: undefined,
});

const emit = defineEmits(['update:model-value']);

function handleUpdate(value: any) {
    emit('update:model-value', value);
}
</script>

<template>
    <fieldset
        :id="`${props.id}-fieldset`"
        class="mb-100">
        <legend
            :id="`${props.id}-legend`"
            class="font-size-h1 font-weight-bolder mb-200 pb-0 text-dark"
            :class="{ 'sr-only': props.labelSrOnly }"
            tabindex="-1">
            {{ props.label }}
        </legend>
        <div>
            <div
                :id="`${props.id}-radiogroup`"
                role="radiogroup"
                tabindex="-1"
                class="es-form-radio-cards align-items-stretch d-flex flex-column justify-content-center position-relative"
                :class="{ 'has-icon': props.hasIcon }">
                <slot :options="options">
                    <es-form-radio-card
                        v-for="option in options"
                        :id="option.id"
                        :key="option.value"
                        :disabled="option?.disabled || false"
                        :name="props.name"
                        :value="option.value"
                        :model-value="props.modelValue"
                        :inline="props.inline || false"
                        @update:model-value="handleUpdate">
                        <span :class="props.labelClass">
                            {{ option.text }}
                        </span>
                    </es-form-radio-card>
                </slot>
            </div>
        </div>
    </fieldset>
</template>

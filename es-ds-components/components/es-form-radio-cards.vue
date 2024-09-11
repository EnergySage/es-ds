<script setup lang="ts">
interface IOptions {
    id: string;
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    disabled?: boolean;
    inline?: boolean;
}

interface IProps {
    id: string;
    label: string;
    name?: string;
    options?: IOptions[];
    inline?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue?: any;

    // TODO
    hasIcon?: boolean;
    labelClass?: string,
    labelSrOnly?: boolean,
}
const props = withDefaults(defineProps<IProps>(), {
    name: '',
    options: undefined,
    inline: false,
    modelValue: undefined,
    hasIcon: false,
    labelClass: 'font-size-h1 font-weight-bolder mb-200 pb-0 text-dark',
    labelSrOnly: false,
});

const emit = defineEmits([
    'update:model-value',
])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleUpdate(value: any) {
    console.log("radio-cards got value: ", value);
    emit('update:model-value', value);
}
// @update:model-value="$emit('update:model-value', option.value)"
</script>

<template>
    <es-radio-button-group
        :id="props.id"
        :label="props.label"
        :name="props.name"
        :options="props.options"
        :inline="props.inline"
        :model-value="props.modelValue"
        class="es-form-radio-cards d-flex justify-content-center"
        :class="{ 'has-icon': props.hasIcon }">
        <template #default>
            <slot :options="props.options">
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
                    <span
                        :class="{
                            [props.labelClass]: props.labelClass,
                            'sr-only': props.labelSrOnly,
                        }"
                    >
                        {{ option.text }}
                    </span>
                </es-form-radio-card>
            </slot>
        </template>
    </es-radio-button-group>
</template>

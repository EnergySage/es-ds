<script setup lang="ts">
interface IOptions {
    id: string;
    text: string;

    value: any;
    disabled?: boolean;
}

interface IProps {
    id: string;
    label: string;
    name?: string;
    options?: IOptions[];
    inline?: boolean;

    modelValue?: any;
}
const props = withDefaults(defineProps<IProps>(), {
    inline: false,
    name: '',
    options: undefined,
    modelValue: undefined,
});

defineEmits(['update:model-value']);
</script>

<template>
    <fieldset
        :id="id"
        class="form-group">
        <legend
            :id="`${props.id}-legend`"
            class="font-size-100"
            tabindex="-1">
            {{ props.label }}
        </legend>
        <slot :options="options">
            <es-radio-button
                v-for="option in options"
                :id="option.id"
                :key="option.value"
                :disabled="option?.disabled || false"
                :name="props.name"
                :value="option.value"
                :model-value="props.modelValue"
                :inline="props.inline || false"
                :display-name="option.text"
                @update:model-value="$emit('update:model-value', option.value)" />
        </slot>
    </fieldset>
</template>

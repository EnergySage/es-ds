<script setup lang="ts">
interface IProps {
    disabled?: boolean;
    displayName: string; // TODO: make this optional if user opts for slot?
    groupName?: string;
    inline?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue: any;
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    displayName: '',
    groupName: '',
    inline: false,
    value: null,
});

const emit = defineEmits([
    'radio-card:change',
    'radio-card:blur',
    'radio-card:focus',
    'radio-card:update',
])



function handleClick() {
    if (props.value !== props.modelValue) {
        emit('radio-card:update', props.value);
    }
}

const isSelected = computed(() => props.modelValue === props.value)

const isFocused = ref(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleFocus(e: any) {
    console.log('form-radio-card:handleFocus ', e);
    // eslint-disable-next-line no-debugger
    // debugger;
    emit('radio-card:focus', e);
    if (isSelected.value) {
        isFocused.value = true;
    } else {
        isFocused.value = false;
    }
}
</script>

<template>
    <es-radio-button
        class="es-form-radio-card es-card interactive w-100"
        :class="{ 'active': isSelected, 'focus': isFocused }"
        :disabled="props.disabled"
        :display-name="props.displayName"
        :group-name="props.groupName"
        :inline="props.inline"
        :value="props.value"
        :model-value="props.modelValue"
        @radio-button:change="$emit('radio-card:change', (evt: any) => evt)"
        @radio-button:blur="$emit('radio-card:blur', (evt: any) => evt)"
        @radio-button:focus="handleFocus"
        @radio-button:update="$emit('radio-card:update', props.value)"
        @click="handleClick"
    />
</template>

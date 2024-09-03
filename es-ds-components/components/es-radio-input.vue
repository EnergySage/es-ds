<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';

interface IProps {
    disabled?: boolean,
    displayName: string,
    groupName?: string,
    inline?: boolean,
    value: any,
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    displayName: "",
    groupName: "",
    inline: false,
    value: null,
});

// defineEmits(['update:modelValue'])
// watch(props.value, (newVal, oldVal) => {
//     console.log(
// })
// @input="$emit('update:modelValue', handleUpdate)"
const handleUpdate = (e: any) => {
    console.log('handleUpdate: ', e);
};

</script>

<template>
    <div :class="`custom-control custom-radio custom-control${inline ? '-inline' : ''}`">
        <radio-button
            class="custom-control-input"
            input-class="custom-radio-input"
            v-bind="$attrs"
            :disabled="disabled"
            :input-id="`${props.value}-${props.groupName}`"
            :name="props.groupName"
            :value="props.value"
        />
        <slot>
            <label
                :for="`${props.value}-${props.groupName}`"
                class="custom-control-label">
                {{ props.displayName }}
            </label>
        </slot>
    </div>
</template>

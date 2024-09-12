<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
    name: string;
    value: any;
    id: string;
    disabled?: boolean;
    inline?: boolean;
    displayName?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    inline: false,
    displayName: '',
});

// Need to define the implicit emit from v-model, so that it can also get fired
// from the label clicks
const emit = defineEmits(['update:modelValue']);
function handleRadioButtonClick() {
    if (!props.disabled) {
        emit('update:modelValue', props.value);
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<any>();
const isChecked = computed(() => props.value === model.value);
</script>

<template>
    <div
        class="custom-control custom-radio"
        :class="{ 'custom-control-inline': props.inline }">
        <input
            :id="id"
            v-model="model"
            :disabled="props.disabled"
            type="radio"
            :name="props.name"
            class="custom-control-input"
            :value="props.value"
            :checked="isChecked"
            @click="handleRadioButtonClick" />
        <label
            class="custom-control-label"
            :for="id"
            @click="handleRadioButtonClick">
            <slot>
                {{ displayName }}
            </slot>
        </label>
    </div>
</template>

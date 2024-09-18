<script setup lang="ts">
import { useFocus } from '@vueuse/core'

const inputElem = useTemplateRef('input-elem')
const { focused: inputFocused } = useFocus(inputElem)

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
    id: string;
    name: string;
    value: any;
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
    <label
        class="es-form-radio-card es-card interactive w-100 btn btn-outline-primary"
        :class="{ active: isChecked, disabled: props.disabled, focus: isChecked || inputFocused }"
        @click="handleRadioButtonClick">
        <input
            :id="id"
            ref="input-elem"
            v-model="model"
            :disabled="props.disabled"
            type="radio"
            name="props.name"
            :value="props.value"
            :checked="isChecked"
            @click="handleRadioButtonClick" />
        <slot>
            {{ displayName }}
        </slot>
    </label>
</template>

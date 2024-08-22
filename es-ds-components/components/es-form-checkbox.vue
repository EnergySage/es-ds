<script setup lang="ts">
// import Checkbox from 'primevue/checkbox';
/*
    v-model
    disabled
*/

const model = defineModel({
    default: false,
});
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
    // value: {
    //     type: Boolean,
    //     default: false,
    // },
    disabled: {
        type: Boolean,
        default: false
    },
    indeterminate: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['update:value', 'change']);


// const handleInput = (e: any) => {
//     if (props.value !== e.target.value) {
//         emit('change');
//     }
//     emit('update:value', Boolean(e.target.value));
// };

watch(model, (val, oldVal) => {
    if (val !== oldVal) {
        emit('change');
    }
})

const attrs = useAttrs();
const defaultInputId = useId();
const getInputId = computed(() => attrs.inputId ? attrs.inputId : defaultInputId);

console.log('attrs.inputId: ', attrs.inputId);
console.log('attrs.disabled: ', attrs.disabled);
console.log('defaultInputId: ', defaultInputId);
</script>

<template>
    <div
        class="custom-control custom-checkbox">
        <input
            type="checkbox"
            class="custom-control-input"
            v-model="model"
            :indeterminate="indeterminate"
            :disabled="disabled"
            :id="getInputId" />
        <!-- <checkbox
            :pt="{
                root: 'custom-control-input'
            }"
            :inputId="getInputId"
            v-bind="$attrs"
        /> -->
        <label :for="getInputId" class="custom-control-label" >
            <slot />
        </label>
    </div>
</template>

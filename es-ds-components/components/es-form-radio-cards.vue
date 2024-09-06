<script setup lang="ts">
interface IProps {
    hasIcon?: boolean;
    labelClass?: string,
    labelSrOnly?: boolean,

    // Radio Button Group Props
    id: string,
    label: string,
}
const props = withDefaults(defineProps<IProps>(), {
    hasIcon: false,
    labelClass: 'font-size-h1 font-weight-bolder mb-200 pb-0 text-dark',
    labelSrOnly: false,
    // value: '',
});

const slots = useSlots()
console.log(slots);
const attrs = useAttrs()
console.log(attrs);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<any>();
</script>

<template>
    <es-radio-button-group
        :id="id"
        v-model="model"
        :label="label"
        class="es-form-radio-cards d-flex justify-content-center"
        :class="{ 'has-icon': props.hasIcon }">
        <slot />
    </es-radio-button-group>
</template>

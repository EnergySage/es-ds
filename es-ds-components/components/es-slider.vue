<script setup lang="ts">
import Slider from 'primevue/slider';

defineProps({
    min: {
        type: Number,
        required: true,
        default: 0,
    },
    max: {
        type: Number,
        required: true,
        default: 0,
    },
    step: {
        type: Number,
        default: 1,
    },
    /**
     * Function that modifies label value
     */
    labelFormatter: {
        type: Function,
        required: false,
        default: (val) => val,
    },
});

// allow use of v-model on this component
const model = defineModel<number>();
</script>

<template>
    <div class="mb-3">
        <slider
            v-model="model"
            v-bind="$attrs"
            :pt="{
                root: {
                    class: 'slider-root',
                },
                range: {
                    class: 'slider-range',
                },
                handle: {
                    class: 'slider-handle',
                },
            }" />
    </div>

    <div class="d-flex flex-row justify-content-between w-100">
        <span>{{ labelFormatter(min) }}</span>
        <span>{{ labelFormatter(max) }}</span>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;
:deep(.slider-root) {
    background-color: variables.$gray-300;
    border-radius: 15px;
    height: 10px;
}

:deep(.slider-range) {
    background: linear-gradient(90deg, #688aea, #162676);
    border-radius: 15px;
    height: 10px;
}

:deep(.slider-handle) {
    background-color: variables.$white;
    border: 9px solid variables.$blue-600;
    border-radius: 50%;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
    cursor: pointer;
    filter: drop-shadow(0 1px 6px rgba(34, 38, 51, 0.25));
    height: 28px;
    transform: translate(-32%, -32%);
    width: 28px;

    &:focus-visible {
        outline: none;
    }
}

// "tooltip"
:deep(.slider-handle::before) {
    align-items: center;
    background-color: variables.$blue-600;
    border-radius: 50%;
    bottom: 27px;
    box-shadow: 0 1px 6px 0 rgba(34, 38, 51, 0.25);
    color: variables.$white;
    content: attr(aria-valuenow);
    display: flex;
    font-weight: variables.$font-weight-boldest;
    height: 52px;
    justify-content: center;
    padding-bottom: 2px;
    position: absolute;
    right: -22px;
    width: 52px;
}
</style>

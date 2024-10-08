<script setup lang="ts">
import Slider from 'primevue/slider';

const props = defineProps({
    /**
     * Aria label for slider handle
     */
    ariaLabel: {
        type: String,
        default: null,
    },
    /**
     * An id of the element whose contents describe this slider
     */
    ariaLabelledby: {
        type: String,
        default: null,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    /**
     * Function that modifies label value
     */
    labelFormatter: {
        type: Function,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default: (val: any) => val,
    },
    /**
     * Minimum value of slider
     */
    min: {
        type: Number,
        required: true,
        default: 1,
    },
    /**
     * Maximum value of slider
     */
    max: {
        type: Number,
        required: true,
        default: 100,
    },
    /**
     * Starting value of slider thumb
     */
    startingValue: {
        type: Number,
        required: true,
        default: 1,
    },
    /**
     * Step increment
     */
    step: {
        type: Number,
        default: 1,
    },
    /**
     * Function that modifies tooltip value
     */
    tooltipFormatter: {
        type: Function,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        default: (val: any) => val,
    },
});

// allow use of v-model on this component
const model = defineModel<number | number[]>();
model.value = props.startingValue;
</script>

<template>
    <div :class="{ 'es-slider--disabled': props.disabled }">
        <slider
            v-model="model"
            v-bind="$attrs"
            :disabled="disabled"
            :min="min"
            :max="max"
            :step="step"
            :aria-labelledby="ariaLabelledby"
            :aria-label="ariaLabel"
            :pt="{
                root: {
                    class: 'es-slider-root',
                },
                range: {
                    class: 'es-slider-range',
                },
                handle: {
                    class: 'es-slider-handle',
                },
            }" />

        <div class="es-slider-labels d-flex flex-row font-weight-bold justify-content-between text-gray-700">
            <span>{{ labelFormatter(min) }}</span>
            <span>{{ labelFormatter(max) }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

$hover-focus-animation-duration: 0.15s;
$slide-animation-duration: 0.05s;

:deep(.es-slider-root) {
    background-color: variables.$gray-200;
    border-radius: 15px;
    height: 10px;
    margin-bottom: 1rem;
    position: relative;

    &[data-p-sliding='true'] .slider-handle {
        box-shadow: 0 0 0 9px variables.$blue-50;
    }
}

:deep(.es-slider-range) {
    background: linear-gradient(90deg, variables.$blue-400, variables.$blue-800);
    border-radius: 15px;
    height: 10px;

    @media not (prefers-reduced-motion) {
        transition: width $slide-animation-duration ease-in-out;
    }
}

:deep(.es-slider-handle) {
    background-color: variables.$white;
    border: 9px solid variables.$blue-700;
    border-radius: 50%;
    box-shadow: 0 1px 6px 0 rgba(34, 38, 51, 0.25);
    cursor: pointer;
    height: 28px;
    /* important to prevent sliding from attempting to horizontally scroll on mobile */
    touch-action: none;
    transform: translate(-54%, -32%);
    width: 28px;

    @media not (prefers-reduced-motion) {
        transition:
            box-shadow $hover-focus-animation-duration ease-in-out,
            left $slide-animation-duration ease-in-out;
    }

    &:focus-visible {
        outline: none;
    }

    &:hover {
        box-shadow: 0 0 0 9px variables.$blue-50;
    }

    &:focus {
        box-shadow: 0 0 0 9px variables.$blue-300;
    }
}

// "tooltip"
:deep(.es-slider-handle::before) {
    align-items: center;
    background-color: variables.$blue-600;
    border-radius: 50%;
    bottom: 32px;
    box-shadow: 0 1px 6px 0 rgba(34, 38, 51, 0.25);
    color: variables.$white;
    content: v-bind("`'${tooltipFormatter(model)}'`");
    display: flex;
    font-weight: variables.$font-weight-bold;
    height: 52px;
    justify-content: center;
    padding-bottom: 2px;
    position: absolute;
    right: -22px;
    width: 52px;
}

.es-slider--disabled {
    /* at least prevents click/tap from giving it focus, if not keyboard */
    pointer-events: none;

    :deep(.es-slider-range) {
        /* use background instead of background-color here to clear out the linear-gradient */
        background: variables.$gray-400;
    }

    :deep(.es-slider-handle) {
        border-color: variables.$gray-400;
        box-shadow: none;

        &::before {
            background-color: variables.$gray-300;
            color: variables.$gray-500;
        }
    }

    .es-slider-labels {
        /* use important to override the utility class */
        color: variables.$gray-500 !important;
    }
}
</style>

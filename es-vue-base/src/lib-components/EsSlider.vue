<template>
    <client-only>
        <vue-slider
            v-model="sliderValue"
            class="es-slider"
            :data="data"
            :marks="marks"
            :min="min"
            :max="max"
            :dot-size="28"
            :dot-attrs="{ 'aria-label': ariaLabel }"
            :tooltip="tooltip"
            lazy
            v-bind="$attrs"
            :contained="true"
            v-on="$listeners">
            <!-- Tooltip above the slider thumb -->
            <template #tooltip="{ value, focus }">
                <div
                    class="slider-tooltip d-flex align-items-center text-white justify-content-center m-0 bg-blue-600 font-weight-boldest"
                    :class="[{ focus }]">
                    {{ tooltipFormatter(value) }}
                </div>
            </template>
            <!-- Labels below the process bar -->
            <template #label="{ label, active }">
                <div :class="['slider-label', 'vue-slider-mark-label', { active }]">
                    {{ labelFormatter(label) }}
                </div>
            </template>
        </vue-slider>
    </client-only>
</template>

<script lang="js">
import vueSlider from 'vue-slider-component/dist-css/vue-slider-component.common';

export default {
    name: 'EsSlider',
    components: {
        vueSlider,
    },
    props: {
        /**
         * Starting value of slider thumb
         */
        startingValue: {
            type: Number,
            required: true,
        },
        /**
         * Array that contains valid steps
         */
        data: {
            type: Array,
            required: true,
        },
        /**
         * Function that chooses where to add marks to the track
         */
        marks: {
            type: [Array, Function],
            required: true,
        },
        /**
         * Aria Label for Dot
         */
        ariaLabel: {
            type: String,
            required: false,
            default: 'Select a number',
        },
        /**
         * Function that modifies label value
         */
        labelFormatter: {
            type: Function,
            required: false,
            default: (val) => val,
        },
        /**
         * Function that modifies tooltip value
         */
        tooltipFormatter: {
            type: Function,
            required: false,
            default: (val) => val,
        },
        /**
         * Choose when tooltip displays
         */
        tooltip: {
            type: String,
            required: false,
            default: 'always',
        },
    },
    data() {
        return {
            sliderValue: this.startingValue,
            min: this.data[0],
            max: this.data[this.data.length - 1],
        };
    },
    watch: {
        startingValue: {
            // Watch the prop and update the value to avoid mutation
            handler(newVal) {
                this.sliderValue = newVal > 0 ? newVal : this.startingValue;
            },
        },
    },
};
</script>

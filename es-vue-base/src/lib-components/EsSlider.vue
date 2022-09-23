<template>
    <vue-slider
        v-model="sliderValue"
        :data="data"
        :marks="marks"
        :min="min"
        :max="max"
        :dot-size="28"
        :dot-attrs="{ 'aria-label': ariaLabel }"
        :tooltip="tooltip"
        :dot-style="styles.dot"
        :rail-style="styles.rail"
        :step-style="styles.step"
        :process-style="styles.process"
        lazy
        :contained="true"
        @change="updateSliderValue">
        <!-- Tooltip above the slider thumb -->
        <template #tooltip="{ value, focus }">
            <div
                class="slider-tooltip h4 d-flex align-items-center text-white justify-content-center m-0"
                :class="[{ focus }]"
                :style="{ 'background-color': colorComputed }">
                {{ tooltipFormatter(value) }}
            </div>
        </template>
        <!-- Labels below the process bar -->
        <template #label="{ label, active }">
            <div :class="['slider-label', 'vue-slider-mark-label', { active }]">
                {{ label }}
            </div>
        </template>
    </vue-slider>
</template>

<script lang="js">
import vueSlider from 'vue-slider-component';

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
            type: Array,
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
        // TODO: Replace this with sass variables when available
        const colors = {
            white: '#fff',
            indigo: '#152f87',
            cyan: '#007aab',
        };
        // eslint-disable-next-line max-len
        const gradient = `linear-gradient(112.58deg, ${colors.cyan} 28%, ${colors.indigo} 100%)`;

        return {
            sliderValue: this.startingValue,
            min: this.data[0],
            max: this.data[this.data.length - 1],
            colorComputed: colors.cyan,
            styles: {
                dot: {
                    border: `5px solid ${colors.cyan}`,
                    background: colors.white,
                },
                rail: {
                    height: '10px',
                    'border-radius': '9px',
                },
                process: {
                    height: '10px',
                    background: gradient,
                    'border-radius': '9px',
                },
                step: {
                    display: 'none',
                },
            },
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
    methods: {
        updateSliderValue(value) {
            this.$emit('change', value);
        },
    },
};
</script>

<style lang="scss">
@import '~vue-slider-component/lib/theme/default';
@import '~vue-slider-component/lib/styles/dot';
@import '~vue-slider-component/lib/styles/mark';
@import '~vue-slider-component/lib/styles/slider';
</style>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.vue-slider {
    padding: 0 !important;
}

.slider-tooltip {
    border-radius: 50%;
    height: 54px;
    width: 54px;
}

.slider-label {
    color: $gray-600;
    font-size: $h4-font-size;
    margin-top: $spacer;
}
</style>

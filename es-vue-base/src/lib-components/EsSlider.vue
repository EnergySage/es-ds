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
                class="slider-tooltip h5 d-flex align-items-center text-white justify-content-center m-0"
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

// TODO: Replace this with sass variables when available
const colors = {
    white: '#fff',
    indigo: '#152f87',
    red: '#b93737',
    yellow: '#ffbf57',
    green: '#008445',
    teal: '#35b6aa',
    cyan: '#007eb0',
    gray: {
        100: '#fafafa',
        700: '#565656',
        900: '#292929',
    },
};

// TODO: Replace this with sass variables when available
const variants = {
    primary: colors.cyan,
    secondary: colors.gray['900'],
    success: colors.green,
    info: colors.indigo,
    warning: colors.yellow,
    danger: colors.red,
    light: colors.gray['100'],
    dark: colors.gray['700'],
};

// TODO: Replace this with sass variable when available
const gradient = `linear-gradient(104.98deg, ${colors.teal} -0.03%, ${colors.cyan} 50.02%, ${colors.indigo} 99.93%)`;

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
         * Minimum slider value
         */
        min: {
            type: Number,
            required: true,
        },
        /**
         * Maximum slider value
         */
        max: {
            type: Number,
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
        /**
         * Color variant
         */
        variant: {
            type: String,
            required: false,
            default: 'primary',
        },
    },
    data() {
        return {
            sliderValue: this.startingValue,
            colorComputed: variants[this.variant],
            styles: {
                dot: {
                    border: `5px solid ${variants[this.variant]}`,
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
@import '~@energysage/es-bs-extends/scss/includes';

.slider-tooltip {
    border-radius: 50%;
    height: 52px;
    width: 52px;
}

.slider-label {
    color: $gray-600;
    font-size: $h5-font-size;
    margin-top: $spacer;
}
</style>

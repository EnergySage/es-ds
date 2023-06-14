<template>
    <div>
        <template v-if="!circle">
            <b-progress
                aria-describedby="es-progress"
                class="EsProgress bg-gray-300 rounded-0"
                :class="{ 'EsProgress--full': value === 100 }"
                :height="height"
                :value="value"
                v-bind="$attrs"
                v-on="$listeners" />
        </template>
        <template v-else>
            <!-- Based on prior art from es-cdgm codebase -->
            <svg
                viewBox="0 0 100 100"
                :height="height"
                :width="height">
                <circle
                    class="inner-circle"
                    :cx="50"
                    :cy="50"
                    stroke-width="8"
                    r="45%" />
                <!-- The first argument in `stoke-dasharray` is the amount of the circle we want colored
                    The second is the gap before the next stroke starts
                    Since we don't want another stroke to start, we use a number greater than the
                    circumference of the circle (ex: 300). -->
                <template v-if="fillLength > 0">
                    <circle
                        class="progress-circle"
                        :stroke-dasharray="`${fillLength} 300`"
                        :cx="50"
                        :cy="50"
                        r="45%"
                        stroke-width="8"
                        stroke-linecap="round"
                        transform="rotate(-90, 50, 50)" />
                </template>
                <template v-if="showPercentage">
                    <text
                        x="50%"
                        y="52%"
                        class="font-weight-boldest text-gray-700 font-size-base"
                        dominant-baseline="middle"
                        alignment-baseline="middle"
                        text-anchor="middle">
                        {{ value }}%
                    </text>
                </template>
            </svg>
        </template>
    </div>
</template>

<script lang="js">
import { BProgress } from 'bootstrap-vue';

export default {
    name: 'EsProgress',
    components: {
        BProgress,
    },
    props: {
        height: {
            type: String,
            default: '0.3125rem', // 5px
        },
        value: {
            type: Number,
            required: true,
        },
        circle: {
            type: Boolean,
            default: false,
        },
        showPercentage: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        /**
         * @returns {number} the length of the stroke that displays the part of the circle
         * that is proportional to the value passed in.
         */
        fillLength() {
            return this.computedHeight * Math.PI * (this.value / 100) * (90 / this.computedHeight);
        },
        computedHeight() {
            const height = this.height.replace(/[^0-9]/g, '');
            return parseInt(height, 10);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.EsProgress {
  ::v-deep .progress-bar {
    border-radius: 0 0.125rem 0.125rem 0;
  }
}

.EsProgress--full {
  ::v-deep .progress-bar {
    border-radius: 0;
  }
}

.inner-circle {
    // position: relative;
    fill: transparent;
    stroke: $gray-200;
}

.progress-circle {
    // position: relative;
    fill: transparent;
    stroke: $primary;
}

</style>

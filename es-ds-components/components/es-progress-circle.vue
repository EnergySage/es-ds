<script setup lang="ts">
const props = defineProps({
    height: {
        type: String,
        default: '50px',
    },
    value: {
        type: Number,
        required: true,
    },
    showPercentage: {
        type: Boolean,
        default: true,
    },
})

const computedHeight = computed(() => {
    const height = props.height.replace(/\D/g, '')
    return Number.parseInt(height, 10)
})
const fillLength = computed(() => {
    return computedHeight.value * Math.PI * (props.value / 100) * (90 / computedHeight.value)
})
</script>

<template>
    <div
        v-bind="$attrs"
    >
        <!-- Based on prior art from es-cdgm codebase -->
        <svg
            viewBox="0 0 100 100"
            :height="height"
            :width="height"
        >
            <circle
                class="inner-circle"
                :cx="50"
                :cy="50"
                stroke-width="8"
                r="45%"
            />
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
                    transform="rotate(-90, 50, 50)"
                />
            </template>
            <template v-if="showPercentage">
                <text
                    x="50%"
                    y="52%"
                    class="font-weight-boldest text-gray-700 font-size-base"
                    dominant-baseline="middle"
                    alignment-baseline="middle"
                    text-anchor="middle"
                >
                    {{ value }}%
                </text>
            </template>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
@use "@energysage/es-ds-styles/scss/variables" as variables;

.inner-circle {
    // position: relative;
    fill: transparent;
    stroke: variables.$gray-200;
}

.progress-circle {
    // position: relative;
    fill: transparent;
    stroke: variables.$blue-400;
}
</style>

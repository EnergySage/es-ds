<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';

const BASE_FONT_SIZE = 16;
const DEFAULT_BAR_HEIGHT = 2;
const DEFAULT_BORDER_WIDTH = 0.5;
const DEFAULT_CIRCLE_GLOW_SIZE = 4;
const DEFAULT_INSET_SHADOW_SIZE = 0.5;
const DIFF_CIRCLE_SIZE_FROM_BAR_HEIGHT_IN_PX = 4;
const DEFAULT_CIRCLE_DIMENSION = DEFAULT_BAR_HEIGHT + DIFF_CIRCLE_SIZE_FROM_BAR_HEIGHT_IN_PX;

interface Props {
    formatter?: Function;
    height?: string;
    showCircle?: boolean;
    showValue?: boolean;
    value: number;
    valueClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
    formatter: (val: number) => `${val}%`,
    height: '0.125rem',
    showCircle: true,
    showValue: false,
    valueClass: '',
});

const progressBarPt = {
    value: {
        class: [
            'EsProgressValue progress-bar overflow-visible position-relative rounded-sm',
            {
                'progress-bar--with-circle': props.showCircle,
            },
        ],
        style: {
            height: props.height,
        },
    },
};

const barHeight = computed(() => {
    let barHeight = DEFAULT_BAR_HEIGHT;

    if (props.height.indexOf('rem') === props.height.length - 3) {
        barHeight = parseFloat(props.height.replace('rem', '')) * BASE_FONT_SIZE;
    } else if (props.height.indexOf('px') === props.height.length - 2) {
        barHeight = parseInt(props.height.replace('px', ''), 10);
    }

    return barHeight;
});
const circleDimension = computed(() => barHeight.value + (DIFF_CIRCLE_SIZE_FROM_BAR_HEIGHT_IN_PX * barHeight.value) / DEFAULT_BAR_HEIGHT);

const circleDimensionPx = computed(() => `${circleDimension.value}px`);
const circleRightPx = computed(() => `${circleDimension.value * -0.5}px`);
const circleBorderWidthPx = computed(() => `${(DEFAULT_BORDER_WIDTH * circleDimension.value / DEFAULT_CIRCLE_DIMENSION)}px`);
const circleGlowSizePx = computed(() => `${DEFAULT_CIRCLE_GLOW_SIZE * circleDimension.value / DEFAULT_CIRCLE_DIMENSION}px`)
const circleInsetShadowSizePx = computed(() => `${DEFAULT_INSET_SHADOW_SIZE * circleDimension.value / DEFAULT_CIRCLE_DIMENSION}px`);

const verticalContainerPaddingPx = computed(() => props.showCircle ? `${(circleDimension.value - barHeight.value) / 2}px` : '0');
</script>

<template>
    <div class="es-progress" :class="$attrs.class">
        <progress-bar
            class="bg-gray-200 rounded-sm"
            :pt="progressBarPt"
            :show-value="false"
            :value="value"
            v-bind="omit('class', $attrs)">
        </progress-bar>
        <div v-if="showValue" class="font-size-75 mt-25 text-right" :class="valueClass">
            {{ formatter(value) }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-progress {
    padding-bottom: v-bind(verticalContainerPaddingPx);
    padding-top: v-bind(verticalContainerPaddingPx);

    :deep(.progress-bar--with-circle::after) {
        border: v-bind(circleBorderWidthPx) solid variables.$warm-orange;
        box-shadow: 0 0 v-bind(circleInsetShadowSizePx) v-bind(circleInsetShadowSizePx) variables.$warm-orange inset, 0 0 v-bind(circleGlowSizePx) 0 variables.$warm-orange;
        height: v-bind(circleDimensionPx);
        right: v-bind(circleRightPx);
        width: v-bind(circleDimensionPx);
    }
}
</style>

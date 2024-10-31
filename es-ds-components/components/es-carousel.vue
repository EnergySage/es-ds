<script setup lang="ts">
/*
    TODO:
     - why is mobile so messed up with paging
     - why does mobile first show item 12 and then switch to item 1
*/

import Carousel from 'primevue/carousel';
import sassBreakpoints from '@energysage/es-ds-styles/scss/modules/breakpoints.module.scss';
import type { EsCarouselBreakpointsInterface } from '../types';

interface IProps {
    autoPlay?: boolean;
    autoPlayInterval?: number;
    breakpoints?: EsCarouselBreakpointsInterface;
    circular?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: Array<any>;
    numScroll?: number;
    numVisible?: number;
    showArrows?: boolean;
    showDots?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
    autoPlay: false,
    autoPlayInterval: 2000,
    breakpoints: () => ({}),
    circular: true,
    items: () => [],
    numScroll: 1,
    numVisible: 1,
    showArrows: true,
    showDots: true,
});

const emit = defineEmits<{
    update: [value: number];
}>();

// get the breakpoint pixel numbers from the SASS variables in es-ds-styles
const parseSassBreakpoint = (breakpoint: string) => parseInt(breakpoint.replace('px', ''), 10);
const BREAKPOINTS = {
    SM: parseSassBreakpoint(sassBreakpoints.sm),
    MD: parseSassBreakpoint(sassBreakpoints.md),
    LG: parseSassBreakpoint(sassBreakpoints.lg),
    XL: parseSassBreakpoint(sassBreakpoints.xl),
    XXL: parseSassBreakpoint(sassBreakpoints.xxl),
};

// lower breakpoint values propagate to higher breakpoints unless overridden
const numVisibleXs = computed(() => props.numVisible);
const numVisibleSm = computed(() => props.breakpoints?.sm?.numVisible || numVisibleXs.value);
const numVisibleMd = computed(() => props.breakpoints?.md?.numVisible || numVisibleSm.value);
const numVisibleLg = computed(() => props.breakpoints?.lg?.numVisible || numVisibleMd.value);
const numVisibleXl = computed(() => props.breakpoints?.xl?.numVisible || numVisibleLg.value);
const numVisibleXxl = computed(() => props.breakpoints?.xxl?.numVisible || numVisibleXl.value);

// lower breakpoint values propagate to higher breakpoints unless overridden
const numScrollXs = computed(() => props.numScroll);
const numScrollSm = computed(() => props.breakpoints?.sm?.numScroll || numScrollXs.value);
const numScrollMd = computed(() => props.breakpoints?.md?.numScroll || numScrollSm.value);
const numScrollLg = computed(() => props.breakpoints?.lg?.numScroll || numScrollMd.value);
const numScrollXl = computed(() => props.breakpoints?.xl?.numScroll || numScrollLg.value);
const numScrollXxl = computed(() => props.breakpoints?.xxl?.numScroll || numScrollXl.value);

// in order to enable full-width carousels with one item
// but also ensure there is some space between items when more than one is visible
// only apply horizontal padding to carousel items on breakpoints where more than one item is visible
const DEFAULT_PADDING = '0.5rem';
const paddingXs = computed(() => (numVisibleXs.value === 1 ? '0' : DEFAULT_PADDING));
const paddingSm = computed(() => (numVisibleSm.value === 1 ? '0' : DEFAULT_PADDING));
const paddingMd = computed(() => (numVisibleMd.value === 1 ? '0' : DEFAULT_PADDING));
const paddingLg = computed(() => (numVisibleLg.value === 1 ? '0' : DEFAULT_PADDING));
const paddingXl = computed(() => (numVisibleXl.value === 1 ? '0' : DEFAULT_PADDING));
const paddingXxl = computed(() => (numVisibleXxl.value === 1 ? '0' : DEFAULT_PADDING));

const responsiveOptions = computed(() => {
    // if no special breakpoints are defined, don't pass in any responsive options
    if (!Object.keys(props.breakpoints).length) {
        return undefined;
    }

    return [
        // XXL breakpoint
        {
            // max width of XXL is infinite, so let's use 9999px
            breakpoint: '9999px',
            numScroll: numScrollXxl.value,
            numVisible: numVisibleXxl.value,
        },
        // XL breakpoint
        {
            // max width of XL is XXL minus one
            breakpoint: `${BREAKPOINTS.XXL - 1}px`,
            numScroll: numScrollXl.value,
            numVisible: numVisibleXl.value,
        },
        // LG breakpoint
        {
            // max width of LG is XL minus one
            breakpoint: `${BREAKPOINTS.XL - 1}px`,
            numScroll: numScrollLg.value,
            numVisible: numVisibleLg.value,
        },
        // MD breakpoint
        {
            // max width of MD is LG minus one
            breakpoint: `${BREAKPOINTS.LG - 1}px`,
            numScroll: numScrollMd.value,
            numVisible: numVisibleMd.value,
        },
        // SM breakpoint
        {
            // max width of SM is MD minus one
            breakpoint: `${BREAKPOINTS.MD - 1}px`,
            numScroll: numScrollSm.value,
            numVisible: numVisibleSm.value,
        },
    ];
});

const autoplayInterval = ref(props.autoPlay ? props.autoPlayInterval : 0);
const key = ref('');

const stopAutoplay = () => {
    if (autoplayInterval.value > 0) {
        autoplayInterval.value = 0;
        key.value = 'stopAutoplay';
    }
};

onMounted(() => {
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            // Stop carousel when user presses Escape key, in lieu of pause button
            // https://www.w3.org/WAI/WCAG22/Techniques/general/G187.html
            stopAutoplay();
        }
    });
});
</script>

<template>
    <carousel
        :key="key"
        :autoplay-interval="autoplayInterval"
        :circular="props.circular"
        :num-scroll="props.numScroll"
        :num-visible="props.numVisible"
        :responsive-options="responsiveOptions"
        :show-indicators="props.showDots"
        :show-navigators="props.showArrows"
        :value="props.items"
        :pt="{
            container: {
                class: 'd-flex',
            },
            indicator: {
                class: 'es-carousel-dot',
            },
            indicators: {
                class: 'es-carousel-dots d-flex justify-content-center mt-100',
                style: 'gap: 12px;',
            },
            itemsContent: {
                class: 'w-100 overflow-hidden',
            },
            itemsContainer: {
                class: 'd-flex',
            },
            item: {
                class: 'es-carousel-item',
            },
            itemCloned: {
                class: 'es-carousel-item',
            },
            previousButton: {
                class: 'es-carousel-arrow es-carousel-prev-arrow btn btn-outline-primary px-sm-50',
            },
            nextButton: {
                class: 'es-carousel-arrow es-carousel-next-arrow btn btn-outline-primary px-sm-50',
            },
        }"
        @update:page="(value: number) => emit('update', value)">
        <template #item="item">
            <slot
                name="item"
                :item="item.data" />
        </template>
        <template #previousicon>
            <icon-chevron-left />
        </template>
        <template #nexticon>
            <icon-chevron-right />
        </template>
    </carousel>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

:deep(.es-carousel-item) {
    flex: 1 0 calc(100% / v-bind(numVisibleXs));
    padding: 0 v-bind(paddingXs);
}

@include breakpoints.media-breakpoint-up(sm) {
    :deep(.es-carousel-item) {
        flex: 1 0 calc(100% / v-bind(numVisibleSm));
        padding: 0 v-bind(paddingSm);
    }
}

@include breakpoints.media-breakpoint-up(md) {
    :deep(.es-carousel-item) {
        flex: 1 0 calc(100% / v-bind(numVisibleMd));
        padding: 0 v-bind(paddingMd);
    }
}

@include breakpoints.media-breakpoint-up(lg) {
    :deep(.es-carousel-item) {
        flex: 1 0 calc(100% / v-bind(numVisibleLg));
        padding: 0 v-bind(paddingLg);
    }
}

@include breakpoints.media-breakpoint-up(xl) {
    :deep(.es-carousel-item) {
        flex: 1 0 calc(100% / v-bind(numVisibleXl));
        padding: 0 v-bind(paddingXl);
    }
}

@include breakpoints.media-breakpoint-up(xxl) {
    :deep(.es-carousel-item) {
        flex: 1 0 calc(100% / v-bind(numVisibleXxl));
        padding: 0 v-bind(paddingXxl);
    }
}

:deep(.es-carousel-arrow) {
    background: unset;
    border: unset;
    box-shadow: none;
    color: variables.$gray-900;
    height: auto;

    &:hover {
        color: variables.$gray-700;
    }
    &:not(:disabled):not(.disabled):active {
        background: unset;
        box-shadow: none;
        color: variables.$gray-700;
    }
}

:deep(.es-carousel-dot) {
    list-style-type: none;

    &[data-p-highlight='true'] button {
        background-color: variables.$orange-800;
    }

    button {
        background-color: variables.$gray-100;
        border: none;
        border-radius: 50%;
        height: 0.875rem;
        width: 0.875rem;

        &:hover {
            opacity: 0.8;
        }
    }
}
</style>

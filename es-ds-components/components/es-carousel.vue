<script setup lang="ts">
/*
    TODO:
     - circular has quirky behavior when numVisible doesn't match numScroll
        - you can see this in the circular autoplay example
        - i'm not sure if this is fixable
     - figure out peek behavior
     - prop to position the arrows at the bottom two corners of a full-width slide, like homepage
*/

import Carousel from 'primevue/carousel';
import sassBreakpoints from '@energysage/es-ds-styles/scss/modules/breakpoints.module.scss';
import type { EsCarouselBreakpointsInterface } from '../types';

// this isn't set in a SASS variable so we can't import it, but it's
// defined as a constant here so we can easily change it if we need to
const BASE_FONT_SIZE = 16;

// constants that contribute to dots and arrows positioning
const DOT_SIZE = 14;
const DOT_SPACING = 16;
const ARROW_BUTTON_PADDING = 8;

// the number of "dots" apart the arrows should be when dots are hidden
const ARROW_SPACING_WHEN_NO_DOTS = 1;

interface IProps {
    arrowSize?: 'sm' | 'lg';
    autoPlay?: boolean;
    autoPlayInterval?: number;
    breakpoints?: EsCarouselBreakpointsInterface;
    circular?: boolean;
    controlGap?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: Array<any>;
    numScroll?: number;
    numVisible?: number;
    showArrows?: boolean;
    showDots?: boolean;
    slideGap?: number;
    variant?: 'default' | 'brand';
}
const props = withDefaults(defineProps<IProps>(), {
    arrowSize: 'sm',
    autoPlay: false,
    autoPlayInterval: 4000,
    breakpoints: () => ({}),
    circular: false,
    controlGap: 24,
    items: () => [],
    numScroll: 1,
    numVisible: 1,
    showArrows: true,
    showDots: true,
    slideGap: 16,
    variant: 'default',
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

// allow customizable spacing between slides
// but since that's done as side padding around each slide, which moves them in from the container edge
// to get slides to left and right align with page content
// we apply a negative margin to either side to bring the container edges back out to match
const sidePadding = computed(() => `${props.slideGap / 2 / BASE_FONT_SIZE}rem`);
const negativeMargin = computed(() => `-${sidePadding.value}`);

// size of dots and spacing between dots
const dotSize = `${DOT_SIZE / BASE_FONT_SIZE}rem`;
const dotSpacing = `${DOT_SPACING / BASE_FONT_SIZE}rem`;

// arrow padding
const arrowPadding = `${ARROW_BUTTON_PADDING / BASE_FONT_SIZE}rem`;

// arrow size
const arrowSize = computed(() => (props.arrowSize === 'lg' ? 32 : 24));
const arrowSizePx = computed(() => `${arrowSize.value}px`);
const arrowButtonSize = computed(() => arrowSize.value + ARROW_BUTTON_PADDING * 2);

// vertical positioning for the arrows
const distanceFromCarouselBottomToCenterOfDots = computed(() => props.controlGap + DOT_SIZE / 2);
const arrowPositionBottom = computed(
    () => `-${distanceFromCarouselBottomToCenterOfDots.value + arrowButtonSize.value / 2}px`,
);
const dotsMarginTop = computed(() => `${props.controlGap / BASE_FONT_SIZE}rem`);

// the number of dots visible at each breakpoint
const numDotsXs = computed(() =>
    props.showDots ? Math.ceil(props.items.length / numVisibleXs.value) : ARROW_SPACING_WHEN_NO_DOTS,
);
const numDotsSm = computed(() =>
    props.showDots ? Math.ceil(props.items.length / numVisibleSm.value) : ARROW_SPACING_WHEN_NO_DOTS,
);
const numDotsMd = computed(() =>
    props.showDots ? Math.ceil(props.items.length / numVisibleMd.value) : ARROW_SPACING_WHEN_NO_DOTS,
);
const numDotsLg = computed(() =>
    props.showDots ? Math.ceil(props.items.length / numVisibleLg.value) : ARROW_SPACING_WHEN_NO_DOTS,
);
const numDotsXl = computed(() =>
    props.showDots ? Math.ceil(props.items.length / numVisibleXl.value) : ARROW_SPACING_WHEN_NO_DOTS,
);
const numDotsXxl = computed(() =>
    props.showDots ? Math.ceil(props.items.length / numVisibleXxl.value) : ARROW_SPACING_WHEN_NO_DOTS,
);

// calculate the arrow position from center based on the number of dots
const calculateArrowPosition = (numDots: number): number =>
    (numDots * DOT_SIZE) / 2 + (numDots * DOT_SPACING) / 2 + DOT_SPACING;

// determine how much from center we need to move the arrow buttons, based on how many dots there are
const arrowPositionXs = computed(() => calculateArrowPosition(numDotsXs.value));
const arrowPositionSm = computed(() => calculateArrowPosition(numDotsSm.value));
const arrowPositionMd = computed(() => calculateArrowPosition(numDotsMd.value));
const arrowPositionLg = computed(() => calculateArrowPosition(numDotsLg.value));
const arrowPositionXl = computed(() => calculateArrowPosition(numDotsXl.value));
const arrowPositionXxl = computed(() => calculateArrowPosition(numDotsXxl.value));

// prev button horizontal position
const prevArrowTranslateXs = computed(() => `-${arrowPositionXs.value + arrowButtonSize.value}px`);
const prevArrowTranslateSm = computed(() => `-${arrowPositionSm.value + arrowButtonSize.value}px`);
const prevArrowTranslateMd = computed(() => `-${arrowPositionMd.value + arrowButtonSize.value}px`);
const prevArrowTranslateLg = computed(() => `-${arrowPositionLg.value + arrowButtonSize.value}px`);
const prevArrowTranslateXl = computed(() => `-${arrowPositionXl.value + arrowButtonSize.value}px`);
const prevArrowTranslateXxl = computed(() => `-${arrowPositionXxl.value + arrowButtonSize.value}px`);

// next arrow horizontal position
const nextArrowTranslateXs = computed(() => `${arrowPositionXs.value}px`);
const nextArrowTranslateSm = computed(() => `${arrowPositionSm.value}px`);
const nextArrowTranslateMd = computed(() => `${arrowPositionMd.value}px`);
const nextArrowTranslateLg = computed(() => `${arrowPositionLg.value}px`);
const nextArrowTranslateXl = computed(() => `${arrowPositionXl.value}px`);
const nextArrowTranslateXxl = computed(() => `${arrowPositionXxl.value}px`);

// extra space to add below the carousel for the arrows when arrows are on but dots are off
const arrowsOnlyBottomSpacing = computed(() => `${props.controlGap + arrowButtonSize.value}px`);

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
        // XS breakpoint
        // (this is necessary to avoid weird behavior on mobile)
        {
            // max width of XS is SM minus one
            breakpoint: `${BREAKPOINTS.SM - 1}px`,
            numScroll: props.numScroll,
            numVisible: props.numVisible,
        },
    ];
});

const autoplayInterval = ref(props.autoPlay ? props.autoPlayInterval : 0);
const isMounted = ref(false);
const key = ref('');

const stopAutoplay = () => {
    if (autoplayInterval.value > 0) {
        autoplayInterval.value = 0;
        key.value = 'stopAutoplay';
    }
};

onMounted(() => {
    /**
     * avoids an unavoidable SSR issue with responsive carousels (SSR can't know the breakpoint
     * and therefore how many items need to be displayed per page) where circular carousels have
     * their last few items cloned and inserted before the first item in the list, meaning on initial
     * page render, you see those cloned last items listed first rather than the first item.
     *
     * then, upon hydration, the items change and the first item is then listed first.
     *
     * this workaround disables circular functionality for SSR, and swaps to the user-provided
     * setting for it on mount.
     *
     * this flag is also used to hide the extra dots from the mobile view on larger breakpoints
     * before hydration occurs and the number of dots is adjusted to the breakpoint.
     */
    isMounted.value = true;

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
        :circular="isMounted && circular"
        class="es-carousel"
        :class="{
            'es-carousel--brand': variant === 'brand',
            'arrows-only': showArrows && !showDots,
            'before-mount': !isMounted,
            dots: showDots,
            [`num-dots-sm-${numDotsSm}`]: true,
            [`num-dots-md-${numDotsMd}`]: true,
            [`num-dots-lg-${numDotsLg}`]: true,
            [`num-dots-xl-${numDotsXl}`]: true,
            [`num-dots-xxl-${numDotsXxl}`]: true,
        }"
        :num-scroll="numScroll"
        :num-visible="numVisible"
        :responsive-options="responsiveOptions"
        :show-indicators="showDots"
        :show-navigators="showArrows"
        :value="items"
        :pt="{
            container: {
                class: 'es-carousel-container d-flex position-relative',
            },
            indicator: {
                class: 'es-carousel-dot',
            },
            indicators: {
                class: 'es-carousel-dots d-flex justify-content-center',
            },
            indicatorButton: {
                class: 'd-block',
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
                class: 'es-carousel-arrow es-carousel-prev-arrow btn btn-outline-primary position-absolute px-sm-50',
            },
            nextButton: {
                class: 'es-carousel-arrow es-carousel-next-arrow btn btn-outline-primary position-absolute px-sm-50',
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
@use 'sass:map';

/**
    solution for PrimeVue initially displaying the mobile breakpoint's number of dots on page load
    until hydration, when it then adjusts to the actual breakpoint and corrects the number of dots

    generate CSS classes for each breakpoint that hide the dots that should be hidden before mount
*/
$num-dots-supported: 8;
.es-carousel.before-mount {
    @each $breakpoint in map.keys(variables.$grid-breakpoints) {
        @include breakpoints.media-breakpoint-up($breakpoint) {
            $infix: breakpoints.breakpoint-infix($breakpoint, variables.$grid-breakpoints);
            @for $i from 1 through $num-dots-supported {
                &.num-dots#{$infix}-#{$i} :deep(.es-carousel-dot:nth-child(#{$i}) ~ .es-carousel-dot) {
                    display: none;
                }
            }
        }
    }
}

/* arrows are positioned absolutely, so when arrows are shown but dots are not, we need to reserve space for them */
.es-carousel.arrows-only {
    padding-bottom: v-bind(arrowsOnlyBottomSpacing);
}

/* ensure there's enough space between the dots (when present) and the next content on the page */
.es-carousel.dots {
    padding-bottom: 0.25rem;
}

/* make the carousel card edges align with page content */
:deep(.es-carousel-container) {
    margin-left: v-bind(negativeMargin);
    margin-right: v-bind(negativeMargin);
}

/* card sizing, based on num visible at each breakpoint */
:deep(.es-carousel-item) {
    flex: 1 0 calc(100% / v-bind(numVisibleXs));
    padding: 0 v-bind(sidePadding);

    @include breakpoints.media-breakpoint-up(sm) {
        flex: 1 0 calc(100% / v-bind(numVisibleSm));
    }

    @include breakpoints.media-breakpoint-up(md) {
        flex: 1 0 calc(100% / v-bind(numVisibleMd));
    }

    @include breakpoints.media-breakpoint-up(lg) {
        flex: 1 0 calc(100% / v-bind(numVisibleLg));
    }

    @include breakpoints.media-breakpoint-up(xl) {
        flex: 1 0 calc(100% / v-bind(numVisibleXl));
    }

    @include breakpoints.media-breakpoint-up(xxl) {
        flex: 1 0 calc(100% / v-bind(numVisibleXxl));
    }
}

/* previous arrow horizontal positioning at each breakpoint */
:deep(.es-carousel-prev-arrow) {
    transform: translateX(v-bind(prevArrowTranslateXs));

    /* keep the "shift 1px down on click" transform from removing our transform */
    &:not(:disabled):not(.disabled):active {
        transform: translateX(v-bind(prevArrowTranslateXs)) translateY(1px);
    }

    @include breakpoints.media-breakpoint-up(sm) {
        transform: translateX(v-bind(prevArrowTranslateSm));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(prevArrowTranslateSm)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(md) {
        transform: translateX(v-bind(prevArrowTranslateMd));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(prevArrowTranslateMd)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(lg) {
        transform: translateX(v-bind(prevArrowTranslateLg));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(prevArrowTranslateLg)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(xl) {
        transform: translateX(v-bind(prevArrowTranslateXl));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(prevArrowTranslateXl)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(xxl) {
        transform: translateX(v-bind(prevArrowTranslateXxl));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(prevArrowTranslateXxl)) translateY(1px);
        }
    }
}

/* next arrow horizontal positioning at each breakpoint */
:deep(.es-carousel-next-arrow) {
    transform: translateX(v-bind(nextArrowTranslateXs));

    /* keep the "shift 1px down on click" transform from removing our transform */
    &:not(:disabled):not(.disabled):active {
        transform: translateX(v-bind(nextArrowTranslateXs)) translateY(1px);
    }

    @include breakpoints.media-breakpoint-up(sm) {
        transform: translateX(v-bind(nextArrowTranslateSm));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(nextArrowTranslateSm)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(md) {
        transform: translateX(v-bind(nextArrowTranslateMd));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(nextArrowTranslateMd)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(lg) {
        transform: translateX(v-bind(nextArrowTranslateLg));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(nextArrowTranslateLg)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(xl) {
        transform: translateX(v-bind(nextArrowTranslateXl));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(nextArrowTranslateXl)) translateY(1px);
        }
    }

    @include breakpoints.media-breakpoint-up(xxl) {
        transform: translateX(v-bind(nextArrowTranslateXxl));

        &:not(:disabled):not(.disabled):active {
            transform: translateX(v-bind(nextArrowTranslateXxl)) translateY(1px);
        }
    }
}

/* prev/next arrow button styling */
:deep(.es-carousel-arrow) {
    background: unset;
    border: unset;
    bottom: v-bind(arrowPositionBottom);
    box-shadow: none;
    color: variables.$gray-900;
    height: auto;
    left: 50%;
    padding: v-bind(arrowPadding);

    &:hover {
        color: variables.$gray-700;
    }
    &:focus {
        color: variables.$gray-900;
    }
    &:not(:disabled):not(.disabled):active {
        background: unset;
        box-shadow: none;
        color: variables.$gray-700;
    }
    &:disabled {
        color: variables.$gray-400;
    }

    svg {
        /* use !important to override the inline style on svg icons */
        height: v-bind(arrowSizePx) !important;
        width: v-bind(arrowSizePx) !important;
    }
}

/* prev/next arrow button styling for the "brand" variant */
.es-carousel--brand {
    :deep(.es-carousel-arrow) {
        color: variables.$blue-600;

        &:hover {
            color: variables.$blue-700;
        }
        &:not(:disabled):not(.disabled):active {
            color: variables.$blue-800;
        }
        &:disabled {
            color: variables.$gray-400;
        }
    }
}

/* dots container */
:deep(.es-carousel-dots) {
    gap: v-bind(dotSpacing);
    padding-left: 0;
    margin-top: v-bind(dotsMarginTop);
}

/* each individual dot */
:deep(.es-carousel-dot) {
    list-style-type: none;
    margin-bottom: 0;

    &[data-p-highlight='true'] button {
        background-color: variables.$orange-800;
    }

    button {
        background-color: variables.$gray-100;
        border: none;
        border-radius: 50%;
        height: v-bind(dotSize);
        padding: 0;
        width: v-bind(dotSize);

        &:hover {
            opacity: 0.8;
        }
    }
}
</style>

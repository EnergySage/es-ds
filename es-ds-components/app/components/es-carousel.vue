<script setup lang="ts">
/*
    EsCarousel is built on Embla Carousel (https://www.embla-carousel.com/), replacing the
    previous PrimeVue implementation. Embla is SSR-friendly and gives us full control over
    the markup, which lets us make the component fully accessible.

    TODO (design):
     - Add a visible pause/play button when `autoPlay` is on. Today autoplay can only be
       stopped via the Esc key, which is not reachable in mobile screen readers. A visible
       control satisfies WCAG 2.2.2, but where it lives and how it looks needs a design pass.
*/

import emblaCarouselVue from 'embla-carousel-vue';
import Autoplay from 'embla-carousel-autoplay';
import type { EmblaOptionsType } from 'embla-carousel';
import sassBreakpoints from '@energysage/es-ds-styles/scss/modules/breakpoints.module.scss';
import type { EsCarouselBreakpointsInterface } from '../types';

// this isn't set in a SASS variable so we can't import it, but it's
// defined as a constant here so we can easily change it if we need to
const BASE_FONT_SIZE = 16;

// constants that contribute to dots and control sizing/spacing
const DOT_SIZE = 14;
const DOT_SPACING = 16;
const ARROW_BUTTON_PADDING = 8;

interface IProps {
    ariaLabel?: string;
    arrowSize?: 'sm' | 'lg';
    autoPlay?: boolean;
    autoPlayInterval?: number;
    breakpoints?: EsCarouselBreakpointsInterface;
    circular?: boolean;
    controlGap?: number;

    items: Array<any>;
    numScroll?: number;
    numVisible?: number;
    peekDesktop?: string;
    peekMobile?: string;
    showArrows?: boolean;
    showDots?: boolean;
    slideGap?: number;
    variant?: 'default' | 'brand';
}
const props = withDefaults(defineProps<IProps>(), {
    ariaLabel: 'Carousel',
    arrowSize: 'sm',
    autoPlay: false,
    autoPlayInterval: 4000,
    breakpoints: () => ({}),
    circular: false,
    controlGap: 24,
    numScroll: 1,
    numVisible: 1,
    peekDesktop: '',
    peekMobile: '',
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
    SM: parseSassBreakpoint(sassBreakpoints.sm!),
    MD: parseSassBreakpoint(sassBreakpoints.md!),
    LG: parseSassBreakpoint(sassBreakpoints.lg!),
    XL: parseSassBreakpoint(sassBreakpoints.xl!),
    XXL: parseSassBreakpoint(sassBreakpoints.xxl!),
};

// lower breakpoint values propagate to higher breakpoints unless overridden.
// numVisible controls the slide width via CSS (flex-basis), see the style block below.
// the base value is floored at 1 because it is used as a divisor; the per-breakpoint values below
// don't need the same treatment, since a zero there falls through to the next-lowest breakpoint.
const numVisibleXs = computed(() => Math.max(1, props.numVisible));
const numVisibleSm = computed(() => props.breakpoints?.sm?.numVisible || numVisibleXs.value);
const numVisibleMd = computed(() => props.breakpoints?.md?.numVisible || numVisibleSm.value);
const numVisibleLg = computed(() => props.breakpoints?.lg?.numVisible || numVisibleMd.value);
const numVisibleXl = computed(() => props.breakpoints?.xl?.numVisible || numVisibleLg.value);
const numVisibleXxl = computed(() => props.breakpoints?.xxl?.numVisible || numVisibleXl.value);

// lower breakpoint values propagate to higher breakpoints unless overridden.
// numScroll drives Embla's `slidesToScroll` option per breakpoint. floored at 1 for the same
// reason as numVisible above: it is a divisor when estimating the number of dots.
const numScrollXs = computed(() => Math.max(1, props.numScroll));
const numScrollSm = computed(() => props.breakpoints?.sm?.numScroll || numScrollXs.value);
const numScrollMd = computed(() => props.breakpoints?.md?.numScroll || numScrollSm.value);
const numScrollLg = computed(() => props.breakpoints?.lg?.numScroll || numScrollMd.value);
const numScrollXl = computed(() => props.breakpoints?.xl?.numScroll || numScrollLg.value);
const numScrollXxl = computed(() => props.breakpoints?.xxl?.numScroll || numScrollXl.value);

// allow customizable spacing between slides.
// this is done as side padding around each slide, which moves them in from the container edge,
// so we apply a negative margin to either side to bring the container edges back out to match
// the surrounding page content.
const sidePadding = computed(() => `${props.slideGap / 2 / BASE_FONT_SIZE}rem`);
const negativeMargin = computed(() => `-${sidePadding.value}`);

// size of dots and spacing between dots/controls
const dotSize = `${DOT_SIZE / BASE_FONT_SIZE}rem`;
const dotSpacing = `${DOT_SPACING / BASE_FONT_SIZE}rem`;
const controlsMarginTop = computed(() => `${props.controlGap / BASE_FONT_SIZE}rem`);

// arrow icon size and padding
const arrowSize = computed(() => (props.arrowSize === 'lg' ? 32 : 24));
const arrowSizePx = computed(() => `${arrowSize.value}px`);
const arrowPadding = `${ARROW_BUTTON_PADDING / BASE_FONT_SIZE}rem`;

/*
    Whether the user prefers reduced motion. Read during setup rather than on mount, because it
    gates the autoplay plugin below, which is created before the component mounts. The server can't
    know the preference, so it renders as though there is none and the client settles it on load.
*/
const prefersReducedMotion = ref(false);
if (import.meta.client) {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// build Embla's per-breakpoint slidesToScroll overrides from the resolved numScroll values.
// entries are keyed by min-width media queries, so the largest matching query wins at any width,
// which reproduces the "lower breakpoint propagates upward unless overridden" behavior.
const slidesToScrollBreakpoints = computed<EmblaOptionsType['breakpoints']>(() => ({
    [`(min-width: ${BREAKPOINTS.SM}px)`]: { slidesToScroll: numScrollSm.value },
    [`(min-width: ${BREAKPOINTS.MD}px)`]: { slidesToScroll: numScrollMd.value },
    [`(min-width: ${BREAKPOINTS.LG}px)`]: { slidesToScroll: numScrollLg.value },
    [`(min-width: ${BREAKPOINTS.XL}px)`]: { slidesToScroll: numScrollXl.value },
    [`(min-width: ${BREAKPOINTS.XXL}px)`]: { slidesToScroll: numScrollXxl.value },
}));

const emblaOptions = computed<EmblaOptionsType>(() => {
    const options: EmblaOptionsType = {
        align: 'start',
        loop: props.circular,
        slidesToScroll: numScrollXs.value,
        breakpoints: slidesToScrollBreakpoints.value,
    };
    // only set `duration` when reducing motion (instant transition); otherwise omit the key
    // entirely so Embla uses its default scroll animation. Passing `duration: undefined` would
    // override that default with undefined and collapse the tween to an instant jump.
    if (prefersReducedMotion.value) {
        options.duration = 0;
    }
    return options;
});

/*
    Autoplay runs only when it is asked for AND the user has not requested reduced motion:
    auto-advancing content is motion in its own right, so the preference should stop it entirely
    rather than merely removing the slide animation. (Manual paging stays instant via `duration`.)

    It is a plugin, added at creation time. `stopOnInteraction` is on so that dragging the slides
    stops autoplay and leaves it stopped — with it off, the plugin restarts the timer on pointer-up.
    The plugin's own stop doesn't record anything on our side though, so we listen for the same
    events (see onMounted) and route them through `stopAutoplay`, which remembers the stop and keeps
    it from being undone by a reinitialization.
*/
const autoplayEnabled = props.autoPlay && !prefersReducedMotion.value;
const autoplayPlugins = autoplayEnabled ? [Autoplay({ delay: props.autoPlayInterval, stopOnInteraction: true })] : [];

// `emblaOptions` is passed as a ref, not unwrapped: the composable then watches it and reinitializes
// the carousel itself when the options change, skipping the work when the new options are equivalent.
const [emblaRef, emblaApi] = emblaCarouselVue(emblaOptions, autoplayPlugins);

// reactive state derived from the Embla API
const scrollSnaps = ref<number[]>([]);
const selectedIndex = ref(0);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);

// remembers that the user explicitly stopped autoplay, so that it stays stopped across reinits
const autoplayStopped = ref(false);

const updateNavState = () => {
    const api = emblaApi.value;
    if (!api) return;
    selectedIndex.value = api.selectedScrollSnap();
    canScrollPrev.value = api.canScrollPrev();
    canScrollNext.value = api.canScrollNext();
};

const onSelect = () => {
    updateNavState();
    emit('update', selectedIndex.value);
};

const onReInit = () => {
    const api = emblaApi.value;
    if (!api) return;
    scrollSnaps.value = api.scrollSnapList();
    updateNavState();

    // Embla re-creates and restarts its plugins on every reInit, which it does on its own whenever
    // one of the `breakpoints` media queries changes (a phone rotating, a window resize across a
    // breakpoint). Without this, motion the user deliberately stopped would silently resume.
    if (autoplayStopped.value) {
        api.plugins()?.autoplay?.stop();
    }
};

const stopAutoplay = () => {
    autoplayStopped.value = true;
    emblaApi.value?.plugins()?.autoplay?.stop();
};

/*
    Paging the carousel yourself stops autoplay for good. Once someone has taken control, having the
    carousel keep moving under them fights whatever they were trying to look at.

    These three cover the arrows and the dots. Dragging and swiping are handled separately, by the
    `pointerDown` listener in onMounted, since those never come through here.
*/
const scrollPrev = () => {
    stopAutoplay();
    emblaApi.value?.scrollPrev();
};
const scrollNext = () => {
    stopAutoplay();
    emblaApi.value?.scrollNext();
};
const scrollTo = (index: number) => {
    stopAutoplay();
    emblaApi.value?.scrollTo(index);
};

// stop carousel when user presses Escape key, in lieu of a pause button
// https://www.w3.org/WAI/WCAG22/Techniques/general/G187.html
const onEscapeKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        stopAutoplay();
    }
};

/*
    Dots come from Embla's measured scroll-snap list, which only exists after the carousel
    initializes on the client. To keep the dots (and the arrow spacing) from popping in after
    hydration, we render an estimated dot count during SSR / before mount using the same math Embla
    uses, then reconcile with the real snap list once mounted. Per-breakpoint estimates are handed
    to CSS (see the `.before-mount` rules below) so the count is already correct at every breakpoint
    before hydration.

    That CSS can only hide surplus dots up to `$num-dots-supported` in the style block. Beyond that
    a breakpoint would briefly show the largest breakpoint's dot count until hydration corrects it.
    The limit is set well past what this component should ever show — more than a handful of dots is
    an anti-pattern — so in practice it isn't reachable.
*/
const isMounted = ref(false);

// `items` is a required prop, so it has no default. it is still read defensively here because this
// runs during setup, where a consumer that omitted it (from JS, or a dynamic component) would
// otherwise throw before Vue's "missing required prop" warning is any help.
const estimateSnaps = (visible: number, scroll: number) =>
    Math.max(1, Math.ceil(((props.items?.length ?? 0) - visible) / scroll) + 1);
const estSnapsXs = computed(() => estimateSnaps(numVisibleXs.value, numScrollXs.value));
const estSnapsSm = computed(() => estimateSnaps(numVisibleSm.value, numScrollSm.value));
const estSnapsMd = computed(() => estimateSnaps(numVisibleMd.value, numScrollMd.value));
const estSnapsLg = computed(() => estimateSnaps(numVisibleLg.value, numScrollLg.value));
const estSnapsXl = computed(() => estimateSnaps(numVisibleXl.value, numScrollXl.value));
const estSnapsXxl = computed(() => estimateSnaps(numVisibleXxl.value, numScrollXxl.value));
const maxEstimatedSnaps = computed(() =>
    Math.max(
        estSnapsXs.value,
        estSnapsSm.value,
        estSnapsMd.value,
        estSnapsLg.value,
        estSnapsXl.value,
        estSnapsXxl.value,
    ),
);

// number of dots to render: the measured snap count once mounted, otherwise the (max) estimate
const dotCount = computed(() => (isMounted.value ? scrollSnaps.value.length : maxEstimatedSnaps.value));
const dotIndices = computed(() => Array.from({ length: dotCount.value }, (_, i) => i));

// show the controls row when there's something to put in it
const showDotsRow = computed(() => props.showDots && dotCount.value > 1);
const showControls = computed(() => props.showArrows || showDotsRow.value);

/*
    The dots are a single tab stop, with the arrow keys moving between them (the roving tabindex
    approach from the ARIA APG tabs pattern). This is bound to the dots list rather than the
    carousel as a whole, so it can never intercept arrow keys meant for content inside a slide.
*/
const onDotsKeydown = (e: KeyboardEvent) => {
    let target: number;
    if (e.key === 'ArrowRight') {
        target = selectedIndex.value + 1;
    } else if (e.key === 'ArrowLeft') {
        target = selectedIndex.value - 1;
    } else if (e.key === 'Home') {
        target = 0;
    } else if (e.key === 'End') {
        target = dotCount.value - 1;
    } else {
        return;
    }

    e.preventDefault();
    // clamp rather than wrap, so the carousel doesn't jump end-to-end on a single keypress
    const index = Math.min(dotCount.value - 1, Math.max(0, target));
    scrollTo(index);
    (e.currentTarget as HTMLElement).querySelectorAll('button')[index]?.focus();
};

onMounted(() => {
    isMounted.value = true;

    const api = emblaApi.value;
    if (api) {
        onReInit();
        api.on('select', onSelect);
        api.on('reInit', onReInit);
        /*
            The autoplay plugin stops itself on these two, but doesn't tell us, so a later
            reinitialization would start it up again. Running our own handler on the same events
            records the stop and keeps it stopped. Dragging and swiping arrive as `pointerDown`;
            `slideFocusStart` is a slide receiving focus.
        */
        if (autoplayEnabled) {
            api.on('pointerDown', stopAutoplay);
            api.on('slideFocusStart', stopAutoplay);
        }
    }

    if (autoplayEnabled) {
        document.addEventListener('keyup', onEscapeKeyup);
    }
});

onBeforeUnmount(() => {
    const api = emblaApi.value;
    if (api) {
        api.off('select', onSelect);
        api.off('reInit', onReInit);
        api.off('pointerDown', stopAutoplay);
        api.off('slideFocusStart', stopAutoplay);
    }
    document.removeEventListener('keyup', onEscapeKeyup);
});
</script>

<template>
    <div
        class="es-carousel"
        :class="[
            { 'es-carousel--brand': variant === 'brand', 'before-mount': !isMounted },
            !isMounted
                ? [
                      `num-dots-${estSnapsXs}`,
                      `num-dots-sm-${estSnapsSm}`,
                      `num-dots-md-${estSnapsMd}`,
                      `num-dots-lg-${estSnapsLg}`,
                      `num-dots-xl-${estSnapsXl}`,
                      `num-dots-xxl-${estSnapsXxl}`,
                  ]
                : [],
        ]"
        role="region"
        aria-roledescription="carousel"
        :aria-label="ariaLabel">
        <div
            ref="emblaRef"
            class="es-carousel__viewport">
            <div
                class="es-carousel__container d-flex"
                :aria-live="autoPlay ? 'off' : 'polite'">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="es-carousel__slide"
                    role="group"
                    aria-roledescription="slide"
                    :aria-label="`${index + 1} of ${items.length}`">
                    <slot
                        name="item"
                        :item="item" />
                </div>
            </div>
        </div>

        <div
            v-if="showControls"
            class="es-carousel__controls d-flex align-items-center justify-content-center">
            <button
                v-if="showArrows"
                type="button"
                class="es-carousel__arrow es-carousel__arrow--prev"
                aria-label="Previous slide"
                :disabled="!canScrollPrev"
                @click="scrollPrev">
                <icon-chevron-left />
            </button>

            <ul
                v-if="showDotsRow"
                class="es-carousel__dots d-flex align-items-center"
                role="list"
                @keydown="onDotsKeydown">
                <li
                    v-for="index in dotIndices"
                    :key="index"
                    class="es-carousel__dot">
                    <button
                        type="button"
                        class="d-block"
                        :class="{ 'es-carousel__dot--active': index === selectedIndex }"
                        :tabindex="index === selectedIndex ? 0 : -1"
                        :aria-label="`Go to slide ${index + 1}`"
                        :aria-current="index === selectedIndex ? 'true' : undefined"
                        @click="scrollTo(index)" />
                </li>
            </ul>
            <span
                v-else-if="showArrows"
                class="es-carousel__arrow-spacer"
                aria-hidden="true" />

            <button
                v-if="showArrows"
                type="button"
                class="es-carousel__arrow es-carousel__arrow--next"
                aria-label="Next slide"
                :disabled="!canScrollNext"
                @click="scrollNext">
                <icon-chevron-right />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

/*
    Before hydration we render the (max) estimated number of dots and hide the surplus at each
    breakpoint, so the correct count shows at every breakpoint until Embla's measured snap list takes
    over on mount. The `num-dots{infix}-{n}` class carries each breakpoint's estimated count.
*/
/* keep in sync with the note on the dot estimate in the script block above */
$num-dots-supported: 20;
.es-carousel.before-mount {
    @each $breakpoint in map.keys(variables.$grid-breakpoints) {
        @include breakpoints.media-breakpoint-up($breakpoint) {
            $infix: breakpoints.breakpoint-infix($breakpoint, variables.$grid-breakpoints);
            @for $i from 1 through $num-dots-supported {
                &.num-dots#{$infix}-#{$i} .es-carousel__dot:nth-child(#{$i}) ~ .es-carousel__dot {
                    display: none;
                }
            }
        }
    }
}

/* the viewport clips the slides; negative margins pull its edges back out to align with page content */
.es-carousel__viewport {
    overflow: hidden;
    margin-left: v-bind(negativeMargin);
    margin-right: v-bind(negativeMargin);

    /* peek: reveal a cut-off of the next slide by padding the viewport's right edge */
    @include breakpoints.media-breakpoint-down(sm) {
        padding-right: v-bind(peekMobile);
    }

    @include breakpoints.media-breakpoint-up(lg) {
        padding-right: v-bind(peekDesktop);
    }
}

/* the flex track that Embla translates */
.es-carousel__container {
    /* allow vertical page scroll to pass through when dragging horizontally */
    touch-action: pan-y pinch-zoom;
}

/* each slide: width is driven by numVisible at each breakpoint; side padding creates the slide gap */
.es-carousel__slide {
    flex: 0 0 calc(100% / v-bind(numVisibleXs));
    min-width: 0;
    padding: 0 v-bind(sidePadding);

    @include breakpoints.media-breakpoint-up(sm) {
        flex: 0 0 calc(100% / v-bind(numVisibleSm));
    }

    @include breakpoints.media-breakpoint-up(md) {
        flex: 0 0 calc(100% / v-bind(numVisibleMd));
    }

    @include breakpoints.media-breakpoint-up(lg) {
        flex: 0 0 calc(100% / v-bind(numVisibleLg));
    }

    @include breakpoints.media-breakpoint-up(xl) {
        flex: 0 0 calc(100% / v-bind(numVisibleXl));
    }

    @include breakpoints.media-breakpoint-up(xxl) {
        flex: 0 0 calc(100% / v-bind(numVisibleXxl));
    }
}

/* controls row: prev arrow | dots | next arrow, centered below the carousel */
.es-carousel__controls {
    gap: v-bind(dotSpacing);
    margin-top: v-bind(controlsMarginTop);
}

/* keeps the arrows a sensible distance apart when there are no dots between them */
.es-carousel__arrow-spacer {
    display: inline-block;
    width: 2rem;
}

/* prev/next arrow buttons */
.es-carousel__arrow {
    background: none;
    border: none;
    box-shadow: none;
    color: variables.$gray-900;
    line-height: 0;
    padding: v-bind(arrowPadding);

    &:hover {
        color: variables.$gray-700;
    }
    &:focus-visible {
        outline: 2px solid variables.$blue-600;
        outline-offset: 2px;
    }
    &:not(:disabled):active {
        color: variables.$gray-700;
        /* keep the subtle "press" shift used elsewhere in the design system */
        transform: translateY(1px);
    }
    &:disabled {
        color: variables.$gray-400;
        cursor: default;
    }

    svg {
        /* use !important to override the inline style on svg icons */
        height: v-bind(arrowSizePx) !important;
        width: v-bind(arrowSizePx) !important;
    }
}

/* brand variant: blue arrows */
.es-carousel--brand .es-carousel__arrow {
    color: variables.$blue-600;

    &:hover {
        color: variables.$blue-700;
    }
    &:not(:disabled):active {
        color: variables.$blue-800;
    }
    &:disabled {
        color: variables.$gray-400;
    }
}

/* dots */
.es-carousel__dots {
    gap: v-bind(dotSpacing);
    list-style: none;
    margin-bottom: 0;
    padding-left: 0;
}

.es-carousel__dot {
    margin-bottom: 0;

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
        /* the arrow keys move focus between the dots, so the focused dot has to be obvious */
        &:focus-visible {
            outline: 2px solid variables.$blue-600;
            outline-offset: 2px;
        }
    }

    button.es-carousel__dot--active {
        background-color: variables.$orange-800;
    }
}
</style>

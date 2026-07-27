<script setup lang="ts">
/*
    EsCarousel is built on Embla Carousel (https://www.embla-carousel.com/), replacing the
    previous PrimeVue implementation. Embla is SSR-friendly and gives us full control over
    the markup, which lets us make the component fully accessible.

    TODO (design):
     - Add a visible pause/play button when `autoPlay` is on. Today autoplay can only be
       stopped via the Esc key, which is not reachable in mobile screen readers. A visible
       control satisfies WCAG 2.2.2, but where it lives and how it looks needs a design pass.
       Iterating on that with design is out of scope for this ticket (CEO-676).
*/

import emblaCarouselVue from 'embla-carousel-vue';
import type { EmblaOptionsType } from 'embla-carousel';
import sassBreakpoints from '@energysage/es-ds-styles/scss/modules/breakpoints.module.scss';
import type { EsCarouselBreakpointsInterface } from '../types';

// this isn't set in a SASS variable so we can't import it, but it's
// defined as a constant here so we can easily change it if we need to
const BASE_FONT_SIZE = 16;

// constants that contribute to dots and controls sizing/spacing
const DOT_SIZE = 14;
const DOT_SPACING = 16;
const ARROW_BUTTON_PADDING = 8;

interface IProps {
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
    arrowSize: 'sm',
    autoPlay: false,
    autoPlayInterval: 4000,
    breakpoints: () => ({}),
    circular: false,
    controlGap: 24,
    items: () => [],
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
const numVisibleXs = computed(() => props.numVisible);
const numVisibleSm = computed(() => props.breakpoints?.sm?.numVisible || numVisibleXs.value);
const numVisibleMd = computed(() => props.breakpoints?.md?.numVisible || numVisibleSm.value);
const numVisibleLg = computed(() => props.breakpoints?.lg?.numVisible || numVisibleMd.value);
const numVisibleXl = computed(() => props.breakpoints?.xl?.numVisible || numVisibleLg.value);
const numVisibleXxl = computed(() => props.breakpoints?.xxl?.numVisible || numVisibleXl.value);

// lower breakpoint values propagate to higher breakpoints unless overridden.
// numScroll drives Embla's `slidesToScroll` option per breakpoint.
const numScrollXs = computed(() => props.numScroll);
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

// reserve vertical space for the controls row so dots appearing after hydration don't shift layout
const controlsMinHeight = computed(() => `${Math.max(DOT_SIZE, arrowSize.value + ARROW_BUTTON_PADDING * 2)}px`);

// whether the user prefers reduced motion. detected synchronously on the client so it can gate
// autoplay creation below; when true we make transitions instant AND disable autoplay entirely.
const prefersReducedMotion = ref(false);
if (import.meta.client) {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// autoplay is only actually active when it's requested AND motion is allowed
const autoplayEnabled = computed(() => props.autoPlay && !prefersReducedMotion.value);

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
        containScroll: 'trimSnaps',
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

// autoplay is only wired up when it's actually enabled (requested + motion allowed)
const autoplayShouldRun = autoplayEnabled.value;

const [emblaRef, emblaApi] = emblaCarouselVue(emblaOptions.value);
const rootEl = ref<HTMLElement | null>(null);

// reactive state derived from the Embla API
const scrollSnaps = ref<number[]>([]);
const selectedIndex = ref(0);
const canScrollPrev = ref(false);
const canScrollNext = ref(false);

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
};

const scrollPrev = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);

/* ---- autoplay control ----------------------------------------------------

    Autoplay is managed here with a small timestamp-based scheduler rather than Embla's Autoplay
    plugin, so a temporary hover/focus pause can resume from exactly where it left off (the plugin's
    play() always restarts the full interval). All of this lives in the component, so hover/focus
    pausing works whether or not an external play/pause button is wired up.
*/

// user-facing autoplay state: `isPlaying` is the play/pause mode (stays true through a temporary
// hover/focus pause)
const isPlaying = ref(false);
// remembers an explicit stop (Esc or the play/pause button) so hover/focus don't auto-resume it
const userStopped = ref(false);
let hovered = false;
let focused = false;

// scheduler internals
let timerId: ReturnType<typeof setTimeout> | undefined;
let segmentStart = 0; // performance.now() when the current running segment began
let elapsedBeforeSegment = 0; // ms already elapsed in the current cycle, before this segment
const isCounting = () => timerId !== undefined;

const clearTimer = () => {
    if (timerId !== undefined) clearTimeout(timerId);
    timerId = undefined;
};

// advance to the next slide/page, wrapping to the start for a non-circular autoplay
const advance = () => {
    const api = emblaApi.value;
    if (!api) return;
    if (props.circular || api.canScrollNext()) {
        api.scrollNext();
    } else {
        api.scrollTo(0);
    }
};

// wait `duration` ms until the next advance, then continue at the full interval
const startCountdown = (duration: number) => {
    if (!import.meta.client) return;
    clearTimer();
    segmentStart = performance.now();
    timerId = setTimeout(() => {
        advance();
        elapsedBeforeSegment = 0;
        startCountdown(props.autoPlayInterval);
    }, duration);
};

// explicit play/pause, driven by the play/pause button or the Esc key
const play = () => {
    if (!autoplayShouldRun || isCounting()) return;
    userStopped.value = false;
    isPlaying.value = true;
    elapsedBeforeSegment = 0;
    startCountdown(props.autoPlayInterval);
};
const pause = () => {
    // stops autoplay, per WCAG 2.2.2 (https://www.w3.org/WAI/WCAG22/Techniques/general/G187.html)
    clearTimer();
    isPlaying.value = false;
    userStopped.value = true;
    elapsedBeforeSegment = 0;
};
const toggleAutoplay = () => (isPlaying.value ? pause() : play());

// temporary pause/resume for hover and focus — does NOT count as an explicit stop, so autoplay
// resumes from where it left off once the pointer leaves and focus moves out.
const pauseTemporarily = () => {
    if (!isPlaying.value || userStopped.value || !isCounting()) return;
    // bank the elapsed time in this segment so we can resume from the same point
    elapsedBeforeSegment += performance.now() - segmentStart;
    clearTimer();
};
const resumeIfIdle = () => {
    if (!isPlaying.value || userStopped.value || hovered || focused || isCounting()) return;
    const remaining = Math.max(0, props.autoPlayInterval - elapsedBeforeSegment);
    startCountdown(remaining);
};
const onMouseEnter = () => {
    hovered = true;
    pauseTemporarily();
};
const onMouseLeave = () => {
    hovered = false;
    resumeIfIdle();
};
const onFocusIn = () => {
    focused = true;
    pauseTemporarily();
};
const onFocusOut = (e: FocusEvent) => {
    // ignore focus moving between elements inside the carousel
    if (rootEl.value && e.relatedTarget instanceof Node && rootEl.value.contains(e.relatedTarget)) return;
    focused = false;
    resumeIfIdle();
};

const onRootKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
        scrollPrev();
    } else if (e.key === 'ArrowRight') {
        scrollNext();
    }
};

const onEscapeKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        pause();
    }
};

// show the controls row when there's something to put in it
const showDotsRow = computed(() => props.showDots && scrollSnaps.value.length > 1);
const showControls = computed(() => props.showArrows || showDotsRow.value);

onMounted(() => {
    const api = emblaApi.value;
    if (api) {
        onReInit();
        api.on('select', onSelect);
        api.on('reInit', onReInit);
    }

    if (autoplayShouldRun) {
        play();
        document.addEventListener('keyup', onEscapeKeyup);
    }
});

onBeforeUnmount(() => {
    const api = emblaApi.value;
    if (api) {
        api.off('select', onSelect);
        api.off('reInit', onReInit);
    }
    clearTimer();
    document.removeEventListener('keyup', onEscapeKeyup);
});

// re-initialize Embla whenever the options (numScroll, loop, reduced-motion, breakpoints) change.
// slide-width changes from numVisible are picked up automatically by Embla's ResizeObserver.
watch(emblaOptions, (options) => {
    emblaApi.value?.reInit(options);
});

// exposed so downstream repos can wire an external <es-carousel-play-pause> button, placed wherever
// their layout dictates (typically next to a section heading).
defineExpose({
    // autoplay state (reactive)
    isPlaying,
    autoplayEnabled,
    // autoplay controls
    play,
    pause,
    toggle: toggleAutoplay,
    // imperative navigation, exposed for convenience
    scrollNext,
    scrollPrev,
    scrollTo,
});
</script>

<template>
    <div
        ref="rootEl"
        class="es-carousel"
        :class="{ 'es-carousel--brand': variant === 'brand' }"
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
        @keydown="onRootKeydown"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @focusin="onFocusIn"
        @focusout="onFocusOut">
        <div
            ref="emblaRef"
            class="es-carousel__viewport">
            <div
                class="es-carousel__container d-flex"
                :aria-live="isPlaying ? 'off' : 'polite'">
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
                class="es-carousel__dots d-flex align-items-center">
                <li
                    v-for="(_snap, index) in scrollSnaps"
                    :key="index"
                    class="es-carousel__dot">
                    <button
                        type="button"
                        class="d-block"
                        :class="{ 'es-carousel__dot--active': index === selectedIndex }"
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
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

/* the viewport clips the slides; negative margins pull its edges back out to align with page content */
.es-carousel__viewport {
    overflow: hidden;
    margin-left: v-bind(negativeMargin);
    margin-right: v-bind(negativeMargin);
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

/* peek: reveal a cut-off of the next slide by padding the viewport's right edge */
.es-carousel__viewport {
    @include breakpoints.media-breakpoint-down(sm) {
        padding-right: v-bind(peekMobile);
    }

    @include breakpoints.media-breakpoint-up(lg) {
        padding-right: v-bind(peekDesktop);
    }
}

/* controls row: prev arrow | dots | next arrow, centered below the carousel */
.es-carousel__controls {
    gap: v-bind(dotSpacing);
    margin-top: v-bind(controlsMarginTop);
    min-height: v-bind(controlsMinHeight);
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
        color: variables.$gray-900;
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
    }

    button.es-carousel__dot--active {
        background-color: variables.$orange-800;
    }
}
</style>

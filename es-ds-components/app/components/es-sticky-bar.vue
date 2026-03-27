<script setup lang="ts">
// minimum scroll distance in a single direction before showing/hiding
const SCROLL_THRESHOLD = 20;

// bar states:
// - static:        initial SSR state; bar is in normal document flow
// - absolute:      after mount; bar is out of flow but scrolls away naturally with the page
// - fixed-visible: bar is pinned to the top of the viewport, visible
// - fixed-hidden:  bar is pinned but translated off screen above the viewport
type BarState = 'static' | 'absolute' | 'fixed-visible' | 'fixed-hidden';
const barState = ref<BarState>('static');

// ref to the bar element, used to read its rendered height
const bar = ref<HTMLElement | null>(null);
// suppresses the transition for silent state swaps that shouldn't animate
const suppressTransition = ref(false);
// updated on mount and whenever the bar resizes
const barHeight = ref(0);

// scroll state — all plain vars since they don't need to be reactive
let lastScrollY = 0;
let scrollAnchor = 0; // position where the current scroll direction started
let scrollDirection = 0; // positive = down, negative = up
let ticking = false; // tracks whether a rAF is already queued

// switches to fixed-hidden without triggering the CSS transition — used when the bar is already
// off screen and we need to silently reposition it before the user scrolls back up
function hideWithoutAnimation() {
    suppressTransition.value = true;
    barState.value = 'fixed-hidden';
    // re-enable transition after the next paint so future show/hide animations still work
    requestAnimationFrame(() => {
        suppressTransition.value = false;
    });
}

function updateVisibility() {
    // clamp to the valid scroll range to prevent Safari's rubber-band momentum scrolling
    // from triggering false direction changes at the top and bottom of the page
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const currentScrollY = Math.min(Math.max(window.scrollY, 0), maxScrollY);
    const delta = currentScrollY - lastScrollY;

    if (delta === 0) {
        ticking = false;
        return;
    }

    // reset the anchor whenever the scroll direction reverses
    const newDirection = delta > 0 ? 1 : -1;
    if (newDirection !== scrollDirection) {
        scrollDirection = newDirection;
        scrollAnchor = lastScrollY;
    }

    if (currentScrollY <= 0) {
        // back at the very top: switch to absolute so bar scrolls away naturally on next scroll down
        barState.value = 'absolute';
    } else if (barState.value === 'absolute' && currentScrollY >= barHeight.value) {
        // bar has scrolled fully off screen: reposition to fixed-hidden while invisible
        hideWithoutAnimation();
    } else if (
        barState.value === 'fixed-hidden' &&
        scrollDirection < 0 &&
        scrollAnchor - currentScrollY >= SCROLL_THRESHOLD
    ) {
        // scrolling up far enough: slide bar into view
        barState.value = 'fixed-visible';
    } else if (
        barState.value === 'fixed-visible' &&
        scrollDirection > 0 &&
        currentScrollY - scrollAnchor >= SCROLL_THRESHOLD
    ) {
        // scrolling down far enough: slide bar off screen
        barState.value = 'fixed-hidden';
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function onScroll() {
    // batch rapid scroll events to one update per animation frame
    if (!ticking) {
        requestAnimationFrame(updateVisibility);
        ticking = true;
    }
}

onMounted(() => {
    // measure height before switching position so the placeholder matches exactly
    barHeight.value = bar.value?.offsetHeight ?? 0;

    // switch from static to absolute — placeholder appears simultaneously to prevent layout shift
    barState.value = 'absolute';
    lastScrollY = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    // keep barHeight in sync as the bar's height changes across breakpoints
    if (bar.value) {
        const resizeObserver = new ResizeObserver(([entry]) => {
            barHeight.value = entry?.contentRect.height || 0;
        });
        resizeObserver.observe(bar.value);
        onUnmounted(() => resizeObserver.disconnect());
    }
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>

<template>
    <div
        ref="bar"
        class="es-sticky-bar bg-white"
        :class="[`es-sticky-bar--${barState}`, { 'es-sticky-bar--no-transition': suppressTransition }]">
        <slot />
    </div>
    <!-- holds the bar's space in normal flow when the bar is absolutely or fixed positioned -->
    <div
        v-if="barState !== 'static'"
        :style="{ height: `${barHeight}px` }"
        aria-hidden="true" />
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

$shadow: 0 0 6px 0 rgba(34, 38, 51, 0.2);

.es-sticky-bar {
    box-shadow: $shadow;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;

    @include breakpoints.media-breakpoint-up(lg) {
        box-shadow: none;
    }

    @media not (prefers-reduced-motion) {
        transition: box-shadow 0.2s ease-in-out;
    }

    &--absolute {
        position: absolute;
    }

    &--fixed-visible,
    &--fixed-hidden {
        box-shadow: $shadow;
        position: fixed;

        @media not (prefers-reduced-motion) {
            transition: transform 0.2s ease-in-out;
        }
    }

    // translated off screen above the viewport
    &--fixed-hidden {
        box-shadow: none;
        transform: translateY(-100%);
    }

    // suppresses animation for silent state swaps (e.g. absolute → fixed-hidden when off screen)
    &--no-transition {
        transition: none !important;
    }
}
</style>

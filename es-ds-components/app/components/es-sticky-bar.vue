<script setup lang="ts">
// minimum scroll distance in a single direction before showing/hiding
const SCROLL_THRESHOLD = 20;

// ref to the bar element, used to read its rendered height
const bar = ref<HTMLElement | null>(null);
const isBarVisible = ref(true);

// scroll state — all plain vars since they don't need to be reactive
let lastScrollY = 0;
let scrollAnchor = 0; // position where the current scroll direction started
let scrollDirection = 0; // positive = down, negative = up
let barHeight = 0; // updated on mount and whenever the bar resizes
let ticking = false; // tracks whether a rAF is already queued

function updateVisibility() {
    const currentScrollY = window.scrollY;
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

    // always show when near the top of the page
    if (currentScrollY <= barHeight) {
        isBarVisible.value = true;
    } else if (scrollDirection > 0 && currentScrollY - scrollAnchor >= SCROLL_THRESHOLD) {
        // hide after scrolling down far enough from the last direction change
        isBarVisible.value = false;
    } else if (scrollDirection < 0 && scrollAnchor - currentScrollY >= SCROLL_THRESHOLD) {
        // show after scrolling up far enough from the last direction change
        isBarVisible.value = true;
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
    barHeight = bar.value?.offsetHeight ?? 0;
    lastScrollY = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });

    // keep barHeight in sync as the bar's height changes across breakpoints
    if (bar.value) {
        const resizeObserver = new ResizeObserver(([entry]) => {
            barHeight = entry?.contentRect.height || 0;
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
        class="es-sticky-bar bg-white position-fixed"
        :class="{
            'hidden': !isBarVisible
        }">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-sticky-bar {
    box-shadow: 0 1px 6px 0 rgba(34, 38, 51, 0.25);
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;

    @media not (prefers-reduced-motion) {
        transition: variables.$transition-base;
    }

    &.hidden {
        transform: translateY(-100%);
    }
}
</style>

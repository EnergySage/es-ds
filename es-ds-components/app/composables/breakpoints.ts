import type { Ref } from 'vue';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import sassBreakpoints from '@energysage/es-ds-styles/scss/modules/breakpoints.module.scss';

interface Breakpoints {
    [key: string]: string;
}

const BREAKPOINTS: Breakpoints = {
    xs: sassBreakpoints.xs!,
    sm: sassBreakpoints.sm!,
    md: sassBreakpoints.md!,
    lg: sassBreakpoints.lg!,
    xl: sassBreakpoints.xl!,
    xxl: sassBreakpoints.xxl!,
};

/**
 * This composable provides reactive properties for each breakpoint, as well as device categories.
 * It should only be used for functional purposes, and not for styling or layout.
 * Meaning, don't use it to show/hide elements, or to change the layout of elements.
 */
export function useBreakpointChecks() {
    const breakpointMediaQueries: { [key in keyof Breakpoints]?: MediaQueryList } = {};
    const breakpointChangeListeners: { [key: string]: () => void } = {};
    const breakpointMatches: { [key: string]: Ref<boolean> } = {};

    if (import.meta.client) {
        // Set up media queries, reactive references and event listeners for each breakpoint
        Object.entries(BREAKPOINTS).forEach(([key, value]) => {
            const mediaQueryList = window.matchMedia(`(min-width: ${value})`) as MediaQueryList;
            breakpointMediaQueries[key] = mediaQueryList;
            breakpointMatches[key] = ref<boolean>(mediaQueryList?.matches || false);
            breakpointChangeListeners[key] = () => {
                breakpointMatches[key]!.value = mediaQueryList?.matches || false;
            };
        });
    }

    // On component mount, add change event listeners for each breakpoint
    onMounted(() => {
        Object.keys(breakpointMatches).forEach((key) => {
            breakpointMediaQueries[key]?.addEventListener('change', breakpointChangeListeners[key]!);
        });
    });

    // On component unmount, remove the event listeners
    onUnmounted(() => {
        Object.keys(breakpointMatches).forEach((key) => {
            breakpointMediaQueries[key]?.removeEventListener('change', breakpointChangeListeners[key]!);
        });
    });

    // Individual breakpoint computed properties
    const isXS = computed(() => breakpointMatches.xs?.value || false);
    const isSM = computed(() => breakpointMatches.sm?.value || false);
    const isMD = computed(() => breakpointMatches.md?.value || false);
    const isLG = computed(() => breakpointMatches.lg?.value || false);
    const isXL = computed(() => breakpointMatches.xl?.value || false);
    const isXXL = computed(() => breakpointMatches.xxl?.value || false);

    // Compute values for device categories
    const isDesktop = computed(() => breakpointMatches.lg?.value || false);
    const isTablet = computed(() => (breakpointMatches.md?.value && !breakpointMatches.lg?.value) || false);
    const isMobile = computed(
        () =>
            ((breakpointMatches.xs?.value || breakpointMatches.sm?.value) &&
                !breakpointMatches.lg?.value &&
                !breakpointMatches.md?.value) ||
            false,
    );

    // TODO: Be nice to namespace this but it ends up being a cyclic dependency somehow
    return { isXS, isSM, isMD, isLG, isXL, isXXL, isDesktop, isTablet, isMobile };
}

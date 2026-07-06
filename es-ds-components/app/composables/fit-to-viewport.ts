import type { Ref } from 'vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

/**
 * Measure-then-trim: render up to `cap` suggestions, then trim the list to only the
 * items that fully fit within the container, so the list never scrolls and never
 * clips an item mid-row. Items may wrap to multiple lines, so heights are measured,
 * not assumed.
 *
 * The container must be `position: relative` with `overflow: hidden` — item fit is
 * computed from `offsetTop`, which must be relative to the container. The height
 * limit is read from the container's resolved max-height (the desktop popover) or
 * its explicit height (the mobile takeover list); both are stable while items
 * render, so measuring is idempotent and needs no re-entrancy guards.
 *
 * Re-measures on suggestion changes and window resizes; callers whose container
 * height changes by other means (e.g. the mobile visualViewport keyboard handling)
 * call the returned `remeasure` themselves.
 */
export function useFitToViewport(
    contentEl: Ref<HTMLElement | null>,
    suggestions: Ref<EsAutocompleteSuggestion[]>,
    cap: number,
) {
    const visibleCount = ref(cap);
    const measured = ref(false);

    function heightLimit(element: HTMLElement): number {
        const maxHeight = Number.parseFloat(getComputedStyle(element).maxHeight);
        return Number.isFinite(maxHeight) ? maxHeight : element.clientHeight;
    }

    async function remeasure() {
        visibleCount.value = cap;
        await nextTick();
        const element = contentEl.value;
        if (!element) {
            measured.value = false;
            return;
        }
        const limit = heightLimit(element);
        let fits = 0;
        for (const child of Array.from(element.children) as HTMLElement[]) {
            // stop at the first child that does not fully fit
            if (child.offsetTop + child.offsetHeight > limit) {
                break;
            }
            if ('esAutocompleteItem' in child.dataset) {
                fits += 1;
            }
        }
        visibleCount.value = Math.max(fits, 1);
        measured.value = true;
    }

    watch(contentEl, (element) => {
        if (element) {
            remeasure();
        } else {
            measured.value = false;
        }
    });

    watch(
        suggestions,
        () => {
            if (contentEl.value) {
                remeasure();
            }
        },
        // depth 1 so apps that mutate the array in place (push/splice) are seen too
        { deep: 1 },
    );

    // available height tracks the viewport; re-measure when it changes, deferred a
    // frame so the popper's own resize handling updates the max-height constraint
    // first (also coalesces resize-event bursts to one measure per frame)
    let resizeFrame: number | null = null;
    function onWindowResize() {
        if (!contentEl.value) {
            return;
        }
        if (resizeFrame !== null) {
            cancelAnimationFrame(resizeFrame);
        }
        resizeFrame = requestAnimationFrame(() => {
            resizeFrame = null;
            remeasure();
        });
    }

    onMounted(() => {
        window.addEventListener('resize', onWindowResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onWindowResize);
        if (resizeFrame !== null) {
            cancelAnimationFrame(resizeFrame);
        }
    });

    const visibleSuggestions = computed(() => suggestions.value.slice(0, visibleCount.value));

    return { measured, remeasure, visibleSuggestions };
}

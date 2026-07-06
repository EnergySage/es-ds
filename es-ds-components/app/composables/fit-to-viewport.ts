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
 * computed from `offsetTop`, which must be relative to the container.
 */
export function useFitToViewport(
    contentEl: Ref<HTMLElement | null>,
    suggestions: Ref<EsAutocompleteSuggestion[]>,
    cap: number,
) {
    const visibleCount = ref(cap);
    const measured = ref(false);

    let resizeObserver: ResizeObserver | null = null;
    // trimming itself changes the container height, which re-fires the ResizeObserver;
    // these guards keep that feedback from becoming an endless measure loop
    let settledHeight = -1;
    let measuring = false;
    let pending = false;

    async function runMeasure() {
        visibleCount.value = cap;
        await nextTick();
        const el = contentEl.value;
        if (!el) {
            measured.value = false;
            return;
        }
        const limit = el.clientHeight;
        let fits = 0;
        for (const child of Array.from(el.children) as HTMLElement[]) {
            // stop at the first child (item or separator) that does not fully fit
            if (child.offsetTop + child.offsetHeight > limit) {
                break;
            }
            if ('esAutocompleteItem' in child.dataset) {
                fits += 1;
            }
        }
        visibleCount.value = Math.max(fits, 1);
        await nextTick();
        settledHeight = contentEl.value?.clientHeight ?? -1;
        measured.value = true;
    }

    async function remeasure() {
        if (measuring) {
            pending = true;
            return;
        }
        measuring = true;
        do {
            pending = false;
            await runMeasure();
        } while (pending);
        measuring = false;
    }

    watch(contentEl, (el) => {
        resizeObserver?.disconnect();
        resizeObserver = null;
        if (el) {
            if (typeof ResizeObserver !== 'undefined') {
                resizeObserver = new ResizeObserver(() => {
                    if (!measuring && contentEl.value && contentEl.value.clientHeight !== settledHeight) {
                        remeasure();
                    }
                });
                resizeObserver.observe(el);
            }
            remeasure();
        } else {
            measured.value = false;
        }
    });

    watch(suggestions, () => {
        if (contentEl.value) {
            remeasure();
        }
    });

    // the ResizeObserver watches the container, whose height the trim itself
    // controls — so when the available height GROWS, a trimmed container never
    // resizes and the observer stays silent. Window resizes re-measure directly
    // so the list can grow back after the viewport gets taller.
    let resizeFrame: number | null = null;
    function onWindowResize() {
        if (!contentEl.value) {
            return;
        }
        if (resizeFrame !== null) {
            cancelAnimationFrame(resizeFrame);
        }
        // wait a frame so the popper's own resize handling has updated the
        // available-height constraint before we measure against it (also
        // coalesces resize-event bursts to one measure per frame)
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
        resizeObserver?.disconnect();
        resizeObserver = null;
    });

    const visibleSuggestions = computed(() => suggestions.value.slice(0, visibleCount.value));

    return { measured, remeasure, visibleSuggestions };
}

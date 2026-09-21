import type { Ref } from 'vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// Baymard: keep the list manageable — at most this many suggestions, further
// reduced by the fit-to-viewport trim. Shared by both shells.
export const MAX_VISIBLE_SUGGESTIONS = 5;

/**
 * Fit-to-viewport trimming: suggestions render as uniform-height rows (the
 * es-autocomplete-item min-height plus padding from its own content; rows have no
 * margins), so the number that fits is the available height divided by one
 * rendered row's height. Whole rows are added or removed as the available height
 * changes — the list never scrolls, and a row is never partially shown.
 *
 * The height limit is read from the container's resolved max-height (the desktop
 * panel, whose positioning sets it from the space around the field) or its
 * explicit height (the mobile takeover list). Re-computes on suggestion changes,
 * window resizes, and scrolls (the panel is anchored to the field, so scrolling
 * shrinks or grows its available height); callers whose container height changes
 * by other means (e.g. the mobile visualViewport keyboard handling) call the
 * returned `remeasure` themselves. `beforeMeasure` runs at the start of every
 * measure pass, so a caller that positions the container (choosing the side and
 * writing the max-height) does it from the same numbers the row count uses.
 * `active` gates the viewport-event remeasures: a shell whose container stays
 * mounted while closed would otherwise re-measure on every page scroll.
 */
export function useFitToViewport(
    contentEl: Ref<HTMLElement | null>,
    suggestions: Ref<EsAutocompleteSuggestion[]>,
    cap: number,
    options: { active?: () => boolean; beforeMeasure?: () => void } = {},
) {
    const visibleCount = ref(cap);
    const measured = ref(false);

    function heightLimit(element: HTMLElement): number {
        const maxHeight = Number.parseFloat(getComputedStyle(element).maxHeight);
        if (Number.isFinite(maxHeight)) {
            // max-height is border-box; the rows fit inside the border
            return maxHeight - Math.max(element.offsetHeight - element.clientHeight, 0);
        }
        return element.clientHeight;
    }

    async function remeasure() {
        // let any pending render flush so the measured row reflects current content
        await nextTick();
        const element = contentEl.value;
        if (!element) {
            measured.value = false;
            return;
        }
        options.beforeMeasure?.();
        // visibleCount never drops below 1, so whenever there are suggestions a
        // row is rendered to measure; without one (a message-only panel showing
        // the prompt or no-results text) there is nothing to trim
        const row = element.querySelector<HTMLElement>('[data-es-autocomplete-item]');
        if (row) {
            const fits = Math.floor(heightLimit(element) / row.offsetHeight);
            visibleCount.value = Math.min(Math.max(fits, 1), cap);
        } else {
            visibleCount.value = cap;
        }
        measured.value = true;
    }

    // deferred a frame to coalesce event bursts to one measure per frame
    let measureFrame: number | null = null;
    function scheduleRemeasure() {
        if (measureFrame !== null) {
            cancelAnimationFrame(measureFrame);
        }
        measureFrame = requestAnimationFrame(() => {
            measureFrame = null;
            remeasure();
        });
    }

    watch(contentEl, (element) => {
        if (element) {
            scheduleRemeasure();
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

    // available height tracks the viewport; re-measure when it changes
    function onViewportChange() {
        if (!contentEl.value || options.active?.() === false) {
            return;
        }
        scheduleRemeasure();
    }

    onMounted(() => {
        window.addEventListener('resize', onViewportChange);
        // capture because scroll events do not bubble: this hears scrolls of any
        // scrollable ancestor, not just the document
        window.addEventListener('scroll', onViewportChange, { capture: true, passive: true });
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onViewportChange);
        window.removeEventListener('scroll', onViewportChange, { capture: true });
        if (measureFrame !== null) {
            cancelAnimationFrame(measureFrame);
        }
    });

    const visibleSuggestions = computed(() => suggestions.value.slice(0, visibleCount.value));

    return { measured, remeasure, visibleSuggestions };
}

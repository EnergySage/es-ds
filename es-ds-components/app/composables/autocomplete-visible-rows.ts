import type { Ref } from 'vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// Baymard: keep the list manageable — at most this many suggestions, further
// reduced by the row trim. shared by both shells.
// https://baymard.com/research-articles/autocomplete-design
export const MAX_VISIBLE_SUGGESTIONS = 5;

/**
 * how many suggestion rows fit the space the shell gives them: rows are uniform
 * height, so the count is the available height over one rendered row's, and
 * whole rows come and go as that height changes — never a scrollbar or half row.
 *
 * the limit comes from the container's max-height or explicit height, re-read on
 * suggestion changes, resizes and scrolls; anything else calls `remeasure`.
 * `beforeMeasure` runs first, so a caller positioning the container works from
 * the same numbers, and `active` gates remeasures while a shell is closed.
 */
export function useAutocompleteVisibleRows(
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
        // visibleCount never drops below 1, so a row is always rendered to measure
        // whenever there are suggestions; a message-only panel has none to trim
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

// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import type { App } from 'vue';
import { createApp, nextTick, ref } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';
import { useFitToViewport } from './fit-to-viewport';

// NOTE: happy-dom has no real layout, so element geometry (offsetHeight,
// clientHeight) is mocked per element. These tests cover the counting/limit
// LOGIC — whole rows per available height, the min-1 floor, and which height
// constraint wins. Whether real browser layout produces that geometry is
// covered by the planned Playwright specs (plan §8a).

const apps: App[] = [];
afterEach(() => {
    apps.forEach((app) => app.unmount());
    apps.length = 0;
    document.body.innerHTML = '';
});

/** run a composable inside a real component so lifecycle hooks work */
function withSetup<T>(composable: () => T): T {
    let result!: T;
    const app = createApp({
        setup() {
            result = composable();
            return () => null;
        },
    });
    app.mount(document.createElement('div'));
    apps.push(app);
    return result;
}

function suggestionList(count: number): EsAutocompleteSuggestion[] {
    return Array.from({ length: count }, (_, index) => ({ id: `s${index}`, text: `suggestion ${index}` }));
}

function makeContainer(
    rows: { count: number; height: number },
    size: { clientHeight?: number; maxHeight?: number },
    extras: { messageOnly?: boolean } = {},
) {
    const container = document.createElement('div');
    // happy-dom only resolves computed styles (the max-height limit) for
    // elements attached to the document
    document.body.append(container);
    if (size.maxHeight !== undefined) {
        container.style.maxHeight = `${size.maxHeight}px`;
    }
    Object.defineProperty(container, 'clientHeight', {
        configurable: true,
        get: () => size.clientHeight ?? 0,
    });
    if (extras.messageOnly) {
        container.append(document.createElement('div'));
        return container;
    }
    // rows share one uniform height, matching the es-autocomplete-item styles
    for (let index = 0; index < rows.count; index += 1) {
        const el = document.createElement('div');
        el.dataset.esAutocompleteItem = '';
        Object.defineProperty(el, 'offsetHeight', { configurable: true, value: rows.height });
        container.append(el);
    }
    return container;
}

describe('useFitToViewport', () => {
    it('renders the number of whole rows that fit the height limit', async () => {
        const contentEl = ref<HTMLElement | null>(makeContainer({ count: 7, height: 30 }, { maxHeight: 100 }));
        const suggestions = ref(suggestionList(7));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        // floor(100 / 30) = 3 whole rows; the fourth would be partially shown
        expect(fit.visibleSuggestions.value).toHaveLength(3);
        expect(fit.measured.value).toBe(true);
    });

    it('never trims below one row, even when none fully fits', async () => {
        const contentEl = ref<HTMLElement | null>(makeContainer({ count: 1, height: 200 }, { maxHeight: 100 }));
        const suggestions = ref(suggestionList(5));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(1);
    });

    it('a message-only panel (prompt/no-results, no rows) is measured and untrimmed', async () => {
        const contentEl = ref<HTMLElement | null>(
            makeContainer({ count: 0, height: 0 }, { maxHeight: 100 }, { messageOnly: true }),
        );
        const suggestions = ref<EsAutocompleteSuggestion[]>([]);
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.measured.value).toBe(true);
    });

    it('prefers the resolved max-height over the content-sized clientHeight', async () => {
        // clientHeight is content-limited (40) but max-height allows 100: the count
        // must come from what COULD fit, or a grown viewport never refills
        const contentEl = ref<HTMLElement | null>(
            makeContainer({ count: 5, height: 30 }, { clientHeight: 40, maxHeight: 100 }),
        );
        const suggestions = ref(suggestionList(5));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(3);
    });

    it('falls back to clientHeight when there is no max-height (the mobile takeover list)', async () => {
        const contentEl = ref<HTMLElement | null>(makeContainer({ count: 5, height: 30 }, { clientHeight: 70 }));
        const suggestions = ref(suggestionList(5));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(2);
    });

    it('re-measures when the suggestions change', async () => {
        const container = makeContainer({ count: 7, height: 30 }, { maxHeight: 100 });
        const contentEl = ref<HTMLElement | null>(container);
        const suggestions = ref(suggestionList(7));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(3);

        container.style.maxHeight = '70px';
        suggestions.value = suggestionList(7);
        await nextTick(); // the watcher fires
        await nextTick(); // remeasure's internal tick
        expect(fit.visibleSuggestions.value).toHaveLength(2);
    });

    it('adds and removes whole rows on scroll as the available height changes', async () => {
        const container = makeContainer({ count: 2, height: 30 }, { maxHeight: 70 });
        const contentEl = ref<HTMLElement | null>(container);
        const suggestions = ref(suggestionList(7));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(2);

        // scrolling moved the anchor and the popper granted more height: the
        // count grows from the row height alone, without extra rows pre-rendered
        container.style.maxHeight = '130px';
        window.dispatchEvent(new Event('scroll'));
        await new Promise((resolve) => requestAnimationFrame(resolve)); // the handler's deferred frame
        await nextTick(); // remeasure's internal tick
        await nextTick();
        expect(fit.visibleSuggestions.value).toHaveLength(4);
    });

    it('beforeMeasure runs in the same pass, so a limit it writes drives that count', async () => {
        const container = makeContainer({ count: 7, height: 30 }, {});
        const contentEl = ref<HTMLElement | null>(container);
        const suggestions = ref(suggestionList(7));
        // the caller positions the container and writes its max-height (the
        // desktop shell's positionPanel) right before each measurement
        const fit = withSetup(() =>
            useFitToViewport(contentEl, suggestions, 10, {
                beforeMeasure: () => {
                    container.style.maxHeight = '70px';
                },
            }),
        );
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(2);
    });

    it('is unmeasured (list hidden) until a container exists', async () => {
        const contentEl = ref<HTMLElement | null>(null);
        const suggestions = ref(suggestionList(3));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        expect(fit.measured.value).toBe(false);

        contentEl.value = makeContainer({ count: 3, height: 30 }, { maxHeight: 100 });
        await nextTick(); // the watcher fires
        await new Promise((resolve) => requestAnimationFrame(resolve)); // the measure's deferred frame
        await nextTick(); // remeasure's internal tick
        expect(fit.measured.value).toBe(true);
        expect(fit.visibleSuggestions.value).toHaveLength(3);
    });
});

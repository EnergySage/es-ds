// @vitest-environment happy-dom
import { afterEach, describe, expect, it } from 'vitest';
import type { App } from 'vue';
import { createApp, nextTick, ref } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';
import { useFitToViewport } from './fit-to-viewport';

// NOTE: happy-dom has no real layout, so element geometry (offsetTop,
// offsetHeight, clientHeight) is mocked per element. These tests cover the
// counting/limit LOGIC — which items fit, what counts as an item, the min-1
// floor, and which height constraint wins. Whether real browser layout produces
// that geometry is covered by the planned Playwright specs (plan §8a).

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

interface FakeChild {
    height: number;
    isItem?: boolean;
    top: number;
}

function makeContainer(children: FakeChild[], size: { clientHeight?: number; maxHeight?: number }) {
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
    for (const child of children) {
        const el = document.createElement('div');
        if (child.isItem ?? true) {
            el.dataset.esAutocompleteItem = '';
        }
        Object.defineProperty(el, 'offsetTop', { configurable: true, value: child.top });
        Object.defineProperty(el, 'offsetHeight', { configurable: true, value: child.height });
        container.append(el);
    }
    return container;
}

/** 30px rows stacked from the top */
function rows(count: number): FakeChild[] {
    return Array.from({ length: count }, (_, index) => ({ height: 30, top: index * 30 }));
}

describe('useFitToViewport', () => {
    it('trims to only the items that fully fit the height limit', async () => {
        const contentEl = ref<HTMLElement | null>(makeContainer(rows(7), { maxHeight: 100 }));
        const suggestions = ref(suggestionList(7));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        // rows at 0, 30, 60 fit within 100; the row ending at 120 does not
        expect(fit.visibleSuggestions.value).toHaveLength(3);
        expect(fit.measured.value).toBe(true);
    });

    it('never trims below one item, even when nothing fully fits', async () => {
        const contentEl = ref<HTMLElement | null>(makeContainer([{ height: 200, top: 0 }], { maxHeight: 100 }));
        const suggestions = ref(suggestionList(5));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(1);
    });

    it('non-item children consume space but are not counted, and stop the walk when they overflow', async () => {
        const children: FakeChild[] = [
            { height: 30, top: 0 },
            { height: 10, isItem: false, top: 30 }, // e.g. the no-results/message div
            { height: 30, top: 40 },
            { height: 40, top: 70 }, // ends at 110 — does not fit
        ];
        const contentEl = ref<HTMLElement | null>(makeContainer(children, { maxHeight: 100 }));
        const suggestions = ref(suggestionList(3));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(2);
    });

    it('prefers the resolved max-height over the content-sized clientHeight', async () => {
        // clientHeight is content-limited (40) but max-height allows 100: the trim
        // must measure against what COULD fit, or a grown viewport never refills
        const contentEl = ref<HTMLElement | null>(makeContainer(rows(5), { clientHeight: 40, maxHeight: 100 }));
        const suggestions = ref(suggestionList(5));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(3);
    });

    it('falls back to clientHeight when there is no max-height (the mobile takeover list)', async () => {
        const contentEl = ref<HTMLElement | null>(makeContainer(rows(5), { clientHeight: 70 }));
        const suggestions = ref(suggestionList(5));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        await fit.remeasure();
        expect(fit.visibleSuggestions.value).toHaveLength(2);
    });

    it('re-measures when the suggestions change', async () => {
        const container = makeContainer(rows(7), { maxHeight: 100 });
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

    it('is unmeasured (list hidden) until a container exists', async () => {
        const contentEl = ref<HTMLElement | null>(null);
        const suggestions = ref(suggestionList(3));
        const fit = withSetup(() => useFitToViewport(contentEl, suggestions, 10));
        expect(fit.measured.value).toBe(false);

        contentEl.value = makeContainer(rows(3), { maxHeight: 100 });
        await nextTick(); // the watcher fires
        await nextTick(); // remeasure's internal tick
        expect(fit.measured.value).toBe(true);
        expect(fit.visibleSuggestions.value).toHaveLength(3);
    });
});

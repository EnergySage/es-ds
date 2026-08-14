// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { App } from 'vue';
import { createApp, nextTick, ref } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';
import { useAutocompleteSearch } from './autocomplete-search';

const DELAY = 300;

const apps: App[] = [];
beforeEach(() => {
    vi.useFakeTimers();
});
afterEach(() => {
    apps.forEach((app) => app.unmount());
    apps.length = 0;
    vi.useRealTimers();
});

/** run a composable inside a real component so lifecycle hooks work */
function withSetup<T>(composable: () => T): { app: App; result: T } {
    let result!: T;
    const app = createApp({
        setup() {
            result = composable();
            return () => null;
        },
    });
    app.mount(document.createElement('div'));
    apps.push(app);
    return { app, result };
}

function makeSearch(overrides: { minChars?: number } = {}) {
    const model = ref('');
    const suggestions = ref<EsAutocompleteSuggestion[]>([]);
    const emitComplete = vi.fn();
    const emitSelect = vi.fn();
    const emitSubmit = vi.fn();
    const { app, result: search } = withSetup(() =>
        useAutocompleteSearch({
            delay: () => DELAY,
            emitComplete,
            emitSelect,
            emitSubmit,
            minChars: () => overrides.minChars ?? 1,
            model,
            noResultsText: () => 'No results found',
            promptText: () => 'Type for suggestions',
            suggestions: () => suggestions.value,
        }),
    );
    /** type a value and let the model watcher run */
    async function type(value: string) {
        model.value = value;
        await nextTick();
    }
    return { app, emitComplete, emitSelect, emitSubmit, model, search, suggestions, type };
}

describe('useAutocompleteSearch complete debouncing', () => {
    it('emits complete once per typing pause, with the trimmed query', async () => {
        const { emitComplete, type } = makeSearch();
        await type('s');
        vi.advanceTimersByTime(DELAY - 50);
        await type('so');
        await type(' solar ');
        vi.advanceTimersByTime(DELAY);
        expect(emitComplete).toHaveBeenCalledTimes(1);
        expect(emitComplete).toHaveBeenCalledWith('solar');
    });

    it('does not emit below minChars', async () => {
        const { emitComplete, type } = makeSearch({ minChars: 3 });
        await type('so');
        vi.advanceTimersByTime(DELAY * 2);
        expect(emitComplete).not.toHaveBeenCalled();
    });

    it('does not re-fetch when selection copies the suggestion text into the input', async () => {
        const { emitComplete, search, type } = makeSearch();
        // selection is terminal: Reka sets the model to the chosen text afterward
        search.onSelect({ id: 'a', text: 'solar batteries' });
        await type('solar batteries');
        vi.advanceTimersByTime(DELAY * 2);
        expect(emitComplete).not.toHaveBeenCalled();

        // ...but the suppression is one-shot: typing again fetches normally
        await type('solar batteries plus');
        vi.advanceTimersByTime(DELAY);
        expect(emitComplete).toHaveBeenCalledWith('solar batteries plus');
    });

    it('submit cancels a pending complete so a late response cannot arrive after', async () => {
        const { emitComplete, emitSubmit, search, type } = makeSearch();
        await type('solar');
        search.onSubmit('solar');
        vi.advanceTimersByTime(DELAY * 2);
        expect(emitSubmit).toHaveBeenCalledWith('solar');
        expect(emitComplete).not.toHaveBeenCalled();
    });

    it('unmount cancels a pending complete', async () => {
        const { app, emitComplete, type } = makeSearch();
        await type('solar');
        app.unmount();
        vi.advanceTimersByTime(DELAY * 2);
        expect(emitComplete).not.toHaveBeenCalled();
    });
});

describe('useAutocompleteSearch panel message and suggestion gating', () => {
    it('walks prompt → results → no-results → prompt-while-pending correctly', async () => {
        const { search, suggestions, type } = makeSearch();
        // nothing searched yet
        expect(search.panelMessage.value).toBe('Type for suggestions');

        // results arrive: no message
        await type('solar');
        suggestions.value = [{ id: 'a', text: 'solar batteries' }];
        await nextTick();
        expect(search.panelMessage.value).toBe('');

        // a search came back empty: no-results
        await type('solarx');
        suggestions.value = [];
        await nextTick();
        expect(search.panelMessage.value).toBe('No results found');

        // the query changed again, so a new search is pending: prompt, not the
        // previous query's stale no-results
        await type('solarxy');
        expect(search.panelMessage.value).toBe('Type for suggestions');
    });

    it('gates suggestions below minChars with a referentially stable empty list', async () => {
        const { search, suggestions, type } = makeSearch({ minChars: 3 });
        suggestions.value = [{ id: 'a', text: 'solar batteries' }];
        await type('so');
        const first = search.effectiveSuggestions.value;
        expect(first).toHaveLength(0);
        await type('s');
        // same reference: downstream watchers must not re-fire per keystroke
        expect(search.effectiveSuggestions.value).toBe(first);

        await type('sol');
        expect(search.effectiveSuggestions.value).toHaveLength(1);
    });
});

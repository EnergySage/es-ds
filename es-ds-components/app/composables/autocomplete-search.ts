import type { Ref } from 'vue';
import { computed, onUnmounted, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteSearchOptions {
    delay: () => number;
    emitComplete: (query: string) => void;
    emitSelect: (suggestion: EsAutocompleteSuggestion) => void;
    emitSubmit: (query: string) => void;
    minChars: () => number;
    model: Ref<string>;
    noResultsText: () => string;
    promptText: () => string;
    suggestions: () => EsAutocompleteSuggestion[];
}

// the shared constant keeps effectiveSuggestions referentially stable across
// keystrokes below minChars, so downstream watchers don't re-fire for an
// unchanged empty list
const EMPTY_SUGGESTIONS: EsAutocompleteSuggestion[] = [];

/**
 * The search state behind es-autocomplete.vue: the debounced 'complete' contract
 * (one emission per typing pause, suppressed after selection, cancelled by every
 * terminal path so a late-arriving response can never reopen the panel), the
 * minChars gate, and the prompt/no-results empty-state messaging. Extracted from
 * the component so this contract is unit-testable without a component mount.
 */
export function useAutocompleteSearch(options: AutocompleteSearchOptions) {
    const { model } = options;

    // pass an empty list below minChars so no suggestions show for too-short queries
    const effectiveSuggestions = computed(() => {
        if (model.value.trim().length < options.minChars()) {
            return EMPTY_SUGGESTIONS;
        }
        return options.suggestions();
    });

    // one cancellable handle for the debounced 'complete': every terminal path
    // (selection, submit, short query, unmount) cancels through the same place
    let searchTimeout: ReturnType<typeof setTimeout> | null = null;
    function cancelPendingComplete() {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null;
        }
    }
    function scheduleComplete(query: string) {
        cancelPendingComplete();
        searchTimeout = setTimeout(() => {
            options.emitComplete(query);
        }, options.delay());
    }

    let lastSelectedText: string | null = null;

    // whether the app's most recent suggestions update was empty — this is what
    // distinguishes "search found nothing" (show noResultsText) from "no search
    // has answered yet" (show promptText)
    const noResults = ref(false);
    watch(
        options.suggestions,
        (list) => {
            noResults.value = list.length === 0;
        },
        // depth 1 so apps that mutate the array in place (push/splice) are seen too
        { deep: 1 },
    );

    // what an open panel shows when there are no suggestions to render: the
    // no-results message once a search has actually come back empty, otherwise
    // the prompt (nothing searched yet, or the query is below minChars)
    const queryLongEnough = computed(() => model.value.trim().length >= options.minChars());
    const panelMessage = computed(() => {
        if (effectiveSuggestions.value.length) {
            return '';
        }
        return noResults.value && queryLongEnough.value ? options.noResultsText() : options.promptText();
    });

    watch(model, (newValue) => {
        cancelPendingComplete();
        // selecting a suggestion copies its text into the input; that change is
        // terminal and must not trigger another fetch
        if (lastSelectedText !== null && newValue === lastSelectedText) {
            lastSelectedText = null;
            return;
        }
        lastSelectedText = null;
        const query = newValue.trim();
        if (query.length < options.minChars()) {
            // a fresh (or cleared) query starts from the prompt state, not a stale
            // "no results" from the previous query
            noResults.value = false;
            return;
        }
        // the edited query's search is now pending: show promptText, not the
        // previous query's "no results", until the app answers via the
        // suggestions prop
        noResults.value = false;
        scheduleComplete(query);
    });

    onUnmounted(cancelPendingComplete);

    function onSelect(suggestion: EsAutocompleteSuggestion) {
        lastSelectedText = suggestion.text;
        options.emitSelect(suggestion);
    }

    function onSubmit(query: string) {
        // submitting is terminal for this query
        cancelPendingComplete();
        options.emitSubmit(query);
    }

    return { effectiveSuggestions, onSelect, onSubmit, panelMessage };
}

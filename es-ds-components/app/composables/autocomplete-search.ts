import type { Ref } from 'vue';
import { computed, onUnmounted, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteSearchOptions {
    delay: () => number;
    emitComplete: (query: string) => void;
    emitSelect: (suggestion: EsAutocompleteSuggestion) => void;
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
 * the search state behind es-autocomplete.vue: the debounced 'complete' contract,
 * the minChars gate, the staleness of the app's list after a selection, and the
 * empty-state messaging. here so it is unit-testable without a mount.
 */
export function useEsAutocompleteSearch(options: AutocompleteSearchOptions) {
    const { model } = options;

    // a selection makes the app's list stale: it matched the typed query, not the
    // text just filled in, and no 'complete' fires to refresh it. hold it back —
    // a refocused panel shows promptText — until the app answers the next edit.
    const suggestionsStale = ref(false);

    // pass an empty list below minChars so no suggestions show for too-short queries
    const effectiveSuggestions = computed(() => {
        if (suggestionsStale.value || model.value.trim().length < options.minChars()) {
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

    // whether the app's last update was empty, which tells "search found nothing"
    // (noResultsText) from "nothing has answered yet" (promptText)
    const noResults = ref(false);
    watch(
        options.suggestions,
        (list) => {
            noResults.value = list.length === 0;
            suggestionsStale.value = false;
        },
        // depth 1 so apps that mutate the array in place (push/splice) are seen too
        { deep: 1 },
    );

    // what an open panel shows with nothing to render: the no-results message once
    // a search has come back empty, otherwise the prompt
    const queryLongEnough = computed(() => model.value.trim().length >= options.minChars());
    const panelMessage = computed(() => {
        if (effectiveSuggestions.value.length) {
            return '';
        }
        return noResults.value && queryLongEnough.value ? options.noResultsText() : options.promptText();
    });

    // rendered into the shells' live regions when nothing is displayed, so screen
    // readers hear that a search came back empty; each shell announces its own
    // displayed count. the prompt is guidance, so it is never announced.
    const noResultsAnnouncement = computed(() =>
        noResults.value && queryLongEnough.value ? options.noResultsText() : '',
    );

    watch(model, (newValue) => {
        cancelPendingComplete();
        // selecting a suggestion copies its text into the input; that change is
        // terminal and must not trigger another fetch
        if (lastSelectedText !== null && newValue === lastSelectedText) {
            lastSelectedText = null;
            // after a selection the empty state is the prompt, even for an app
            // that clears its suggestions in its own select handler
            noResults.value = false;
            return;
        }
        lastSelectedText = null;
        // an edit ends the staleness, whatever the app answers with: waiting for
        // the suggestions prop to change would strand a memoised list that comes
        // back as the same array, and the panel would never fill again
        suggestionsStale.value = false;
        const query = newValue.trim();
        if (query.length < options.minChars()) {
            // a fresh (or cleared) query starts from the prompt state, not a stale
            // "no results" from the previous query
            noResults.value = false;
            return;
        }
        // the edited query's search is pending: show promptText, not the previous
        // query's "no results", until the app answers
        noResults.value = false;
        scheduleComplete(query);
    });

    onUnmounted(cancelPendingComplete);

    function onSelect(suggestion: EsAutocompleteSuggestion) {
        lastSelectedText = suggestion.text;
        suggestionsStale.value = true;
        options.emitSelect(suggestion);
    }

    return { effectiveSuggestions, noResultsAnnouncement, onSelect, panelMessage };
}

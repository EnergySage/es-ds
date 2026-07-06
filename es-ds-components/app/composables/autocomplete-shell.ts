import type { ComponentPublicInstance, Ref } from 'vue';
import { ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteShellOptions {
    /** close this shell's panel/takeover */
    close: () => void;
    contentEl: Ref<HTMLElement | null>;
    emitSelect: (suggestion: EsAutocompleteSuggestion) => void;
    emitSubmit: (query: string) => void;
    inputRef: Ref<ComponentPublicInstance | null>;
    model: Ref<string | undefined>;
    suggestions: () => EsAutocompleteSuggestion[];
}

/**
 * Interaction logic shared by the desktop popover and mobile takeover shells:
 * Enter-key semantics, selection, clearing, and tracking whether the current
 * highlight was created by the user.
 */
export function useAutocompleteShell(options: AutocompleteShellOptions) {
    // Reka auto-highlights the first item whenever results arrive from an empty
    // list, which is NOT a user choice — Enter must submit the typed query then,
    // not select. Only a highlight the user created (arrow keys or pointer
    // movement over the list) makes Enter select. Reset whenever the list content
    // changes or the shell reopens (shells call resetUserHighlight for the latter).
    const userHighlighted = ref(false);
    watch(
        () => {
            return options
                .suggestions()
                .map((suggestion) => suggestion.id)
                .join('\n');
        },
        () => {
            userHighlighted.value = false;
        },
    );

    function markUserHighlight() {
        userHighlighted.value = true;
    }

    function resetUserHighlight() {
        userHighlighted.value = false;
    }

    function focusInput() {
        (options.inputRef.value?.$el as HTMLElement | undefined)?.focus();
    }

    // runs in the capture phase on the anchor, ahead of Reka's input-level handler
    function onEnterKey(event: KeyboardEvent) {
        // only Enter from the input itself submits — Enter on the clear button
        // (also inside the anchor) is a click and must reach the button
        if (event.target !== options.inputRef.value?.$el) {
            return;
        }
        // the Enter that commits an IME composition (Japanese/Chinese/Korean
        // input) is not a submit
        if (event.isComposing) {
            return;
        }
        // highlight checked via the DOM rather than Reka's exposed
        // highlightedElement, which can hold a stale (detached) element after
        // the list re-renders
        if (userHighlighted.value && options.contentEl.value?.querySelector('[data-highlighted]')) {
            // let the event through to Reka, which selects the highlighted item
            return;
        }
        // keep Reka from selecting an auto-highlighted item the user never chose,
        // and keep a surrounding <form> from natively submitting
        event.preventDefault();
        event.stopPropagation();
        options.close();
        options.emitSubmit(options.model.value ?? '');
    }

    function onSelect(suggestion: EsAutocompleteSuggestion) {
        options.close();
        options.emitSelect(suggestion);
    }

    function onClear() {
        options.model.value = '';
        focusInput();
    }

    return { markUserHighlight, onClear, onEnterKey, onSelect, resetUserHighlight };
}

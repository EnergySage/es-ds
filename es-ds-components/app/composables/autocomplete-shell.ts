import type { ComponentPublicInstance, Ref } from 'vue';
import { computed, nextTick, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteShellOptions {
    /** null Reka's highlighted element (lives in the highlight guard's listbox context) */
    clearHighlight: () => void;
    /** close this shell's panel/takeover */
    close: () => void;
    contentEl: Ref<HTMLElement | null>;
    emitSelect: (suggestion: EsAutocompleteSuggestion) => void;
    emitSubmit: (query: string) => void;
    inputRef: Ref<ComponentPublicInstance | null>;
    model: Ref<string>;
    suggestions: () => EsAutocompleteSuggestion[];
}

/**
 * Interaction logic shared by the desktop popover and mobile takeover shells:
 * Enter-key semantics, selection, clearing, tracking whether the current
 * highlight was created by the user, and mirroring keyboard-highlighted
 * suggestions into the input display.
 */
export function useAutocompleteShell(options: AutocompleteShellOptions) {
    // Reka auto-highlights the first item whenever results arrive from an empty
    // list, which is NOT a user choice — Enter must submit the typed query then,
    // not select. Only a highlight the user created (arrow keys or pointer
    // movement over the list) makes Enter select. Reset whenever the list content
    // changes or the shell reopens (shells call resetUserHighlight for the latter).
    const userHighlighted = ref(false);

    // What the input DISPLAYS (bound to AutocompleteInput's own v-model, which
    // Reka keeps in sync with the real model on typing and selection). During
    // KEYBOARD navigation the highlighted suggestion is mirrored here without
    // touching the model, so users see what selecting would enter while the app
    // sees no query change — no 'complete' fires and the predictive bolding
    // stays keyed to the typed text. Pointer highlights never mirror (hovering
    // must not change the field). The typed text is restored whenever the
    // highlight goes away without a selection: arrowing past either end of the
    // list (back to the input), the list changing, or the shell closing.
    const displayText = ref(options.model.value);
    const highlightSource = ref<'keyboard' | 'pointer' | null>(null);
    const highlightPresent = ref(false);

    // drives the focus-visible ring on the highlighted suggestion: keyboard
    // navigation shows it, hovering shows only the background shading (the same
    // split es-dropdown-select makes)
    const keyboardNav = computed(() => highlightSource.value === 'keyboard');

    // while a keyboard-highlighted suggestion carries the focus-visible ring,
    // the field hides its own ring — the indicator moves with the navigation
    const keyboardHighlightActive = computed(() => keyboardNav.value && highlightPresent.value);

    function resetUserHighlight() {
        userHighlighted.value = false;
        highlightSource.value = null;
        highlightPresent.value = false;
        displayText.value = options.model.value;
    }

    // typing means the user is editing the query, not navigating: whatever
    // highlight state existed is over. Reka reacts to the model change by
    // re-highlighting the first item — without this reset that system highlight
    // would count as user-made (surviving the highlight guard) and, worse, get
    // mirrored into the input over the text just typed.
    function onUserInput() {
        userHighlighted.value = false;
        highlightSource.value = null;
        highlightPresent.value = false;
    }

    watch(() => {
        return options
            .suggestions()
            .map((suggestion) => suggestion.id)
            .join('\n');
    }, resetUserHighlight);

    function markKeyboardHighlight() {
        userHighlighted.value = true;
        highlightSource.value = 'keyboard';
    }

    function markPointerHighlight() {
        userHighlighted.value = true;
        highlightSource.value = 'pointer';
    }

    function firstItem() {
        return options.contentEl.value?.querySelector('[data-es-autocomplete-item]') ?? null;
    }

    function lastItem() {
        const items = options.contentEl.value?.querySelectorAll('[data-es-autocomplete-item]');
        return items?.length ? items[items.length - 1]! : null;
    }

    function highlightedItem() {
        return options.contentEl.value?.querySelector('[data-highlighted]') ?? null;
    }

    // Arrowing past either end of the list returns to the input, making the
    // navigation fully cyclic: input → first → … → last → input → first → …
    // (upward likewise; Reka itself moves from the input to either end). Reka's
    // own navigation does not wrap — the keydown is a no-op for it at the ends —
    // so drop the highlight and restore the typed text. Deferred a microtask so
    // it applies after every handler of this same keydown has run.
    function returnToInputFrom(edgeItem: Element | null) {
        if (!edgeItem || highlightedItem() !== edgeItem) {
            return;
        }
        void nextTick(() => {
            if (highlightedItem() === edgeItem) {
                options.clearHighlight();
                resetUserHighlight();
            }
        });
    }

    function onArrowDown() {
        markKeyboardHighlight();
        returnToInputFrom(lastItem());
    }

    function onArrowUp() {
        markKeyboardHighlight();
        returnToInputFrom(firstItem());
    }

    // AutocompleteRoot re-emits Reka's listbox highlight; the payload's value is
    // the AutocompleteItem's :value, i.e. the suggestion text
    function onHighlight(item?: { value?: unknown }) {
        const text = typeof item?.value === 'string' ? item.value : null;
        // deferred a microtask so the arrow-key handlers of this same keydown
        // have recorded the highlight source first
        void nextTick(() => {
            highlightPresent.value = true;
            if (highlightSource.value === 'keyboard' && text !== null) {
                displayText.value = text;
            }
        });
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
        if (userHighlighted.value && highlightedItem()) {
            // let the event through to Reka, which selects the highlighted item
            return;
        }
        // keep Reka from selecting an auto-highlighted item the user never chose,
        // and keep a surrounding <form> from natively submitting
        event.preventDefault();
        event.stopPropagation();
        options.close();
        options.emitSubmit(options.model.value);
    }

    function onSelect(suggestion: EsAutocompleteSuggestion) {
        options.close();
        options.emitSelect(suggestion);
    }

    function onClear() {
        options.model.value = '';
        focusInput();
    }

    return {
        displayText,
        keyboardHighlightActive,
        keyboardNav,
        markPointerHighlight,
        onArrowDown,
        onArrowUp,
        onClear,
        onEnterKey,
        onHighlight,
        onSelect,
        onUserInput,
        resetUserHighlight,
        userHighlighted,
    };
}

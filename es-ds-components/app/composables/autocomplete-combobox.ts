import type { Ref } from 'vue';
import { computed, nextTick, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteComboboxOptions {
    /**
     * close this shell's panel/takeover. A selection passes its text so a shell
     * that renders the final text before the next patch (the takeover's exit
     * ghost clones the trigger mid-close) doesn't read a stale DOM.
     */
    close: (selectedText?: string) => void;
    emitSelect: (suggestion: EsAutocompleteSuggestion) => void;
    emitSubmit: (query: string) => void;
    /** unique per shell instance: option ids derive from it */
    idPrefix: string;
    inputEl: Ref<HTMLInputElement | null>;
    model: Ref<string>;
    /**
     * the suggestions the arrows navigate: the DISPLAYED list (after the cap and
     * fit-to-viewport trim), empty while the shell's panel is closed so keys
     * cannot navigate an invisible list
     */
    suggestions: () => EsAutocompleteSuggestion[];
}

/**
 * The combobox core both shells share: highlight state, ARIA wiring
 * (aria-activedescendant over non-focusable options), fully cyclic arrow
 * navigation (input → first → … → last → input → …), Google-style
 * copy-on-highlight, and Enter's submit-vs-select decision.
 *
 * The input renders `displayValue` and options render from the same highlight
 * index, so the value rewrite and the aria-activedescendant change always land
 * in one render flush — VoiceOver reads simultaneous changes as in-field
 * autocomplete navigation and keeps its cursor (and text entry) anchored in the
 * field. Options are never focusable, so no assistive tech can drag real focus
 * off the input while navigating (both per the Google/Amazon pattern).
 */
export function useAutocompleteCombobox(options: AutocompleteComboboxOptions) {
    // -1 is the input itself (no option highlighted)
    const highlightIndex = ref(-1);
    // Only a highlight the user created makes Enter select — and only keyboard
    // navigation mirrors into the input (hovering must not change the field).
    const highlightSource = ref<'keyboard' | 'pointer' | null>(null);

    const highlighted = computed(() => options.suggestions()[highlightIndex.value] ?? null);

    // drives the focus-visible ring on the highlighted suggestion: keyboard
    // navigation shows it, hovering shows only the background shading (the same
    // split es-dropdown-select makes)
    const keyboardNav = computed(() => highlightSource.value === 'keyboard');

    // while a keyboard-highlighted suggestion carries the focus-visible ring,
    // the field hides its own ring — the indicator moves with the navigation
    const keyboardHighlightActive = computed(() => keyboardNav.value && highlightIndex.value >= 0);

    // What the input DISPLAYS: the typed query, or — during keyboard navigation —
    // the highlighted suggestion, so users see what selecting would enter while
    // the app sees no query change (no 'complete' fires and the predictive
    // bolding stays keyed to the typed text).
    const displayValue = computed(() =>
        keyboardNav.value && highlighted.value ? highlighted.value.text : options.model.value,
    );

    const listboxId = `${options.idPrefix}-listbox`;
    function optionId(index: number) {
        return `${options.idPrefix}-option-${index}`;
    }
    const activeDescendant = computed(() => (highlightIndex.value >= 0 ? optionId(highlightIndex.value) : undefined));

    function resetHighlight() {
        highlightIndex.value = -1;
        highlightSource.value = null;
    }

    // a different list means the old index would highlight an arbitrary other
    // suggestion; the reset also restores the typed text via displayValue
    watch(
        () => {
            return options
                .suggestions()
                .map((suggestion) => suggestion.id)
                .join('\n');
        },
        () => resetHighlight(),
    );

    // typing means the user is editing the query, not navigating. The edit
    // applies to what the field currently shows (a mirrored suggestion is
    // editable, as on Google), so the model takes the input's resulting value.
    function onInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        highlightIndex.value = -1;
        highlightSource.value = null;
        options.model.value = value;
    }

    function moveHighlight(step: 1 | -1) {
        const count = options.suggestions().length;
        if (!count) {
            return;
        }
        highlightSource.value = 'keyboard';
        // fully cyclic, with -1 (the input, showing the typed text) as a stop:
        // input → first → … → last → input → … and the inverse going up
        const range = count + 1;
        highlightIndex.value = ((highlightIndex.value + 1 + step + range) % range) - 1;
        void revealCaretAtEnd();
    }

    // A screen reader can answer the arrows' value rewrite by moving its cursor
    // — and with it real DOM focus — off the input. That move is Safari's
    // accessibility sync, so it lands within a frame or two of the keypress,
    // while a human answering the spoken suggestion cannot press anything for
    // the length of the announcement. So each arrow press marks the moment and
    // the first blur to ask consumes the mark: a blur inside the window is the
    // rewrite's echo, and anything later is the user (or their screen reader's
    // own navigation) genuinely leaving the field.
    const ARROW_BLUR_WINDOW_MS = 250;
    let arrowPressedAt = 0;
    function consumeArrowBlur() {
        const pressedAt = arrowPressedAt;
        arrowPressedAt = 0;
        return pressedAt !== 0 && performance.now() - pressedAt < ARROW_BLUR_WINDOW_MS;
    }

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            // keep the caret from jumping to the text's start/end
            event.preventDefault();
            arrowPressedAt = performance.now();
            moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
            return;
        }
        if (event.key === 'Enter') {
            // the Enter that commits an IME composition (Japanese/Chinese/Korean
            // input) is neither a submit nor a selection
            if (event.isComposing) {
                return;
            }
            // handled here either way; a surrounding <form> must not submit
            event.preventDefault();
            if (highlightSource.value !== null && highlighted.value) {
                select(highlighted.value);
            } else {
                options.close();
                options.emitSubmit(options.model.value);
            }
        }
    }

    function select(suggestion: EsAutocompleteSuggestion) {
        options.model.value = suggestion.text;
        resetHighlight();
        options.close(suggestion.text);
        options.emitSelect(suggestion);
        void revealCaretAtEnd();
    }

    function onOptionClick(index: number) {
        const suggestion = options.suggestions()[index];
        if (suggestion) {
            select(suggestion);
        }
    }

    function onOptionPointermove(index: number) {
        if (highlightIndex.value !== index || highlightSource.value !== 'pointer') {
            highlightIndex.value = index;
            highlightSource.value = 'pointer';
        }
    }

    // keep the input focused while clicking in the panel, so focus and the text
    // caret are still in the field after selecting. Interactive elements a
    // consumer renders in the item slot are exempt so they remain focusable.
    function onListMousedown(event: MouseEvent) {
        const target = event.target as HTMLElement | null;
        const interactive =
            'a[href], button, input, select, textarea, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';
        if (!target?.closest(interactive)) {
            event.preventDefault();
        }
    }

    function onClear() {
        options.model.value = '';
        resetHighlight();
        options.inputEl.value?.focus();
    }

    // Browsers scroll the caret into view when the selection changes or the
    // user types — never on focus itself, and Safari scrolls a field back to
    // its start on blur. So a refocused field whose caret is restored beyond
    // the visible text (after selecting a suggestion longer than the field)
    // shows the text's start with the caret out of view. Measure the caret's
    // horizontal position and bring it into view; a non-collapsed selection
    // (Tab's select-all) is left to the browser.
    let caretContext: CanvasRenderingContext2D | null | undefined;
    function revealCaretOnFocus() {
        // deferred a frame so the browser's own focus handling (caret restore,
        // a click's caret placement, Tab's select-all) settles first
        requestAnimationFrame(() => {
            const el = options.inputEl.value;
            if (!el || document.activeElement !== el || el.scrollWidth <= el.clientWidth) {
                return;
            }
            const caret = el.selectionStart;
            if (caret === null || caret !== el.selectionEnd) {
                return;
            }
            const context = (caretContext ??= document.createElement('canvas').getContext('2d'));
            if (!context) {
                return;
            }
            const style = getComputedStyle(el);
            context.font = style.font || `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
            const caretX = context.measureText(el.value.slice(0, caret)).width;
            const viewWidth =
                el.clientWidth -
                (Number.parseFloat(style.paddingLeft) || 0) -
                (Number.parseFloat(style.paddingRight) || 0);
            if (caretX < el.scrollLeft) {
                el.scrollLeft = caretX;
            } else if (caretX > el.scrollLeft + viewWidth) {
                el.scrollLeft = caretX - viewWidth;
            }
        });
    }

    // When text is written into the input programmatically (a selection filling
    // in the suggestion, or keyboard navigation mirroring one), the browser
    // leaves the caret at the end but the field scrolled to the start — a value
    // wider than the field shows its beginning with the caret out of view.
    // Reveal the caret once the written value has reached the DOM.
    async function revealCaretAtEnd() {
        // two ticks: the first flushes the ref watchers, the second the render
        // patch that writes the input's DOM value
        await nextTick();
        await nextTick();
        const el = options.inputEl.value;
        if (!el || document.activeElement !== el) {
            return;
        }
        const end = el.value.length;
        el.setSelectionRange(end, end);
        el.scrollLeft = el.scrollWidth;
    }

    return {
        activeDescendant,
        consumeArrowBlur,
        displayValue,
        highlightIndex,
        keyboardHighlightActive,
        keyboardNav,
        listboxId,
        onClear,
        onInput,
        onKeydown,
        onListMousedown,
        onOptionClick,
        onOptionPointermove,
        optionId,
        resetHighlight,
        revealCaretOnFocus,
    };
}

export type AutocompleteCombobox = ReturnType<typeof useAutocompleteCombobox>;

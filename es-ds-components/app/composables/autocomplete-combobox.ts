import type { Ref } from 'vue';
import { computed, nextTick, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteComboboxOptions {
    /**
     * close this shell's panel/takeover. a selection passes its text, so a shell
     * that reads the DOM mid-close (the takeover's exit ghost) is not stale.
     */
    close: (selectedText?: string) => void;
    emitSelect: (suggestion: EsAutocompleteSuggestion) => void;
    /** unique per shell instance: option ids derive from it */
    idPrefix: string;
    inputEl: Ref<HTMLInputElement | null>;
    model: Ref<string>;
    /**
     * the suggestions the arrows navigate: the displayed list, after the cap and
     * the trim, and empty while closed so keys cannot walk an invisible list
     */
    suggestions: () => EsAutocompleteSuggestion[];
}

/**
 * the combobox core both shells share: highlight state, aria-activedescendant
 * over non-focusable options, cyclic arrows, copy-on-highlight, and Enter's
 * select-or-stand-aside. value and activedescendant come from one index, so they
 * land together, which is what VoiceOver stays anchored for.
 */
export function useAutocompleteCombobox(options: AutocompleteComboboxOptions) {
    // -1 is the input itself (no option highlighted)
    const highlightIndex = ref(-1);
    // only a highlight the user created makes Enter select, and only keyboard
    // navigation mirrors into the input: hovering must not change the field
    const highlightSource = ref<'keyboard' | 'pointer' | null>(null);

    const highlighted = computed(() => options.suggestions()[highlightIndex.value] ?? null);

    // drives the focus-visible ring on the highlighted suggestion: keyboard
    // navigation shows it, hovering shows only the background shading (the same
    // split es-dropdown-select makes)
    const keyboardNav = computed(() => highlightSource.value === 'keyboard');

    // while a keyboard-highlighted suggestion carries the focus-visible ring,
    // the field hides its own ring — the indicator moves with the navigation
    const keyboardHighlightActive = computed(() => keyboardNav.value && highlightIndex.value >= 0);

    // what the input displays: the typed query, or the highlighted suggestion
    // while arrowing, so users see what selecting would enter while the app sees
    // no query change — no 'complete' fires and the bolding stays keyed to it
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

    // typing means editing the query, not navigating, and it applies to whatever
    // the field shows — a mirrored suggestion is editable, as on Google
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

    // a screen reader can answer the arrows' value rewrite by moving DOM focus off
    // the input, within a frame or two — sooner than a human can. so each press
    // marks the moment: a blur inside the window is that echo, a later one is not.
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
            // input) chooses nothing
            if (event.isComposing) {
                return;
            }
            if (highlightSource.value !== null && highlighted.value) {
                // choosing the highlighted suggestion is what this key does here,
                // so a surrounding form must not also submit on it
                event.preventDefault();
                select(highlighted.value);
                return;
            }
            // nothing is chosen, so the key is not ours: it reaches the page as
            // from any other field, and a form submits implicitly. the panel
            // closes because the query is committed.
            options.close();
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

    // keep the input focused while clicking in the panel, so focus and the caret
    // are still there after selecting. interactive elements in a consumer's item
    // slot are exempt, so they stay focusable.
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

    // browsers scroll the caret into view when the selection changes, never on
    // focus itself, so a refocused field shows its start with the restored caret
    // out of view. measure where that caret is and bring it in.
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

    // text written programmatically leaves the caret at the end but the field
    // scrolled to the start, so a value wider than the field shows its beginning.
    // reveal the caret once the written value has reached the DOM.
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

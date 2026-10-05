import type { Ref } from 'vue';
import { computed, nextTick, ref, watch } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

interface AutocompleteComboboxOptions {
    /**
     * APG's automatic selection: the first suggestion stands selected as the list
     * arrives, and becomes the value when focus leaves
     */
    autoSelect: () => boolean;
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
export function useEsAutocompleteCombobox(options: AutocompleteComboboxOptions) {
    // -1 is the input itself (no option highlighted)
    const highlightIndex = ref(-1);
    // only a highlight the user created makes Enter select, and only keyboard
    // navigation mirrors into the input: hovering must not change the field
    const highlightSource = ref<'keyboard' | 'pointer' | null>(null);

    // drives the focus-visible ring on the highlighted suggestion: keyboard
    // navigation shows it, hovering shows only the background shading (the same
    // split es-dropdown-select makes)
    const keyboardNav = computed(() => highlightSource.value === 'keyboard');

    // the suggestion the field itself follows under automatic selection: the
    // first, and only arrowing takes the field off it. a pointer passing over the
    // list highlights what it is over without touching what the field proposes
    const autoSelectedSuggestion = computed(() =>
        options.autoSelect() && !keyboardNav.value ? (options.suggestions()[0] ?? null) : null,
    );
    // automatic selection also holds the highlight, until the user takes it
    const autoHighlighted = computed(() => autoSelectedSuggestion.value !== null && highlightIndex.value < 0);
    // where the highlight actually sits: the user's, or automatic selection's
    const selectedIndex = computed(() => (autoHighlighted.value ? 0 : highlightIndex.value));

    const highlighted = computed(() => options.suggestions()[selectedIndex.value] ?? null);

    // while a keyboard-highlighted suggestion carries the focus-visible ring,
    // the field hides its own ring — the indicator moves with the navigation
    const keyboardHighlightActive = computed(() => keyboardNav.value && highlightIndex.value >= 0);

    // a deletion must not be answered with a completion putting the character
    // back, so the edit's shape decides whether the next list may complete
    const completionAllowed = ref(true);

    // automatic selection's inline completion: the selected suggestion continues
    // the typed text, so the untyped remainder can stand in the field as a
    // proposal. a suggestion matching some other way is selected but not written.
    const autoCompletion = computed(() => {
        const typed = options.model.value;
        const suggestion = autoSelectedSuggestion.value;
        if (!completionAllowed.value || !typed || !suggestion || suggestion.text.length <= typed.length) {
            return null;
        }
        return suggestion.text.toLowerCase().startsWith(typed.toLowerCase()) ? suggestion.text : null;
    });

    // what the input displays: the typed query, the highlighted suggestion while
    // arrowing, or the inline completion. either mirror lets users see what
    // selecting would enter while the app sees no query change — no 'complete'
    // fires and the bolding stays keyed to it
    const displayValue = computed(() => {
        if (keyboardNav.value && highlighted.value) {
            return highlighted.value.text;
        }
        return autoCompletion.value ?? options.model.value;
    });

    // what automatic selection has chosen, for the shells to announce. a
    // suggestion that does not complete the typed text changes nothing on screen,
    // and an aria-activedescendant change alone is not reliably spoken, so
    // without this a screen reader hears no selection at all
    const autoSelectedText = computed(() => (options.autoSelect() ? (options.suggestions()[0]?.text ?? '') : ''));

    const listboxId = `${options.idPrefix}-listbox`;
    function optionId(index: number) {
        return `${options.idPrefix}-option-${index}`;
    }
    // the user's own highlight only, never automatic selection's: VoiceOver takes
    // its cursor to whatever this names, and a cursor parked on an option is no
    // longer in a text field — single keys stop typing and become quick-nav
    // commands. automatic selection says what it chose through aria-selected on
    // the option, the completion in the field, and the shell's live region.
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
        const { inputType, isComposing } = event as InputEvent;
        completionAllowed.value = !isComposing && !inputType?.startsWith('delete');
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
        // automatic selection's first suggestion is where the arrows start from
        const from = selectedIndex.value;
        // fully cyclic, with -1 (the input) as a stop: input → first → … → last →
        // input → … and the inverse going up
        const range = count + 1;
        const next = ((from + 1 + step + range) % range) - 1;
        highlightIndex.value = next;
        // back at the input the user holds no highlight, which hands the field to
        // automatic selection again rather than leaving it on the typed text
        highlightSource.value = next < 0 ? null : 'keyboard';
        markValueRewrite();
        void revealCaretAtEnd();
    }

    // a screen reader can answer a rewrite of the field's value by moving DOM
    // focus off the input, within a frame or two — sooner than a human can. so
    // each rewrite, whether an arrow's or a completion's, marks the moment: a
    // blur inside the window is that echo, a later one is not.
    const REWRITE_BLUR_WINDOW_MS = 250;
    let rewrittenAt = 0;
    function markValueRewrite() {
        rewrittenAt = performance.now();
    }
    function consumeRewriteBlur() {
        const at = rewrittenAt;
        rewrittenAt = 0;
        return at !== 0 && performance.now() - at < REWRITE_BLUR_WINDOW_MS;
    }

    // the completion's untyped remainder stays selected, so the next keystroke
    // replaces it and Backspace removes it: the field reads as the typed text
    // with a proposal after it, which is what makes the proposal refusable.
    //
    // re-applied on every edit, not only when the completion changes: typing
    // over the remainder leaves the same suggestion completing the longer text,
    // and writing that value back to the input puts the caret at its end.
    watch(
        [autoCompletion, () => options.model.value],
        ([completion, typed], [previousCompletion]) => {
            const el = options.inputEl.value;
            if (completion === null || !el || document.activeElement !== el) {
                return;
            }
            // only a completion arriving rewrites the field under the user;
            // holding the remainder selected as they type is their own edit, and
            // claiming it would answer every keystroke's blur by taking focus back
            if (completion !== previousCompletion) {
                markValueRewrite();
            }
            el.setSelectionRange(typed.length, el.value.length);
        },
        // after the render patch that writes the input's DOM value, so the
        // selection is not the one the write discards
        { flush: 'post' },
    );

    // APG's automatic selection: what the field already shows selected becomes
    // the value when focus leaves, unless the user typed something else. that is
    // a suggestion they arrowed to where they did, otherwise the one automatic
    // selection holds; a pointer resting over a row is not a choice, so it
    // leaves the held one to be taken.
    function commitAutoSelection() {
        if (!options.autoSelect()) {
            return false;
        }
        const suggestion = keyboardNav.value ? highlighted.value : autoSelectedSuggestion.value;
        if (!suggestion) {
            return false;
        }
        select(suggestion);
        return true;
    }

    function onKeydown(event: KeyboardEvent) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            // keep the caret from jumping to the text's start/end
            event.preventDefault();
            moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
            return;
        }
        if (event.key === 'Enter') {
            // the Enter that commits an IME composition (Japanese/Chinese/Korean
            // input) chooses nothing
            if (event.isComposing) {
                return;
            }
            if ((highlightSource.value !== null || autoHighlighted.value) && highlighted.value) {
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

    // the pointer takes the highlight only when the arrows are not holding it: a
    // panel opens under a resting cursor, where the smallest twitch would undo
    // what was navigated to and take a screen reader's cursor with it. a click
    // still chooses the row under the pointer, whichever one is highlighted.
    function onOptionPointermove(index: number) {
        if (keyboardNav.value) {
            return;
        }
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
        // arrowing back to the input hands the field to automatic selection,
        // whose completion holds its remainder selected: a move still in flight
        // from an earlier press would otherwise land on top and collapse it
        if (autoCompletion.value !== null) {
            return;
        }
        const end = el.value.length;
        el.setSelectionRange(end, end);
        el.scrollLeft = el.scrollWidth;
    }

    return {
        activeDescendant,
        autoSelectedText,
        commitAutoSelection,
        consumeRewriteBlur,
        displayValue,
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
        selectedIndex,
    };
}

export type EsAutocompleteCombobox = ReturnType<typeof useEsAutocompleteCombobox>;

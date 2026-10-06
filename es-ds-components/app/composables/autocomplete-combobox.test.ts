// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import type { App } from 'vue';
import { createApp, nextTick, ref } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';
import { useEsAutocompleteCombobox } from './autocomplete-combobox';

/** run the composable inside a real component so watchers are scoped */
function withSetup<T>(composable: () => T): { app: App; result: T } {
    let result!: T;
    const app = createApp({
        setup() {
            result = composable();
            return () => null;
        },
    });
    app.mount(document.createElement('div'));
    return { app, result };
}

function makeCombobox(
    initialSuggestions: EsAutocompleteSuggestion[] = [{ id: 'a', text: 'solar batteries' }],
    { autoSelect = false } = {},
) {
    const inputEl = document.createElement('input');
    document.body.append(inputEl);
    const model = ref('solar');
    const suggestions = ref(initialSuggestions);
    const close = vi.fn();
    const emitSelect = vi.fn();
    const { result: combobox } = withSetup(() =>
        useEsAutocompleteCombobox({
            autoSelect: () => autoSelect,
            close,
            emitSelect,
            idPrefix: 'test',
            inputEl: ref(inputEl),
            model,
            suggestions: () => suggestions.value,
        }),
    );
    return { close, combobox, emitSelect, inputEl, model, suggestions };
}

function keydown(key: string, init: { isComposing?: boolean } = {}) {
    const event = new KeyboardEvent('keydown', { cancelable: true, key });
    if (init.isComposing) {
        Object.defineProperty(event, 'isComposing', { value: true });
    }
    return event;
}

const THREE = [
    { id: 'a', text: 'apple' },
    { id: 'b', text: 'apricot' },
    { id: 'c', text: 'avocado' },
];

describe('useEsAutocompleteCombobox arrow navigation and mirroring', () => {
    it('cycles down through every suggestion, back to the input, and around again', () => {
        const { combobox, model } = makeCombobox(THREE);
        model.value = 'a';
        const down = () => combobox.onKeydown(keydown('ArrowDown'));
        down();
        expect(combobox.displayValue.value).toBe('apple');
        expect(combobox.activeDescendant.value).toBe('test-option-0');
        down();
        down();
        expect(combobox.displayValue.value).toBe('avocado');
        // past the last suggestion: back to the input showing the typed text
        down();
        expect(combobox.displayValue.value).toBe('a');
        expect(combobox.activeDescendant.value).toBeUndefined();
        down();
        expect(combobox.displayValue.value).toBe('apple');
    });

    it('cycles up from the input to the last suggestion and back', () => {
        const { combobox, model } = makeCombobox(THREE);
        model.value = 'a';
        const up = () => combobox.onKeydown(keydown('ArrowUp'));
        up();
        expect(combobox.displayValue.value).toBe('avocado');
        up();
        up();
        expect(combobox.displayValue.value).toBe('apple');
        up();
        expect(combobox.displayValue.value).toBe('a');
    });

    it('mirrors only keyboard highlights: hovering never changes the field', () => {
        const { combobox, model } = makeCombobox(THREE);
        model.value = 'a';
        combobox.onOptionPointermove(1);
        expect(combobox.displayValue.value).toBe('a');
        expect(combobox.activeDescendant.value).toBe('test-option-1');
        expect(combobox.keyboardNav.value).toBe(false);
    });

    it("holds the arrows' highlight while the pointer passes over the list", () => {
        const { combobox, model } = makeCombobox(THREE);
        model.value = 'a';
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.displayValue.value).toBe('apple');
        // a panel opens under a resting cursor, so this is a twitch, not a choice
        combobox.onOptionPointermove(2);
        expect(combobox.selectedIndex.value).toBe(0);
        expect(combobox.activeDescendant.value).toBe('test-option-0');
        expect(combobox.displayValue.value).toBe('apple');
    });

    it('arrows are a no-op while there is nothing displayed', () => {
        const { combobox } = makeCombobox([]);
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.activeDescendant.value).toBeUndefined();
    });

    it('prevents the caret-moving default on arrows', () => {
        const { combobox } = makeCombobox(THREE);
        const event = keydown('ArrowDown');
        combobox.onKeydown(event);
        expect(event.defaultPrevented).toBe(true);
    });

    it('a changed suggestion list drops the highlight and restores the typed text', async () => {
        const { combobox, model, suggestions } = makeCombobox(THREE);
        model.value = 'a';
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.displayValue.value).toBe('apple');
        suggestions.value = [{ id: 'z', text: 'banana' }];
        await nextTick();
        expect(combobox.displayValue.value).toBe('a');
        expect(combobox.activeDescendant.value).toBeUndefined();
    });

    it('typing ends navigation and takes the edited field value as the model', () => {
        const { combobox, inputEl, model } = makeCombobox(THREE);
        model.value = 'a';
        combobox.onKeydown(keydown('ArrowDown'));
        // the user edits the mirrored suggestion, as on Google
        inputEl.value = 'applex';
        inputEl.dispatchEvent(new Event('input'));
        combobox.onInput({ target: inputEl } as unknown as Event);
        expect(model.value).toBe('applex');
        expect(combobox.displayValue.value).toBe('applex');
        expect(combobox.activeDescendant.value).toBeUndefined();
    });
});

describe('useEsAutocompleteCombobox Enter semantics', () => {
    it('closes and leaves the key to the page when nothing is highlighted', () => {
        const { close, combobox, emitSelect } = makeCombobox();
        const event = keydown('Enter');
        combobox.onKeydown(event);
        expect(emitSelect).not.toHaveBeenCalled();
        expect(close).toHaveBeenCalled();
        // a surrounding <form> submits implicitly, as from any other field
        expect(event.defaultPrevented).toBe(false);
    });

    it('selects a keyboard-highlighted suggestion instead of submitting a form', () => {
        const { close, combobox, emitSelect, model } = makeCombobox();
        combobox.onKeydown(keydown('ArrowDown'));
        const event = keydown('Enter');
        combobox.onKeydown(event);
        expect(emitSelect).toHaveBeenCalledWith({ id: 'a', text: 'solar batteries' });
        expect(event.defaultPrevented).toBe(true);
        expect(model.value).toBe('solar batteries');
        // a shell that renders the final text mid-close takes it from this argument
        expect(close).toHaveBeenCalledWith('solar batteries');
    });

    it('selects a pointer-highlighted suggestion', () => {
        const { combobox, emitSelect } = makeCombobox();
        combobox.onOptionPointermove(0);
        combobox.onKeydown(keydown('Enter'));
        expect(emitSelect).toHaveBeenCalled();
    });

    it('ignores the Enter that commits an IME composition', () => {
        const { close, combobox, emitSelect } = makeCombobox();
        combobox.onKeydown(keydown('Enter', { isComposing: true }));
        expect(emitSelect).not.toHaveBeenCalled();
        expect(close).not.toHaveBeenCalled();
    });

    it('selects nothing after a list change reset the highlight', async () => {
        const { combobox, emitSelect, suggestions } = makeCombobox(THREE);
        combobox.onKeydown(keydown('ArrowDown'));
        suggestions.value = [{ id: 'z', text: 'banana' }];
        await nextTick();
        const event = keydown('Enter');
        combobox.onKeydown(event);
        expect(emitSelect).not.toHaveBeenCalled();
        expect(event.defaultPrevented).toBe(false);
    });
});

describe('useEsAutocompleteCombobox selection, clearing, and focus retention', () => {
    it('onOptionClick writes the model, closes with the text, and emits the suggestion', () => {
        const { close, combobox, emitSelect, model } = makeCombobox(THREE);
        combobox.onOptionClick(1);
        expect(model.value).toBe('apricot');
        expect(close).toHaveBeenCalledWith('apricot');
        expect(emitSelect).toHaveBeenCalledWith({ id: 'b', text: 'apricot' });
    });

    it('onClear empties the model and refocuses the input', () => {
        const { combobox, inputEl, model } = makeCombobox();
        combobox.onClear();
        expect(model.value).toBe('');
        expect(document.activeElement).toBe(inputEl);
    });

    it('list mousedown keeps focus in the input, except on interactive slot content', () => {
        const { combobox } = makeCombobox();
        const row = document.createElement('div');
        const plain = new MouseEvent('mousedown', { cancelable: true });
        Object.defineProperty(plain, 'target', { value: row });
        combobox.onListMousedown(plain);
        expect(plain.defaultPrevented).toBe(true);

        const button = document.createElement('button');
        row.append(button);
        const interactive = new MouseEvent('mousedown', { cancelable: true });
        Object.defineProperty(interactive, 'target', { value: button });
        combobox.onListMousedown(interactive);
        expect(interactive.defaultPrevented).toBe(false);
    });
});

describe('useEsAutocompleteCombobox arrow-driven blur window', () => {
    it('claims the blur a screen reader makes in answer to an arrow press', () => {
        const { combobox } = makeCombobox(THREE);
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.consumeRewriteBlur()).toBe(true);
    });

    it('claims it once, so a later blur reads as the user leaving the field', () => {
        const { combobox } = makeCombobox(THREE);
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.consumeRewriteBlur()).toBe(true);
        expect(combobox.consumeRewriteBlur()).toBe(false);
    });

    it('claims nothing once the window has passed, or without an arrow press', () => {
        const { combobox } = makeCombobox(THREE);
        expect(combobox.consumeRewriteBlur()).toBe(false);
        combobox.onKeydown(keydown('ArrowDown'));
        vi.spyOn(performance, 'now').mockReturnValue(performance.now() + 1_000);
        expect(combobox.consumeRewriteBlur()).toBe(false);
        vi.restoreAllMocks();
    });
});

describe('useEsAutocompleteCombobox automatic selection', () => {
    it('selects the first suggestion as the list arrives', () => {
        const { combobox, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        expect(combobox.selectedIndex.value).toBe(0);
    });

    it('leaves aria-activedescendant to the user, so a screen reader cursor stays in the field', () => {
        const { combobox, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        expect(combobox.activeDescendant.value).toBeUndefined();
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.activeDescendant.value).toBe('test-option-1');
    });

    it('selects nothing in the default mode', () => {
        const { combobox, model } = makeCombobox(THREE);
        model.value = 'a';
        expect(combobox.selectedIndex.value).toBe(-1);
        expect(combobox.activeDescendant.value).toBeUndefined();
    });

    it('completes the typed text inline when the suggestion continues it', () => {
        const { combobox, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'ap';
        expect(combobox.displayValue.value).toBe('apple');
    });

    it('adds only the untyped remainder, leaving the typed characters alone', () => {
        const { combobox, model } = makeCombobox([{ id: 'p', text: 'Pagination' }], { autoSelect: true });
        model.value = 'p';
        expect(combobox.displayValue.value).toBe('pagination');
        model.value = 'pAg';
        expect(combobox.displayValue.value).toBe('pAgination');
    });

    it("takes the suggestion's own text as the value once it is chosen", () => {
        const { combobox, model } = makeCombobox([{ id: 'p', text: 'Pagination' }], { autoSelect: true });
        model.value = 'p';
        expect(combobox.commitAutoSelection()).toBe(true);
        expect(model.value).toBe('Pagination');
    });

    it('selects without completing when the suggestion matches some other way', () => {
        const { combobox, model } = makeCombobox([{ id: 'a', text: '12 Maple Ave' }], { autoSelect: true });
        model.value = 'maple';
        expect(combobox.selectedIndex.value).toBe(0);
        expect(combobox.displayValue.value).toBe('maple');
    });

    it('leaves a deletion alone rather than putting the character back', () => {
        const { combobox, inputEl, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'ap';
        expect(combobox.displayValue.value).toBe('apple');
        inputEl.value = 'a';
        combobox.onInput({ inputType: 'deleteContentBackward', target: inputEl } as unknown as Event);
        expect(combobox.displayValue.value).toBe('a');
    });

    it('keeps the completion remainder selected as the typed text grows', async () => {
        const { combobox, inputEl, model } = makeCombobox(THREE, { autoSelect: true });
        inputEl.focus();
        model.value = 'ap';
        // the value the shell renders from displayValue, which the selection follows
        inputEl.value = combobox.displayValue.value;
        await nextTick();
        expect([inputEl.selectionStart, inputEl.selectionEnd]).toEqual([2, 5]);
        // typing over the remainder leaves the same suggestion completing the
        // longer text, so the remainder has to be selected again
        model.value = 'app';
        inputEl.value = combobox.displayValue.value;
        await nextTick();
        expect([inputEl.selectionStart, inputEl.selectionEnd]).toEqual([3, 5]);
    });

    it('claims a rewrite for the completion it writes, never for the typing over it', async () => {
        const { combobox, inputEl, model } = makeCombobox(THREE, { autoSelect: true });
        inputEl.focus();
        model.value = 'ap';
        inputEl.value = combobox.displayValue.value;
        await nextTick();
        expect(combobox.consumeRewriteBlur()).toBe(true);
        model.value = 'app';
        inputEl.value = combobox.displayValue.value;
        await nextTick();
        expect(combobox.consumeRewriteBlur()).toBe(false);
    });

    it('names the selected suggestion for the shell to announce', () => {
        const { combobox } = makeCombobox(THREE, { autoSelect: true });
        expect(combobox.autoSelectedText.value).toBe('apple');
        const { combobox: off } = makeCombobox(THREE);
        expect(off.autoSelectedText.value).toBe('');
    });

    it('keeps the completion while the pointer passes over the list', () => {
        const { combobox, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'ap';
        expect(combobox.displayValue.value).toBe('apple');
        combobox.onOptionPointermove(2);
        // the pointer highlights what it is over, and the field keeps its proposal
        expect(combobox.selectedIndex.value).toBe(2);
        expect(combobox.displayValue.value).toBe('apple');
    });

    it('restores the completion, still selected, when the arrows come back to the input', async () => {
        const { combobox, inputEl, model } = makeCombobox(THREE, { autoSelect: true });
        inputEl.focus();
        model.value = 'ap';
        const down = () => combobox.onKeydown(keydown('ArrowDown'));
        down();
        expect(combobox.displayValue.value).toBe('apricot');
        down();
        down();
        expect(combobox.selectedIndex.value).toBe(0);
        expect(combobox.displayValue.value).toBe('apple');
        inputEl.value = combobox.displayValue.value;
        // three ticks: the completion's own flush, then the two the caret-to-end
        // move would have taken had the arrows still claimed the field
        await nextTick();
        await nextTick();
        await nextTick();
        expect([inputEl.selectionStart, inputEl.selectionEnd]).toEqual([2, 5]);
    });

    it("holds the arrows' highlight while the pointer passes over the list", () => {
        const { combobox, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'ap';
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.selectedIndex.value).toBe(1);
        combobox.onOptionPointermove(2);
        expect(combobox.selectedIndex.value).toBe(1);
        expect(combobox.displayValue.value).toBe('apricot');
    });

    it('Enter chooses the automatically selected suggestion', () => {
        const { combobox, emitSelect, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        const event = keydown('Enter');
        combobox.onKeydown(event);
        expect(event.defaultPrevented).toBe(true);
        expect(emitSelect).toHaveBeenCalledWith(THREE[0]);
    });

    it('arrows carry on from the automatic selection rather than restarting', () => {
        const { combobox, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.displayValue.value).toBe('apricot');
    });

    it('commits the selection on the way out', () => {
        const { combobox, emitSelect, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        expect(combobox.commitAutoSelection()).toBe(true);
        expect(emitSelect).toHaveBeenCalledWith(THREE[0]);
        expect(model.value).toBe('apple');
    });

    it('commits the suggestion the arrows moved to, not the one it started on', () => {
        const { combobox, emitSelect, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        combobox.onKeydown(keydown('ArrowDown'));
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.commitAutoSelection()).toBe(true);
        expect(emitSelect).toHaveBeenCalledWith(THREE[2]);
        expect(model.value).toBe('avocado');
    });

    it('commits the held suggestion when a pointer merely rests over another', () => {
        const { combobox, emitSelect, model } = makeCombobox(THREE, { autoSelect: true });
        model.value = 'a';
        combobox.onOptionPointermove(2);
        expect(combobox.commitAutoSelection()).toBe(true);
        expect(emitSelect).toHaveBeenCalledWith(THREE[0]);
    });

    it('commits nothing in the default mode, whatever the arrows reached', () => {
        const { combobox, emitSelect, model } = makeCombobox(THREE);
        model.value = 'a';
        combobox.onKeydown(keydown('ArrowDown'));
        expect(combobox.commitAutoSelection()).toBe(false);
        expect(emitSelect).not.toHaveBeenCalled();
    });

    it('commits nothing with no list displayed, or in the default mode', () => {
        const { combobox: empty } = makeCombobox([], { autoSelect: true });
        expect(empty.commitAutoSelection()).toBe(false);
        const { combobox, emitSelect } = makeCombobox(THREE);
        expect(combobox.commitAutoSelection()).toBe(false);
        expect(emitSelect).not.toHaveBeenCalled();
    });
});

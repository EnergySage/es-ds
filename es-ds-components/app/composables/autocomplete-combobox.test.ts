// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import type { App } from 'vue';
import { createApp, nextTick, ref } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';
import { useAutocompleteCombobox } from './autocomplete-combobox';

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

function makeCombobox(initialSuggestions: EsAutocompleteSuggestion[] = [{ id: 'a', text: 'solar batteries' }]) {
    const inputEl = document.createElement('input');
    document.body.append(inputEl);
    const model = ref('solar');
    const suggestions = ref(initialSuggestions);
    const close = vi.fn();
    const emitSelect = vi.fn();
    const emitSubmit = vi.fn();
    const { result: combobox } = withSetup(() =>
        useAutocompleteCombobox({
            close,
            emitSelect,
            emitSubmit,
            idPrefix: 'test',
            inputEl: ref(inputEl),
            model,
            suggestions: () => suggestions.value,
        }),
    );
    return { close, combobox, emitSelect, emitSubmit, inputEl, model, suggestions };
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

describe('useAutocompleteCombobox arrow navigation and mirroring', () => {
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

describe('useAutocompleteCombobox Enter semantics', () => {
    it('submits the typed query and closes when nothing is highlighted', () => {
        const { close, combobox, emitSubmit } = makeCombobox();
        const event = keydown('Enter');
        combobox.onKeydown(event);
        expect(emitSubmit).toHaveBeenCalledWith('solar');
        expect(close).toHaveBeenCalled();
        // keeps a surrounding <form> from natively submitting
        expect(event.defaultPrevented).toBe(true);
    });

    it('selects a keyboard-highlighted suggestion', () => {
        const { close, combobox, emitSelect, emitSubmit, model } = makeCombobox();
        combobox.onKeydown(keydown('ArrowDown'));
        combobox.onKeydown(keydown('Enter'));
        expect(emitSelect).toHaveBeenCalledWith({ id: 'a', text: 'solar batteries' });
        expect(emitSubmit).not.toHaveBeenCalled();
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
        const { combobox, emitSelect, emitSubmit } = makeCombobox();
        combobox.onKeydown(keydown('Enter', { isComposing: true }));
        expect(emitSubmit).not.toHaveBeenCalled();
        expect(emitSelect).not.toHaveBeenCalled();
    });

    it('submits, not selects, after a list change reset the highlight', async () => {
        const { combobox, emitSelect, emitSubmit, suggestions } = makeCombobox(THREE);
        combobox.onKeydown(keydown('ArrowDown'));
        suggestions.value = [{ id: 'z', text: 'banana' }];
        await nextTick();
        combobox.onKeydown(keydown('Enter'));
        expect(emitSubmit).toHaveBeenCalled();
        expect(emitSelect).not.toHaveBeenCalled();
    });
});

describe('useAutocompleteCombobox selection, clearing, and focus retention', () => {
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

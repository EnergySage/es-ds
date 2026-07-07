// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import type { ComponentPublicInstance, Ref } from 'vue';
import { nextTick, ref } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';
import { useAutocompleteShell } from './autocomplete-shell';

function makeShell() {
    const inputEl = document.createElement('input');
    document.body.append(inputEl);
    const contentEl = ref<HTMLElement | null>(document.createElement('div'));
    const model = ref('solar');
    const suggestions = ref<EsAutocompleteSuggestion[]>([{ id: 'a', text: 'solar batteries' }]);
    const close = vi.fn();
    const emitSelect = vi.fn();
    const emitSubmit = vi.fn();
    const shell = useAutocompleteShell({
        close,
        contentEl,
        emitSelect,
        emitSubmit,
        inputRef: ref({ $el: inputEl }) as unknown as Ref<ComponentPublicInstance | null>,
        model,
        suggestions: () => suggestions.value,
    });
    return { close, contentEl, emitSelect, emitSubmit, inputEl, model, shell, suggestions };
}

/** a keydown Enter as the shells' capture handler receives it */
function enterEvent(target: EventTarget, init: { isComposing?: boolean } = {}) {
    const event = {
        isComposing: init.isComposing ?? false,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        target,
    };
    return event as unknown as KeyboardEvent & { preventDefault: ReturnType<typeof vi.fn> };
}

function highlightAnItem(contentEl: Ref<HTMLElement | null>) {
    const item = document.createElement('div');
    item.setAttribute('data-highlighted', '');
    contentEl.value!.append(item);
    return item;
}

describe('useAutocompleteShell onEnterKey', () => {
    it('submits the typed query and closes when nothing is highlighted', () => {
        const { close, emitSubmit, inputEl, shell } = makeShell();
        const event = enterEvent(inputEl);
        shell.onEnterKey(event);
        expect(emitSubmit).toHaveBeenCalledWith('solar');
        expect(close).toHaveBeenCalled();
        // keeps a surrounding <form> from natively submitting, and keeps Reka
        // from acting on the same keystroke
        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('submits even when an item is highlighted, if the user did not create the highlight', () => {
        // Reka auto-highlights the first item when results arrive — Enter on an
        // auto-highlight must submit, not select
        const { contentEl, emitSubmit, inputEl, shell } = makeShell();
        highlightAnItem(contentEl);
        shell.onEnterKey(enterEvent(inputEl));
        expect(emitSubmit).toHaveBeenCalledWith('solar');
    });

    it('lets the event through to Reka (selection) for a user-created highlight', () => {
        const { close, contentEl, emitSubmit, inputEl, shell } = makeShell();
        highlightAnItem(contentEl);
        shell.markUserHighlight();
        const event = enterEvent(inputEl);
        shell.onEnterKey(event);
        expect(emitSubmit).not.toHaveBeenCalled();
        expect(close).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('a user highlight no longer counts once the suggestion list changes', async () => {
        const { contentEl, emitSubmit, inputEl, shell, suggestions } = makeShell();
        highlightAnItem(contentEl);
        shell.markUserHighlight();
        suggestions.value = [{ id: 'b', text: 'solar financing' }];
        await nextTick();
        shell.onEnterKey(enterEvent(inputEl));
        expect(emitSubmit).toHaveBeenCalledWith('solar');
    });

    it('ignores the Enter that commits an IME composition', () => {
        const { close, emitSubmit, inputEl, shell } = makeShell();
        shell.onEnterKey(enterEvent(inputEl, { isComposing: true }));
        expect(emitSubmit).not.toHaveBeenCalled();
        expect(close).not.toHaveBeenCalled();
    });

    it('ignores Enter that did not originate from the input (e.g. the clear button)', () => {
        const { close, emitSubmit, shell } = makeShell();
        const clearButton = document.createElement('button');
        const event = enterEvent(clearButton);
        shell.onEnterKey(event);
        expect(emitSubmit).not.toHaveBeenCalled();
        expect(close).not.toHaveBeenCalled();
        // the button's own click-on-Enter must still fire
        expect(event.preventDefault).not.toHaveBeenCalled();
    });
});

describe('useAutocompleteShell selection and clearing', () => {
    it('onSelect closes the shell and emits the full suggestion', () => {
        const { close, emitSelect, shell } = makeShell();
        const suggestion = { id: 'a', text: 'solar batteries', value: { anything: true } };
        shell.onSelect(suggestion);
        expect(close).toHaveBeenCalled();
        expect(emitSelect).toHaveBeenCalledWith(suggestion);
    });

    it('onClear empties the model and refocuses the input', () => {
        const { inputEl, model, shell } = makeShell();
        shell.onClear();
        expect(model.value).toBe('');
        expect(document.activeElement).toBe(inputEl);
    });
});

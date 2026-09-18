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
    const clearHighlight = vi.fn();
    const close = vi.fn();
    const emitSelect = vi.fn();
    const emitSubmit = vi.fn();
    const shell = useAutocompleteShell({
        clearHighlight,
        close,
        contentEl,
        emitSelect,
        emitSubmit,
        inputRef: ref({ $el: inputEl }) as unknown as Ref<ComponentPublicInstance | null>,
        model,
        suggestions: () => suggestions.value,
    });
    return { clearHighlight, close, contentEl, emitSelect, emitSubmit, inputEl, model, shell, suggestions };
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

function appendItem(contentEl: Ref<HTMLElement | null>, highlighted: boolean) {
    const item = document.createElement('div');
    item.dataset.esAutocompleteItem = '';
    if (highlighted) {
        item.setAttribute('data-highlighted', '');
    }
    contentEl.value!.append(item);
    return item;
}

function highlightAnItem(contentEl: Ref<HTMLElement | null>) {
    return appendItem(contentEl, true);
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
        // the arrow keydown runs first; Reka then highlights the item
        const item = appendItem(contentEl, false);
        shell.onArrowDown();
        item.setAttribute('data-highlighted', '');
        const event = enterEvent(inputEl);
        shell.onEnterKey(event);
        expect(emitSubmit).not.toHaveBeenCalled();
        expect(close).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();
        expect(event.stopPropagation).not.toHaveBeenCalled();
    });

    it('a user highlight no longer counts once the suggestion list changes', async () => {
        const { contentEl, emitSubmit, inputEl, shell, suggestions } = makeShell();
        const item = appendItem(contentEl, false);
        shell.onArrowDown();
        item.setAttribute('data-highlighted', '');
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

describe('useAutocompleteShell keyboard-highlight mirroring', () => {
    it('mirrors a keyboard-highlighted suggestion into the display, leaving the model untouched', async () => {
        const { model, shell } = makeShell();
        shell.onArrowDown();
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.displayText.value).toBe('solar batteries');
        expect(model.value).toBe('solar');
    });

    it('does not mirror pointer (hover) highlights — hovering must not change the field', async () => {
        const { shell } = makeShell();
        shell.markPointerHighlight();
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.displayText.value).toBe('solar');
    });

    it('does not mirror auto-highlights the user never navigated to', async () => {
        const { shell } = makeShell();
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.displayText.value).toBe('solar');
    });

    it('restores the typed text when the shell resets (close) and when the list changes', async () => {
        const { shell, suggestions } = makeShell();
        shell.onArrowDown();
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.displayText.value).toBe('solar batteries');

        shell.resetUserHighlight();
        expect(shell.displayText.value).toBe('solar');

        shell.onArrowDown();
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        suggestions.value = [{ id: 'b', text: 'solar financing' }];
        await nextTick();
        expect(shell.displayText.value).toBe('solar');
    });

    it('typing ends keyboard navigation: the highlight Reka re-creates after the model change is neither mirrored nor user-made', async () => {
        const { model, shell } = makeShell();
        shell.onArrowDown();
        shell.onHighlight({ value: '41 Franklin Ave' });
        await nextTick();
        expect(shell.displayText.value).toBe('41 Franklin Ave');

        // the user types a character: the input event fires before Reka reacts
        // to the model change by highlighting the first item again
        shell.onUserInput();
        shell.onHighlight({ value: '12 Maple Ave' });
        await nextTick();
        expect(shell.displayText.value).toBe('41 Franklin Ave'); // not overwritten by the system highlight
        expect(shell.userHighlighted.value).toBe(false); // so the highlight guard clears it
        expect(model.value).toBe('solar');
    });

    it('the field ring yields to the option ring only while a keyboard highlight is active', async () => {
        const { shell } = makeShell();
        expect(shell.keyboardHighlightActive.value).toBe(false);

        // arrows with nothing highlighted yet: the field keeps its ring
        shell.onArrowDown();
        expect(shell.keyboardHighlightActive.value).toBe(false);

        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.keyboardHighlightActive.value).toBe(true);

        // typing hands the ring back to the field
        shell.onUserInput();
        expect(shell.keyboardHighlightActive.value).toBe(false);

        // pointer highlights never take the ring from the field
        shell.markPointerHighlight();
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.keyboardHighlightActive.value).toBe(false);
    });

    it('ArrowUp from the first suggestion returns to the input: highlight cleared, text restored', async () => {
        const { clearHighlight, contentEl, shell } = makeShell();
        const item = appendItem(contentEl, false);
        shell.onArrowDown();
        item.setAttribute('data-highlighted', '');
        shell.onHighlight({ value: 'solar batteries' });
        await nextTick();
        expect(shell.displayText.value).toBe('solar batteries');

        shell.onArrowUp();
        await nextTick();
        expect(clearHighlight).toHaveBeenCalled();
        expect(shell.displayText.value).toBe('solar');
        expect(shell.userHighlighted.value).toBe(false);
    });

    it('ArrowDown from the last suggestion returns to the input, completing the cycle', async () => {
        const { clearHighlight, contentEl, shell } = makeShell();
        appendItem(contentEl, false); // the first item
        appendItem(contentEl, true); // the highlighted last item
        shell.onArrowDown();
        await nextTick();
        expect(clearHighlight).toHaveBeenCalled();
        expect(shell.userHighlighted.value).toBe(false);
    });

    it('ArrowUp from a lower suggestion is plain navigation: nothing cleared or restored', async () => {
        const { clearHighlight, contentEl, shell } = makeShell();
        appendItem(contentEl, false); // the first item, not highlighted
        appendItem(contentEl, true); // the highlighted second item
        shell.onArrowUp();
        await nextTick();
        expect(clearHighlight).not.toHaveBeenCalled();
        expect(shell.userHighlighted.value).toBe(true);
    });

    it('ArrowDown from an earlier suggestion is plain navigation: nothing cleared or restored', async () => {
        const { clearHighlight, contentEl, shell } = makeShell();
        appendItem(contentEl, true); // the highlighted first item
        appendItem(contentEl, false); // the last item
        shell.onArrowDown();
        await nextTick();
        expect(clearHighlight).not.toHaveBeenCalled();
        expect(shell.userHighlighted.value).toBe(true);
    });
});

describe('useAutocompleteShell selection and clearing', () => {
    it('onSelect closes the shell (handing it the selected text) and emits the full suggestion', () => {
        const { close, emitSelect, shell } = makeShell();
        const suggestion = { id: 'a', text: 'solar batteries', value: { anything: true } };
        shell.onSelect(suggestion);
        // the model does not hold the text yet at close time; a shell that
        // renders the final text takes it from this argument
        expect(close).toHaveBeenCalledWith('solar batteries');
        expect(emitSelect).toHaveBeenCalledWith(suggestion);
    });

    it('selection reveals the caret at the end of the filled-in text', async () => {
        const { inputEl, shell } = makeShell();
        inputEl.focus();
        // the selection writes a long value into the input; the browser leaves
        // the field scrolled to the start
        const text = '18 Narragansett Boulevard, Unit B, Providence, RI 02906';
        shell.onSelect({ id: 'a', text });
        inputEl.value = text;
        await nextTick();
        await nextTick();
        expect(inputEl.selectionStart).toBe(text.length);
        expect(inputEl.selectionEnd).toBe(text.length);
    });

    it('onClear empties the model and refocuses the input', () => {
        const { inputEl, model, shell } = makeShell();
        shell.onClear();
        expect(model.value).toBe('');
        expect(document.activeElement).toBe(inputEl);
    });
});

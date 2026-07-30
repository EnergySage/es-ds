// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import type { ComponentPublicInstance, Ref } from 'vue';
import { nextTick, ref } from 'vue';
import { useAutocompleteContentEl } from './autocomplete-content-el';

// $el swaps between a placeholder comment node and the real element as the panel
// mounts/unmounts, and it is NOT reactive — this composable exists because a
// computed over it silently caches the wrong node (which caused both a
// ResizeObserver crash and a permanently invisible panel during development)

function makeInstance(el: Node) {
    return ref({ $el: el }) as unknown as Ref<ComponentPublicInstance | null>;
}

/** the composable resolves after `active` changes and the DOM settles (one tick) */
async function settle() {
    await nextTick();
    await nextTick();
}

describe('useAutocompleteContentEl', () => {
    it('is null until activated', () => {
        const contentEl = useAutocompleteContentEl(makeInstance(document.createElement('div')), ref(false));
        expect(contentEl.value).toBeNull();
    });

    it('resolves the element once active, and clears on deactivate', async () => {
        const element = document.createElement('div');
        const active = ref(false);
        const contentEl = useAutocompleteContentEl(makeInstance(element), active);

        active.value = true;
        await settle();
        expect(contentEl.value).toBe(element);

        active.value = false;
        await settle();
        expect(contentEl.value).toBeNull();
    });

    it('never resolves a placeholder comment node as the element', async () => {
        const active = ref(false);
        const contentEl = useAutocompleteContentEl(makeInstance(document.createComment('placeholder')), active);

        active.value = true;
        await settle();
        expect(contentEl.value).toBeNull();
    });

    it('re-resolves a swapped $el on the next activation', async () => {
        const instance = makeInstance(document.createComment('placeholder'));
        const active = ref(false);
        const contentEl = useAutocompleteContentEl(instance, active);

        active.value = true;
        await settle();
        expect(contentEl.value).toBeNull();

        // the panel unmounts, then remounts with a real element in $el
        active.value = false;
        await settle();
        const element = document.createElement('div');
        (instance.value as unknown as { $el: Node }).$el = element;
        active.value = true;
        await settle();
        expect(contentEl.value).toBe(element);
    });
});

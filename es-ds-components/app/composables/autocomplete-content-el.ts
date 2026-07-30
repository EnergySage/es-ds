import type { ComponentPublicInstance, Ref } from 'vue';
import { nextTick, ref, watch } from 'vue';

/**
 * Resolve the AutocompleteContent panel element from its component ref.
 *
 * $el is not reactive — and is a placeholder comment node while the panel is
 * unmounted — so a computed over it silently caches the wrong node. Instead the
 * element is re-resolved whenever `active` (the open state that mounts the panel)
 * changes and the DOM has settled. Both autocomplete shells share this.
 */
export function useAutocompleteContentEl(contentRef: Ref<ComponentPublicInstance | null>, active: Ref<boolean>) {
    const contentEl = ref<HTMLElement | null>(null);
    watch(active, async (isActive) => {
        await nextTick();
        const el = contentRef.value?.$el as Node | undefined;
        contentEl.value = isActive && el && el.nodeType === Node.ELEMENT_NODE ? (el as HTMLElement) : null;
    });
    return contentEl;
}

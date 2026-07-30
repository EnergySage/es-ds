<script setup lang="ts">
import { injectListboxRootContext } from 'reka-ui';

interface Props {
    /** whether the current highlight came from the user (hover or arrow keys) */
    userHighlighted: boolean;
}

const props = defineProps<Props>();

// Reka auto-highlights the first item when results arrive from an empty list (and
// re-highlights the selected item on open), but Enter only selects a highlight the
// USER created (see useAutocompleteShell) — an auto-highlight would therefore
// render as active while behaving as inactive. Clear it at the source, the Listbox
// context's highlightedElement ref, so the visual highlight, aria-activedescendant,
// the arrow keys' starting position, and Enter always agree: a suggestion is only
// highlighted when hovering or arrowing to it, and Enter then selects it.
//
// This component must render inside AutocompleteRoot so the inject resolves.
const listbox = injectListboxRootContext();
watch(
    () => listbox.highlightedElement.value,
    (element) => {
        if (element && !props.userHighlighted) {
            listbox.highlightedElement.value = null;
        }
    },
);
</script>

<template>
    <!-- renderless (nothing is ever passed to this slot): the component exists
         only to run the highlight guard inside AutocompleteRoot's inject tree -->
    <slot />
</template>

<script setup lang="ts">
import { AutocompleteItem } from 'reka-ui';
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
    /** whether the current highlight comes from keyboard navigation (focus-visible ring) */
    keyboardNav?: boolean;
    query: string;
    suggestion: EsAutocompleteSuggestion;
}

defineProps<Props>();

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
}>();
</script>

<template>
    <autocomplete-item
        class="es-autocomplete-item d-block px-100 py-50"
        :class="{ 'es-autocomplete-item--keyboard-nav': keyboardNav }"
        data-es-autocomplete-item
        :value="suggestion.text"
        @select="emit('select', suggestion)">
        <slot
            :query="query"
            :suggestion="suggestion">
            <!-- the query-matching portions render regular weight and the predictive
                 portions render bold, so users scan what would be ADDED to their
                 query (the inverse of most libraries) -->
            <es-autocomplete-suggestion-text
                :query="query"
                :text="suggestion.text" />
        </slot>
    </autocomplete-item>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete-item {
    /* 48px and higher rows, padding inclusive (rows have no margins): an adequate tap
     * target on any touch device — tablets (≥md) get the desktop popover, not
     * the takeover. Rows share one uniform height per list; the fit-to-viewport
     * trim divides the available height by it to add/remove whole rows. */
    align-content: center;
    cursor: pointer;
    min-height: 3rem;

    @media not (prefers-reduced-motion) {
        transition: background-color 0.05s ease-in-out;
    }

    /* hover and keyboard navigation both surface as data-highlighted */
    &[data-highlighted] {
        background-color: variables.$blue-50;
    }

    /* focus-visible ring for the keyboard-highlighted suggestion, mirroring
     * es-dropdown-select's option ring; drawn inset (within the panel's
     * overflow: hidden edge) and rounded to match the panel's border radius */
    &--keyboard-nav[data-highlighted] {
        position: relative;

        &::after {
            border: 0.125rem solid variables.$blue-600;
            border-radius: 2px;
            content: '';
            inset: 0;
            pointer-events: none;
            position: absolute;
        }
    }

    &:active {
        background-color: variables.$blue-100;
    }
}
</style>

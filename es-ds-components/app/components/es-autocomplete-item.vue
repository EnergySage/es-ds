<script setup lang="ts">
import type { EsAutocompleteSuggestion } from '../types';

/**
 * one suggestion row, deliberately not focusable: the combobox pattern keeps
 * real focus in the input and points aria-activedescendant here, so nothing can
 * drag focus off the field while navigating. aria-selected tracks the highlight.
 */
interface Props {
    /** whether this row is the highlighted one (aria-activedescendant target) */
    highlighted?: boolean;
    /** whether the current highlight comes from keyboard navigation (focus-visible ring) */
    keyboardNav?: boolean;
    optionId: string;
    query: string;
    suggestion: EsAutocompleteSuggestion;
}

defineProps<Props>();

const emit = defineEmits<{
    pointermove: [];
    select: [];
}>();
</script>

<template>
    <div
        :id="optionId"
        class="es-autocomplete-item d-block px-100 py-50"
        :class="{ 'es-autocomplete-item--keyboard-nav': keyboardNav }"
        data-es-autocomplete-item
        role="option"
        :aria-selected="highlighted"
        :data-highlighted="highlighted ? '' : undefined"
        @click="emit('select')"
        @pointermove="emit('pointermove')">
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
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete-item {
    /* 48px and up, padding inclusive: an adequate tap target on any touch device.
     * rows share one uniform height per list, which the row trim
     * divides the available height by to add or remove whole rows. */
    align-content: center;
    cursor: pointer;
    min-height: 3rem;

    @media not (prefers-reduced-motion) {
        transition: background-color 0.05s ease-in-out;
    }

    /* the highlight, placed by the pointer or by the arrows */
    &[data-highlighted] {
        background-color: variables.$blue-50;
    }

    /* a row under the pointer shades whether or not it holds the highlight,
     * since clicking it chooses it either way. the arrows keep the highlight
     * while they are navigating, and their focus ring is what tells the two
     * apart. asked of pointer as well as hover, as Samsung's Android devices
     * claim to hover and would otherwise shade a row until the next tap. */
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            background-color: variables.$blue-50;
        }
    }

    /* focus-visible ring for the keyboard-highlighted suggestion, as
     * es-dropdown-select draws it: inset within the panel's overflow edge */
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

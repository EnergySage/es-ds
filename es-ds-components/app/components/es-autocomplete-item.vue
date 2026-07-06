<script setup lang="ts">
import { AutocompleteItem } from 'reka-ui';
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
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
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    // highlightOnHover is enabled on the root, so hover and keyboard
    // navigation both surface as data-highlighted
    &[data-highlighted] {
        background-color: variables.$blue-50;
    }

    &:active {
        background-color: variables.$blue-100;
    }
}
</style>

<script setup lang="ts">
import { AutocompleteItem } from 'reka-ui';
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
    query: string;
    suggestion: EsAutocompleteSuggestion;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
}>();

// the typed prefix renders regular weight and the predictive remainder renders bold,
// so users scan what would be ADDED to their query (the inverse of most libraries)
const typedLength = computed(() => {
    const query = props.query.trim();
    if (query && props.suggestion.text.toLowerCase().startsWith(query.toLowerCase())) {
        return query.length;
    }
    return props.suggestion.text.length;
});
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
            <span>
                <span>{{ suggestion.text.slice(0, typedLength) }}</span>
                <span class="font-weight-bold">{{ suggestion.text.slice(typedLength) }}</span>
            </span>
            <span
                v-if="suggestion.scope"
                class="es-autocomplete-item-scope text-gray-700">
                {{ suggestion.scope.label }}
            </span>
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

.es-autocomplete-item-scope {
    font-style: italic;
    margin-left: 0.25rem;
}
</style>

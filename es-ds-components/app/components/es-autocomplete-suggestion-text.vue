<script setup lang="ts">
import type { EsAutocompleteTextSegment } from '../types';
import { splitAutocompleteText } from '../utils/autocomplete';

interface Props {
    query?: string;
    /**
     * pre-computed segments, e.g. from splitAutocompleteTextLines or a search
     * API's own match offsets. when provided, text/query are ignored.
     */
    segments?: EsAutocompleteTextSegment[] | null;
    text?: string;
}

const props = withDefaults(defineProps<Props>(), {
    query: '',
    segments: null,
    text: '',
});

const resolvedSegments = computed(() => props.segments ?? splitAutocompleteText(props.text, props.query));
</script>

<template>
    <span>
        <span
            v-for="(segment, index) in resolvedSegments"
            :key="index"
            :class="{ 'font-weight-bold': segment.predictive }"
            >{{ segment.text }}</span
        >
    </span>
</template>

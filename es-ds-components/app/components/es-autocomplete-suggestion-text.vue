<script setup lang="ts">
import type { EsAutocompleteTextSegment } from '../types';

interface Props {
    query?: string;
    /**
     * Pre-computed segments — e.g. from splitAutocompleteTextLines when several
     * lines form one suggestion, or built from a search API's own match offsets.
     * When provided, text/query are ignored.
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

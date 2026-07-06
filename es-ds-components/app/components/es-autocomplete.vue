<script setup lang="ts">
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
    cancelText?: string;
    clearText?: string;
    delay?: number;
    disabled?: boolean;
    id: string;
    label: string;
    labelSrOnly?: boolean;
    minChars?: number;
    noResultsText?: string;
    placeholder?: string;
    promptText?: string;
    required?: boolean;
    state?: boolean | null;
    suggestions: EsAutocompleteSuggestion[];
}

const props = withDefaults(defineProps<Props>(), {
    cancelText: 'Cancel',
    clearText: 'Clear',
    delay: 300,
    disabled: false,
    labelSrOnly: false,
    minChars: 1,
    noResultsText: 'No results found',
    placeholder: '',
    promptText: 'Type for suggestions',
    required: false,
    state: null,
});

const emit = defineEmits<{
    complete: [query: string];
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const slots = useSlots();

const errorId = computed(() => `${props.id}-error`);
const helpId = computed(() => `${props.id}-help`);
const showError = computed(() => props.state === false && (!!slots.errorMessage || props.required));
const describedBy = computed(() => (showError.value ? `${helpId.value} ${errorId.value}` : helpId.value));

// pass an empty list below minChars so no suggestions show for too-short queries
const effectiveSuggestions = computed(() => {
    if ((model.value ?? '').trim().length < props.minChars) {
        return [];
    }
    return props.suggestions;
});

let searchTimeout: ReturnType<typeof setTimeout> | null = null;
let lastSelectedText: string | null = null;

// whether the app's most recent suggestions update was empty — this is what
// distinguishes "search found nothing" (show noResultsText) from "no search has
// answered yet" (show promptText)
const noResults = ref(false);
watch(
    () => props.suggestions,
    (list) => {
        noResults.value = list.length === 0;
    },
);

// what an open panel shows when there are no suggestions to render: the
// no-results message once a search has actually come back empty, otherwise
// the prompt (nothing searched yet, or the query is below minChars)
const queryLongEnough = computed(() => model.value.trim().length >= props.minChars);
const panelMessage = computed(() => {
    if (effectiveSuggestions.value.length) {
        return '';
    }
    return noResults.value && queryLongEnough.value ? props.noResultsText : props.promptText;
});

watch(model, (newValue) => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
        searchTimeout = null;
    }
    // selecting a suggestion copies its text into the input; that change is
    // terminal and must not trigger another fetch
    if (lastSelectedText !== null && newValue === lastSelectedText) {
        lastSelectedText = null;
        return;
    }
    lastSelectedText = null;
    const query = (newValue ?? '').trim();
    if (query.length < props.minChars) {
        // a fresh (or cleared) query starts from the prompt state, not a stale
        // "no results" from the previous query
        noResults.value = false;
        return;
    }
    // the edited query's search is now pending: show promptText, not the previous
    // query's "no results", until the app answers via the suggestions prop
    noResults.value = false;
    searchTimeout = setTimeout(() => {
        emit('complete', query);
    }, props.delay);
});

onUnmounted(() => {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
});

function onSelect(suggestion: EsAutocompleteSuggestion) {
    lastSelectedText = suggestion.text;
    emit('select', suggestion);
}

function onSubmit(query: string) {
    // submitting is terminal for this query: cancel any pending 'complete' so
    // late-arriving suggestions don't reopen the panel
    if (searchTimeout) {
        clearTimeout(searchTimeout);
        searchTimeout = null;
    }
    emit('submit', query);
}
</script>

<template>
    <div class="es-autocomplete">
        <es-autocomplete-desktop
            :id="id"
            v-model="model"
            :clear-text="clearText"
            :described-by="describedBy"
            :disabled="disabled"
            :label="label"
            :label-sr-only="labelSrOnly"
            :panel-message="panelMessage"
            :placeholder="placeholder"
            :required="required"
            :state="state"
            :suggestions="effectiveSuggestions"
            @select="onSelect"
            @submit="onSubmit">
            <template
                v-if="$slots.item"
                #item="slotProps">
                <slot
                    name="item"
                    v-bind="slotProps" />
            </template>
        </es-autocomplete-desktop>
        <es-autocomplete-mobile
            :id="id"
            v-model="model"
            :cancel-text="cancelText"
            :clear-text="clearText"
            :described-by="describedBy"
            :disabled="disabled"
            :label="label"
            :label-sr-only="labelSrOnly"
            :panel-message="panelMessage"
            :placeholder="placeholder"
            :required="required"
            :state="state"
            :suggestions="effectiveSuggestions"
            @select="onSelect"
            @submit="onSubmit">
            <template
                v-if="$slots.item"
                #item="slotProps">
                <slot
                    name="item"
                    v-bind="slotProps" />
            </template>
        </es-autocomplete-mobile>
        <small
            v-if="showError"
            :id="errorId"
            aria-live="polite"
            class="text-danger"
            role="status">
            <slot
                v-if="$slots.errorMessage"
                name="errorMessage" />
            <template v-else> This field is required. </template>
        </small>
        <small
            v-else-if="$slots.message"
            class="text-muted">
            <slot name="message" />
        </small>
        <div
            :id="helpId"
            class="sr-only">
            Type your search and select from dropdown suggestions.
        </div>
    </div>
</template>

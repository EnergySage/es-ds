<script setup lang="ts">
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
    clearText?: string;
    closeText?: string;
    delay?: number;
    disabled?: boolean;
    label: string;
    labelSrOnly?: boolean;
    minChars?: number;
    noResultsText?: string;
    placeholder?: string;
    promptText?: string;
    required?: boolean;
    showOverlayOnFocus?: boolean;
    state?: boolean | null;
    suggestionCountText?: (count: number) => string;
    suggestions: EsAutocompleteSuggestion[];
}

const props = withDefaults(defineProps<Props>(), {
    clearText: 'Clear',
    // 'Close', not 'Cancel': dismissing the takeover keeps whatever is in the
    // input — the takeover is just a full-screen way of editing the value
    closeText: 'Close',
    delay: 300,
    disabled: false,
    labelSrOnly: false,
    minChars: 1,
    noResultsText: 'No results found',
    placeholder: '',
    promptText: 'Type for suggestions',
    required: false,
    // most uses are a field within a larger form, where dimming the rest of the
    // page would obscure sibling fields; the overlay suits a standalone primary
    // search (e.g. site search in a sticky header)
    showOverlayOnFocus: false,
    state: null,
    suggestionCountText: (count: number) =>
        count === 1 ? '1 suggestion available' : `${count} suggestions available`,
});

const emit = defineEmits<{
    complete: [query: string];
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const slots = useSlots();

const id = useId();
const errorId = `${id}-error`;
const helpId = `${id}-help`;
const triggerHelpId = `${id}-trigger-help`;
const showError = computed(() => props.state === false && (!!slots.errorMessage || props.required));
const describedBy = computed(() => (showError.value ? `${helpId} ${errorId}` : helpId));
// the mobile fake field gets its own hint: a button's description should say what
// activating it does, while the input's says what to do once it has focus
const triggerDescribedBy = computed(() => (showError.value ? `${triggerHelpId} ${errorId}` : triggerHelpId));

// the debounced 'complete' contract, minChars gating, and prompt/no-results
// messaging live in useAutocompleteSearch so the contract is unit-testable
const { effectiveSuggestions, noResultsAnnouncement, onSelect, onSubmit, panelMessage } = useAutocompleteSearch({
    delay: () => props.delay,
    emitComplete: (query) => emit('complete', query),
    emitSelect: (suggestion) => emit('select', suggestion),
    emitSubmit: (query) => emit('submit', query),
    minChars: () => props.minChars,
    model,
    noResultsText: () => props.noResultsText,
    promptText: () => props.promptText,
    suggestions: () => props.suggestions,
});
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
            :no-results-announcement="noResultsAnnouncement"
            :panel-message="panelMessage"
            :placeholder="placeholder"
            :required="required"
            :show-overlay-on-focus="showOverlayOnFocus"
            :state="state"
            :suggestion-count-text="suggestionCountText"
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
            :clear-text="clearText"
            :close-text="closeText"
            :described-by="describedBy"
            :disabled="disabled"
            :label="label"
            :label-sr-only="labelSrOnly"
            :no-results-announcement="noResultsAnnouncement"
            :panel-message="panelMessage"
            :placeholder="placeholder"
            :required="required"
            :state="state"
            :suggestion-count-text="suggestionCountText"
            :suggestions="effectiveSuggestions"
            :trigger-described-by="triggerDescribedBy"
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
        <!-- aria-hidden keeps these hints out of a screen reader's reading order —
             they exist only to be resolved through aria-describedby on focus, and
             the accessible-name computation includes referenced hidden elements -->
        <div
            :id="helpId"
            aria-hidden="true"
            class="sr-only">
            Type your search and select from dropdown suggestions.
        </div>
        <div
            :id="triggerHelpId"
            aria-hidden="true"
            class="sr-only">
            Opens a search with suggestions as you type.
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete {
    /* match EsFormInput, but allow override by utility classes */
    margin-bottom: variables.$spacer;
}
</style>

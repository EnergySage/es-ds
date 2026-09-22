<script setup lang="ts">
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
    autocomplete?: string;
    clearText?: string;
    closeText?: string;
    delay?: number;
    disabled?: boolean;
    helpText?: string;
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
    triggerHelpText?: string;
}

const props = withDefaults(defineProps<Props>(), {
    // keeps browser autofill from competing with our
    // suggestions list, but can be overridden if necessary
    autocomplete: 'off',
    clearText: 'Clear',
    closeText: 'Close',
    delay: 300,
    disabled: false,
    helpText: 'Type your search and select from dropdown suggestions.',
    labelSrOnly: false,
    minChars: 1,
    noResultsText: 'No results found',
    placeholder: '',
    promptText: 'Type for suggestions',
    required: false,
    showOverlayOnFocus: false,
    state: null,
    suggestionCountText: (count: number) =>
        count === 1 ? '1 suggestion available' : `${count} suggestions available`,
    triggerHelpText: 'Opens a search with suggestions as you type.',
});

const emit = defineEmits<{
    blur: [];
    complete: [query: string];
    select: [suggestion: EsAutocompleteSuggestion];
}>();

const model = defineModel<string>({ default: '' });

const slots = useSlots();

const id = useId();
const errorId = `${id}-error`;
const helpId = `${id}-help`;
const triggerHelpId = `${id}-trigger-help`;
const showError = computed(() => props.state === false && (!!slots.errorMessage || props.required));
const describedBy = computed(() => (showError.value ? `${helpId} ${errorId}` : helpId));
// the mobile trigger gets its own hint: it says what activating the field does,
// while the takeover input's says what to do once it has focus
const triggerDescribedBy = computed(() => (showError.value ? `${triggerHelpId} ${errorId}` : triggerHelpId));

// the debounced 'complete' contract, minChars gating, and prompt/no-results
// messaging live in useAutocompleteSearch so the contract is unit-testable
const { effectiveSuggestions, noResultsAnnouncement, onSelect, panelMessage } = useAutocompleteSearch({
    delay: () => props.delay,
    emitComplete: (query) => emit('complete', query),
    emitSelect: (suggestion) => emit('select', suggestion),
    minChars: () => props.minChars,
    model,
    noResultsText: () => props.noResultsText,
    promptText: () => props.promptText,
    suggestions: () => props.suggestions,
});
</script>

<template>
    <div class="es-autocomplete">
        <div class="es-autocomplete-shell-desktop">
            <es-autocomplete-desktop
                :id="id"
                v-model="model"
                :autocomplete="autocomplete"
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
                @blur="emit('blur')"
                @select="onSelect">
                <template
                    v-if="$slots.item"
                    #item="slotProps">
                    <slot
                        name="item"
                        v-bind="slotProps" />
                </template>
            </es-autocomplete-desktop>
        </div>
        <div class="es-autocomplete-shell-mobile">
            <es-autocomplete-mobile
                :id="id"
                v-model="model"
                :autocomplete="autocomplete"
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
                @blur="emit('blur')"
                @select="onSelect">
                <template
                    v-if="$slots.item"
                    #item="slotProps">
                    <slot
                        name="item"
                        v-bind="slotProps" />
                </template>
            </es-autocomplete-mobile>
        </div>
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
             they exist only to be resolved through aria-describedby on focus.
             kept as separate elements so their IDs can be listed along with the
             error message ID, when applicable. -->
        <div
            :id="helpId"
            aria-hidden="true"
            class="sr-only">
            {{ helpText }}
        </div>
        <div
            :id="triggerHelpId"
            aria-hidden="true"
            class="sr-only">
            {{ triggerHelpText }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete {
    /* match EsFormInput, but allow override by utility classes */
    margin-bottom: variables.$spacer;
}

/* show the desktop autocomplete by default */
.es-autocomplete-shell-mobile {
    display: none;
}

/* show the mobile fullscreen takeover experience only on small touch devices */
@include breakpoints.media-breakpoint-down(sm) {
    @media (hover: none) {
        .es-autocomplete-shell-desktop {
            display: none;
        }

        .es-autocomplete-shell-mobile {
            display: block;
        }
    }
}
</style>

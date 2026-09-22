<script setup lang="ts">
import type { EsAutocompleteSuggestion } from '../types';

interface Props {
    autocomplete?: string;
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
    // 'off' by default: the browser's own saved-value dropdown would compete with
    // the suggestion list. A consumer whose field maps to a real autofill token
    // (an address, a name) can trade that back the other way.
    autocomplete: 'off',
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
        <!-- which shell this viewport gets is decided here, once, so neither
             shell knows or cares whether it is the one on screen -->
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
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete {
    /* match EsFormInput, but allow override by utility classes */
    margin-bottom: variables.$spacer;
}

/* Which shell a viewport gets, decided in CSS alone: both are server-rendered
 * with one under display: none, so there is no capability check to hydrate and
 * no flash of the wrong shell.
 *
 * The takeover is for small TOUCH screens, so width is only half the question —
 * on its own it hands a desktop page zoomed to 200-400% (WCAG reflow) a
 * tap-to-open dialog, where that user's habits (click the field, type, arrow)
 * stop working. Pairing the breakpoint with the primary input's hover
 * capability keeps them on the popover. Hover is the whole test: requiring
 * pointer: coarse as well would only add a second way to be wrong, and a touch
 * device that misreports hover keeps the popover, which a finger operates
 * fine — the safe direction for the failure. */
.es-autocomplete-shell-mobile {
    display: none;
}

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

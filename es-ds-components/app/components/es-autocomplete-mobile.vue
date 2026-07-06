<script setup lang="ts">
import {
    AutocompleteAnchor,
    AutocompleteContent,
    AutocompleteInput,
    AutocompleteRoot,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'reka-ui';
import type { ComponentPublicInstance } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// Baymard: keep the list manageable — at most 8 suggestions on mobile,
// further reduced by the fit-to-viewport trim
const MAX_VISIBLE = 8;

interface Props {
    cancelText?: string;
    clearText?: string;
    describedBy: string;
    disabled?: boolean;
    id: string;
    label: string;
    labelSrOnly?: boolean;
    minChars?: number;
    noResults?: boolean;
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
    disabled: false,
    labelSrOnly: false,
    minChars: 1,
    noResults: false,
    noResultsText: 'No results found',
    placeholder: '',
    promptText: 'Type for suggestions',
    required: false,
    state: null,
});

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const takeoverOpen = ref(false);
const triggerId = computed(() => `${props.id}-trigger`);
const inputRef = ref<ComponentPublicInstance | null>(null);
const contentRef = ref<ComponentPublicInstance | null>(null);

const contentEl = useAutocompleteContentEl(contentRef, takeoverOpen);
const suggestionsRef = computed(() => props.suggestions);
const { measured, remeasure, visibleSuggestions } = useFitToViewport(contentEl, suggestionsRef, MAX_VISIBLE);

const queryLongEnough = computed(() => (model.value ?? '').trim().length >= props.minChars);

// Reka auto-highlights the first item whenever results arrive from an empty list,
// which is NOT a user choice — Enter must submit the typed query then, not select.
// Only a highlight the user created (arrow keys or pointer movement over the list)
// makes Enter select. Reset whenever the list content changes or the takeover opens.
const userHighlighted = ref(false);
watch(
    () => props.suggestions.map((suggestion) => suggestion.id).join('\n'),
    () => {
        userHighlighted.value = false;
    },
);

// what the list shows when there are no suggestions to render: the no-results
// message once a search has actually come back empty (per the parent), otherwise
// the prompt (nothing searched yet, or the query is below minChars)
const panelMessage = computed(() => {
    if (props.suggestions.length) {
        return '';
    }
    return props.noResults && queryLongEnough.value ? props.noResultsText : props.promptText;
});

// 100dvh does not shrink when the iOS keyboard opens, so the list height is
// derived from the visual viewport instead; the keyboard opening/closing is
// just a resize event. Re-trim after every height change.
function updateListHeight() {
    const el = contentEl.value;
    const viewport = window.visualViewport;
    if (!el || !viewport) {
        return;
    }
    const top = el.getBoundingClientRect().top;
    el.style.height = `${Math.max(viewport.offsetTop + viewport.height - top, 0)}px`;
    remeasure();
}

watch(takeoverOpen, async (isOpen) => {
    userHighlighted.value = false;
    const viewport = window.visualViewport;
    if (isOpen) {
        await nextTick();
        updateListHeight();
        viewport?.addEventListener('resize', updateListHeight);
    } else {
        viewport?.removeEventListener('resize', updateListHeight);
    }
});

onBeforeUnmount(() => {
    window.visualViewport?.removeEventListener('resize', updateListHeight);
});

// iOS only shows the keyboard when focus happens inside the tap's event chain,
// so redirect the dialog's initial focus to the real input
function onOpenAutoFocus(event: Event) {
    event.preventDefault();
    (inputRef.value?.$el as HTMLElement | undefined)?.focus();
}

// runs in the capture phase on the anchor, ahead of Reka's input-level handler
function onEnterKey(event: KeyboardEvent) {
    // only Enter from the input itself submits — Enter on the clear button (also
    // inside the anchor) is a click and must reach the button
    if (event.target !== inputRef.value?.$el) {
        return;
    }
    // the Enter that commits an IME composition (Japanese/Chinese/Korean input)
    // is not a submit
    if (event.isComposing) {
        return;
    }
    // highlight checked via the DOM rather than Reka's exposed highlightedElement,
    // which can hold a stale (detached) element after the list re-renders
    if (userHighlighted.value && contentEl.value?.querySelector('[data-highlighted]')) {
        // let the event through to Reka, which selects the highlighted item
        return;
    }
    // keep Reka from selecting an auto-highlighted item the user never chose, and
    // keep a surrounding <form> from natively submitting
    event.preventDefault();
    event.stopPropagation();
    takeoverOpen.value = false;
    emit('submit', model.value ?? '');
}

function onSelect(suggestion: EsAutocompleteSuggestion) {
    takeoverOpen.value = false;
    emit('select', suggestion);
}

function onClear() {
    model.value = '';
    (inputRef.value?.$el as HTMLElement | undefined)?.focus();
}
</script>

<template>
    <div class="d-md-none">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            class="label justify-content-start"
            :class="{ 'sr-only': labelSrOnly }"
            :for="triggerId">
            {{ label }}
            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>
        <dialog-root v-model:open="takeoverOpen">
            <!-- fake search field: tapping it opens the takeover with the real input focused -->
            <dialog-trigger
                :id="triggerId"
                class="es-autocomplete-fake-field es-form-input form-control align-items-center d-flex px-100 text-left w-100"
                :class="{ 'is-invalid': state === false }"
                :aria-describedby="describedBy"
                :disabled="disabled">
                <span
                    v-if="model"
                    class="text-truncate">
                    {{ model }}
                </span>
                <span
                    v-else
                    class="es-autocomplete-fake-field-placeholder text-truncate">
                    {{ placeholder }}
                </span>
            </dialog-trigger>
            <dialog-portal>
                <dialog-content
                    class="es-autocomplete-takeover bg-white d-flex flex-column"
                    @open-auto-focus="onOpenAutoFocus">
                    <dialog-title class="sr-only">
                        {{ label }}
                    </dialog-title>
                    <dialog-description class="sr-only">
                        Type your search and select from dropdown suggestions.
                    </dialog-description>
                    <autocomplete-root
                        v-model="model"
                        class="d-flex flex-column flex-grow-1"
                        ignore-filter
                        open>
                        <div class="align-items-center d-flex p-100">
                            <autocomplete-anchor
                                class="es-autocomplete-field es-form-input form-control align-items-center d-flex flex-grow-1 p-0"
                                @keydown.capture.enter="onEnterKey">
                                <autocomplete-input
                                    ref="inputRef"
                                    class="es-autocomplete-input h-100 w-100 px-100"
                                    :aria-label="label"
                                    :placeholder="placeholder"
                                    @keydown.down="userHighlighted = true"
                                    @keydown.up="userHighlighted = true" />
                                <button
                                    v-if="model"
                                    class="es-autocomplete-clear align-items-center bg-transparent border-0 d-flex flex-shrink-0 h-100 justify-content-center p-0 text-gray-700"
                                    type="button"
                                    :aria-label="clearText"
                                    @click="onClear">
                                    <icon-x
                                        height="20px"
                                        width="20px" />
                                </button>
                            </autocomplete-anchor>
                            <dialog-close class="es-autocomplete-cancel bg-transparent border-0 flex-shrink-0 ml-100">
                                {{ cancelText }}
                            </dialog-close>
                        </div>
                        <autocomplete-content
                            ref="contentRef"
                            :class="[
                                'es-autocomplete-takeover-list text-left',
                                { 'es-autocomplete-takeover-list--measuring': !measured },
                            ]"
                            @pointermove="userHighlighted = true">
                            <es-autocomplete-item
                                v-for="suggestion in visibleSuggestions"
                                :key="suggestion.id"
                                :query="model ?? ''"
                                :suggestion="suggestion"
                                @select="onSelect">
                                <template
                                    v-if="$slots.item"
                                    #default="slotProps">
                                    <slot
                                        name="item"
                                        v-bind="slotProps" />
                                </template>
                            </es-autocomplete-item>
                            <div
                                v-if="panelMessage"
                                class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                                {{ panelMessage }}
                            </div>
                        </autocomplete-content>
                    </autocomplete-root>
                </dialog-content>
            </dialog-portal>
        </dialog-root>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete-fake-field-placeholder {
    color: variables.$input-color-placeholder;
}

.es-autocomplete-takeover {
    height: 100dvh;
    inset: 0;
    position: fixed;
    // above the page and any menu bar (1000); same layer as modals
    z-index: 1050;
}

// deliberately no focus styling on the field: the full-screen takeover itself is
// the focus indicator (see es-autocomplete-desktop.vue for the fuller rationale)

.es-autocomplete-input {
    background: transparent;
    border: none;
    // ≥16px or iOS Safari auto-zooms on focus
    font-size: 1rem;

    &:focus-visible {
        outline: none;
    }

    &::placeholder {
        color: variables.$input-color-placeholder;
    }
}

.es-autocomplete-cancel {
    color: variables.$blue-600;
    font-weight: variables.$font-weight-semibold;
}

// ≥44px square so it is comfortably tappable; a flex sibling of the input, so
// it can never overlap the entered text
.es-autocomplete-clear {
    cursor: pointer;
    width: 2.75rem;

    &:focus-visible {
        outline: 0.125rem solid variables.$blue-600;
        outline-offset: -0.25rem;
    }
}

.es-autocomplete-takeover-list {
    // no scrolling by design: the fit-to-viewport trim only renders items that fit
    overflow: hidden;
    // required by useFitToViewport: item offsetTop must be relative to this container
    position: relative;

    &--measuring {
        visibility: hidden;
    }

    // adequate tap targets: ≥44px rows and ≥16px text
    .es-autocomplete-item {
        align-content: center;
        font-size: 1rem;
        min-height: 2.75rem;
    }

    .es-autocomplete-no-results {
        font-size: 1rem;
    }
}
</style>

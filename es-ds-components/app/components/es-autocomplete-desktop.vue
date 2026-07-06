<script setup lang="ts">
import {
    AutocompleteAnchor,
    AutocompleteCancel,
    AutocompleteContent,
    AutocompleteInput,
    AutocompletePortal,
    AutocompleteRoot,
} from 'reka-ui';
import type { ComponentPublicInstance } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// Baymard: keep the list manageable — at most 10 suggestions on desktop,
// further reduced by the fit-to-viewport trim
const MAX_VISIBLE = 10;

interface Props {
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

const open = ref(false);
const contentRef = ref<ComponentPublicInstance | null>(null);

// Reka auto-highlights the first item whenever results arrive from an empty list,
// which is NOT a user choice — Enter must submit the typed query then, not select.
// Only a highlight the user created (arrow keys or pointer movement over the panel)
// makes Enter select. Reset whenever the list content changes or the panel reopens.
const userHighlighted = ref(false);
watch(
    () => props.suggestions.map((suggestion) => suggestion.id).join('\n'),
    () => {
        userHighlighted.value = false;
    },
);

// $el is not reactive (and is a placeholder comment node while the panel is
// closed), so resolve the panel element after open/close has taken effect in
// the DOM instead of computing from $el directly
const contentEl = ref<HTMLElement | null>(null);
watch(open, async (isOpen) => {
    userHighlighted.value = false;
    await nextTick();
    const el = contentRef.value?.$el as Node | undefined;
    contentEl.value = isOpen && el && el.nodeType === Node.ELEMENT_NODE ? (el as HTMLElement) : null;
});
const suggestionsRef = computed(() => props.suggestions);
const { measured, visibleSuggestions } = useFitToViewport(contentEl, suggestionsRef, MAX_VISIBLE);

const queryLongEnough = computed(() => (model.value ?? '').trim().length >= props.minChars);

// The panel and overlay stay up for the entire interaction: they open when the
// field gains focus and close when focus leaves it (or on Escape/select/submit).
// Suggestion changes never open or close the panel — they only swap its content.
function onOpenChange(value: boolean) {
    open.value = value;
}

function onFocusIn() {
    if (!props.disabled) {
        open.value = true;
    }
}

function onFocusOut(event: FocusEvent) {
    // ignore focus moves within the field (input <-> clear button)
    const field = event.currentTarget as HTMLElement;
    if (!event.relatedTarget || !field.contains(event.relatedTarget as Node)) {
        open.value = false;
    }
}

// what the open panel shows when there are no suggestions to render: the
// no-results message once a search has actually come back empty, otherwise
// the prompt (nothing searched yet, or the query is below minChars)
const panelMessage = computed(() => {
    if (props.suggestions.length) {
        return '';
    }
    return props.noResults && queryLongEnough.value ? props.noResultsText : props.promptText;
});

// runs in the capture phase on the anchor, ahead of Reka's input-level handler
function onEnterKey(event: KeyboardEvent) {
    // highlight checked via the DOM rather than Reka's exposed highlightedElement,
    // which can hold a stale (detached) element after the list re-renders
    if (userHighlighted.value && contentEl.value?.querySelector('[data-highlighted]')) {
        // let the event through to Reka, which selects the highlighted item
        return;
    }
    // keep Reka from selecting an auto-highlighted item the user never chose
    event.stopPropagation();
    open.value = false;
    emit('submit', model.value ?? '');
}

function onSelect(suggestion: EsAutocompleteSuggestion) {
    open.value = false;
    emit('select', suggestion);
}
</script>

<template>
    <autocomplete-root
        v-model="model"
        class="d-none d-md-block"
        ignore-filter
        open-on-click
        :disabled="disabled"
        :open="open"
        @update:open="onOpenChange">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            class="label justify-content-start"
            :class="{ 'sr-only': labelSrOnly }"
            :for="id">
            {{ label }}
            <span
                v-if="required"
                class="text-danger">
                *
            </span>
        </label>
        <autocomplete-anchor
            class="es-autocomplete-field es-form-input form-control align-items-center d-flex p-0"
            :class="{
                'is-invalid': state === false,
                'es-autocomplete-field--raised': open,
                'es-autocomplete-field--disabled': disabled,
            }"
            @focusin="onFocusIn"
            @focusout="onFocusOut"
            @keydown.capture.enter="onEnterKey">
            <autocomplete-input
                :id="id"
                class="es-autocomplete-input h-100 w-100 px-100"
                :aria-describedby="describedBy"
                :aria-invalid="state === false ? true : undefined"
                :disabled="disabled"
                :placeholder="placeholder"
                :required="required"
                @keydown.down="userHighlighted = true"
                @keydown.up="userHighlighted = true" />
            <!-- tabindex overrides the -1 Reka renders, so keyboard users can reach the button -->
            <autocomplete-cancel
                v-if="model && !disabled"
                class="es-autocomplete-clear align-items-center bg-transparent border-0 d-flex flex-shrink-0 h-100 justify-content-center p-0 text-gray-700"
                tabindex="0"
                :aria-label="clearText">
                <icon-x
                    height="20px"
                    width="20px" />
            </autocomplete-cancel>
        </autocomplete-anchor>
        <autocomplete-portal>
            <!-- mousedown.prevent keeps the input focused while clicking in the panel:
                 without it, the click blurs the input, whose focusout closes the panel
                 before the click can select (Reka items select on click, not mousedown) -->
            <autocomplete-content
                ref="contentRef"
                align="start"
                position="popper"
                :class="[
                    'es-autocomplete-panel bg-white rounded-xs text-gray-900 font-size-75 text-left',
                    { 'es-autocomplete-panel--measuring': !measured },
                ]"
                :side-offset="4"
                @mousedown.prevent
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
        </autocomplete-portal>
    </autocomplete-root>
    <teleport to="body">
        <transition name="es-autocomplete-overlay">
            <div
                v-if="open"
                aria-hidden="true"
                class="es-autocomplete-overlay d-none d-md-block" />
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

// deliberately no focus styling on the field: the page-dim overlay appearing on
// focus is the focus indicator. (es-form-input's lighter :focus border reads as
// the border disappearing against the dimmed page, and a :focus-visible ring is
// not an option — browsers match :focus-visible on ANY focus of a text field.)

// while the panel is open, lift the input above the page-dim overlay so it
// stays fully visible and interactive
.es-autocomplete-field--raised {
    position: relative;
    z-index: 1000;
}

// match the disabled styling of es-form-input: the :disabled rules in es-ds-styles
// target the element carrying form-control, which here is this wrapper div rather
// than the real (disabled) input inside it
.es-autocomplete-field--disabled {
    background-color: variables.$input-disabled-bg;
    border: 0;

    .es-autocomplete-input {
        color: variables.$input-disabled-color;
        // iOS fix for unreadable disabled content, as in es-ds-styles' form-control rule
        opacity: 1;
    }
}

.es-autocomplete-input {
    background: transparent;
    border: none;

    &:focus-visible {
        outline: none;
    }

    &::placeholder {
        color: variables.$input-color-placeholder;
    }
}

// ≥44px square so it is comfortably tappable; a flex sibling of the input, so
// it can never overlap the entered text
.es-autocomplete-clear {
    cursor: pointer;
    width: 2.75rem;

    &:hover {
        color: variables.$gray-900;
    }

    &:focus-visible {
        outline: 0.125rem solid variables.$blue-600;
        outline-offset: -0.25rem;
    }
}

// the panel is portaled to <body> and Reka's popper wrapper strips the scope
// attribute from the content root, so target it with :deep() through the popper
// wrapper element, which keeps the scope attribute (same pattern as es-popover)
:deep(.es-autocomplete-panel) {
    border: variables.$border-width solid variables.$gray-500;
    box-shadow: variables.$popover-box-shadow;
    // the fit-to-viewport trim guarantees no partially-visible items behind this
    max-height: var(--reka-combobox-content-available-height);
    max-width: min(90vw, 30rem);
    min-width: var(--reka-combobox-trigger-width);
    overflow: hidden;
    // required by useFitToViewport: item offsetTop must be relative to this panel
    position: relative;
    // above .es-autocomplete-overlay; Reka copies this onto its popper wrapper
    z-index: 1000;

    &.es-autocomplete-panel--measuring {
        visibility: hidden;
    }
}

.es-autocomplete-overlay {
    background-color: variables.$black;
    inset: 0;
    opacity: 0.25;
    position: fixed;
    // matches .es-menu-bar-overlay in es-menu-bar; the two are never open at once
    z-index: 999;

    @media not (prefers-reduced-motion) {
        &-enter-active,
        &-leave-active {
            transition: opacity 0.15s ease-in-out;
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }
}
</style>

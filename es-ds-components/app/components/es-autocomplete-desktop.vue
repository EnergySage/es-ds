<script setup lang="ts">
import {
    AutocompleteAnchor,
    AutocompleteCancel,
    AutocompleteContent,
    AutocompleteInput,
    AutocompletePortal,
    AutocompleteRoot,
    AutocompleteSeparator,
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
    noResultsText?: string;
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
    suggestions: EsAutocompleteSuggestion[];
}

const props = withDefaults(defineProps<Props>(), {
    clearText: 'Clear',
    disabled: false,
    labelSrOnly: false,
    minChars: 1,
    noResultsText: 'No results found',
    placeholder: '',
    required: false,
    state: null,
});

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const open = ref(false);
const inputHasFocus = ref(false);
const contentRef = ref<ComponentPublicInstance | null>(null);

// $el is not reactive (and is a placeholder comment node while the panel is
// closed), so resolve the panel element after open/close has taken effect in
// the DOM instead of computing from $el directly
const contentEl = ref<HTMLElement | null>(null);
watch(open, async (isOpen) => {
    await nextTick();
    const el = contentRef.value?.$el as Node | undefined;
    contentEl.value = isOpen && el && el.nodeType === Node.ELEMENT_NODE ? (el as HTMLElement) : null;
});
const suggestionsRef = computed(() => props.suggestions);
const { measured, visibleSuggestions } = useFitToViewport(contentEl, suggestionsRef, MAX_VISIBLE);

const queryLongEnough = computed(() => (model.value ?? '').trim().length >= props.minChars);

// Reka opens on typing regardless of whether there is anything to show; keep the
// panel closed until the app has provided suggestions. Once open, it may stay open
// with an empty list (the no-results message) so the overlay doesn't flicker.
function onOpenChange(value: boolean) {
    open.value = value && (props.suggestions.length > 0 || (open.value && queryLongEnough.value));
}

const showNoResults = computed(() => !props.suggestions.length && queryLongEnough.value);

// clearing the input below minChars must close the panel even when the suggestion
// ids don't change (e.g. from the no-results state, where the list is already empty)
watch(queryLongEnough, (longEnough) => {
    if (!longEnough && !props.suggestions.length) {
        open.value = false;
    }
});

// watch the suggestion ids, not the array identity: the parent recomputes the array
// on every model change (including selection), and reopening on identity alone would
// pop the panel back open right after a suggestion is chosen
watch(
    () => props.suggestions.map((suggestion) => suggestion.id).join('\n'),
    () => {
        if (!props.suggestions.length) {
            // a search came back empty: keep the panel (and overlay) up and show
            // the no-results message instead of flickering closed — unless the
            // query dropped below the minimum, which is not a "no results" case
            if (!queryLongEnough.value) {
                open.value = false;
            }
        } else if (inputHasFocus.value) {
            open.value = true;
        }
    },
);

function onEnterKey() {
    // Enter with a highlighted suggestion is handled by Reka (selection); Enter
    // without one submits the raw query. Checked via the DOM rather than Reka's
    // exposed highlightedElement, which can hold a stale (detached) element after
    // a previous selection re-renders the list.
    if (!contentEl.value?.querySelector('[data-highlighted]')) {
        open.value = false;
        emit('submit', model.value ?? '');
    }
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
            }">
            <autocomplete-input
                :id="id"
                class="es-autocomplete-input h-100 w-100 px-100"
                :aria-describedby="describedBy"
                :aria-invalid="state === false ? true : undefined"
                :disabled="disabled"
                :placeholder="placeholder"
                :required="required"
                @blur="inputHasFocus = false"
                @focus="inputHasFocus = true"
                @keydown.enter="onEnterKey" />
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
            <autocomplete-content
                ref="contentRef"
                align="start"
                position="popper"
                :class="[
                    'es-autocomplete-panel bg-white rounded-xs text-gray-900 font-size-75 text-left',
                    { 'es-autocomplete-panel--measuring': !measured },
                ]"
                :side-offset="4">
                <template
                    v-for="(suggestion, index) in visibleSuggestions"
                    :key="suggestion.id">
                    <autocomplete-separator
                        v-if="index > 0 && suggestion.scope && !visibleSuggestions[index - 1]?.scope"
                        class="es-autocomplete-separator" />
                    <es-autocomplete-item
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
                </template>
                <div
                    v-if="showNoResults"
                    class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                    {{ noResultsText }}
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

.es-autocomplete-field:focus-within {
    border-color: variables.$blue-600;
    outline: 0.125rem solid variables.$blue-600;
    outline-offset: 0.125rem;
}

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

:deep(.es-autocomplete-separator) {
    background-color: variables.$gray-200;
    height: variables.$border-width;
    margin: 0.25rem 0;
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

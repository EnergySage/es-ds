<script setup lang="ts">
import {
    AutocompleteAnchor,
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

// defaults live on the public es-autocomplete.vue wrapper, which always binds
// every prop; declaring them again here would be dead code that could drift
interface Props {
    clearText?: string;
    describedBy: string;
    disabled?: boolean;
    id: string;
    label: string;
    labelSrOnly?: boolean;
    panelMessage: string;
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
    suggestions: EsAutocompleteSuggestion[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const open = ref(false);
const contentRef = ref<ComponentPublicInstance | null>(null);
const inputRef = ref<ComponentPublicInstance | null>(null);
const contentEl = useAutocompleteContentEl(contentRef, open);
const { measured, visibleSuggestions } = useFitToViewport(contentEl, toRef(props, 'suggestions'), MAX_VISIBLE);

const { markUserHighlight, onClear, onEnterKey, onSelect, resetUserHighlight, userHighlighted } = useAutocompleteShell(
    {
        close: () => {
            open.value = false;
        },
        contentEl,
        emitSelect: (suggestion) => emit('select', suggestion),
        emitSubmit: (query) => emit('submit', query),
        inputRef,
        model,
        suggestions: () => props.suggestions,
    },
);
watch(open, resetUserHighlight);

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
    const field = event.currentTarget as HTMLElement;
    const related = event.relatedTarget as Node | null;
    // ignore focus moves within the field (input <-> clear button) or into the
    // panel (interactive elements a consumer renders in the item slot)
    if (related && (field.contains(related) || contentEl.value?.contains(related))) {
        return;
    }
    // ignore the window itself losing focus (alt-tab, devtools) — the input is
    // still the active element and the interaction resumes when the user returns
    if (!related && !document.hasFocus()) {
        return;
    }
    open.value = false;
}

// keep the input focused while clicking in the panel: without this, the click
// blurs the input, whose focusout closes the panel before the click can select.
// Interactive elements a consumer renders in the item slot are exempt so they
// remain focusable (suggestion items themselves have tabindex="-1").
function onPanelMousedown(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    const interactive =
        'a[href], button, input, select, textarea, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';
    if (!target?.closest(interactive)) {
        event.preventDefault();
    }
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
        <es-autocomplete-highlight-guard :user-highlighted="userHighlighted" />
        <es-autocomplete-label
            :html-for="id"
            :label="label"
            :label-sr-only="labelSrOnly"
            :required="required" />
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
                ref="inputRef"
                class="es-autocomplete-input h-100 w-100 px-100"
                :aria-describedby="describedBy"
                :aria-invalid="state === false ? true : undefined"
                :disabled="disabled"
                :placeholder="placeholder"
                :required="required"
                @keydown.down="markUserHighlight"
                @keydown.up="markUserHighlight" />
            <es-autocomplete-clear-button
                v-if="model && !disabled"
                :clear-text="clearText"
                @clear="onClear" />
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
                :side-offset="4"
                @mousedown="onPanelMousedown"
                @pointermove="markUserHighlight">
                <es-autocomplete-item
                    v-for="suggestion in visibleSuggestions"
                    :key="suggestion.id"
                    :query="model"
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

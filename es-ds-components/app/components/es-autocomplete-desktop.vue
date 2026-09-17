<script setup lang="ts">
import { AutocompleteAnchor, AutocompleteContent, AutocompleteInput, AutocompleteRoot } from 'reka-ui';
import type { ComponentPublicInstance } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// Baymard: keep the list manageable — at most 5 suggestions,
// further reduced by the fit-to-viewport trim
const MAX_VISIBLE = 5;

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
    showOverlayOnFocus?: boolean;
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
// The semantic combobox (Reka's open state: aria-expanded plus the listbox)
// opens only when there are real suggestions to browse. The prompt/no-results
// message shows in an aria-hidden lookalike panel instead, so a screen reader
// hears the input's own name/role/description uninterrupted on focus, and
// hears "expanded" exactly when a list exists — per the combobox pattern.
const listboxOpen = computed(() => open.value && props.suggestions.length > 0);
const rootRef = ref<ComponentPublicInstance | null>(null);
const contentRef = ref<ComponentPublicInstance | null>(null);
const inputRef = ref<ComponentPublicInstance | null>(null);
const guardRef = ref<{ clearHighlight: () => void } | null>(null);
const contentEl = useAutocompleteContentEl(contentRef, listboxOpen);
const { measured, visibleSuggestions } = useFitToViewport(contentEl, toRef(props, 'suggestions'), MAX_VISIBLE);

const {
    displayText,
    keyboardHighlightActive,
    keyboardNav,
    markPointerHighlight,
    onArrowDown,
    onArrowUp,
    onClear,
    onEnterKey,
    onHighlight,
    onSelect,
    onUserInput,
    resetUserHighlight,
    userHighlighted,
} = useAutocompleteShell({
    clearHighlight: () => guardRef.value?.clearHighlight(),
    close: () => {
        open.value = false;
    },
    contentEl,
    emitSelect: (suggestion) => emit('select', suggestion),
    emitSubmit: (query) => emit('submit', query),
    inputRef,
    model,
    suggestions: () => props.suggestions,
});
watch(open, resetUserHighlight);

// The panel (and, with showOverlayOnFocus, the page-dim overlay) stays up for
// the entire interaction: it opens when the field gains focus and closes when
// focus leaves it (or on Escape/select/submit). Suggestion changes never open
// or close the panel — they only swap its content.
function onOpenChange(value: boolean) {
    open.value = value;
}

function onFocusIn() {
    if (!props.disabled) {
        open.value = true;
    }
}

// Reka's listbox root clears the highlight when a focusout inside it targets
// anything beyond the root element — such as the page body, where a screen
// reader's focus can go mid-navigation. Blur carries no meaning in this shell
// (see onFieldTab), so the field's focusout events stop here instead of
// reaching that handler.
function onFieldFocusout(event: FocusEvent) {
    event.stopPropagation();
}

// Blur never closes the widget: screen readers move real DOM focus around it
// (VoiceOver's keyboard-focus-follows-cursor drags focus to the highlighted
// option, the web area, or nowhere) with unpredictable relatedTargets, so any
// focusout-based close breaks keyboard navigation under a screen reader.
// Closing happens only on deterministic signals: Tab leaving the field (here),
// Escape, select, submit, and pointerdown outside (below).
function onFieldTab(event: KeyboardEvent) {
    const inputEl = inputRef.value?.$el as HTMLElement | undefined;
    // Tab order inside the field is input -> clear button (when shown); any Tab
    // that moves past either end leaves the field
    const clearShown = !!model.value && !props.disabled;
    const leaving = event.shiftKey ? event.target === inputEl : event.target !== inputEl || !clearShown;
    if (leaving) {
        open.value = false;
    }
}

// clicks outside the widget close it. Blur cannot be relied on for this (see
// onFieldTab), and Reka's own dismiss layer exists only while the listbox is
// mounted — not in the message-only state.
function onDocumentPointerdown(event: Event) {
    const target = event.target as Node | null;
    const rootEl = rootRef.value?.$el as HTMLElement | undefined;
    if (!target || rootEl?.contains(target) || contentEl.value?.contains(target)) {
        return;
    }
    open.value = false;
}

watch(open, (isOpen) => {
    if (isOpen) {
        document.addEventListener('pointerdown', onDocumentPointerdown, true);
    } else {
        document.removeEventListener('pointerdown', onDocumentPointerdown, true);
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', onDocumentPointerdown, true);
});

// keep the input focused while clicking in the panel, so focus and the text
// caret are still in the field after selecting. Interactive elements a consumer
// renders in the item slot are exempt so they remain focusable (suggestion
// items themselves have tabindex="-1").
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
        ref="rootRef"
        v-model="model"
        class="d-none d-md-block position-relative"
        ignore-filter
        open-on-click
        :disabled="disabled"
        :open="listboxOpen"
        @highlight="onHighlight"
        @update:open="onOpenChange">
        <es-autocomplete-highlight-guard
            ref="guardRef"
            :user-highlighted="userHighlighted" />
        <es-autocomplete-label
            :html-for="id"
            :label="label"
            :label-sr-only="labelSrOnly"
            :required="required" />
        <autocomplete-anchor
            class="es-autocomplete-field es-form-input form-control align-items-center d-flex p-0"
            :class="{
                'is-invalid': state === false,
                'es-autocomplete-field--focus-ring': !showOverlayOnFocus && !keyboardHighlightActive,
                'es-autocomplete-field--raised': open && showOverlayOnFocus,
                'es-autocomplete-field--disabled': disabled,
            }"
            @focusin="onFocusIn"
            @focusout="onFieldFocusout"
            @keydown.capture.enter="onEnterKey"
            @keydown.esc="open = false"
            @keydown.tab="onFieldTab">
            <autocomplete-input
                :id="id"
                ref="inputRef"
                v-model="displayText"
                class="es-autocomplete-input h-100 w-100 px-100"
                :aria-describedby="describedBy"
                :aria-invalid="state === false ? true : undefined"
                :disabled="disabled"
                :placeholder="placeholder"
                :required="required"
                @input="onUserInput"
                @keydown.down="onArrowDown"
                @keydown.up="onArrowUp" />
            <es-autocomplete-clear-button
                v-if="model && !disabled"
                :clear-text="clearText"
                @clear="onClear" />
        </autocomplete-anchor>
        <!-- the prompt/no-results message is presentation only: screen readers get
             the same guidance from the input's description and the live region, so
             this panel is hidden from them and the combobox stays collapsed -->
        <div
            v-if="open && !suggestions.length && panelMessage"
            aria-hidden="true"
            class="es-autocomplete-panel es-autocomplete-panel--static bg-white rounded-xs text-gray-900 font-size-75 text-left">
            <div class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                {{ panelMessage }}
            </div>
        </div>
        <!-- deliberately NOT portaled: the listbox sits in the DOM right after the
             field (as in the APG combobox examples), so a screen reader's spatial
             navigation lands back near the input when leaving the list -->
        <autocomplete-content
            ref="contentRef"
            align="start"
            :aria-label="label"
            position="popper"
            :class="[
                'es-autocomplete-panel bg-white rounded-xs text-gray-900 font-size-75 text-left',
                { 'es-autocomplete-panel--measuring': !measured },
            ]"
            :side-offset="4"
            @mousedown="onPanelMousedown"
            @pointermove="markPointerHighlight">
            <es-autocomplete-item
                v-for="suggestion in visibleSuggestions"
                :key="suggestion.id"
                :keyboard-nav="keyboardNav"
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
        </autocomplete-content>
    </autocomplete-root>
    <teleport to="body">
        <transition name="es-autocomplete-overlay">
            <div
                v-if="open && showOverlayOnFocus"
                aria-hidden="true"
                class="es-autocomplete-overlay d-none d-md-block" />
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

// without the overlay, the focused field shows es-dropdown-select's focus ring
// (es-form-input's lighter focus border lacks the contrast change accessibility
// asks of a focus state). :focus-within stands in for the input's own
// :focus-visible — for a text input the two match identically (browsers match
// :focus-visible on any focus of an editable field, mouse clicks included) and
// the form-control class sits on this wrapper while focus lands inside it. The
// class gate hands the ring to the highlighted option during keyboard navigation.
.es-autocomplete-field--focus-ring:focus-within {
    border-color: variables.$blue-600;
    outline: 0.125rem solid variables.$blue-600;
    outline-offset: 0.125rem;
}

// with showOverlayOnFocus, there is deliberately no focus styling on the field:
// the page-dim overlay appearing on focus is the focus indicator. (es-form-input's
// lighter :focus border reads as the border disappearing against the dimmed page,
// and a :focus-visible ring is not an option — browsers match :focus-visible on
// ANY focus of a text field.)

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

// Reka's popper wrapper strips the scope attribute from the content root, so
// target it with :deep() through a scope-carrying ancestor (same pattern as
// es-popover)
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

// the aria-hidden prompt/no-results panel is not popper-positioned: it sits
// below the field (the root is position-relative and the anchor its last child),
// sized like the real panel. Placed after the :deep block so its positioning
// wins over that block's position: relative.
.es-autocomplete-panel--static {
    left: 0;
    max-width: min(90vw, 30rem);
    min-width: 100%;
    position: absolute;
    top: calc(100% + 0.25rem);
    width: max-content;
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

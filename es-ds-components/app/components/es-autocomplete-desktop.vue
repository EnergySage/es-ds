<script setup lang="ts">
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
    noResultsAnnouncement: string;
    panelMessage: string;
    placeholder?: string;
    required?: boolean;
    showOverlayOnFocus?: boolean;
    state?: boolean | null;
    suggestionCountText: (count: number) => string;
    suggestions: EsAutocompleteSuggestion[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const open = ref(false);
// the listbox renders only when there are real suggestions to browse; the
// prompt/no-results message shows in an aria-hidden lookalike panel instead, so
// a screen reader hears the input's own name/role/description uninterrupted on
// focus, and hears "expanded" exactly when a list exists — per the combobox
// pattern
const listboxOpen = computed(() => open.value && props.suggestions.length > 0);

const rootEl = ref<HTMLElement | null>(null);
const fieldRef = ref<(ComponentPublicInstance & { inputEl: HTMLInputElement | null }) | null>(null);
// the field component's root is a single plain div, so $el is reliable
const fieldEl = computed(() => (fieldRef.value?.$el as HTMLElement | undefined) ?? null);
const inputEl = computed(() => fieldRef.value?.inputEl ?? null);
const panelEl = ref<HTMLElement | null>(null);

// The panels render in the browser's top layer (popover="manual" — manual, so
// no light-dismiss: it would treat clicks on our own input as outside) and are
// glued to the field with CSS anchor positioning, immune to ancestor
// overflow/z-index while staying in the DOM right next to the field. Browsers
// without anchor positioning fall back to in-page absolute placement below the
// field (no popover, no flip); the check is false during SSR, where neither
// panel renders anyway.
const supportsAnchor = typeof CSS !== 'undefined' && CSS.supports('anchor-name: --a');
const anchorName = `--es-autocomplete-${props.id}`;
const panelAbove = ref(false);

// Chooses the panel's side and writes its max-height from the space around the
// field — the same numbers the fit-to-viewport trim divides into rows, so the
// side choice and the row count can never disagree. Mirrors the usual popper
// policy: below unless the natural (untrimmed) list only fits above.
function positionPanel() {
    const panel = panelEl.value;
    const anchor = fieldEl.value;
    if (!panel || !anchor) {
        return;
    }
    const offset = 4; // matches the anchored CSS's 0.25rem gap
    const anchorRect = anchor.getBoundingClientRect();
    const spaceBelow = window.innerHeight - anchorRect.bottom - offset;
    const spaceAbove = anchorRect.top - offset;
    const rowHeight = panel.querySelector<HTMLElement>('[data-es-autocomplete-item]')?.offsetHeight ?? 0;
    const borders = Math.max(panel.offsetHeight - panel.clientHeight, 0);
    const natural = rowHeight * Math.min(props.suggestions.length, MAX_VISIBLE) + borders;
    const above = supportsAnchor && natural > spaceBelow && natural <= spaceAbove;
    panelAbove.value = above;
    panel.style.maxHeight = `${Math.max(above ? spaceAbove : spaceBelow, 0)}px`;
}

const { measured, visibleSuggestions } = useFitToViewport(panelEl, toRef(props, 'suggestions'), MAX_VISIBLE, {
    beforeMeasure: positionPanel,
});

const combobox = useAutocompleteCombobox({
    close: () => {
        open.value = false;
    },
    emitSelect: (suggestion) => emit('select', suggestion),
    emitSubmit: (query) => emit('submit', query),
    idPrefix: props.id,
    inputEl,
    model,
    // arrows navigate exactly what is displayed; nothing while the panel is closed
    suggestions: () => (listboxOpen.value ? visibleSuggestions.value : []),
});
watch(open, combobox.resetHighlight);

// announces the number of suggestions actually DISPLAYED (after the cap and the
// fit-to-viewport trim), or the no-results state. Each shell owns its own live
// region: the inactive shell's sits under display: none, which silences it.
const liveAnnouncement = computed(() =>
    visibleSuggestions.value.length
        ? props.suggestionCountText(visibleSuggestions.value.length)
        : props.noResultsAnnouncement,
);

// a [popover] element displays only once shown; manual popovers never light-dismiss
function showAsPopover(el: HTMLElement | null) {
    if (el && supportsAnchor) {
        try {
            el.showPopover();
        } catch {
            // already shown, or not a popover in this browser
        }
    }
}
watch(panelEl, showAsPopover);

const promptPanelRef = ref<HTMLElement | null>(null);
watch(promptPanelRef, showAsPopover);

// The panel (and, with showOverlayOnFocus, the page-dim overlay) stays up for
// the entire interaction: it opens when the field gains focus (or is clicked or
// typed into while closed after an Escape) and closes only on deterministic
// signals — Tab leaving the field, Escape, select, submit, and pointerdown
// outside. Blur never closes: screen readers move real DOM focus around the
// widget with unpredictable relatedTargets, so any focusout-based close breaks
// keyboard navigation under a screen reader.
function onFieldActivity() {
    if (!props.disabled) {
        open.value = true;
    }
}

function onFocusIn() {
    onFieldActivity();
    combobox.revealCaretOnFocus();
}

function onFieldTab(event: KeyboardEvent) {
    // Tab order inside the field is input -> clear button (when shown); any Tab
    // that moves past either end leaves the field
    const clearShown = !!model.value && !props.disabled;
    const leaving = event.shiftKey ? event.target === inputEl.value : event.target !== inputEl.value || !clearShown;
    if (leaving) {
        open.value = false;
    }
}

// clicks outside the widget close it (blur cannot be relied on — see above).
// Only the widget's working parts count as inside: the field, the panels, and
// the label (whose click hands focus back to the input). The root's own dead
// space — e.g. beside the label — is not focusable, so a click there blurs the
// input and must close the panel with it.
function onDocumentPointerdown(event: Event) {
    const target = event.target instanceof Element ? event.target : null;
    const part = target?.closest('.es-autocomplete-field, .es-autocomplete-panel, label');
    if (part && rootEl.value?.contains(part)) {
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
</script>

<template>
    <div
        ref="rootEl"
        class="d-none d-md-block position-relative">
        <es-autocomplete-label
            :html-for="id"
            :label="label"
            :label-sr-only="labelSrOnly"
            :required="required" />
        <es-autocomplete-field
            ref="fieldRef"
            :class="{
                'es-autocomplete-field--focus-ring': !showOverlayOnFocus && !combobox.keyboardHighlightActive.value,
                'es-autocomplete-field--raised': open && showOverlayOnFocus,
            }"
            :clear-text="clearText"
            :combobox="combobox"
            :described-by="describedBy"
            :disabled="disabled"
            :input-id="id"
            :listbox-open="listboxOpen"
            :model="model"
            :placeholder="placeholder"
            :required="required"
            :state="state"
            :style="{ anchorName }"
            @click="onFieldActivity"
            @focusin="onFocusIn"
            @input="onFieldActivity"
            @keydown.esc="open = false"
            @keydown.tab="onFieldTab" />
        <!-- the prompt/no-results message is presentation only: screen readers get
             the same guidance from the input's description and the live region, so
             this panel is hidden from them and the combobox stays collapsed -->
        <div
            v-if="open && !suggestions.length && panelMessage"
            ref="promptPanelRef"
            aria-hidden="true"
            class="es-autocomplete-panel bg-white rounded-xs text-gray-900 font-size-75 text-left"
            :class="supportsAnchor ? 'es-autocomplete-panel--anchored' : 'es-autocomplete-panel--static'"
            :popover="supportsAnchor ? 'manual' : undefined"
            :style="supportsAnchor ? { positionAnchor: anchorName } : undefined">
            <div class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                {{ panelMessage }}
            </div>
        </div>
        <!-- the listbox sits in the DOM right after the field (as in the APG
             combobox examples), so a screen reader's spatial navigation lands
             back near the input when leaving the list -->
        <div
            v-if="listboxOpen"
            :id="combobox.listboxId"
            ref="panelEl"
            :aria-label="label"
            role="listbox"
            :class="[
                'es-autocomplete-panel bg-white rounded-xs text-gray-900 font-size-75 text-left',
                supportsAnchor ? 'es-autocomplete-panel--anchored' : 'es-autocomplete-panel--static',
                {
                    'es-autocomplete-panel--above': panelAbove,
                    'es-autocomplete-panel--measuring': !measured,
                },
            ]"
            :popover="supportsAnchor ? 'manual' : undefined"
            :style="supportsAnchor ? { positionAnchor: anchorName } : undefined"
            @mousedown="combobox.onListMousedown">
            <es-autocomplete-item
                v-for="(suggestion, index) in visibleSuggestions"
                :key="suggestion.id"
                :highlighted="combobox.highlightIndex.value === index"
                :keyboard-nav="combobox.keyboardNav.value"
                :option-id="combobox.optionId(index)"
                :query="model"
                :suggestion="suggestion"
                @pointermove="combobox.onOptionPointermove(index)"
                @select="combobox.onOptionClick(index)">
                <template
                    v-if="$slots.item"
                    #default="slotProps">
                    <slot
                        name="item"
                        v-bind="slotProps" />
                </template>
            </es-autocomplete-item>
        </div>
        <div
            aria-live="polite"
            class="sr-only"
            role="status">
            {{ liveAnnouncement }}
        </div>
    </div>
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

/* without the overlay, the focused field shows es-dropdown-select's focus ring
 * (es-form-input's lighter focus border lacks the contrast change accessibility
 * asks of a focus state). :focus-within stands in for the input's own
 * :focus-visible — for a text input the two match identically (browsers match
 * :focus-visible on any focus of an editable field, mouse clicks included) and
 * the form-control class sits on the field wrapper while focus lands inside it.
 * The class gate hands the ring to the highlighted option during keyboard
 * navigation. */
.es-autocomplete-field--focus-ring:focus-within {
    border-color: variables.$blue-600;
    outline: 0.125rem solid variables.$blue-600;
    outline-offset: 0.125rem;
}

/* with showOverlayOnFocus, there is deliberately no focus styling on the field:
 * the page-dim overlay appearing on focus is the focus indicator. (es-form-input's
 * lighter :focus border reads as the border disappearing against the dimmed page,
 * and a :focus-visible ring is not an option — browsers match :focus-visible on
 * ANY focus of a text field.) */

/* while the panel is open, lift the input above the page-dim overlay so it
 * stays fully visible and interactive */
.es-autocomplete-field--raised {
    position: relative;
    z-index: 1000;
}

/* max-height is set inline by positionPanel from the space around the field;
 * the fit-to-viewport trim divides the same number into whole rows, so nothing
 * is ever partially visible behind the overflow. */
.es-autocomplete-panel {
    border: variables.$border-width solid variables.$gray-500;
    box-shadow: variables.$popover-box-shadow;
    max-width: min(90vw, 30rem);
    overflow: hidden;
    /* above .es-autocomplete-overlay when not in the top layer */
    z-index: 1000;

    &--measuring {
        visibility: hidden;
    }
}

/* glued to the field with CSS anchor positioning and rendered in the top layer
 * via popover="manual" (shown from script), so ancestor overflow, transforms,
 * and z-index cannot clip or cover it; the browser keeps it attached to the
 * field between the script's re-measures. inset/margin/padding clear the UA's
 * centered [popover] defaults (rows carry their own padding). */
.es-autocomplete-panel--anchored {
    inset: auto;
    left: anchor(left);
    margin: 0;
    min-width: anchor-size(width);
    padding: 0;
    position: fixed;
    top: calc(anchor(bottom) + 0.25rem);
    width: max-content;
}

/* the flip side, chosen by positionPanel when the natural list only fits above */
.es-autocomplete-panel--above {
    bottom: calc(anchor(top) + 0.25rem);
    top: auto;
}

/* fallback for browsers without anchor positioning: in-page placement below the
 * field (the root is position-relative and the field its last element before the
 * panels), with no flip — still trimmed, never clipped by the viewport bottom */
.es-autocomplete-panel--static {
    left: 0;
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
    /* matches .es-menu-bar-overlay in es-menu-bar; the two are never open at once */
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

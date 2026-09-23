<script setup lang="ts">
import {
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'reka-ui';
import type { ComponentPublicInstance } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// defaults live on the public es-autocomplete.vue wrapper, which always binds
// every prop; declaring them again here would be dead code that could drift
interface Props {
    autocomplete: string;
    clearText?: string;
    closeText?: string;
    describedBy: string;
    disabled?: boolean;
    id: string;
    label: string;
    labelSrOnly?: boolean;
    noResultsAnnouncement: string;
    panelMessage: string;
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
    suggestionCountText: (count: number) => string;
    suggestions: EsAutocompleteSuggestion[];
    triggerDescribedBy: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    blur: [];
    select: [suggestion: EsAutocompleteSuggestion];
}>();

const model = defineModel<string>({ default: '' });

const takeoverOpen = ref(false);
const triggerId = `${props.id}-trigger`;
const mobileRootEl = ref<HTMLElement | null>(null);
const fieldRef = ref<(ComponentPublicInstance & { inputEl: HTMLInputElement | null }) | null>(null);
const inputEl = computed(() => fieldRef.value?.inputEl ?? null);
const listEl = ref<HTMLElement | null>(null);

const { measured, remeasure, visibleSuggestions } = useAutocompleteVisibleRows(
    listEl,
    toRef(props, 'suggestions'),
    MAX_VISIBLE_SUGGESTIONS,
    // the takeover sizes its list itself (visualViewport); viewport events are
    // only relevant while it is open
    { active: () => takeoverOpen.value },
);

const { closeTakeover, enterTransition } = useTakeoverChoreography({
    isOpen: () => takeoverOpen.value,
    parts: () => ({
        field: (fieldRef.value?.$el as HTMLElement | undefined) ?? null,
        takeover: (inputEl.value?.closest('.es-autocomplete-takeover') as HTMLElement | null) ?? null,
        trigger: mobileRootEl.value?.querySelector<HTMLInputElement>('.es-autocomplete-trigger') ?? null,
    }),
    setOpen: (value) => {
        takeoverOpen.value = value;
    },
});

const combobox = useAutocompleteCombobox({
    close: (selectedText) => {
        void closeTakeover(selectedText);
    },
    emitSelect: (suggestion) => emit('select', suggestion),
    idPrefix: `${props.id}-m`,
    inputEl,
    model,
    // arrows navigate exactly what is displayed
    suggestions: () => (takeoverOpen.value ? visibleSuggestions.value : []),
});

// the takeover's input announces "expanded" exactly when a list exists
const listboxOpen = computed(() => visibleSuggestions.value.length > 0);

// the takeover covers the page, and with it the label: a field with no
// placeholder would sit there with nothing to say what it takes, so the label
// stands in as one. the resting field keeps the consumer's intent.
const takeoverPlaceholder = computed(() => props.placeholder || props.label);

// announces how many suggestions are actually displayed, after the cap and the
// trim, or the no-results state. the inactive shell's region sits under
// display: none, which silences it.
const liveAnnouncement = computed(() =>
    visibleSuggestions.value.length
        ? props.suggestionCountText(visibleSuggestions.value.length)
        : props.noResultsAnnouncement,
);

// 100dvh does not shrink when the iOS keyboard opens, so the list height comes
// from the visual viewport instead, where the keyboard is just a resize event
function updateListHeight() {
    const el = listEl.value;
    const viewport = window.visualViewport;
    if (!el || !viewport) {
        return;
    }
    const top = el.getBoundingClientRect().top;
    el.style.height = `${Math.max(viewport.offsetTop + viewport.height - top, 0)}px`;
    remeasure();
}

// the keyboard open/close animation emits a burst of visualViewport resizes;
// coalesce to one layout read + height write per frame
let listHeightFrame: number | null = null;
function onViewportResize() {
    if (listHeightFrame !== null) {
        cancelAnimationFrame(listHeightFrame);
    }
    listHeightFrame = requestAnimationFrame(() => {
        listHeightFrame = null;
        updateListHeight();
    });
}

watch(takeoverOpen, async (isOpen) => {
    combobox.resetHighlight();
    const viewport = window.visualViewport;
    if (isOpen) {
        await nextTick();
        updateListHeight();
        viewport?.addEventListener('resize', onViewportResize);
        enterTransition();
    } else {
        viewport?.removeEventListener('resize', onViewportResize);
    }
});

onBeforeUnmount(() => {
    window.visualViewport?.removeEventListener('resize', onViewportResize);
    if (listHeightFrame !== null) {
        cancelAnimationFrame(listHeightFrame);
    }
});

// iOS only shows the keyboard when focus happens inside the tap's event chain,
// so redirect the dialog's initial focus to the real input
function onOpenAutoFocus(event: Event) {
    event.preventDefault();
    inputEl.value?.focus();
    combobox.revealCaretOnFocus();
}

// the user is done with the field, so the app hears a blur it can validate on.
// focus moving into the takeover is not leaving, though the portal puts it
// outside this root; nor is the focus Reka hands back on close.
function onRootFocusout(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (takeoverOpen.value || (next && mobileRootEl.value?.contains(next))) {
        return;
    }
    emit('blur');
}

// Reka's trigger opens on click, which a tap and a screen reader's activation
// both produce; a button's Enter and Space do nothing on an input, so the
// combobox's own opening keys are bound on the element
function openTakeover() {
    if (!props.disabled) {
        takeoverOpen.value = true;
    }
}

// every close path — the Close button (DialogClose), Escape, and the combobox's
// own close on select or Enter — routes through closeTakeover so they all animate
function onTakeoverOpenChange(value: boolean) {
    if (value) {
        takeoverOpen.value = true;
    } else {
        void closeTakeover();
    }
}
</script>

<template>
    <div
        ref="mobileRootEl"
        @focusout="onRootFocusout">
        <es-autocomplete-label
            :html-for="triggerId"
            :label="label"
            :label-sr-only="labelSrOnly"
            :required="required" />
        <dialog-root
            :open="takeoverOpen"
            @update:open="onTakeoverOpenChange">
            <!-- the resting field, which opens the takeover with the real input
                 focused. a readonly input rather than a button, so it is a form
                 field: the label names it, its value stays a value, and
                 aria-required/aria-invalid apply, none of which a button carries.
                 readonly is what keeps the on-screen keyboard from opening here
                 and again in the takeover -->
            <!-- role="combobox" with a dialog popup is the APG date-picker shape,
                 and Reka supplies aria-haspopup, aria-expanded, aria-controls and
                 the click. aria-readonly="false" says what the HTML attribute
                 cannot, that the user does change this value; iOS VoiceOver
                 announces "read only" anyway, then "double tap to edit" -->
            <!-- autocomplete stays 'off' whatever the consumer asked for:
                 browsers skip readonly fields, and the token belongs on the
                 input that is really filled in -->
            <dialog-trigger
                :id="triggerId"
                as="input"
                autocomplete="off"
                class="es-autocomplete-trigger es-form-input form-control px-100 w-100"
                readonly
                role="combobox"
                type="text"
                aria-readonly="false"
                :aria-describedby="triggerDescribedBy"
                :aria-invalid="state === false ? true : undefined"
                :aria-required="required ? true : undefined"
                :class="{ 'is-invalid': state === false }"
                :disabled="disabled"
                :placeholder="placeholder"
                :value="model"
                @keydown.down.prevent="openTakeover"
                @keydown.enter.prevent="openTakeover"
                @keydown.space.prevent="openTakeover" />
            <dialog-portal>
                <!-- invisible behind the opaque takeover, but load-bearing: Reka's body
                     scroll lock lives in the overlay — including the iOS touchmove
                     preventer, without which the page beneath still pans on iOS Safari
                     (overflow: hidden on body does not stop touch scrolling there) -->
                <dialog-overlay class="es-autocomplete-takeover-overlay" />
                <!-- aria-describedby="" (an empty idref list) overrides Reka's dialog-level
                     description binding: iOS VoiceOver re-announces a dialog's description
                     after EVERY element focused inside it, and the guidance belongs to the
                     input alone, which carries the same text via its own aria-describedby -->
                <dialog-content
                    aria-describedby=""
                    class="es-autocomplete-takeover bg-white d-flex flex-column"
                    @open-auto-focus="onOpenAutoFocus">
                    <dialog-title class="sr-only">
                        {{ label }}
                    </dialog-title>
                    <!-- a wrapping flex row with CSS order: the DOM runs field → list →
                         Close so a screen reader's linear navigation reaches the
                         suggestions right after the field, while visually the Close
                         button stays beside the field and the list fills the line below -->
                    <div class="align-content-start d-flex flex-grow-1 flex-wrap">
                        <div class="es-autocomplete-takeover-field order-1 flex-grow-1 py-100 pl-100">
                            <es-autocomplete-field
                                ref="fieldRef"
                                :aria-label="label"
                                :autocomplete="autocomplete"
                                :clear-text="clearText"
                                :combobox="combobox"
                                :described-by="describedBy"
                                :listbox-open="listboxOpen"
                                :model="model"
                                :placeholder="takeoverPlaceholder"
                                :required="required"
                                :state="state" />
                        </div>
                        <div
                            :id="combobox.listboxId"
                            ref="listEl"
                            :aria-hidden="visibleSuggestions.length === 0 ? 'true' : undefined"
                            :aria-label="label"
                            role="listbox"
                            :class="[
                                'es-autocomplete-takeover-list order-3 text-left w-100',
                                { 'es-autocomplete-takeover-list--measuring': !measured },
                            ]"
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
                            <!-- presentation only: screen readers get the same guidance
                                 from the input's description and the live region -->
                            <div
                                v-if="panelMessage"
                                aria-hidden="true"
                                class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                                {{ panelMessage }}
                            </div>
                        </div>
                        <!-- 'Close', not 'Cancel': dismissing keeps whatever is in the
                             input — the takeover is just a full-screen way of editing it.
                             In the DOM it follows the list (a screen reader reaches the
                             suggestions before it); the order class places it beside the
                             field visually. -->
                        <dialog-close
                            class="es-autocomplete-close align-self-center bg-transparent border-0 order-2 px-100">
                            {{ closeText }}
                        </dialog-close>
                        <div
                            aria-live="polite"
                            class="sr-only"
                            role="status">
                            {{ liveAnnouncement }}
                        </div>
                    </div>
                </dialog-content>
            </dialog-portal>
        </dialog-root>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete-trigger {
    /* an input's intrinsic width ignores its value, so a long one cannot widen a
     * content-sized ancestor — but that width is also a flex item's automatic
     * minimum, which would stop the field shrinking into a narrow column */
    min-width: 0;

    &::placeholder {
        color: variables.$input-color-placeholder;
    }
}

/* the disabled colors es-autocomplete-field sets by hand, matched here: this
 * trigger carries form-control itself, so es-ds-styles paints it $gray-500
 * (2.93:1), and !important because that rule is written that way */
input.es-autocomplete-trigger:disabled {
    color: variables.$gray-600 !important;

    &::placeholder {
        color: variables.$gray-600;
    }
}

/* the base field look, re-asserted: es-ds-styles paints [readonly] like
 * :disabled, but here it only keeps the keyboard away. a disabled field is
 * excluded, and .is-invalid re-states its border color to keep it. */
input.es-autocomplete-trigger:not(:disabled) {
    background-color: variables.$input-bg;
    border: variables.$input-border-width solid variables.$input-border-color;
    color: variables.$input-color !important;
    /* it opens the takeover, so it takes a pointer rather than a text caret */
    cursor: pointer;

    &.is-invalid {
        border-color: variables.$form-feedback-invalid-color;
    }
}

/* transparent: it exists for the scroll lock, and any tint would show through
 * the takeover's cross-fade. DOM order puts it under the takeover. */
.es-autocomplete-takeover-overlay {
    inset: 0;
    position: fixed;
    z-index: 1050;
}

.es-autocomplete-takeover {
    height: 100dvh;
    inset: 0;
    position: fixed;
    /* above the page and any menu bar (1000); same layer as modals */
    z-index: 1050;

    /* deliberately no focus styling on the field: the full-screen takeover itself
     * is the focus indicator (see es-autocomplete-desktop.vue for the rationale) */

    /* ≥16px or iOS Safari auto-zooms on focus */
    :deep(.es-autocomplete-input) {
        font-size: 1rem;
    }

    /* the takeover carries no validation: the message stays on the page behind it,
     * so the invalid look would be unexplained here — and the padding Bootstrap
     * reserves for the icon widens the field's minimum, pushing Close off screen */
    :deep(.es-autocomplete-field.is-invalid) {
        background-image: none;
        border-color: variables.$input-border-color;
        /* es-ds-styles reserves the icon's room with !important, so taking the
         * room back needs the same weight */
        padding-right: 0 !important; // stylelint-disable-line declaration-no-important
    }
}

.es-autocomplete-close {
    color: variables.$blue-600;
    font-weight: variables.$font-weight-semibold;
}

/*
 * updates the flex item's min width from content width to zero so it
 * doesn't push the Close button off the screen when content is long
 */
.es-autocomplete-takeover-field {
    min-width: 0;
}

.es-autocomplete-takeover-list {
    /* no scrolling by design: the row trim only renders items that fit */
    overflow: hidden;
    position: relative;

    &--measuring {
        visibility: hidden;
    }

    /* ≥16px text for readability; the ≥48px row height comes from the shared
     * es-autocomplete-item styles */
    .es-autocomplete-item {
        font-size: 1rem;
    }

    .es-autocomplete-no-results {
        font-size: 1rem;
    }
}
</style>

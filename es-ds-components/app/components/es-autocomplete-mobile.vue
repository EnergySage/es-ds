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
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const takeoverOpen = ref(false);
const triggerId = `${props.id}-trigger`;
const mobileRootEl = ref<HTMLElement | null>(null);
const fieldRef = ref<(ComponentPublicInstance & { inputEl: HTMLInputElement | null }) | null>(null);
const inputEl = computed(() => fieldRef.value?.inputEl ?? null);
const listEl = ref<HTMLElement | null>(null);

const { measured, remeasure, visibleSuggestions } = useFitToViewport(
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
        trigger: mobileRootEl.value?.querySelector<HTMLElement>('.es-autocomplete-fake-field') ?? null,
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
    emitSubmit: (query) => emit('submit', query),
    idPrefix: `${props.id}-m`,
    inputEl,
    model,
    // arrows navigate exactly what is displayed
    suggestions: () => (takeoverOpen.value ? visibleSuggestions.value : []),
});

// the takeover's input announces "expanded" exactly when a list exists
const listboxOpen = computed(() => visibleSuggestions.value.length > 0);

// announces the number of suggestions actually DISPLAYED (after the cap and the
// fit-to-viewport trim), or the no-results state. Each shell owns its own live
// region: the inactive shell's sits under display: none, which silences it.
const liveAnnouncement = computed(() =>
    visibleSuggestions.value.length
        ? props.suggestionCountText(visibleSuggestions.value.length)
        : props.noResultsAnnouncement,
);

// 100dvh does not shrink when the iOS keyboard opens, so the list height is
// derived from the visual viewport instead; the keyboard opening/closing is
// just a resize event. Re-trim after every height change.
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

// every close path — the Close button (DialogClose), Escape, and selection/submit
// via the combobox's close — routes through closeTakeover so they all animate
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
        class="d-md-none">
        <es-autocomplete-label
            :html-for="triggerId"
            :label="label"
            :label-sr-only="labelSrOnly"
            :required="required" />
        <dialog-root
            :open="takeoverOpen"
            @update:open="onTakeoverOpenChange">
            <!-- fake search field: tapping it opens the takeover with the real input focused -->
            <!-- the label association names this button, which suppresses its text
                 content in the accessible name — so a held value (unlike an input's,
                 which has a value slot of its own) must be folded into the name for
                 screen readers to announce it -->
            <dialog-trigger
                :id="triggerId"
                class="es-autocomplete-fake-field es-form-input form-control align-items-center d-flex px-100 text-left w-100"
                :class="{ 'is-invalid': state === false }"
                :aria-describedby="triggerDescribedBy"
                :aria-label="model ? `${label}, ${model}` : undefined"
                :disabled="disabled">
                <span
                    v-if="model"
                    class="es-autocomplete-fake-field-text">
                    {{ model }}
                </span>
                <span
                    v-else
                    class="es-autocomplete-fake-field-text es-autocomplete-fake-field-placeholder">
                    {{ placeholder }}
                </span>
            </dialog-trigger>
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
                        <div class="order-1 flex-grow-1 py-100 pl-100">
                            <es-autocomplete-field
                                ref="fieldRef"
                                :aria-label="label"
                                :clear-text="clearText"
                                :combobox="combobox"
                                :described-by="describedBy"
                                :listbox-open="listboxOpen"
                                :model="model"
                                :placeholder="placeholder"
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

/* a button's intrinsic width grows with its text (unlike an input, whose
 * intrinsic width ignores its value), so a long selected value would widen any
 * content-sized ancestor — e.g. a flex layout — past the viewport. Inline-size
 * containment makes the button's intrinsic width independent of its contents;
 * its width comes from the layout alone and the value truncates inside it. */
.es-autocomplete-fake-field {
    contain: inline-size;
}

/* overflowing text clips at the edge (text-overflow's default) the way an input
 * clips its value, rather than ellipsizing — the fake field should read as an input */
.es-autocomplete-fake-field-text {
    overflow: hidden;
    white-space: nowrap;
}

.es-autocomplete-fake-field-placeholder {
    color: variables.$input-color-placeholder;
}

/* transparent: it exists for the scroll lock, and any tint would show through the
 * takeover's cross-fade. Sits under the takeover by DOM order at the same level. */
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
}

.es-autocomplete-close {
    color: variables.$blue-600;
    font-weight: variables.$font-weight-semibold;
}

.es-autocomplete-takeover-list {
    /* no scrolling by design: the fit-to-viewport trim only renders items that fit */
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

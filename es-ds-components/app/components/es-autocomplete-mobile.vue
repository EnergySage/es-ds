<script setup lang="ts">
import {
    AutocompleteAnchor,
    AutocompleteContent,
    AutocompleteInput,
    AutocompleteRoot,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from 'reka-ui';
import type { ComponentPublicInstance } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// Baymard: keep the list manageable — at most 5 suggestions,
// further reduced by the fit-to-viewport trim
const MAX_VISIBLE = 5;

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
}

const props = defineProps<Props>();

const emit = defineEmits<{
    select: [suggestion: EsAutocompleteSuggestion];
    submit: [query: string];
}>();

const model = defineModel<string>({ default: '' });

const takeoverOpen = ref(false);
const triggerId = computed(() => `${props.id}-trigger`);
const inputRef = ref<ComponentPublicInstance | null>(null);
const contentRef = ref<ComponentPublicInstance | null>(null);
const guardRef = ref<{ clearHighlight: () => void } | null>(null);
const contentEl = useAutocompleteContentEl(contentRef, takeoverOpen);
const { measured, remeasure, visibleSuggestions } = useFitToViewport(
    contentEl,
    toRef(props, 'suggestions'),
    MAX_VISIBLE,
);

// announces the number of suggestions actually DISPLAYED (after the cap and the
// fit-to-viewport trim), or the no-results state. Each shell owns its own live
// region: the inactive shell's sits under display: none, which silences it.
const liveAnnouncement = computed(() =>
    visibleSuggestions.value.length
        ? props.suggestionCountText(visibleSuggestions.value.length)
        : props.noResultsAnnouncement,
);

const {
    displayText,
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
    revealCaretOnFocus,
    userHighlighted,
} = useAutocompleteShell({
    clearHighlight: () => guardRef.value?.clearHighlight(),
    close: (selectedText) => {
        void closeTakeover(selectedText);
    },
    contentEl,
    emitSelect: (suggestion) => emit('select', suggestion),
    emitSubmit: (query) => emit('submit', query),
    inputRef,
    model,
    suggestions: () => props.suggestions,
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
    resetUserHighlight();
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
    (inputRef.value?.$el as HTMLElement | undefined)?.focus();
    revealCaretOnFocus();
}

// --- takeover enter/exit choreography ---------------------------------------
// The takeover cross-fades while a "ghost" of the field flies between the fake
// field's place on the page and the real field's place in the takeover, showing
// where the takeover comes from and returns to. The ghost is an inert clone of
// the fake field, so the real input keeps its synchronous focus (which is what
// makes iOS show the keyboard) and the animation stays purely presentational.
// Exit runs the same flight in reverse — the ghost carries the fake field's
// look and current text, so it lands exactly as the page will render — and the
// actual close waits for the animation.
const TRANSITION_MS = 300;
const mobileRootEl = ref<HTMLElement | null>(null);

function transitionsDisabled() {
    return (
        typeof matchMedia === 'undefined' ||
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('animate' in Element.prototype)
    );
}

function takeoverParts() {
    const inputEl = inputRef.value?.$el as HTMLElement | undefined;
    return {
        field: (inputEl?.closest('.es-autocomplete-field') as HTMLElement | null) ?? null,
        takeover: (inputEl?.closest('.es-autocomplete-takeover') as HTMLElement | null) ?? null,
        trigger: mobileRootEl.value?.querySelector<HTMLElement>('.es-autocomplete-fake-field') ?? null,
    };
}

// resolves when the animation finishes — or cancels it and resolves after a
// timeout, because a page whose rendering is frozen (a hidden or backgrounded
// tab) never advances its animation timeline, and the close must not hang on it
function settle(animation: Animation) {
    return new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
            animation.cancel();
            resolve();
        }, TRANSITION_MS + 150);
        animation.finished
            .catch(() => undefined)
            .then(() => {
                clearTimeout(timer);
                resolve();
            });
    });
}

function flyGhost(trigger: HTMLElement, from: DOMRect, to: DOMRect, decorate?: (ghost: HTMLElement) => void) {
    const ghost = trigger.cloneNode(true) as HTMLElement;
    ghost.removeAttribute('id');
    ghost.setAttribute('aria-hidden', 'true');
    // w-100 is !important, which would defeat the animated width
    ghost.classList.remove('w-100');
    ghost.style.cssText = 'margin: 0; overflow: hidden; pointer-events: none; position: fixed; z-index: 1060;';
    document.body.append(ghost);
    const rectFrame = (rect: DOMRect) => ({
        height: `${rect.height}px`,
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
    });
    const flight = ghost.animate([rectFrame(from), rectFrame(to)], {
        duration: TRANSITION_MS,
        easing: 'cubic-bezier(0.2, 0, 0, 1)',
        fill: 'both',
    });
    decorate?.(ghost);
    return settle(flight).finally(() => ghost.remove());
}

// The ghost mirrors the real field's trimmings so nothing pops at the flight's
// ends. Toward the takeover ('in'): the text is rebuilt inside a clipping box
// that matches the real input's text region — inset the input's 1rem padding on
// the left (so no padding pops in at landing) and reserving the clear button's
// width on the right — and a clone of the field's clear button fades in. Text
// that fits that region at landing stays start-aligned, exactly as the input
// shows it; text that overflows is end-aligned so its tail tracks the region's
// right edge at every animated width. (A scroll offset only re-clamps when the
// box widens, and a flex auto margin collapses to zero once the span overflows;
// justify-content end-alignment overflows toward the start, which is what an
// end-anchored clipped line needs.) Toward the page ('out'): text stays
// start-anchored like the fake field it becomes, and the clear-button clone
// fades out.
function decorateGhost(
    ghost: HTMLElement,
    clearButton: HTMLElement | null,
    direction: 'in' | 'out',
    landing: DOMRect,
    textOverride?: string,
) {
    const text = ghost.querySelector<HTMLElement>('.es-autocomplete-fake-field-text');
    if (text && textOverride !== undefined) {
        // a selection's text: the close runs before Reka's model write reaches
        // the cloned trigger, so the ghost takes the final text explicitly
        text.textContent = textOverride;
        text.classList.remove('es-autocomplete-fake-field-placeholder');
    }
    if (direction === 'in' && text) {
        const clip = document.createElement('div');
        clip.style.cssText = `position: absolute; overflow: hidden; display: flex; align-items: center;
            inset: 0 ${clearButton ? 'calc(1rem + 2.75rem)' : '1rem'} 0 1rem;`;
        text.style.cssText = 'flex: none; margin: 0; overflow: visible; width: max-content;';
        clip.append(text);
        ghost.append(clip);
        const rem = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const landingRegionWidth = landing.width - 2 - rem - (clearButton ? rem + 2.75 * rem : rem);
        const overflows = text.getBoundingClientRect().width > landingRegionWidth;
        clip.style.justifyContent = overflows ? 'flex-end' : 'flex-start';
    }
    if (clearButton) {
        const clone = clearButton.cloneNode(true) as HTMLElement;
        // pinned to the ghost's edge: the real field lays the button flush right
        // (p-0), while the ghost carries the fake field's own side padding
        clone.style.cssText = 'position: absolute; inset: 0 0 0 auto;';
        ghost.append(clone);
        clone.animate(direction === 'in' ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }], {
            duration: TRANSITION_MS,
            easing: 'ease',
            fill: 'both',
        });
    }
}

function enterTransition() {
    if (transitionsDisabled()) {
        return;
    }
    const { field, takeover, trigger } = takeoverParts();
    if (!field || !takeover || !trigger) {
        return;
    }
    // hide both real elements while the ghost flies, so it reads as ONE element
    // leaving its place and arriving — opacity, not visibility, because the
    // field holds focus and hiding a focused element can blur it (losing the
    // iOS keyboard). The trigger is revealed only once the flight settles, when
    // the now-opaque takeover covers it.
    field.style.opacity = '0';
    trigger.style.opacity = '0';
    const clearButton = field.querySelector<HTMLElement>('.es-autocomplete-clear');
    const landing = field.getBoundingClientRect();
    void settle(takeover.animate([{ opacity: 0 }, { opacity: 1 }], { duration: TRANSITION_MS, easing: 'ease-out' }));
    void flyGhost(trigger, trigger.getBoundingClientRect(), landing, (ghost) =>
        decorateGhost(ghost, clearButton, 'in', landing),
    ).then(() => {
        field.style.opacity = '';
        // a close begun during the enter flight owns the trigger's visibility
        if (!exiting) {
            trigger.style.opacity = '';
        }
    });
}

let exiting = false;
async function closeTakeover(selectedText?: string) {
    if (!takeoverOpen.value || exiting) {
        return;
    }
    if (transitionsDisabled()) {
        takeoverOpen.value = false;
        return;
    }
    exiting = true;
    const { field, takeover, trigger } = takeoverParts();
    if (!field || !takeover || !trigger) {
        takeoverOpen.value = false;
        exiting = false;
        return;
    }
    takeover.style.pointerEvents = 'none';
    // hide both real elements while the ghost flies back (see enterTransition)
    trigger.style.opacity = '0';
    field.style.opacity = '0';
    const clearButton = field.querySelector<HTMLElement>('.es-autocomplete-clear');
    const fade = takeover.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: TRANSITION_MS,
        easing: 'ease-in',
        fill: 'forwards',
    });
    const landing = trigger.getBoundingClientRect();
    await Promise.all([
        flyGhost(trigger, field.getBoundingClientRect(), landing, (ghost) =>
            decorateGhost(ghost, clearButton, 'out', landing, selectedText),
        ),
        settle(fade),
    ]);
    trigger.style.opacity = '';
    field.style.opacity = '';
    takeoverOpen.value = false;
    exiting = false;
}

// every close path — the Close button (DialogClose), Escape, and selection/submit
// via the shell's close — routes through closeTakeover so they all animate
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
                :aria-describedby="describedBy"
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
                        open
                        @highlight="onHighlight">
                        <es-autocomplete-highlight-guard
                            ref="guardRef"
                            :user-highlighted="userHighlighted" />
                        <div class="align-items-center d-flex p-100">
                            <autocomplete-anchor
                                class="es-autocomplete-field es-form-input form-control align-items-center d-flex flex-grow-1 p-0"
                                @keydown.capture.enter="onEnterKey">
                                <autocomplete-input
                                    ref="inputRef"
                                    v-model="displayText"
                                    class="es-autocomplete-input h-100 w-100 px-100"
                                    :aria-describedby="describedBy"
                                    :aria-invalid="state === false ? true : undefined"
                                    :aria-label="label"
                                    :placeholder="placeholder"
                                    :required="required"
                                    @input="onUserInput"
                                    @keydown.down="onArrowDown"
                                    @keydown.up="onArrowUp" />
                                <es-autocomplete-clear-button
                                    v-if="model"
                                    :clear-text="clearText"
                                    @clear="onClear" />
                            </autocomplete-anchor>
                            <!-- 'Close', not 'Cancel': dismissing keeps whatever is in the
                                 input — the takeover is just a full-screen way of editing it -->
                            <dialog-close class="es-autocomplete-close bg-transparent border-0 flex-shrink-0 ml-100">
                                {{ closeText }}
                            </dialog-close>
                        </div>
                        <autocomplete-content
                            ref="contentRef"
                            :aria-hidden="visibleSuggestions.length === 0 ? 'true' : undefined"
                            :class="[
                                'es-autocomplete-takeover-list text-left',
                                { 'es-autocomplete-takeover-list--measuring': !measured },
                            ]"
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
                            <!-- presentation only: screen readers get the same guidance
                                 from the dialog description and the live region -->
                            <div
                                v-if="panelMessage"
                                aria-hidden="true"
                                class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                                {{ panelMessage }}
                            </div>
                        </autocomplete-content>
                        <div
                            aria-live="polite"
                            class="sr-only"
                            role="status">
                            {{ liveAnnouncement }}
                        </div>
                    </autocomplete-root>
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
}

/* deliberately no focus styling on the field: the full-screen takeover itself is
 * the focus indicator (see es-autocomplete-desktop.vue for the fuller rationale) */

.es-autocomplete-input {
    background: transparent;
    border: none;
    /* ≥16px or iOS Safari auto-zooms on focus */
    font-size: 1rem;

    &:focus-visible {
        outline: none;
    }

    &::placeholder {
        color: variables.$input-color-placeholder;
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

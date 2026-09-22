<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import type { EsAutocompleteSuggestion } from '../types';

// defaults live on the public es-autocomplete.vue wrapper, which always binds
// every prop; declaring them again here would be dead code that could drift
interface Props {
    autocomplete: string;
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
    blur: [];
    select: [suggestion: EsAutocompleteSuggestion];
}>();

const model = defineModel<string>({ default: '' });

const open = ref(false);
// the listbox renders only when there are suggestions to browse, so a screen
// reader hears "expanded" exactly when there is a list; the prompt/no-results
// message shows in an aria-hidden lookalike panel instead
const listboxOpen = computed(() => open.value && props.suggestions.length > 0);
// the visible panel hosts whichever applies, listbox or message, so the message
// slides like the listbox and swapping between them morphs the height
const panelOpen = computed(() => open.value && (props.suggestions.length > 0 || props.panelMessage !== ''));

const rootEl = ref<HTMLElement | null>(null);
const fieldRef = ref<(ComponentPublicInstance & { inputEl: HTMLInputElement | null }) | null>(null);
// the field component's root is a single plain div, so $el is reliable
const fieldEl = computed(() => (fieldRef.value?.$el as HTMLElement | undefined) ?? null);
const inputEl = computed(() => fieldRef.value?.inputEl ?? null);
const panelEl = ref<HTMLElement | null>(null);

// with anchor positioning the panel is the browser's own popover, anchored to
// the field: the top layer escapes any ancestor's overflow or z-index, and
// manual mode keeps light-dismiss from closing it on a click in our own input.
// without it the styles place the panel below the field and script stands down.
//
// checked after mount, not in setup, to avoid hydration errors.
const supportsAnchor = ref(false);
onMounted(() => {
    supportsAnchor.value = typeof CSS !== 'undefined' && CSS.supports('anchor-name: --a');
});
const anchorName = `--es-autocomplete-${props.id}`;
const panelAbove = ref(false);

// chooses the panel's side and max-height from the space around the field, from
// the same numbers the fit-to-viewport trim divides into rows. below unless the
// untrimmed list only fits above, as any popper would.
function positionPanel() {
    const panel = panelEl.value;
    const anchor = fieldEl.value;
    if (!panel || !anchor) {
        return;
    }
    const offset = 4; // the 0.25rem field-to-panel gap (the panel's margin inside the clip)
    const anchorRect = anchor.getBoundingClientRect();
    const spaceBelow = window.innerHeight - anchorRect.bottom - offset;
    const spaceAbove = anchorRect.top - offset;
    const rowHeight = panel.querySelector<HTMLElement>('[data-es-autocomplete-item]')?.offsetHeight ?? 0;
    const borders = Math.max(panel.offsetHeight - panel.clientHeight, 0);
    const natural = rowHeight * Math.min(props.suggestions.length, MAX_VISIBLE_SUGGESTIONS) + borders;
    const above = supportsAnchor.value && natural > spaceBelow && natural <= spaceAbove;
    panelAbove.value = above;
    panel.style.maxHeight = `${Math.max(above ? spaceAbove : spaceBelow, 0)}px`;
}

const { remeasure, visibleSuggestions } = useFitToViewport(
    panelEl,
    toRef(props, 'suggestions'),
    MAX_VISIBLE_SUGGESTIONS,
    {
        // the always-mounted panel must not re-measure on every page scroll while closed
        active: () => panelOpen.value,
        beforeMeasure: positionPanel,
    },
);

const combobox = useAutocompleteCombobox({
    close: () => {
        open.value = false;
    },
    emitSelect: (suggestion) => emit('select', suggestion),
    idPrefix: props.id,
    inputEl,
    model,
    // arrows navigate exactly what is displayed; nothing while the panel is closed
    suggestions: () => (listboxOpen.value ? visibleSuggestions.value : []),
});
watch(open, combobox.resetHighlight);

// announces how many suggestions are actually displayed, after the cap and the
// trim, or the no results state. the inactive shell's region sits under
// display: none, which silences it.
const liveAnnouncement = computed(() =>
    visibleSuggestions.value.length
        ? props.suggestionCountText(visibleSuggestions.value.length)
        : props.noResultsAnnouncement,
);

// a popover element displays only once shown; manual popovers never light-dismiss
function showAsPopover(el: HTMLElement | null) {
    if (el && supportsAnchor.value) {
        try {
            el.showPopover();
        } catch {
            // already shown, or not a popover in this browser
        }
    }
}

// each side parks the closed panel differently, so the side is settled before
// the open: a transition reads the value from before the frame it starts in.
// the re-park runs with transitions off, or it becomes the slide's start point.
async function parkPanel() {
    const wasAbove = panelAbove.value;
    positionPanel();
    if (panelAbove.value === wasAbove) {
        return;
    }
    await nextTick();
    const panel = panelEl.value;
    if (!panel) {
        return;
    }
    panel.style.transition = 'none';
    // forces the new park into the DOM before the transition comes back
    void panel.offsetHeight;
    panel.style.transition = '';
}

// the panel, and the overlay with showOverlayOnFocus, stays up for the whole
// interaction: focus opens it; Escape, a selection, Enter, focus moving to
// another control or a pointerdown outside closes it — never a bare blur.
async function onFieldActivity() {
    if (props.disabled) {
        return;
    }
    if (!open.value) {
        await parkPanel();
    }
    open.value = true;
}

// our own restore after an arrow-driven collapse continues the navigation it
// interrupted, so it is not an entry into the field (see onFocusIn)
let restoringFocus = false;
// blur is reported once per visit, so the paths that can each notice the same
// departure do not announce it twice
let visiting = false;

function onFocusIn() {
    // entering the field starts a fresh interaction, from the typed text: a
    // leftover highlight keeps aria-activedescendant pointed into the list, and
    // a screen reader arriving here follows it straight back out to that option
    if (!restoringFocus) {
        combobox.resetHighlight();
    }
    visiting = true;
    onFieldActivity();
    combobox.revealCaretOnFocus();
}

// the user is done with the field, so the panel goes down and the app hears a
// blur it can validate on. Escape and select are not this — each leaves focus in
// the input, and the interaction continues.
function leaveField() {
    open.value = false;
    if (visiting) {
        visiting = false;
        emit('blur');
    }
}

// focus went nowhere rather than to another control: no relatedTarget at all,
// or the document standing in for one (a screen reader's "web area")
function isFocusCollapse(next: Node | null) {
    return !next || next === document.body || next === document.documentElement;
}

function onRootFocusout(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (!isFocusCollapse(next)) {
        if (!rootEl.value?.contains(next)) {
            leaveField();
        }
        return;
    }
    // a collapse says nothing on its own: the arrows' echo, a click on dead space
    // and a screen reader's cursor moving off all look alike, so the answer waits
    // for what the browser settles on
    answerFocusCollapse(combobox.consumeArrowBlur());
}

// deferred a frame: by then an outside pointerdown has closed the panel, and a
// focus move still in flight has landed somewhere real. the window losing focus
// leaves the input active, so it needs nothing.
function answerFocusCollapse(followsArrowKey: boolean) {
    requestAnimationFrame(() => {
        const el = inputEl.value;
        const active = document.activeElement;
        const stillNowhere = !active || active === document.body || active === document.documentElement;
        if (!document.hasFocus() || !stillNowhere) {
            return;
        }
        if (followsArrowKey && open.value && el) {
            restoringFocus = true;
            el.focus();
            restoringFocus = false;
            return;
        }
        // while the panel is up the widget is still in use: a screen reader walks
        // the list with real focus left behind, and a blur would validate the
        // field mid-interaction. with it down, focus gone means the user has left
        if (!open.value) {
            leaveField();
        }
    });
}

// clicks outside close the widget, and only the pointer event tells them from a
// screen reader's identical collapse. inside means the working parts, not the
// root: its dead space beside the label would otherwise strand an open list.
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

// --- panel drawer ------------------------------------------------------------
// the slide is pure CSS on the --open class, so interruption, reversal and
// reduced motion come from the platform; script shows the popover,
// re-positions, and morphs the height.
const PANEL_SLIDE_MS = 200;

function morphDisabled() {
    return (
        typeof matchMedia === 'undefined' ||
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('animate' in Element.prototype)
    );
}

const wrapperEl = ref<HTMLElement | null>(null);
// the popover attribute only appears once the post-mount upgrade lands, so the
// show re-runs when supportsAnchor flips — and post-flush, after the attribute
// itself is in the DOM (showPopover throws on a non-popover element)
watch([wrapperEl, supportsAnchor], () => showAsPopover(wrapperEl.value), { flush: 'post' });

// the always-mounted panel keeps its last measure, so a reopen re-derives the
// side and max-height from wherever the field sits now
watch(panelOpen, (isOpen) => {
    if (isOpen) {
        void remeasure();
    }
});

// the morph animates the panel itself, whose overflow: hidden clips the rows, so
// growing reveals them and shrinking pulls the bottom edge up. the observer
// watches the inner content, so every event is a real content change.
const panelContentEl = ref<HTMLElement | null>(null);
let heightAnimation: Animation | null = null;
let lastPanelHeight: number | null = null;
let panelResizeObserver: ResizeObserver | null = null;
watch(panelContentEl, (el) => {
    panelResizeObserver?.disconnect();
    panelResizeObserver = null;
    lastPanelHeight = null;
    if (!el || typeof ResizeObserver === 'undefined') {
        return;
    }
    panelResizeObserver = new ResizeObserver(() => {
        const panel = panelEl.value;
        if (!panel) {
            return;
        }
        // mid-morph, the rendered height is wherever the keyframes are; idle,
        // it is already the NEW natural height, so the old one comes from the
        // previous observation
        const wasMidMorph = heightAnimation !== null;
        const rendered = panel.getBoundingClientRect().height;
        heightAnimation?.cancel();
        heightAnimation = null;
        const natural = panel.getBoundingClientRect().height;
        const from = wasMidMorph ? rendered : lastPanelHeight;
        lastPanelHeight = natural;
        if (from === null || !panelOpen.value || morphDisabled() || Math.abs(natural - from) < 1) {
            return;
        }
        const animation = panel.animate([{ height: `${from}px` }, { height: `${natural}px` }], {
            duration: PANEL_SLIDE_MS,
            easing: 'cubic-bezier(0.2, 0, 0, 1)',
            fill: 'both',
        });
        heightAnimation = animation;
        void settleAnimation(animation, PANEL_SLIDE_MS + 150).then(() => {
            if (heightAnimation === animation) {
                heightAnimation = null;
                // the natural height equals the end keyframe, so dropping the
                // finished animation leaves no jump
                animation.cancel();
            }
        });
    });
    panelResizeObserver.observe(el);
});

onBeforeUnmount(() => {
    panelResizeObserver?.disconnect();
});
</script>

<template>
    <div
        ref="rootEl"
        class="position-relative"
        @focusout="onRootFocusout">
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
            :autocomplete="autocomplete"
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
            @keydown.esc="open = false" />
        <!-- the panel sits right after the field in the DOM, as the APG combobox
             examples do, so a screen reader leaving the list lands back near the
             input. the outer div is the clip wrapper the drawer slides within,
             the inner one the panel that translates -->
        <!-- popover and position-anchor are unconditional, and the
             anchored/fallback split lives in a CSS @supports block, so server
             and client render identical markup -->
        <div
            ref="wrapperEl"
            :aria-hidden="panelOpen ? undefined : 'true'"
            popover="manual"
            :class="[
                'es-autocomplete-clip',
                {
                    'es-autocomplete-clip--above': panelAbove,
                    'es-autocomplete-clip--open': panelOpen,
                },
            ]"
            :style="{ positionAnchor: anchorName }">
            <div
                ref="panelEl"
                class="es-autocomplete-panel bg-white rounded-xs text-gray-900 font-size-75 text-left"
                @mousedown="combobox.onListMousedown">
                <!-- persistent inner box: the height-morph observer watches it,
                     so the panel's own height animation cannot feed back into it -->
                <div ref="panelContentEl">
                    <div
                        v-if="visibleSuggestions.length"
                        :id="combobox.listboxId"
                        :aria-label="label"
                        role="listbox">
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
                    <!-- presentation only: screen readers get the same guidance from
                         the input's description and the live region, so this is hidden
                         and the combobox stays collapsed -->
                    <div
                        v-else-if="panelMessage"
                        aria-hidden="true"
                        class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                        {{ panelMessage }}
                    </div>
                </div>
            </div>
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
            <!-- no shell gate of its own: the overlay exists only while this shell
                 is open, which it cannot be while the wrapper hides it -->
            <div
                v-if="open && showOverlayOnFocus"
                aria-hidden="true"
                class="es-autocomplete-overlay" />
        </transition>
    </teleport>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

/* without the overlay, the field takes es-dropdown-select's focus ring, whose
 * contrast change es-form-input's lighter border lacks. the class gate hands
 * that ring to the highlighted option during keyboard navigation. */
.es-autocomplete-field--focus-ring:focus-within {
    border-color: variables.$blue-600;
    outline: 0.125rem solid variables.$blue-600;
    outline-offset: 0.125rem;
}

/* with showOverlayOnFocus the field has no focus styling of its own: the
 * page-dim overlay is the focus indicator, and a lighter border would read as
 * the border disappearing against the dimmed page */

/* while the panel is open, lift the input above the page-dim overlay so it
 * stays fully visible and interactive */
.es-autocomplete-field--raised {
    position: relative;
    z-index: 1000;
}

/* the invisible clip wrapper the drawer slides within, cropping the panel only
 * at the field's edge. these base rules are the no-anchor fallback and clear the
 * UA's [popover] defaults — the display among them shows an unshown popover. */
.es-autocomplete-clip {
    background: transparent;
    border: 0;
    clip-path: inset(0 -2rem -2rem -2rem);
    display: block;
    inset: auto;
    left: 0;
    margin: 0;
    max-width: min(90vw, 30rem);
    min-width: 100%;
    overflow: visible;
    padding: 0;
    /* never a hit target: a top-layer element swallows clicks over its whole box
     * even when transparent, so only the open panel inside takes them */
    pointer-events: none;
    position: absolute;
    top: 100%;
    width: max-content;
    /* above .es-autocomplete-overlay when not in the top layer */
    z-index: 1000;

    /* flipped: the drawer emerges upward, so the crop moves to the bottom edge
     * and the panel pins there, revealing rows from the top */
    &--above {
        align-content: end;
        clip-path: inset(-2rem -2rem 0 -2rem);
    }

    /* glued to the field by anchor positioning, which keeps it attached between
     * the script's re-measures. flush against the field, so the crop edge sits
     * where the drawer disappears behind it; the gap is the panel's margin. */
    @supports (anchor-name: --a) {
        left: anchor(left);
        min-width: anchor-size(width);
        position: fixed;
        top: anchor(bottom);

        &.es-autocomplete-clip--above {
            bottom: anchor(top);
            top: auto;
        }
    }
}

/* the visual panel that slides, parked behind the field with its shadow faded
 * until --open transitions it out. visibility flips discretely, at the slide's
 * start and the retract's end, so the browser owns the whole exit. */
.es-autocomplete-panel {
    border: variables.$border-width solid variables.$gray-500;
    box-shadow: none;
    margin-top: 0.25rem;
    overflow: hidden;
    /* clicks pass through except while open, so a closed or retracting panel
     * never blocks the field or the page beneath it */
    pointer-events: none;
    transform: translateY(calc(-100% - 0.25rem));
    visibility: hidden;

    @media not (prefers-reduced-motion) {
        transition:
            box-shadow 0.2s cubic-bezier(0.2, 0, 0, 1),
            transform 0.2s cubic-bezier(0.2, 0, 0, 1),
            visibility 0.2s allow-discrete;
    }

    .es-autocomplete-clip--above & {
        margin-bottom: 0.25rem;
        margin-top: 0;
        transform: translateY(calc(100% + 0.25rem));
    }

    /* declared after the --above override so the open state wins on both sides */
    .es-autocomplete-clip--open & {
        box-shadow: variables.$popover-box-shadow;
        pointer-events: auto;
        transform: translateY(0);
        visibility: visible;
    }
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

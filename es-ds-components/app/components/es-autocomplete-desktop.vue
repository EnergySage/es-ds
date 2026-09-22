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
// the visible panel hosts whichever of the two applies — the listbox or the
// prompt/no-results message — so the message slides like the listbox and
// swapping between them morphs the height
const panelOpen = computed(() => open.value && (props.suggestions.length > 0 || props.panelMessage !== ''));

const rootEl = ref<HTMLElement | null>(null);
const fieldRef = ref<(ComponentPublicInstance & { inputEl: HTMLInputElement | null }) | null>(null);
// the field component's root is a single plain div, so $el is reliable
const fieldEl = computed(() => (fieldRef.value?.$el as HTMLElement | undefined) ?? null);
const inputEl = computed(() => fieldRef.value?.inputEl ?? null);
const panelEl = ref<HTMLElement | null>(null);

// The panel renders in the browser's top layer (popover="manual" — manual, so
// no light-dismiss: it would treat clicks on our own input as outside) and is
// glued to the field with CSS anchor positioning, immune to ancestor
// overflow/z-index while staying in the DOM right next to the field. Browsers
// without anchor positioning fall back to in-page absolute placement below the
// field (no popover shown, no flip) via the @supports block in the styles.
// This check steers only script (showing the popover, allowing the flip) and is
// decided after mount: the always-mounted panel is server-rendered, so nothing
// in its markup may branch on client-only capability checks.
const supportsAnchor = ref(false);
onMounted(() => {
    supportsAnchor.value = typeof CSS !== 'undefined' && CSS.supports('anchor-name: --a');
});
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
    if (el && supportsAnchor.value) {
        try {
            el.showPopover();
        } catch {
            // already shown, or not a popover in this browser
        }
    }
}

// The panel (and, with showOverlayOnFocus, the page-dim overlay) stays up for
// the entire interaction: it opens when the field gains focus (or is clicked or
// typed into while closed after an Escape) and closes on Escape, select,
// submit, focus moving to another control (Tab, or a screen reader's linear
// navigation past the widget), and a pointerdown outside the widget's working
// parts. Clicks on the panel itself keep focus in the input (the list's
// mousedown is prevented), so they never read as leaving.
//
// Dismissal never reads a bare blur. A screen reader moves real DOM focus
// around the widget on its own: VoiceOver's keyboard-focus-follows-cursor drags
// it off the input — to the web area, or to nowhere — while the arrows walk the
// options, and that arrives as a focusout naming no new control. Treating it as
// the user leaving ends the interaction on the first ArrowDown, so a collapse
// the arrows caused (combobox.consumeArrowBlur) hands focus back to the input,
// which re-arms text entry. Every other collapse belongs to the user: their
// screen reader's cursor is exploring, and chasing it would drag them back into
// the widget, so focus is left exactly where it went. A click on non-focusable
// page space blurs the input the same indistinguishable way; that case closes
// the panel from its pointerdown, before any focus handling runs.
// The drawer slides out of wherever the closed panel is parked, and the park is
// side-specific: behind the field's bottom edge below it, behind its top edge
// above it. The always-mounted panel measures once on mount, where a field
// still below the fold reports negative space beneath it and so parks above —
// which the open then corrects in the same frame the slide begins, and a
// transition starts from the value BEFORE that frame's change. The result is a
// panel that slides the right way only after its first open. So the side is
// settled before the open, and a re-park is applied with transitions off:
// animated, the park would itself become the slide's starting point, halfway
// between the two sides.
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
    // Entering the field starts a fresh interaction, from the typed text. A
    // highlight left over from earlier arrow navigation would keep
    // aria-activedescendant pointed into the list, and a screen reader arriving
    // at the input follows that straight back out to the active option — so
    // after stepping out of the listbox by hand (VoiceOver's
    // ctrl-option-shift-up) and walking back to the field, the user could never
    // rest on it.
    if (!restoringFocus) {
        combobox.resetHighlight();
    }
    visiting = true;
    onFieldActivity();
    combobox.revealCaretOnFocus();
}

// The user is done with the field: the panel goes down and the app hears about
// it, so a form can validate the way it does on any other field's blur. Escape,
// select and submit are NOT this — each leaves focus in the input, and the
// interaction continues.
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
    // a collapse says nothing on its own — the arrows' echo, a click on
    // non-focusable space and a screen reader's cursor moving off all look
    // alike here, so the answer waits for what the browser settles on
    answerFocusCollapse(combobox.consumeArrowBlur());
}

// deferred a frame: by then an outside pointerdown has closed the panel, and a
// focus move the browser was still making has landed somewhere real. The window
// itself losing focus (alt-tab, devtools) leaves the input active and the
// interaction resumes on return, so it needs nothing.
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
        // While the panel is up the widget is still in use: a screen reader's
        // cursor walks the list with real focus left behind, and reporting a
        // blur there would validate the field mid-interaction. Once the panel
        // is down — Escape, or the pointerdown that dismissed it — focus that
        // has not come back means the user has moved on.
        if (!open.value) {
            leaveField();
        }
    });
}

// clicks outside close the widget: the blur they cause is the same
// nothing-focused collapse a screen reader produces, so the pointer event is
// what distinguishes them. Only the widget's working parts count as inside —
// the field, the panel, and the label (whose click hands focus back to the
// input) — not merely the root element: the root's own dead space, e.g. beside
// the label, is not focusable, so a click there must close the panel rather
// than strand an open list on an unfocused field.
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
// The panel slides out from underneath the field like a drawer: an invisible
// clip wrapper sits at the panel's final place while the visual panel inside it
// translates from fully-behind-the-field to rest — the edge nearest the user
// appears first and reveals the rest. The wrapper's clip-path crops only at the
// field's edge (negative insets on the other three sides leave the panel's
// shadow uncropped). The slide itself is pure CSS: the wrapper stays mounted
// and the --open class transitions the panel's transform/shadow/visibility (see
// the styles below), so interruption, reversal, reduced motion, and frozen-tab
// recovery all come from the platform. Script remains for what CSS cannot do:
// showing the popover, re-positioning on reopen, and animating the panel's
// height when the trim renders more or fewer rows or the content swaps between
// the message and the list (a content-driven auto-height change, which CSS
// cannot transition).
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

// The height morph animates the PANEL itself (the visible bordered box, whose
// overflow: hidden clips the rows), so both directions show: growing reveals
// the new rows, shrinking pulls the bottom edge back up. The observer watches
// the panel's inner content — its size never changes from the panel's own
// height keyframes, so every event is a real content change (rows added or
// removed, or the message/list swap), including one that lands mid-morph,
// which retargets from wherever the morph reached.
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
        <!-- the panel sits in the DOM right after the field (as in the APG
             combobox examples), so a screen reader's spatial navigation lands
             back near the input when leaving the list. The outer div is the
             invisible clip wrapper the drawer slides within; the inner div is
             the visual panel that translates. -->
        <!-- popover and position-anchor are unconditional (inert where
             unsupported — the popover is only ever SHOWN when anchor positioning
             exists), and the anchored/fallback positioning split lives in a CSS
             @supports block, so server and client render identical markup -->
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
                    <!-- the prompt/no-results message is presentation only: screen
                         readers get the same guidance from the input's description and
                         the live region, so it is hidden and the combobox stays collapsed -->
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

/* The invisible clip wrapper the drawer slides within: it owns the positioning
 * and crops the panel ONLY at the field's edge — the negative insets on the
 * other three sides leave room for the panel's shadow. It auto-sizes to the
 * panel, so animating its height (the more/fewer-rows morph) clips whole rows
 * against the field edge.
 *
 * Base placement is the fallback for browsers without anchor positioning:
 * in-page absolute below the field (the root is position-relative and the field
 * its last element before the panel), no flip. Its popover attribute is never
 * shown there, so the author display beats the UA's [popover] display: none.
 * background/border/inset/margin/padding clear the UA's [popover] defaults (the
 * visual panel inside carries its own). */
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
    /* never a hit target: the wrapper is an always-shown popover, and a
     * top-layer element swallows clicks over its whole box even when fully
     * transparent — only the open panel inside may take pointer events */
    pointer-events: none;
    position: absolute;
    top: 100%;
    width: max-content;
    /* above .es-autocomplete-overlay when not in the top layer */
    z-index: 1000;

    /* the flip side: the drawer emerges upward, so the crop moves to the bottom
     * edge, and the panel pins to the wrapper's bottom so a height morph reveals
     * rows from the top */
    &--above {
        align-content: end;
        clip-path: inset(-2rem -2rem 0 -2rem);
    }

    /* glued to the field with CSS anchor positioning and rendered in the top
     * layer via popover="manual" (shown from script), so ancestor overflow,
     * transforms, and z-index cannot clip or cover it; the browser keeps it
     * attached to the field between the script's re-measures. Flush against the
     * field, so the crop edge sits exactly where the drawer disappears behind
     * it; the visible 0.25rem gap is the panel's own margin. */
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

/* The visual panel that slides. The margin is the field-to-panel gap, kept
 * INSIDE the clip so the crop edge stays flush with the field. max-height is
 * set inline by positionPanel from the space around the field; the
 * fit-to-viewport trim divides the same number into whole rows, so nothing is
 * ever partially visible behind the overflow.
 *
 * The drawer states are declarative: at rest the panel is parked behind the
 * field with its shadow faded (a visible sliding shadow past the clip would
 * give away that nothing is really behind the field) and hidden; the wrapper's
 * --open class transitions it out. visibility is discrete — it flips visible at
 * the START of the slide out and back to hidden at the END of the retract, so
 * the browser runs the whole exit with nothing holding the element from
 * script, and an interrupted slide reverses from wherever it was. */
.es-autocomplete-panel {
    border: variables.$border-width solid variables.$gray-500;
    box-shadow: none;
    margin-top: 0.25rem;
    overflow: hidden;
    /* clicks pass through except while open — so a closed (or retracting)
     * panel can never block the field or the page beneath it */
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

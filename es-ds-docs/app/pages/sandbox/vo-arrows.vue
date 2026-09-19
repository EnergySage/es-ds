<script setup lang="ts">
/**
 * VoiceOver arrow-navigation isolation lab (temporary page, not in the nav).
 *
 * Five bare comboboxes with no library code, identical except for ONE
 * ingredient each. Every variant logs the keydown/focus events that actually
 * reach the page, so a VoiceOver run shows both WHICH ingredient breaks arrow
 * navigation and WHAT the browser saw when it broke.
 *
 * Per variant: type "p", then press the down arrow repeatedly. Working
 * behavior: the highlight steps through all suggestions, then returns to the
 * input showing the typed text, then cycles again — with VoiceOver reading
 * each suggestion and text entry still working afterward.
 */

const FRUITS = ['papaya', 'passionfruit', 'peach', 'pear', 'pineapple', 'plum', 'apple', 'banana', 'grape', 'mango'];

interface VariantConfig {
    ariaAutocomplete: 'list' | 'both';
    ariaOwns: boolean;
    /** the HIGHLIGHTED option reads aria-selected="false" (production's Reka state) */
    highlightedNotSelected?: boolean;
    id: string;
    /** placeholder + aria-describedby on the input (production extras) */
    inputExtras?: boolean;
    /** tabindex="-1" on the LISTBOX element (production's Reka content) */
    listboxTabindex?: boolean;
    notes: string;
    optionTabindex: boolean;
    /** options contain bold segments instead of plain text (production rendering) */
    richOptions?: boolean;
    title: string;
    /** listbox rendered in the top layer via popover="manual" (production desktop) */
    topLayer?: boolean;
    valueRewrite: boolean;
}

const VARIANTS: VariantConfig[] = [
    {
        ariaAutocomplete: 'list',
        ariaOwns: false,
        id: 'apg',
        notes: 'aria-autocomplete="list", no value rewrite, options not focusable (classic APG pattern)',
        optionTabindex: false,
        title: '1. APG baseline',
        valueRewrite: false,
    },
    {
        ariaAutocomplete: 'list',
        ariaOwns: false,
        id: 'rewrite',
        notes: 'like 1, but arrows copy the highlighted suggestion into the field',
        optionTabindex: false,
        title: '2. + value rewrite',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        id: 'both',
        notes: 'like 2, but aria-autocomplete="both" (our current production state)',
        optionTabindex: false,
        title: '3. + aria-autocomplete="both"',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: true,
        id: 'owns',
        notes: 'like 3, plus aria-owns on the input pointing at the listbox (the full Google set)',
        optionTabindex: false,
        title: '4. + aria-owns',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        id: 'tabindex',
        notes: 'like 3, but every option carries tabindex="-1" (our state before the recent fix)',
        optionTabindex: true,
        title: '5. options tabindex="-1"',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        id: 'lbtab',
        listboxTabindex: true,
        notes: 'like 3, but the LISTBOX element itself carries tabindex="-1" (production has this via Reka)',
        optionTabindex: false,
        title: '6. listbox tabindex="-1"',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        highlightedNotSelected: true,
        id: 'unselected',
        notes: 'like 3, but the highlighted option reads aria-selected="false" (production: selection tracks the model, not the highlight)',
        optionTabindex: false,
        title: '7. highlighted option aria-selected="false"',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        id: 'toplayer',
        notes: 'like 3, but the listbox renders in the top layer via popover="manual" (production desktop)',
        optionTabindex: false,
        title: '8. listbox in the top layer',
        topLayer: true,
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        id: 'rich',
        notes: 'like 3, but option text is split into spans with a bold segment (production rendering)',
        optionTabindex: false,
        richOptions: true,
        title: '9. bold segments in options',
        valueRewrite: true,
    },
    {
        ariaAutocomplete: 'both',
        ariaOwns: false,
        id: 'extras',
        inputExtras: true,
        notes: 'like 3, plus placeholder and aria-describedby hint on the input (production extras)',
        optionTabindex: false,
        title: '10. input placeholder + describedby',
        valueRewrite: true,
    },
];

interface VariantState {
    activeIndex: number;
    log: string[];
    typed: string;
}

const states = reactive<Record<string, VariantState>>(
    Object.fromEntries(VARIANTS.map((variant) => [variant.id, { activeIndex: -1, log: [], typed: '' }])),
);

function matchesFor(state: VariantState) {
    const query = state.typed.trim().toLowerCase();
    return query ? FRUITS.filter((fruit) => fruit.startsWith(query)) : [];
}

function displayValue(config: VariantConfig) {
    const state = states[config.id]!;
    const matches = matchesFor(state);
    if (config.valueRewrite && state.activeIndex >= 0 && matches[state.activeIndex]) {
        return matches[state.activeIndex]!;
    }
    return state.typed;
}

function optionId(config: VariantConfig, index: number) {
    return `vo-${config.id}-option-${index}`;
}

function activeDescendant(config: VariantConfig) {
    const state = states[config.id]!;
    return state.activeIndex >= 0 ? optionId(config, state.activeIndex) : undefined;
}

function onInput(config: VariantConfig, event: Event) {
    const state = states[config.id]!;
    state.typed = (event.target as HTMLInputElement).value;
    state.activeIndex = -1;
    syncTopLayer(config);
}

function onKeydown(config: VariantConfig, event: KeyboardEvent) {
    const state = states[config.id]!;
    const count = matchesFor(state).length;
    if (!count || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
        return;
    }
    event.preventDefault();
    if (event.key === 'ArrowDown') {
        // input → 0 → … → last → input → 0 → …
        state.activeIndex = state.activeIndex >= count - 1 ? -1 : state.activeIndex + 1;
    } else {
        state.activeIndex = state.activeIndex <= -1 ? count - 1 : state.activeIndex - 1;
    }
}

function selectOption(config: VariantConfig, index: number) {
    const state = states[config.id]!;
    const match = matchesFor(state)[index];
    if (match) {
        state.typed = match;
        state.activeIndex = -1;
    }
}

/** what a target is, tersely: input / option "peach" / body / … */
function describeTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) {
        return String(target);
    }
    if (target instanceof HTMLInputElement) {
        return 'input';
    }
    const role = target.getAttribute('role');
    return role ? `${role} "${target.textContent?.trim().slice(0, 20)}"` : `<${target.tagName.toLowerCase()}>`;
}

function logEvent(config: VariantConfig, entry: string) {
    const log = states[config.id]!.log;
    log.push(entry);
    if (log.length > 10) {
        log.shift();
    }
    // the tab title mirrors the newest entry so automation can read the log via
    // the Safari AppleScript tab name, which needs no extra permissions
    document.title = `${config.id} #${(titleSequence += 1)}: ${entry}`;
}

let titleSequence = 0;

// ?focus=<variant id> drops focus straight into that variant's input, so an
// automated VoiceOver run starts from the same state as a user's click
onMounted(() => {
    const focusId = new URLSearchParams(window.location.search).get('focus');
    if (focusId) {
        document.getElementById(`vo-${focusId}-input`)?.focus();
    }
});

function onLogKeydown(config: VariantConfig, event: KeyboardEvent) {
    logEvent(config, `keydown ${event.key} → ${describeTarget(event.target)}`);
}

// the top-layer variant shows/positions its listbox the way production does:
// popover="manual" put in the top layer from script, fixed under the field
function syncTopLayer(config: VariantConfig) {
    if (!config.topLayer) {
        return;
    }
    void nextTick(() => {
        const listbox = document.getElementById(`vo-${config.id}-listbox`);
        const input = document.getElementById(`vo-${config.id}-input`);
        if (!listbox || !input) {
            return;
        }
        const hasMatches = matchesFor(states[config.id]!).length > 0;
        try {
            if (hasMatches && !listbox.matches(':popover-open')) {
                listbox.showPopover();
                const rect = input.getBoundingClientRect();
                listbox.style.cssText = `position: fixed; margin: 0; inset: auto; left: ${rect.left}px; top: ${rect.bottom + 4}px; min-width: ${rect.width}px;`;
            } else if (!hasMatches && listbox.matches(':popover-open')) {
                listbox.hidePopover();
            }
        } catch {
            // popover unsupported: the listbox stays in-flow
        }
    });
}

/** splits an option into an unstyled matched part and a bold predictive part */
function richSegments(config: VariantConfig, match: string) {
    const typedLength = states[config.id]!.typed.trim().length;
    return { bold: match.slice(typedLength), plain: match.slice(0, typedLength) };
}

function onLogFocusin(config: VariantConfig, event: FocusEvent) {
    logEvent(config, `focus → ${describeTarget(event.target)}`);
}

function onLogFocusout(config: VariantConfig, event: FocusEvent) {
    logEvent(config, `blur ${describeTarget(event.target)} → ${describeTarget(event.relatedTarget)}`);
}

// document-level focus changes reveal where focus lands when it leaves a
// variant entirely (e.g. an assistive tech dragging it to the body)
onMounted(() => {
    document.addEventListener(
        'focusin',
        (event) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest?.('[data-vo-variant]')) {
                return;
            }
            for (const variant of VARIANTS) {
                if (states[variant.id]!.log.length) {
                    logEvent(variant, `focus left the page widgets → ${describeTarget(event.target)}`);
                }
            }
        },
        true,
    );
});
</script>

<template>
    <div class="container py-450">
        <h1>VoiceOver arrow-key lab</h1>
        <p>
            Bare comboboxes, no library code, one ingredient changed at a time. For each: with VoiceOver on, click into
            the field, type <code>p</code>, then press the down arrow repeatedly (at least 7 times). Working behavior:
            the highlight steps through all six p-fruits, returns to the input showing <code>p</code>, then cycles
            again — and you can still type afterward. Variants 6–10 each add ONE production ingredient on top of
            variant 3; whichever breaks is the culprit.
        </p>
        <p>
            The gray log under each field records what actually reached the page. If arrows stop working, the log shows
            whether the keydowns arrived at all, and where focus went.
        </p>

        <section
            v-for="config in VARIANTS"
            :key="config.id"
            class="mb-450"
            data-vo-variant
            @focusin="onLogFocusin(config, $event)"
            @focusout="onLogFocusout(config, $event)"
            @keydown.capture="onLogKeydown(config, $event)">
            <h2 class="font-size-100 font-weight-bold">{{ config.title }}</h2>
            <p class="font-size-75 text-gray-700">{{ config.notes }}</p>
            <label :for="`vo-${config.id}-input`">Fruit ({{ config.id }})</label>
            <div>
                <input
                    :id="`vo-${config.id}-input`"
                    :aria-activedescendant="activeDescendant(config)"
                    :aria-autocomplete="config.ariaAutocomplete"
                    :aria-controls="`vo-${config.id}-listbox`"
                    :aria-describedby="config.inputExtras ? `vo-${config.id}-hint` : undefined"
                    :aria-expanded="matchesFor(states[config.id]!).length > 0"
                    :aria-owns="config.ariaOwns ? `vo-${config.id}-listbox` : undefined"
                    autocomplete="off"
                    class="form-control"
                    :placeholder="config.inputExtras ? 'Search for a fruit' : undefined"
                    role="combobox"
                    type="text"
                    :value="displayValue(config)"
                    @input="onInput(config, $event)"
                    @keydown="onKeydown(config, $event)" />
                <div
                    v-if="config.inputExtras"
                    :id="`vo-${config.id}-hint`"
                    aria-hidden="true"
                    class="sr-only">
                    Type your search and select from dropdown suggestions.
                </div>
                <div
                    :id="`vo-${config.id}-listbox`"
                    :aria-label="`Fruit suggestions (${config.id})`"
                    class="vo-listbox"
                    :popover="config.topLayer ? 'manual' : undefined"
                    role="listbox"
                    :tabindex="config.listboxTabindex ? -1 : undefined">
                    <div
                        v-for="(match, index) in matchesFor(states[config.id]!)"
                        :id="optionId(config, index)"
                        :key="match"
                        :aria-selected="
                            config.highlightedNotSelected ? 'false' : states[config.id]!.activeIndex === index
                        "
                        class="vo-option"
                        :class="{ 'vo-option--active': states[config.id]!.activeIndex === index }"
                        role="option"
                        :tabindex="config.optionTabindex ? -1 : undefined"
                        @mousedown.prevent
                        @click="selectOption(config, index)">
                        <template v-if="config.richOptions">
                            <span>{{ richSegments(config, match).plain }}</span
                            ><strong>{{ richSegments(config, match).bold }}</strong>
                        </template>
                        <template v-else>{{ match }}</template>
                    </div>
                </div>
            </div>
            <pre class="vo-log">{{ states[config.id]!.log.join('\n') || '(no events yet)' }}</pre>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.vo-listbox {
    border: 1px solid variables.$gray-500;
    max-width: 20rem;

    &:empty {
        display: none;
    }
}

.vo-option {
    cursor: pointer;
    min-height: 3rem;
    padding: 0.75rem 1rem;

    &--active {
        background-color: variables.$blue-50;
    }
}

.vo-log {
    background: variables.$gray-100;
    font-size: 0.75rem;
    margin-top: 0.5rem;
    max-width: 30rem;
    min-height: 2rem;
    padding: 0.5rem;
    white-space: pre-wrap;
}
</style>

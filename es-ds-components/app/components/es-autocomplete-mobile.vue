<script setup lang="ts">
import {
    AutocompleteAnchor,
    AutocompleteContent,
    AutocompleteInput,
    AutocompleteRoot,
    DialogClose,
    DialogContent,
    DialogDescription,
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
    cancelText?: string;
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
    userHighlighted,
} = useAutocompleteShell({
    clearHighlight: () => guardRef.value?.clearHighlight(),
    close: () => {
        takeoverOpen.value = false;
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
}
</script>

<template>
    <div class="d-md-none">
        <es-autocomplete-label
            :html-for="triggerId"
            :label="label"
            :label-sr-only="labelSrOnly"
            :required="required" />
        <dialog-root v-model:open="takeoverOpen">
            <!-- fake search field: tapping it opens the takeover with the real input focused -->
            <dialog-trigger
                :id="triggerId"
                class="es-autocomplete-fake-field es-form-input form-control align-items-center d-flex px-100 text-left w-100"
                :class="{ 'is-invalid': state === false }"
                :aria-describedby="describedBy"
                :disabled="disabled">
                <span
                    v-if="model"
                    class="text-truncate">
                    {{ model }}
                </span>
                <span
                    v-else
                    class="es-autocomplete-fake-field-placeholder text-truncate">
                    {{ placeholder }}
                </span>
            </dialog-trigger>
            <dialog-portal>
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
                            <dialog-close class="es-autocomplete-cancel bg-transparent border-0 flex-shrink-0 ml-100">
                                {{ cancelText }}
                            </dialog-close>
                        </div>
                        <autocomplete-content
                            ref="contentRef"
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
                            <div
                                v-if="panelMessage"
                                class="es-autocomplete-no-results px-100 py-50 text-gray-700">
                                {{ panelMessage }}
                            </div>
                        </autocomplete-content>
                    </autocomplete-root>
                </dialog-content>
            </dialog-portal>
        </dialog-root>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-autocomplete-fake-field-placeholder {
    color: variables.$input-color-placeholder;
}

.es-autocomplete-takeover {
    height: 100dvh;
    inset: 0;
    position: fixed;
    // above the page and any menu bar (1000); same layer as modals
    z-index: 1050;
}

// deliberately no focus styling on the field: the full-screen takeover itself is
// the focus indicator (see es-autocomplete-desktop.vue for the fuller rationale)

.es-autocomplete-input {
    background: transparent;
    border: none;
    // ≥16px or iOS Safari auto-zooms on focus
    font-size: 1rem;

    &:focus-visible {
        outline: none;
    }

    &::placeholder {
        color: variables.$input-color-placeholder;
    }
}

.es-autocomplete-cancel {
    color: variables.$blue-600;
    font-weight: variables.$font-weight-semibold;
}

.es-autocomplete-takeover-list {
    // no scrolling by design: the fit-to-viewport trim only renders items that fit
    overflow: hidden;
    // required by useFitToViewport: item offsetTop must be relative to this container
    position: relative;

    &--measuring {
        visibility: hidden;
    }

    // ≥16px text for readability; the ≥48px row height comes from the shared
    // es-autocomplete-item styles
    .es-autocomplete-item {
        font-size: 1rem;
    }

    .es-autocomplete-no-results {
        font-size: 1rem;
    }
}
</style>

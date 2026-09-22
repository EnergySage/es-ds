<script setup lang="ts">
import type { AutocompleteCombobox } from '../composables/autocomplete-combobox';

/**
 * The field both shells share: the combobox input plus its clear button, with
 * all ARIA wiring driven by the combobox core. The shells add their own
 * surroundings (popover panel vs takeover) and their own listeners via
 * fallthrough attrs on this component's root.
 */
interface Props {
    /** names the takeover's input, which has no visible label of its own */
    ariaLabel?: string;
    /**
     * the input's autocomplete token: 'off' keeps the browser's own dropdown out
     * of the way of the suggestion list, and a field token (e.g. 'street-address')
     * trades that for the browser's saved-value autofill
     */
    autocomplete: string;
    clearText?: string;
    combobox: AutocompleteCombobox;
    describedBy: string;
    disabled?: boolean;
    /** the input's id, linked from the shell's label; the takeover input has none */
    inputId?: string;
    /** the listbox is only announced as present while it is actually rendered */
    listboxOpen: boolean;
    model: string;
    placeholder?: string;
    required?: boolean;
    state?: boolean | null;
}

defineProps<Props>();

const inputEl = ref<HTMLInputElement | null>(null);
defineExpose({ inputEl });
</script>

<template>
    <div
        class="es-autocomplete-field es-form-input form-control align-items-center d-flex p-0"
        :class="{ 'es-autocomplete-field--disabled': disabled, 'is-invalid': state === false }">
        <!-- aria-autocomplete="both": keyboard navigation rewrites the field's
             value (copy-on-highlight), and declaring that keeps VoiceOver's
             cursor anchored in the field while it announces each option, as on
             Google's and Amazon's comboboxes -->
        <input
            :id="inputId"
            ref="inputEl"
            aria-autocomplete="both"
            class="es-autocomplete-input h-100 w-100 px-100"
            role="combobox"
            type="text"
            :aria-activedescendant="combobox.activeDescendant.value"
            :autocomplete="autocomplete"
            :aria-controls="combobox.listboxId"
            :aria-describedby="describedBy"
            :aria-expanded="listboxOpen"
            :aria-invalid="state === false ? true : undefined"
            :aria-label="ariaLabel"
            :disabled="disabled"
            :placeholder="placeholder"
            :required="required"
            :value="combobox.displayValue.value"
            @input="combobox.onInput"
            @keydown="combobox.onKeydown" />
        <es-autocomplete-clear-button
            v-if="model && !disabled"
            :clear-text="clearText"
            @clear="combobox.onClear" />
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

/* The disabled styling of es-form-input, applied here by hand: the :disabled
 * rules in es-ds-styles target the element carrying form-control, which here is
 * this wrapper div rather than the real (disabled) input inside it.
 *
 * One deliberate difference: $gray-600 rather than es-form-input's
 * $input-disabled-color ($gray-500), which reaches only 2.93:1 against the
 * disabled background — $gray-600 clears AA at 4.76:1. It covers the value and
 * the placeholder both, so an empty disabled field and a filled one read alike;
 * without the second rule the placeholder below wins here and renders darker
 * than the value it stands in for. */
.es-autocomplete-field--disabled {
    background-color: variables.$input-disabled-bg;
    border: 0;

    .es-autocomplete-input {
        color: variables.$gray-600;
        /* iOS fix for unreadable disabled content, as in es-ds-styles' form-control rule */
        opacity: 1;

        &::placeholder {
            color: variables.$gray-600;
        }
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
</style>

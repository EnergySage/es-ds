<script setup lang="ts">
interface IProps {
    id: string;
    name: string;
    value: any;
    disabled?: boolean;
    inline?: boolean;
    displayName?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    inline: false,
    displayName: '',
});

// Need to define the implicit emit from v-model, so that it can also get fired
// from the label clicks
const emit = defineEmits(['update:modelValue']);

function handleRadioButtonClick() {
    if (!props.disabled) {
        emit('update:modelValue', props.value);
    }
}

const model = defineModel<any>();
const isChecked = computed(() => props.value === model.value);
</script>

<template>
    <label
        class="es-form-radio-card user-select-none w-100"
        :class="{ active: isChecked, disabled: props.disabled }"
        @click="handleRadioButtonClick">
        <input
            :id="id"
            ref="input-elem"
            v-model="model"
            :disabled="props.disabled"
            type="radio"
            :name="props.name"
            :value="props.value"
            :checked="isChecked"
            @click="handleRadioButtonClick" />
        <slot>
            {{ displayName }}
        </slot>
    </label>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use "sass:math";

/* padding */

$padding-x-mobile: 1rem;
$padding-y-mobile: 1.5rem;
$padding-for-radio-mobile: 3rem;

$padding-x-desktop: 1.5rem;
$padding-y-desktop: 1.5rem;
$padding-for-radio-desktop: 4.5rem;

/* sizing */

$inner-circle-size-mobile: 11px;
$outer-circle-size-mobile: 22px;

$inner-circle-size-desktop: 15px;
$outer-circle-size-desktop: 28px;

/* calculated positioning */

$additional-translate-y-for-vertical-centering: 2px;

$inner-circle-translate-x-from-left-mobile: math.div($outer-circle-size-mobile, 2) - math.div($inner-circle-size-mobile, 2);
$inner-circle-translate-y-from-top-mobile: $inner-circle-translate-x-from-left-mobile + $additional-translate-y-for-vertical-centering;

$inner-circle-half-of-dimension-desktop: math.div($inner-circle-size-desktop, 2);
$outer-circle-half-of-dimension-desktop: math.div($outer-circle-size-desktop, 2);

$inner-circle-translate-x-from-left-desktop: $outer-circle-half-of-dimension-desktop - $inner-circle-half-of-dimension-desktop;
$inner-circle-translate-y-from-top-desktop: $inner-circle-translate-x-from-left-desktop + $additional-translate-y-for-vertical-centering;

.es-form-radio-card {
    /* keep these styles here instead of applying via utility classes so they can be easily overridden by utility classes downstream */
    align-items: center;
    background-color: variables.$white;
    border: 2px solid variables.$gray-200;
    border-radius: 1rem;
    box-shadow: 0 0 0 1px transparent, 0 4px 12px variables.$gray-50;
    color: variables.$gray-800;
    cursor: pointer;
    font-size: variables.$font-size-300;
    font-weight: variables.$font-weight-bold;
    line-height: 1.2;
    margin-bottom: 1rem;
    padding: $padding-y-mobile $padding-x-mobile $padding-y-mobile $padding-for-radio-mobile;
    position: relative;
    text-align: left;
    transform: translateZ(0);
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, outline 0.15s ease-in-out;

    @include breakpoints.media-breakpoint-up(lg) {
        font-size: variables.$font-size-400;
        padding: $padding-y-desktop $padding-x-desktop $padding-y-desktop $padding-for-radio-desktop;
    }

    &::before,
    &::after {
        border-radius: 50%;
        content: '';
        left: $padding-x-mobile;
        position: absolute;
        top: $padding-y-mobile;

        @include breakpoints.media-breakpoint-up(lg) {
            left: $padding-x-desktop;
        }
    }

    /* outer circle of radio button */
    &::before {
        border: 2.5px solid variables.$blue-900;
        height: $outer-circle-size-mobile;
        transform: translateY($additional-translate-y-for-vertical-centering);
        width: $outer-circle-size-mobile;

        @include breakpoints.media-breakpoint-up(lg) {
            height: $outer-circle-size-desktop;
            width: $outer-circle-size-desktop;
        }
    }

    /* selected state */
    &:not(:disabled):not(.disabled).active {
        border-color: variables.$warm-orange;
        box-shadow: 0 0 0 1px transparent, variables.$card-interactive-selected-shadow;
        transform: none;

        /* inner circle of radio button */
        &::after {
            background-color: variables.$blue-900;
            height: $inner-circle-size-mobile;
            transform: translateX($inner-circle-translate-x-from-left-mobile) translateY($inner-circle-translate-y-from-top-mobile);
            width: $inner-circle-size-mobile;

            @include breakpoints.media-breakpoint-up(lg) {
                height: $inner-circle-size-desktop;
                transform: translateX($inner-circle-translate-x-from-left-desktop) translateY($inner-circle-translate-y-from-top-desktop);
                width: $inner-circle-size-desktop;
            }
        }
    }

    &:has(input:focus-visible) {
        outline: 2px solid variables.$blue-600;
        outline-offset: 2px;
    }

    /* mousedown/touchstart state */
    &:not(:disabled):not(.disabled):active,
    &:not(:disabled):not(.disabled).active:active {
        border-color: variables.$card-interactive-active-border-color;
        box-shadow: 0 0 0 1px variables.$card-interactive-active-border-color, variables.$card-interactive-selected-active-shadow;
        transform: variables.$btn-active-transform;
    }

    &.disabled {
        background: variables.$gray-50;
        border-color: variables.$gray-200;
        color: variables.$gray-500;

        &::before {
            border: 2.5px solid variables.$gray-500;
        }
    }

    input {
        /**
        * hide the radio button input elements the same way bootstrap vue does.
        * bootstrap vue's styles only work on items directly nested under b-form-radio-group, and we want
        * to enable users to put any elements (e.g. <es-col> and <es-row>) between the EsFormRadioCards and
        * EsFormRadioCard elements.
        */
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
        position: absolute;
    }
}

/* desktop has-icon styling (move radio button to bottom center) */
@include breakpoints.media-breakpoint-up(lg) {
    .es-form-radio-cards.has-icon {
        .es-form-radio-card {
            padding: $padding-y-desktop $padding-x-desktop $padding-for-radio-desktop $padding-x-desktop;

            &::before,
            &::after {
                bottom: $padding-y-desktop;
                left: 50%;
                top: auto;
            }

            /* outer circle of radio button */
            &::before {
                transform: translateX(-$outer-circle-half-of-dimension-desktop);
            }

            /* selected state */
            &:not(:disabled):not(.disabled).active {
                /* inner circle of radio button */
                &::after {
                    transform: translateX(-$inner-circle-half-of-dimension-desktop) translateY(-$inner-circle-translate-x-from-left-desktop);
                }
            }
        }
    }
}
</style>

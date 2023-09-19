<template>
    <b-form-radio
        class="EsFormRadioCard bg-white border-light rounded-lg w-100"
        :value="value">
        <slot />
    </b-form-radio>
</template>

<script>
import { BFormRadio } from 'bootstrap-vue';

export default {
    name: 'EsFormRadioCard',
    components: {
        BFormRadio,
    },
    props: {
        value: {
            type: String,
            required: true,
            default: '',
        },
    },
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;
@use '~@energysage/es-bs-base/scss/vendor/rfs';
@use "~@energysage/es-bs-base/scss/variables" as variables;

.EsFormRadioCard {
    /**
     * overridable styles spelled out in CSS rather than utility classes so users are able to pass in
     * utility classes and have them override the default styles (otherwise, if the user's utility classes
     * happen to appear earlier in the es-bs-base CSS than the component's utility classes, the component's
     * will win, leaving the user unable to override the desired style)
     */
    @include rfs.font-size(variables.$h2-font-size);
    font-weight: variables.$font-weight-bolder;
    margin-bottom: map.get(variables.$spacers, 100);
    padding-bottom: map.get(variables.$spacers, 200);
    padding-left: map.get(variables.$spacers, 100);
    padding-right: map.get(variables.$spacers, 100);
    padding-top: map.get(variables.$spacers, 200);
    text-align: left;

    ::v-deep input {
        /**
         * hide the radio button input elements the same way bootstrap vue does.
         * bootstrap vue's styles only work on items directly nested under b-form-radio-group, and we want
         * to enable users to put any elements (e.g. <b-col> and <b-row>) between the EsFormRadioCards and
         * EsFormRadioCard elements.
         */
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
        position: absolute;
    }

    &.btn {
        /* override the fixed height of normal buttons */
        height: auto;
    }

    &:hover {
        /* needed to override the default background/text color switch for outline button hover state */
        background-color: variables.$white;
        /* match design border color on hover, override utility class */
        border-color: variables.$gray-400 !important;
        /* needed to override the default background/text color switch for outline button hover state */
        color: variables.$dark;
    }

    &:not(:disabled):not(.disabled):active,
    &:not(:disabled):not(.disabled).active,
    .show > &.dropdown-toggle {
        background-color: variables.$white;
        /* override 'border-light' utility class */
        border-color: variables.$dark !important;
        color: variables.$dark;
    }
}

@include breakpoints.media-breakpoint-up(lg) {
    .EsFormRadioCard {
        /**
        * overridable styles spelled out in CSS rather than utility classes so users are able to pass in
        * utility classes and have them override the default styles (otherwise, if the user's utility classes
        * happen to appear earlier in the es-bs-base CSS than the component's utility classes, the component's
        * will win, leaving the user unable to override the desired style)
        */
        @include rfs.font-size(variables.$h2-font-size-desktop);
        padding-left: map.get(variables.$spacers, 200);
        padding-right: map.get(variables.$spacers, 200);
    }
}
</style>

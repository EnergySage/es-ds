<template>
    <b-button
        :variant="computedVariant"
        :size="size"
        v-bind="$attrs"
        v-on="$listeners">
        <span class="position-relative">
            <span
                v-if="loading"
                class="button-spinner position-absolute d-inline-block h-100 w-100">
                <b-spinner
                    role="status"
                    aria-hidden="true"
                    label="Loading" />
            </span>
            <!--
                @slot Button Content
                @binding {string} text or html of the button content
            -->
            <slot />
        </span>
    </b-button>
</template>

<script lang="js">
import { BButton, BSpinner } from 'bootstrap-vue';

export default {
    name: 'EsButton',
    components: {
        BButton,
        BSpinner,
    },
    props: {
        /**
         * Button Variant
         *
         */
        variant: {
            type: String,
            default: 'primary',
            required: false,
        },
        /**
         * Outline only button
         */
        outline: {
            type: Boolean,
            default: false,
        },
        /**
         * Size of button
         */
        size: {
            type: String,
            validator: (val) => ['lg', 'md', 'sm'].includes(val),
            default: 'md',
        },
        /**
         * Is Submit in progress
         * Hides label & shows loading animation if true
         */
        loading: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        /**
         * Compute the Variant
         * used for when you want to `outline` something but don't know the
         * theme's default variant
         *
         * @returns { string } computed variant based on outline prop
         */
        computedVariant() {
            return `${this.outline && this.variant !== 'link' ? 'outline-' : ''}${this.variant}`;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-extends/scss/includes';

.button-spinner {
  right: 0;
  top: -28%;
}
</style>

<template>
    <b-button
        :class="{ 'inline': inline }"
        :variant="computedVariant"
        :size="size"
        v-bind="$attrs"
        v-on="$listeners">
        <!--
            @slot Button Content
            @binding {string} text or html of the button content
        -->
        <slot />
    </b-button>
</template>

<script lang="js">
import { BButton } from 'bootstrap-vue';

export default {
    name: 'EsButton',
    components: {
        BButton,
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
         * Only works for 'link' variant buttons.
         * Removes the fixed height and padding so the button can fit nicely within a block of text.
         */
        inline: {
            type: Boolean,
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
.btn-link.inline {
    /* use normal CSS here so users can override with utility classes as necessary */
    border: 0;
    height: auto;
    line-height: inherit;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
}
</style>

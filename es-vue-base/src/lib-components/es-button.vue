<template>
    <b-button
        :variant="computedVariant"
        v-bind="$attrs"
        :class="computedClass"
        v-on="$listeners">
        <!-- @slot Button Content; can be text or html -->
        <slot />
    </b-button>
</template>

<script>
import { BButton } from 'bootstrap-vue'

export default {
    name: 'EsButton',
    components: {
        BButton,
    },
    props: {
        /**
         * Button Variant
         * Defaults to theme variable
         *
         */
        variant: {
            type: String,
            default: 'primary',
            required: false,
        },
        /**
         * Use the outline version of the current variant
         */
        outline: {
            type: Boolean,
            default: false,
        },
        /**
         * Should the text be uppercase
         */
        uppercase: {
            type: Boolean,
            default: true,
        },
        /**
         * CSS Classes
         */
        cssClass: {
            type: [String, Object],
            default: '',
        },
    },
    computed: {
        /**
         * Compute the Variant
         * used for when you want to `outline` something but dont know the
         * themes default variant
         *
         * @returns { string } computed variant based on outline prop
         */
        computedVariant() {
            return `${this.outline ? 'outline-' : ''}${this.variant}`;
        },
        /**
         * Compute the css class attr
         *
         * @returns { string } css class attr including uppercase by default
         */
        computedClass() {
            if (typeof this.cssClass === 'object') {
                // eslint-disable-next-line max-len
                return `${Object.keys(this.cssClass)
                    .filter((key) => this.cssClass[key])
                    .join(' ')}${this.uppercase ? ' text-uppercase text-nowrap' : ''}`;
            }
            return `${this.cssClass}${this.uppercase ? ' text-uppercase text-nowrap' : ''}`;
        },
    },
}
</script>

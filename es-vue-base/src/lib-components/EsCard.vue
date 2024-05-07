<template>
    <component
        :is="defaultTag"
        :href="href"
        class="es-card"
        :class="actualVariant"
        :to="to"
        v-bind="$attrs"
        v-on="$listeners">
        <slot />
    </component>
</template>

<script lang="js">
export default {
    name: 'EsCard',
    props: {
        href: {
            type: String,
            default: undefined,
        },
        tag: {
            type: String,
            default: 'div',
        },
        // only specified so it's passed through without being set on the resulting HTML element
        to: {
            type: String,
            default: undefined,
        },
        variant: {
            type: String,
            default: 'display',
            required: false,
        },
    },
    computed: {
        actualVariant() {
            // if href is specified, force variant to be interactive
            if (this.href) {
                return 'interactive';
            }

            // if no href provided, honor the specified variant
            return this.variant;
        },
        defaultTag() {
            // if an href is provided and no alternate link tag was provided (e.g. nuxt-link),
            // force the tag to be a b-link, no matter the variant
            if (this.href && this.tag === 'div') {
                return 'b-link';
            }

            // otherwise, honor the tag passed in if it's display variant
            // or something other than the default tag was provided
            if (this.variant !== 'interactive' || this.tag !== 'div') {
                return this.tag;
            }

            // if we reach this point, variant is interactive, tag is div, and no href was provided
            // and any non-link clickable element should be a button
            return 'button';
        },
    },
};
</script>

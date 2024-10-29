<script setup lang="ts">
// Cannot import as Button due to issue with native element Button
import PrimeButton from 'primevue/button';

/*
severity:

Prime severity (variant="dark-bg" in particular) doesn't map to
"success" | "help" | "secondary" | "info" | "warning" | "danger" | "contrast"

size:
Prime size "small" | "large" doesn't map to our 3-sizes in the design-system

icon usage:
Prime provides icon & loadingIcon slots which can hook into the loading property,
currently we're not using this (but we may want to re-visit)
*/

const props = defineProps({
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
        validator: (val) => ['lg', 'md', 'sm'].includes(String(val)),
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

    // PrimeVue Arguments with es-ds defaults
    rounded: {
        type: Boolean,
        default: true,
    },
    // Url when using button as a link
    href: {
        type: String,
        default: null,
    },
    // Url when using button as a link to an internal page
    to: {
        type: String,
        default: null,
    },
});

const getRootClasses = computed(() => {
    const withOutline = props.outline ? '-outline' : '';
    // eslint-disable-next-line no-nested-ternary
    const btnVariant =
        props.variant === 'link'
            ? 'btn-link'
            : props.variant === 'dark-bg'
              ? `btn${withOutline}-dark-bg`
              : `btn${withOutline}-primary`;
    const btnInline = props.inline ? 'inline' : '';
    const btnSize = props.size ? `btn-${props.size}` : 'btn-md';
    return `btn ${btnVariant} ${btnInline} ${btnSize}`;
});
</script>

<template>
    <!--
        <a> is needed for href because a root-relative link like /market/start/
        that is passed to <nuxt-link :to="" /> will attempt to internally navigate
        within a micro frontend, which will result in a 404
    -->
    <a
        v-if="props.href"
        :class="getRootClasses"
        :href="props.href">
        <slot />
    </a>
    <nuxt-link
        v-else-if="props.to"
        :to="props.to"
        :class="getRootClasses">
        <slot />
    </nuxt-link>
    <prime-button
        v-else
        :pt="{
            root: { class: getRootClasses },
        }">
        <slot />
    </prime-button>
</template>

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

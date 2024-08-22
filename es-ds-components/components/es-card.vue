<script setup lang="ts">
import { computed, resolveComponent } from 'vue';
// specific workaround for getting a reference to an auto-imported but not globally registered
// component like NuxtLink, so that it can be used in a <component :is=""> context.
// this resolves to an import statement, according to:
// https://github.com/nuxt/nuxt/issues/13659#issuecomment-1573568006
const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps({
    href: {
        type: String,
        default: undefined,
    },
    tag: {
        type: String,
        default: 'div',
    },
    to: {
        type: String,
        default: undefined,
    },
    variant: {
        type: String,
        default: 'display',
        required: false,
    },
});

const actualVariant = computed(() => {
    // if href is specified, force variant to be interactive
    if (props.href) {
        return 'interactive';
    }
    // if no href provided, honor the specified variant
    return props.variant;
});
const defaultTag = computed(() => {
    // if an href is provided and no alternate link tag was provided (e.g. nuxt-link),
    // force the tag to be a nuxt-link, no matter the variant
    if (props.href && props.tag === 'div') {
        return 'nuxt-link';
    }

    // otherwise, honor the tag passed in if it's display variant
    // or something other than the default tag was provided
    if (props.variant !== 'interactive' || props.tag !== 'div') {
        return props.tag;
    }

    // if we reach this point, variant is interactive, tag is div, and no href was provided
    // and any non-link clickable element should be a button
    return 'button';
});
</script>

<template>
    <component
        :is="defaultTag =='nuxt-link' ? NuxtLink: defaultTag"
        class="es-card"
        :class="actualVariant"
        :to="to ? to : href"
        v-bind="$attrs">
        <slot />
    </component>
</template>

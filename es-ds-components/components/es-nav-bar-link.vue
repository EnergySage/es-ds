<script setup>
// specific workaround for getting a reference to an auto-imported but not globally registered
// component like NuxtLink, so that it can be used in a <component :is=""> context.
// this resolves to an import statement, according to:
// https://github.com/nuxt/nuxt/issues/13659#issuecomment-1573568006
const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps({
    href: {
        type: String,
        default: '',
    },
    tag: {
        type: String,
        default: 'nuxt-link',
    },
});
</script>

<template>
    <component
        :is="props.tag === 'nuxt-link' ? NuxtLink : props.tag"
        :href="props.href"
        v-bind="$attrs">
        <slot />
    </component>
</template>

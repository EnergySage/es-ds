<template>
    <component
        :is="tag"
        :href="href"
        v-bind="$attrs"
        v-on="$listeners">
        <slot />
    </component>
</template>

<script lang="js">
export default {
    name: 'EsNavBarLink',
    props: {
        href: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'b-link',
        },
    },
};
</script>

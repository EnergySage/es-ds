<script setup lang="ts">
// specific workaround for getting a reference to an auto-imported but not globally registered
// component like NuxtLink, so that it can be used in a <component :is=""> context.
// this resolves to an import statement, according to:
// https://github.com/nuxt/nuxt/issues/13659#issuecomment-1573568006
const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps<{
    to: string;
}>();
const route = useRoute();

const isCurrentPage = computed(() => route.path === props.to);
</script>

<template>
    <component
        :is="isCurrentPage ? 'div' : NuxtLink"
        class="d-inline-block font-weight-semibold position-relative"
        :to="to">
        <icon-chevron-right
            v-if="isCurrentPage"
            class="ds-link-icon position-absolute"
            height="0.75rem"
            width="0.75rem" />
        <slot />
    </component>
</template>

<style lang="scss" scoped>
.ds-link-icon {
    left: -1rem;
    top: 50%;
    transform: translateY(-45%);
}
</style>

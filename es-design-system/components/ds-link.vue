<template>
    <component
        :is="element"
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

<script>
export default {
    name: 'DsLink',
    props: {
        to: {
            type: String,
            required: true,
        },
    },
    computed: {
        element() {
            return this.isCurrentPage ? 'div' : 'b-link';
        },
        isCurrentPage() {
            return this.$route.path === this.to;
        },
    },
};
</script>

<style lang="scss" scoped>
.ds-link-icon {
    left: -1rem;
    top: 50%;
    transform: translateY(-45%);
}
</style>

<template>
    <component
        :is="element"
        class="font-weight-semibold"
        :to="to">
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
            return this.$route.path === this.to ? 'div' : 'b-link';
        },
    },
};
</script>

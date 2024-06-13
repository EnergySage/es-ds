<template>
    <b-badge
        :variant="variant"
        v-bind="$attrs"
        v-on="$listeners">
        <!--
            @slot Badge Content
            @binding {string} text or html of the badge content
        -->
        <slot />
    </b-badge>
</template>

<script lang="js">
import { BBadge } from 'bootstrap-vue';

export default {
    name: 'EsBadge',
    components: {
        BBadge,
    },
    props: {
        /**
         * Badge Variant
         *
         */
        variant: {
            type: String,
            default: 'primary',
            required: false,
        },
    },
};
</script>

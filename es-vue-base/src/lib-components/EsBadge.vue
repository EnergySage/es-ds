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

<style lang="scss" scoped>
/* stylelint-disable scss/no-global-function-names */
@use "~@energysage/es-bs-base/scss/variables" as variables;
@use "sass:color";

.badge-primary {
    /* hard-coded background-color due to no satisfactory variation of defined colors */
    background: #cce5ef;
    color: color.adjust(variables.$primary, $lightness: -15%);
}

.badge-primary:hover {
    background: variables.$primary;
    color: variables.$white;
}

.badge-success {
    /* hard-coded background-color due to no satisfactory variation of defined colors */
    background: #cce6da;
    color: color.adjust(variables.$success, $lightness: -14%);
}

.badge-success:hover {
    background: variables.$success;
    color: variables.$white;
}

.badge-danger {
    // background: lighten(variables.$danger, 42%);
    background: color.adjust(variables.$danger, $lightness: 42%);
    color: color.adjust(variables.$danger, $lightness: -23%);
}

.badge-danger:hover {
    background: variables.$danger;
    color: variables.$white;
}

.badge-warning {
    background: lighten(variables.$warning, 26%);
    color: color.adjust(variables.$warning, $lightness: -41%);
}

.badge-warning:hover {
    background: variables.$warning;
}

.badge-info {
    // background: lighten(variables.$info, 59%);
    background: color.adjust(variables.$info, $lightness: 59%);
    color: variables.$indigo;
}

.badge-info:hover {
    background: variables.$info;
    color: variables.$white;
}

.badge-disabled {
    background: variables.$gray-200;
    color: variables.$gray-700;
}

.badge-disabled:hover {
    background: variables.$gray-400;
}

.badge-dark {
    background: variables.$gray-400;
    color: variables.$gray-800;
}

.badge-dark:hover {
    background: variables.$dark;
    color: variables.$white;
}
</style>

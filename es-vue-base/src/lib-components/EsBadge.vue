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

<style lang="scss">
@import '~@energysage/es-bs-extends/scss/includes';

.badge {
    line-height: 1rem;
}

.badge-primary {
    /* hard-coded background-color due to no satisfactory variation of defined colors */
    background: #CCE5EF;
    color: darken($primary, 15%);
}

.badge-primary:hover {
    background: $primary;
    color: $white;
}

.badge-success {
    /* hard-coded background-color due to no satisfactory variation of defined colors */
    background: #CCE6DA;
    color: darken($success, 14%);
}

.badge-success:hover {
    background: $success;
    color: $white;
}

.badge-danger {
    background: lighten($danger, 42%);
    color: darken($danger, 23%);
}

.badge-danger:hover {
    background: $danger;
    color: $white;
}

.badge-warning {
    background: lighten($warning, 26%);
    color: darken($warning, 41%);
}

.badge-warning:hover {
    background: $warning;
}

.badge-info {
    background: lighten($info, 59%);
    color: $indigo;
}

.badge-info:hover {
    background: $info;
    color: $white;
}

.badge-disabled {
    background: $gray-200;
    color: $gray-700;
}

.badge-disabled:hover {
    background: $gray-400;
}

.badge-dark {
    background: $gray-400;
    color: $gray-800;
}

.badge-dark:hover {
    background: $dark;
    color: $white;
}

</style>

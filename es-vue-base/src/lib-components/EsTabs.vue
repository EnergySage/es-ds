<template>
    <b-tabs
        class="es-tabs"
        v-bind="$attrs"
        :active-nav-item-class="['font-weight-bolder', 'active-tab']"
        :vertical="vertical"
        :style="cssProps"
        no-nav-style
        v-on="$listeners">
        <slot />
    </b-tabs>
</template>

<script lang="js">
import { BTabs } from 'bootstrap-vue';

export default {
    name: 'EsTabs',
    components: {
        BTabs,
    },
    props: {
        /**
         * Vertical
         * optional, defaults to false
         */
        vertical: {
            type: Boolean,
            default: false,
        },
        /**
         * Border
         */
        border: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        cssProps() {
            return (
                this.border
                    ? { '--border-bottom': '1px solid' }
                    : { '--border-bottom': '0' }
            );
        },
    },
};
</script>

<style lang="scss">
@import '~@energysage/es-bs-base/scss/includes';

.es-tabs {
    .nav {
        border-bottom: var(--border-bottom);
        border-color: $gray-300;
    }

    .nav-link {
        color: $gray-900;
        font-weight: $font-weight-normal;
        margin: 0 2rem -2px;
        padding: 0.25rem 0 0;

        &:first-child {
            margin-left: 0;
        }

        &:hover,
        &:focus {
            color: $primary;
        }
    }

    .active-tab {
        border-bottom: 2px solid;
        border-color: $primary;
        color: $primary;

        &:hover,
        &:focus {
            color: $primary;
        }
    }
}
</style>

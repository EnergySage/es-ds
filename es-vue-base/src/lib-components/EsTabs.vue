<template>
    <b-tabs
        v-bind="$attrs"
        :active-nav-item-class="['font-weight-bold', 'active-tab']"
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
            default: false,
        },
    },
    computed: {
        cssProps() {
            return (
                this.border
                    ? { '--border-bottom': '1px solid', '--border-color': 'gray-300' }
                    : { '--border-bottom': '0', '--border-color': 'null' }
            );
        },
    },
};
</script>

<style lang="scss">
@import '~@energysage/es-bs-extends/scss/includes';

.nav-item {
    border-bottom: var(--border-bottom);
    border-color: var(--border-color);
}

.nav-link {
    color: $gray-900;

    &:hover,&:focus {
        color: $primary;
    }
}

.active-tab {
    border-bottom: 2px solid;
    border-color: $primary;
    color: $primary;

    &:hover,&:focus {
        color: $primary;
    }
}
</style>

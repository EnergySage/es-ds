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

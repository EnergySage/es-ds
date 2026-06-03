<script setup lang="ts">
import { NavigationMenuList } from 'reka-ui';

interface IProps {
    heading?: string;
}
withDefaults(defineProps<IProps>(), {
    heading: '',
});
</script>

<template>
    <es-col
        md="6"
        lg="4"
        xl="3">
        <h2
            v-if="heading"
            class="es-menu-bar-flyout-column-heading eyebrow pb-50 position-relative">
            {{ heading }}
        </h2>
        <navigation-menu-list class="list-unstyled">
            <slot />
        </navigation-menu-list>
    </es-col>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables';

.es-menu-bar-flyout-column-heading {
    &::after {
        background-color: variables.$warm-orange;
        bottom: 0;
        content: '';
        height: 1px;
        left: 0;
        position: absolute;
        width: 64px;
    }
}
</style>

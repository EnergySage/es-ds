<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuLink } from 'reka-ui';

interface IProps {
    href: string;
    name: string;
    target?: string;
}
withDefaults(defineProps<IProps>(), {
    target: '_self',
});
</script>

<template>
    <navigation-menu-item>
        <navigation-menu-link
            as-child
            @select.prevent.stop>
            <a
                class="es-mobile-nav-link d-block font-size-75 font-weight-bolder"
                :href="href"
                :target="target">
                <span class="d-block p-100 rounded-sm">
                    {{ name }}
                </span>
            </a>
        </navigation-menu-link>
    </navigation-menu-item>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables';

$transition-duration: 100ms;

.es-mobile-nav-link {
    /* specify color here so it can be overridden in active state */
    color: variables.$dark-blue;

    &-primary {
        background-color: variables.$gray-50;
    }

    &:not(&-primary) {
        border-bottom: 1px solid variables.$gray-100;
    }

    &:hover {
        text-decoration: none;
    }

    @media not (prefers-reduced-motion) {
        transition:
            background-color $transition-duration ease-in-out,
            color $transition-duration ease-in-out;

        & > span {
            transition: background-color $transition-duration ease-in-out;
        }
    }

    &:active {
        color: variables.$white;

        & > span {
            background-color: variables.$dark-blue;
        }
    }

    &-primary:active {
        background-color: variables.$dark-blue;
    }
}
</style>

<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuLink } from 'reka-ui';

interface IProps {
    emphasize?: boolean;
    href: string;
    name: string;
    target?: string;
}
withDefaults(defineProps<IProps>(), {
    emphasize: false,
    target: '_self',
});
</script>

<template>
    <navigation-menu-item>
        <navigation-menu-link
            v-if="href"
            as-child
            @select.prevent.stop>
            <a
                v-if="emphasize"
                class="es-mobile-nav-link es-mobile-nav-link-primary align-items-center d-flex font-weight-bolder justify-content-between p-100 rounded-sm"
                :href="href"
                :target="target">
                {{ name }}
                <icon-arrow-right
                    height="20px"
                    width="20px" />
            </a>
            <a
                v-else
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

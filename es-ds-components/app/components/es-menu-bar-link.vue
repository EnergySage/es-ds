<script setup lang="ts">
import { NavigationMenuLink } from 'reka-ui';

interface IProps {
    href: string;
    target?: string;
}
withDefaults(defineProps<IProps>(), {
    target: '_self',
});
</script>

<template>
    <navigation-menu-link
        as-child
        @select.prevent.stop>
        <a
            class="es-menu-bar-link align-items-center d-flex font-weight-bolder text-dark-blue"
            :href="href"
            :target="target">
            <slot />
        </a>
    </navigation-menu-link>
</template>

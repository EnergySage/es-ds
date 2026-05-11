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
                class="es-menu-bar-link d-block font-size-75 font-weight-normal text-dark-blue"
                :href="href"
                :target="target">
                <span class="d-block py-50 rounded-sm">
                    {{ name }}
                </span>
            </a>
        </navigation-menu-link>
    </navigation-menu-item>
</template>

<style lang="scss" scoped>
.es-menu-bar-link {
}
</style>

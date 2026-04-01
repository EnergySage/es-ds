<script setup lang="ts">
import { NavigationMenuTrigger } from 'reka-ui';

interface IProps {
    unstyled?: boolean;
}
withDefaults(defineProps<IProps>(), {
    unstyled: false,
});
</script>

<template>
    <!-- styles defined with :deep() in EsMobileNav due to Reka UI's rendering method -->
    <navigation-menu-trigger
        v-bind="$attrs"
        :class="{ 'es-mobile-nav-trigger': !unstyled }">
        <slot />
    </navigation-menu-trigger>
</template>

<script setup lang="ts">
import { NavigationMenuTrigger } from 'reka-ui';
</script>

<template>
    <!-- styles defined with :deep() in EsMobileNav due to Reka UI's rendering method -->
    <navigation-menu-trigger
        v-bind="$attrs"
        class="es-mobile-nav-trigger">
        <slot />
    </navigation-menu-trigger>
</template>

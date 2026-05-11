<script setup lang="ts">
import { NavigationMenuTrigger } from 'reka-ui';
</script>

<template>
    <!-- classes on Reka UI elements defined with :deep() in EsMenuBar due to rendering method -->
    <navigation-menu-trigger
        v-bind="$attrs"
        class="es-menu-bar-item-trigger align-items-center d-flex">
        <slot />
    </navigation-menu-trigger>
</template>

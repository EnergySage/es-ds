<script setup lang="ts">
import { NavigationMenuItem } from 'reka-ui';
</script>

<template>
    <!-- classes on Reka UI elements defined with :deep() in EsMenuBar due to rendering method -->
    <navigation-menu-item
        v-bind="$attrs"
        class="es-menu-bar-item">
        <slot />
    </navigation-menu-item>
</template>

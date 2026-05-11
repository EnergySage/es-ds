<script setup lang="ts">
import { NavigationMenuItem } from 'reka-ui';

interface IProps {
    fullWidth?: boolean;
    position?: 'left' | 'center' | 'right';
}
withDefaults(defineProps<IProps>(), {
    fullWidth: false,
    position: 'center',
});
</script>

<template>
    <!-- classes on Reka UI elements defined with :deep() in EsMenuBar due to rendering method -->
    <navigation-menu-item
        v-bind="$attrs"
        class="es-menu-bar-item">
        <slot />
    </navigation-menu-item>
</template>

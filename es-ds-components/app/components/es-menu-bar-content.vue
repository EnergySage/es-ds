<script setup lang="ts">
import { NavigationMenuContent, NavigationMenuList } from 'reka-ui';

interface IProps {
    position?: 'left' | 'center' | 'right';
}
withDefaults(defineProps<IProps>(), {
    position: 'center',
});

const fullWidth = inject('fullWidth', false);
</script>

<template>
    <!-- classes on Reka UI elements defined with :deep() in EsMenuBar due to rendering method -->
    <navigation-menu-content
        v-bind="$attrs"
        class="es-menu-bar-item-content">
        <div class="es-menu-bar-item-content-pane">
            <template v-if="fullWidth">
                <div class="px-300 py-200">
                    <es-row class="justify-content-end">
                        <slot />
                    </es-row>
                </div>
            </template>
            <template v-else>
                <navigation-menu-list class="list-unstyled mb-0">
                    <slot />
                </navigation-menu-list>
            </template>
        </div>
        <es-color-band
            v-if="fullWidth"
            class="es-menu-bar-color-band"
            :height="8" />
    </navigation-menu-content>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables';

.es-menu-bar-item-content-pane {
    /*background: radial-gradient(
        199.54% 139.89% at 0% 2.18%,
        rgba(255, 255, 255, 0.95) 0%,
        variables.$white 31.73%,
        rgba(255, 255, 255, 0.9) 100%
    );*/
    /*position: absolute;
    z-index: 1000;*/
}

</style>

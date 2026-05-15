<script setup lang="ts">
import { injectNavigationMenuItemContext, NavigationMenuContent, NavigationMenuList } from 'reka-ui';
import { ES_MENU_BAR_ALIGNMENT_REGISTRY_KEY, type EsMenuBarFlyoutAlign } from '../utils/menu-bar';

interface IProps {
    align?: EsMenuBarFlyoutAlign;
}
const props = withDefaults(defineProps<IProps>(), {
    align: 'center',
});

const fullWidth = inject('fullWidth', false);

// register this flyout's align preference with the parent EsMenuBar so the shared
// Reka viewport can switch align values as the active menu changes
const itemContext = injectNavigationMenuItemContext();
const registry = inject(ES_MENU_BAR_ALIGNMENT_REGISTRY_KEY, null);

watch(
    () => props.align,
    (align) => {
        registry?.register(itemContext.value, align);
    },
    { immediate: true },
);

onBeforeUnmount(() => {
    registry?.unregister(itemContext.value);
});
</script>

<template>
    <!-- classes on Reka UI elements defined with :deep() in EsMenuBar due to rendering method -->
    <navigation-menu-content
        v-bind="$attrs"
        class="es-menu-bar-flyout">
        <div class="es-menu-bar-flyout-pane">
            <template v-if="fullWidth">
                <div class="px-md-150 px-xxl-0 py-200">
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

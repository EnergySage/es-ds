<script setup lang="ts">
import { NavigationMenuTrigger } from 'reka-ui';

interface IProps {
    unstyled?: boolean;
}
withDefaults(defineProps<IProps>(), {
    unstyled: false,
});

const triggerRef = useTemplateRef<InstanceType<typeof NavigationMenuTrigger>>('triggerRef');
const registerNavTrigger = inject<(el: HTMLElement) => void>('registerNavTrigger');

onMounted(() => {
    if (registerNavTrigger && triggerRef.value) {
        registerNavTrigger(triggerRef.value.$el);
    }
});
</script>

<template>
    <!-- styles defined with :deep() in EsMobileNav due to Reka UI's rendering method -->
    <navigation-menu-trigger
        ref="triggerRef"
        v-bind="$attrs"
        :class="{ 'es-mobile-nav-trigger': !unstyled }">
        <slot />
    </navigation-menu-trigger>
</template>

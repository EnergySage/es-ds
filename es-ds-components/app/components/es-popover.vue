<script setup lang="ts">
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui';

interface IProps {
    collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>;
    show?: boolean | undefined;
    side?: 'top' | 'right' | 'bottom' | 'left';
    triggerClass?: string;
    triggerDescription?: string;
    variant?: 'light' | 'dark';
}

withDefaults(defineProps<IProps>(), {
    collisionPadding: 0,
    show: undefined,
    side: 'top',
    triggerClass: '',
    triggerDescription: 'More information',
    variant: 'dark',
});

const emit = defineEmits(['update:show']);

// Workaround: Reka UI components don't play nice with the Nuxt 3.16+ dev server side rendering while using NPM link
const wrappingComponent = import.meta.dev ? resolveComponent('ClientOnly') : 'span';
</script>

<template>
    <component :is="wrappingComponent">
        <popover-root
            :open="show"
            @update:open="(val) => emit('update:show', val)">
            <popover-trigger
                class="es-popover-trigger p-0"
                :class="{ [triggerClass]: true }">
                <span class="sr-only">{{ triggerDescription }}</span>
                <slot name="trigger" />
            </popover-trigger>
            <popover-portal>
                <popover-content
                    class="es-popover-content position-relative"
                    :class="{
                        'text-white': variant === 'dark',
                        'es-popover-content--light': variant === 'light',
                    }"
                    :collision-padding="collisionPadding"
                    :side="side">
                    <popover-close
                        class="es-popover-close align-items-center d-flex justify-content-center float-right mb-50 ml-50 position-relative"
                        :class="{ 'es-popover-close--light': variant === 'light' }">
                        <span class="sr-only">Close</span>
                        <icon-x
                            height="20px"
                            width="20px" />
                    </popover-close>
                    <popover-arrow
                        class="es-popover-arrow"
                        :class="{ 'es-popover-arrow--light': variant === 'light' }"
                        :height="12"
                        rounded
                        :width="22" />
                    <slot />
                    <!-- the cta slot is kept for backwards compatibility but is deprecated -->
                    <slot name="cta" />
                </popover-content>
            </popover-portal>
        </popover-root>
    </component>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/border-radius' as border-radius;
@use '@energysage/es-ds-styles/scss/variables' as variables;

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.es-popover-trigger {
    align-items: center;
    background-color: transparent;
    border: none;
    display: inline-flex;
    justify-content: center;
    vertical-align: middle;
}

:deep(.es-popover-content) {
    background-color: variables.$dark-blue;
    @include border-radius.border-radius(variables.$popover-border-radius);
    box-shadow: variables.$popover-box-shadow;
    padding: variables.$popover-header-padding-y variables.$popover-header-padding-x;
    width: 250px;
    z-index: variables.$zindex-popover;
}

:deep(.es-popover-content[data-state='open']) {
    animation: fadeIn 150ms ease;
}

:deep(.es-popover-content[data-state='closed']) {
    animation: fadeOut 150ms ease;
}

:deep(.es-popover-content--light) {
    background-color: variables.$white;
}

:deep(.es-popover-arrow) {
    fill: variables.$dark-blue;
}

:deep(.es-popover-arrow--light) {
    fill: variables.$white;
}

:deep(.es-popover-close) {
    background-color: transparent;
    border: none;
    color: variables.$white;
    height: 28px;
    padding: 0;
    /* better align top of close button with text */
    right: -0.125rem;
    top: -0.125rem;
    width: 28px;
}

:deep(.es-popover-close--light) {
    color: variables.$blue-600;
}
</style>

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
</script>

<template>
    <popover-root :open="show">
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
                    class="es-popover-close position-absolute"
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
                <div class="pr-300">
                    <slot />
                </div>
                <slot name="cta" />
            </popover-content>
        </popover-portal>
    </popover-root>
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
    right: 1rem;
    padding: 0;
    top: 0.75rem;
    width: 28px;
}

:deep(.es-popover-close--light) {
    color: variables.$blue-600;
}
</style>

<script setup lang="ts">
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'reka-ui';

interface IProps {
    collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>;
    delayDuration?: number;
    show?: boolean | undefined;
    side?: 'top' | 'right' | 'bottom' | 'left';
    triggerClass?: string;
    variant?: 'light' | 'dark';
}

withDefaults(defineProps<IProps>(), {
    collisionPadding: 0,
    delayDuration: 0,
    show: undefined,
    side: 'top',
    triggerClass: '',
    variant: 'dark',
});

const emit = defineEmits(['update:show']);

const deviceSupportsTouch = ref(false);
const internalShow = ref(false);

// provide a workaround for the case where scroll-flipping causes the tooltip
// to get in a state where it won't reopen on hover (allow user to click to open)
const handleClick = () => {
    internalShow.value = true;
    emit('update:show', true);
};

// keep the internal boolean up to date when the state changes
// and also emit the update event up and out
const handleUpdateOpen = (val: boolean) => {
    internalShow.value = val;
    emit('update:show', val);
};

onMounted(() => {
    // detect if the device supports touch events or not
    const mediaQueryResult = window.matchMedia('(hover: none)') as MediaQueryList;
    deviceSupportsTouch.value = mediaQueryResult?.matches || false;
});

// Workaround: Reka UI components don't play nice with the Nuxt 3.16+ dev server side rendering while using NPM link
const wrappingComponent = import.meta.dev ? resolveComponent('ClientOnly') : 'span';
</script>

<template>
    <component :is="wrappingComponent">
        <tooltip-provider
            v-if="!deviceSupportsTouch"
            :delay-duration="delayDuration"
            :disable-closing-trigger="true">
            <tooltip-root
                :open="show || internalShow"
                @update:open="handleUpdateOpen">
                <tooltip-trigger
                    class="es-tooltip-trigger p-0"
                    :class="{ [triggerClass]: true }"
                    @click="handleClick">
                    <slot name="trigger" />
                </tooltip-trigger>
                <tooltip-portal>
                    <tooltip-content
                        class="es-tooltip-content"
                        :class="{
                            'text-white': variant === 'dark',
                            'es-tooltip-content--light': variant === 'light',
                        }"
                        :collision-padding="collisionPadding"
                        :side="side">
                        <tooltip-arrow
                            class="es-tooltip-arrow"
                            :class="{ 'es-tooltip-arrow--light': variant === 'light' }"
                            :height="12"
                            rounded
                            :width="22" />
                        <slot />
                    </tooltip-content>
                </tooltip-portal>
            </tooltip-root>
        </tooltip-provider>
        <es-popover
            v-else
            :collision-padding="collisionPadding"
            :show="show"
            :side="side"
            :trigger-class="triggerClass"
            :variant="variant"
            @update:show="(val) => emit('update:show', val)">
            <template #trigger>
                <slot name="trigger" />
            </template>
            <slot />
        </es-popover>
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

.es-tooltip-trigger {
    align-items: center;
    background-color: transparent;
    border: none;
    display: inline-flex;
    justify-content: center;
    vertical-align: middle;
}

:deep(.es-tooltip-content) {
    background-color: variables.$dark-blue;
    @include border-radius.border-radius(variables.$popover-border-radius);
    box-shadow: variables.$popover-box-shadow;
    padding: variables.$popover-header-padding-y variables.$popover-header-padding-x;
    width: 250px;
    z-index: variables.$zindex-popover;
}

:deep(.es-tooltip-content[data-state='open']) {
    animation: fadeIn 150ms ease;
}

:deep(.es-tooltip-content[data-state='closed']) {
    animation: fadeOut 150ms ease;
}

:deep(.es-tooltip-content--light) {
    background-color: variables.$white;
}

:deep(.es-tooltip-arrow) {
    fill: variables.$dark-blue;
}

:deep(.es-tooltip-arrow--light) {
    fill: variables.$white;
}

:deep(.es-tooltip-close) {
    background-color: transparent;
    border: none;
    color: variables.$white;
    height: 28px;
    right: 1rem;
    padding: 0;
    top: 0.75rem;
    width: 28px;
}

:deep(.es-tooltip-close--light) {
    color: variables.$blue-600;
}
</style>

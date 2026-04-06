<script setup lang="ts">
import { useScrollLock } from '@vueuse/core';
import { type NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuRoot } from 'reka-ui';
import type { ShallowRef } from 'vue';

interface IProps {
    from?: 'left' | 'right';
    width?: number;
}
const props = withDefaults(defineProps<IProps>(), {
    from: 'left',
    width: 400,
});

const ANIMATION_DURATION = 200;
const ANIMATION_DURATION_MS = `${ANIMATION_DURATION}ms`;

const activeMenuId = ref('');
const depth = ref(0);
const navTriggerElement = ref<HTMLElement | null>(null);
const nameStack: Ref<string[]> = ref([]);
const scrollableContentAreaTemplateRef: Ref<Readonly<
    ShallowRef<InstanceType<typeof NavigationMenuContent> | null>
> | null> = ref(null);
const subNavCloseHandlers: Ref<Function[]> = ref([]);

const displayedName = computed(() => (nameStack.value.length > 0 ? nameStack.value[nameStack.value.length - 1] : ''));
const isScrollLocked = useScrollLock(import.meta.client ? document.body : null);
const widthPx = computed(() => `${props.width}px`);

// closes the top-level menu
const closeMenu = () => {
    // focus the trigger before closing so assistive technologies (e.g. VoiceOver)
    // don't lose focus when the menu content is removed from the DOM.
    navTriggerElement.value?.focus();

    // close the menu
    activeMenuId.value = '';
};

// provides a read-only variable indicating the current depth
const currentDepth = computed(() => depth.value);

// closes the currently-visible menu
const goBack = () => {
    const closeCurrentMenu = subNavCloseHandlers.value.pop();
    if (closeCurrentMenu) {
        closeCurrentMenu();
    }
};

// animates up/back one level
const decreaseDepth = () => {
    if (depth.value > 0) {
        nameStack.value = nameStack.value.slice(0, nameStack.value.length - 1);
        depth.value -= 1;

        // if we can, scroll to the top of the content area so the parent menu starts at the top
        if (scrollableContentAreaTemplateRef.value?.value?.$el?.scrollTop) {
            scrollableContentAreaTemplateRef.value.value.$el.scrollTop = 0;
        }
    }
};

// animates down/forward one level
const increaseDepth = (name: string) => {
    nameStack.value.push(name);
    depth.value += 1;

    // if we can, scroll to the top of the content area so the submenu starts at the top
    if (scrollableContentAreaTemplateRef.value?.value?.$el?.scrollTop) {
        scrollableContentAreaTemplateRef.value.value.$el.scrollTop = 0;
    }
};

// allows the nav trigger to register itself so closeMenu can return focus to it
const registerNavTrigger = (el: HTMLElement) => {
    navTriggerElement.value = el;
};

// allows us to scroll the content area up to the top when opening a submenu
const registerScrollableContentArea = (
    areaTemplateRef: Readonly<ShallowRef<InstanceType<typeof NavigationMenuContent> | null>>,
) => {
    scrollableContentAreaTemplateRef.value = areaTemplateRef;
};

// provides the back button with a function to call in order to close the active submenu
// (this is called by submenus when they are opened)
const registerSubNavCloseHandler = (callback: Function) => subNavCloseHandlers.value.push(callback);

// provides a way to wait for animation to complete prior to doing something
const waitForAnimationDuration = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), ANIMATION_DURATION);
    });
};

provide('animationDuration', ANIMATION_DURATION);
provide('closeMenu', closeMenu);
provide('currentDepth', currentDepth);
provide('decreaseDepth', decreaseDepth);
provide('displayedName', displayedName);
provide('from', toRef(props, 'from'));
provide('goBack', goBack);
provide('increaseDepth', increaseDepth);
provide('registerNavTrigger', registerNavTrigger);
provide('registerScrollableContentArea', registerScrollableContentArea);
provide('registerSubNavCloseHandler', registerSubNavCloseHandler);
provide('waitForAnimationDuration', waitForAnimationDuration);
provide('width', toRef(props, 'width'));
provide('widthPx', widthPx);

watch(activeMenuId, async (newVal: string, oldVal: string) => {
    isScrollLocked.value = !!newVal;

    // if the menu is closing
    if (!newVal && oldVal) {
        // wait until the mobile nav closing animation is complete
        await waitForAnimationDuration();

        // reset the state of all submenus by closing all open ones (without animation)
        subNavCloseHandlers.value.forEach((callback: Function) => {
            callback(false);
        });

        // clear out all subnav close handlers since all of them are closed
        subNavCloseHandlers.value = [];

        // set the animation "window" to first position
        depth.value = 0;
    }
});
</script>

<template>
    <navigation-menu-root
        v-model="activeMenuId"
        v-bind="$attrs"
        class="es-mobile-nav d-flex"
        disable-hover-trigger
        disable-pointer-leave-close>
        <!-- overlay -->
        <teleport to="body">
            <div
                class="es-mobile-nav-overlay position-fixed"
                :class="{
                    active: !!activeMenuId,
                }"
                @click="activeMenuId = ''" />
        </teleport>

        <!--
            since the first level is a single item - the trigger to open the mobile nav -
            prevent it from being a <ul> and <li>
        -->
        <navigation-menu-list
            as="div"
            class="es-mobile-nav-list d-flex">
            <navigation-menu-item
                as="div"
                class="d-flex">
                <slot />
            </navigation-menu-item>
        </navigation-menu-list>
    </navigation-menu-root>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables';

$animation-duration: v-bind(ANIMATION_DURATION_MS);

.es-mobile-nav {
    --mobile-nav-width: v-bind(widthPx);

    &-overlay {
        opacity: 0;
        pointer-events: none;

        &.active {
            opacity: 0.3;
            pointer-events: all;
        }

        @include breakpoints.media-breakpoint-up(sm) {
            background-color: variables.$gray-900;
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
            z-index: 1010;

            @media not (prefers-reduced-motion) {
                transition: opacity $animation-duration ease-in-out;
            }
        }
    }

    :deep(> div) {
        /* ensure the button is full-height with the rest of the nav bar items */
        display: flex;
    }

    :deep(.es-mobile-nav-list) {
        display: flex;
    }

    :deep(.es-mobile-nav-trigger) {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border: none;
        color: variables.$dark-blue;
        min-height: 40px;
        margin: 0;
        padding: 0 variables.$spacer;
        position: relative;
    }
}
</style>

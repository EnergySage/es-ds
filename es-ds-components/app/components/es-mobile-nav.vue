<script setup lang="ts">
import { NavigationMenuItem, NavigationMenuList, NavigationMenuRoot } from 'reka-ui';

// TODO: disable body scrolling while mobile nav is active
// TODO: fix issue where going two levels down, switching to another window, then back to browser, closes all submenus
// TODO: consider accessibility of submenu name header

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
const nameStack: Ref<string[]> = ref([]);
const subNavCloseHandlers: Ref<Function[]> = ref([]);

const contentPaneTransformXs = computed(() => `translateX(${depth.value * -100}vw)`);
const contentPaneTransformSm = computed(() => `translateX(${depth.value * -1 * props.width}px)`);
const displayedName = computed(() => nameStack.value.length > 0 ? nameStack.value[nameStack.value.length - 1] : '');
const menuClosedTranslateX = computed(() => (props.from === 'right' ? '100%' : '-100%'));
const mobileNavParentElement = useTemplateRef('mobileNavParentElement');

// positioning and width of the mobile nav
const left = computed(() => props.from === 'left' ? '0' : 'auto');
const right = computed(() => props.from === 'right' ? '0' : 'auto');
const widthPx = computed(() => `${props.width}px`);

// closes the top-level menu
const closeMenu = () => {
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
    }
};

// animates down/forward one level
const increaseDepth = (name: string) => {
    nameStack.value.push(name);
    depth.value += 1;
};

const isElementWithinMenu = (element: any) => {
    if (!mobileNavParentElement?.value?.$el) {
        return false;
    }

    const parent: Node = mobileNavParentElement.value.$el;
    return parent.contains(element);
};

// provides the back button with a function to call in order to close the active submenu
// (this is called by submenus when they are opened)
const registerSubNavCloseHandler = (callback: Function) => subNavCloseHandlers.value.push(callback);

// provides a way to wait for animation to complete prior to doing something
// TODO: don't wait at all if animations are off due to prefers-reduced-motion
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
provide('goBack', goBack);
provide('increaseDepth', increaseDepth);
provide('isElementWithinMenu', isElementWithinMenu);
provide('registerSubNavCloseHandler', registerSubNavCloseHandler);
provide('waitForAnimationDuration', waitForAnimationDuration);
provide('widthPx', widthPx);

watch(activeMenuId, async (newVal: string, oldVal: string) => {
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
                class="es-mobile-nav-overlay position-absolute"
                :class="{
                    'active': !!activeMenuId
                }"
                @click="activeMenuId = ''"/>
        </teleport>

        <!-- since the first level is a single item, prevent it from being a <ul> and <li> -->
        <navigation-menu-list
            ref="mobileNavParentElement"
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

@keyframes menuOpen {
    from {
        transform: translateX(v-bind(menuClosedTranslateX));
    }
    to {
        transform: translateX(0);
    }
}

@keyframes menuClose {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(v-bind(menuClosedTranslateX));
    }
}

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
            z-index: 990;

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
        /*height: 40px;*/
        margin: 0;
        padding: 0 variables.$spacer;
        position: relative;
    }

    :deep(.es-mobile-nav-content) {
        bottom: 0;
        box-shadow: 0 0 6px 0 rgba(34, 38, 51, 0.2);
        left: 0;
        overflow-x: hidden;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 1000;

        @media not (prefers-reduced-motion) {
            &[data-state='open'] {
                animation: menuOpen $animation-duration ease-out;
            }

            &[data-state='closed'] {
                animation: menuClose $animation-duration ease-in;
            }
        }

        @include breakpoints.media-breakpoint-up(sm) {
            left: v-bind(left);
            right: v-bind(right);
            width: v-bind(widthPx);
        }
    }

    :deep(.es-mobile-nav-content-header) {
        height: 88px;
    }

    :deep(.es-mobile-nav-back-button) {
        left: variables.$spacer * 0.5;
        opacity: 1;
        transform: translateY(-50%);
        top: 50%;

        @media not (prefers-reduced-motion) {
            transition: opacity $animation-duration ease-in-out;
        }

        &.hide {
            opacity: 0;
            pointer-events: none;
        }

        svg {
            height: 20px !important;
            width: 20px !important;
        }
    }

    :deep(.es-mobile-nav-close-button) {
        right: variables.$spacer;
        transform: translateY(-50%);
        top: 50%;

        svg {
            height: 20px !important;
            width: 20px !important;
        }
    }

    :deep(.es-mobile-nav-content-pane) {
        border-top: 1px solid variables.$gray-100;
        transform: v-bind(contentPaneTransformXs);

        @media not (prefers-reduced-motion) {
            transition: transform $animation-duration ease-in-out;
        }

        @include breakpoints.media-breakpoint-up(sm) {
            transform: v-bind(contentPaneTransformSm);
        }
    }
}
</style>

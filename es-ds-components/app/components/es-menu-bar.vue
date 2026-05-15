<script setup lang="ts">
import { useScrollLock } from '@vueuse/core';
import { NavigationMenuList, NavigationMenuRoot, NavigationMenuViewport } from 'reka-ui';
import {
    ES_MENU_BAR_CLOSE_EVENT_NAME,
    ES_MENU_BAR_OPEN_CLOSE_DURATION_MS,
    ES_MENU_BAR_OPEN_EVENT_NAME,
} from '../utils/menu-bar';
import { omit } from '../utils/omit';
import { useEsdsEvents } from '../composables/events';

interface IProps {
    class?: string;
    fullWidth?: boolean;
    height?: number;
    showOverlayWhenOpen?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
    class: '',
    fullWidth: false,
    height: 40,
    showOverlayWhenOpen: true,
});

// used to ensure we don't close our menu when emitting our own menu open event
let isOpening = false;

const emitter = useEsdsEvents();
const isScrollLocked = useScrollLock(import.meta.client ? document.body : null);

const activeMenuId = ref('');

const heightPx = computed(() => `${props.height}px`);

provide('fullWidth', props.fullWidth);

watch(activeMenuId, async (newVal: string, oldVal: string) => {
    // lock page scrolling when menu is open, unless we're not showing the overlay
    isScrollLocked.value = props.showOverlayWhenOpen && !!newVal;

    if (!oldVal && newVal) {
        // if the menu is opening, emit event so:
        //  - any other EsMenuBars on the page can close (only an issue during keyboard navigation between menus)
        //  - EsStickyBar can change from transparent to white background
        isOpening = true;
        emitter.emit(ES_MENU_BAR_OPEN_EVENT_NAME);
    } else if (oldVal && !newVal) {
        // if the menu is closing, emit event so:
        //  - EsStickyBar can change from white background back to transparent
        emitter.emit(ES_MENU_BAR_CLOSE_EVENT_NAME);
    }
});

// keep a reference to the handler so unmount can remove only this instance's listener —
// emitter.off(type) without a handler wipes EVERY listener for that event, which would
// break other components (e.g. EsStickyBar) that are also subscribed
const handleMenuOpen = () => {
    if (isOpening) {
        // if we're opening our own menu, ignore the event
        isOpening = false;
    } else {
        // if another menu just opened, close ours
        // (this is only an issue during keyboard navigation between menus)
        activeMenuId.value = '';
    }
};

onMounted(() => {
    emitter.on(ES_MENU_BAR_OPEN_EVENT_NAME, handleMenuOpen);
});

onUnmounted(() => {
    emitter.off(ES_MENU_BAR_OPEN_EVENT_NAME, handleMenuOpen);
});
</script>

<template>
    <div
        class="es-menu-bar"
        :class="[props.class]"
        :style="{ '--es-menu-bar-open-close-duration': `${ES_MENU_BAR_OPEN_CLOSE_DURATION_MS}ms` }">
        <navigation-menu-root
            v-model="activeMenuId"
            v-bind="omit('class', $attrs)"
            class="es-menu-bar-root my-0"
            :class="{ 'position-relative': !fullWidth }"
            disable-hover-trigger
            disable-pointer-leave-close>
            <navigation-menu-list class="es-menu-bar-list">
                <slot />
            </navigation-menu-list>
            <navigation-menu-viewport
                class="es-menu-bar-viewport"
                :class="{
                    'full-width': fullWidth,
                }" />
        </navigation-menu-root>
        <teleport
            v-if="showOverlayWhenOpen"
            to="body">
            <transition name="es-menu-bar-overlay">
                <div
                    v-if="activeMenuId"
                    class="es-menu-bar-overlay"
                    :style="{
                        '--es-menu-bar-height': heightPx,
                        '--es-menu-bar-open-close-duration': `${ES_MENU_BAR_OPEN_CLOSE_DURATION_MS}ms`,
                    }"></div>
            </transition>
        </teleport>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables';
@use 'sass:map';

$open-close-timing-function: ease-in-out;

$switch-menus-duration: 400ms;
$switch-menus-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

@keyframes enterFromLeft {
    from {
        opacity: 0;
        transform: translateX(calc(-1 * var(--es-menu-bar-flyout-translate)));
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes enterFromRight {
    from {
        opacity: 0;
        transform: translateX(var(--es-menu-bar-flyout-translate));
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* no-op animation needed so Reka UI persists the exiting menu, allowing the actual exit animation to show */
@keyframes presenceExitAnimationForContent {
    0% {
        border-color: #fff;
    }
    50% {
        border-color: #fefefe;
    }
    100% {
        border-color: #fff;
    }
}

@keyframes exitToLeft {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(calc(-1 * var(--es-menu-bar-flyout-translate)));
    }
}

@keyframes exitToRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(var(--es-menu-bar-flyout-translate));
    }
}

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

@keyframes menuOpen {
    from {
        height: 0;
    }
    to {
        height: var(--reka-navigation-menu-viewport-height);
    }
}

@keyframes menuClose {
    from {
        height: var(--reka-navigation-menu-viewport-height);
    }
    to {
        height: 0;
    }
}

@keyframes menuOpenWithShadow {
    from {
        box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0);
        height: 0;
    }
    to {
        box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.25);
        height: var(--reka-navigation-menu-viewport-height);
    }
}

@keyframes menuCloseWithShadow {
    from {
        box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.25);
        height: var(--reka-navigation-menu-viewport-height);
    }
    to {
        box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0);
        height: 0;
    }
}

.es-menu-bar {
    :deep(.es-menu-bar-list) {
        align-items: center;
        display: flex;
        gap: variables.$spacer * 0.25;
        list-style: none;
        margin: 0;
        padding: 0;
        position: relative;
        /*
            put the menu bar and items above the menu itself, so it can slide
            down from underneath the menu without temporarily overlapping it
        */
        z-index: 1001;

        @include breakpoints.media-breakpoint-up(xl) {
            gap: variables.$spacer;
        }

        li {
            margin: 0;
        }
    }

    :deep(.es-menu-bar-link),
    :deep(.es-menu-bar-item-trigger) {
        color: variables.$dark-blue;
        height: v-bind(heightPx);
        padding: 0 variables.$spacer * 0.5;
        position: relative;
        white-space: nowrap;

        &::after {
            border-bottom: 4px solid variables.$warm-orange;
            bottom: 0;
            content: '';
            left: 0;
            opacity: 0;
            position: absolute;
            right: 0;

            @media not (prefers-reduced-motion) {
                transition: opacity var(--es-menu-bar-open-close-duration) ease-in-out;
            }
        }

        @media (hover: hover) {
            text-decoration: none;

            &:hover {
                &::after {
                    opacity: 1;
                }
            }
        }
    }

    :deep(.es-menu-bar-item-trigger) {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border: none;
        margin: 0;

        &[data-state='open']::after {
            opacity: 1;
        }
    }

    :deep(.es-menu-bar-viewport) {
        height: var(--reka-navigation-menu-viewport-height);
        overflow: hidden;
        position: absolute;
        z-index: 1000;

        @media not (prefers-reduced-motion) {
            transition: height $switch-menus-duration $switch-menus-timing-function;

            &[data-state='open'] {
                animation: menuOpen var(--es-menu-bar-open-close-duration) $open-close-timing-function;
            }

            &[data-state='closed'] {
                animation: menuClose var(--es-menu-bar-open-close-duration) $open-close-timing-function;
            }
        }

        /* menu pane background */
        &::before {
            background: radial-gradient(
                199.54% 139.89% at 0% 2.18%,
                rgba(255, 255, 255, 0.95) 0%,
                variables.$white 31.73%,
                rgba(255, 255, 255, 0.9) 100%
            );
            bottom: 0;
            content: '';
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 2;
        }

        &.full-width {
            left: 0;
            right: 0;

            .es-menu-bar-flyout {
                width: 100%;
                /* row's content box = pane − 2·wrapper-padding + grid-gutter (row's negative margins). matches <es-col md="6" lg="4" xl="3"> in es-menu-bar-flyout-column so column text stays aligned during the cross-slide */
                --es-menu-bar-flyout-row-width: calc(
                    min(100%, #{map.get(variables.$container-max-widths, xxl)}) - 2 *
                        #{map.get(variables.$spacers, 150)} + #{variables.$grid-gutter-width}
                );
                --es-menu-bar-flyout-translate: calc(var(--es-menu-bar-flyout-row-width) * 6 / 12);

                @include breakpoints.media-breakpoint-up(lg) {
                    --es-menu-bar-flyout-translate: calc(var(--es-menu-bar-flyout-row-width) * 4 / 12);
                }

                @include breakpoints.media-breakpoint-up(xl) {
                    --es-menu-bar-flyout-translate: calc(var(--es-menu-bar-flyout-row-width) * 3 / 12);
                }

                @include breakpoints.media-breakpoint-up(xxl) {
                    /* wrapper padding becomes 0 and pane's half-gutter padding cancels the row's negative margin → row width = pane */
                    --es-menu-bar-flyout-row-width: min(100%, #{map.get(variables.$container-max-widths, xxl)});
                }

                /* in full width mode when switching menus, menu container stays in same position, content animates in/out */
                @media not (prefers-reduced-motion) {
                    &[data-motion='from-start'] {
                        animation: enterFromLeft $switch-menus-duration $switch-menus-timing-function;
                    }

                    &[data-motion='from-end'] {
                        animation: enterFromRight $switch-menus-duration $switch-menus-timing-function;
                    }

                    &[data-motion='to-start'] {
                        animation: exitToLeft $switch-menus-duration $switch-menus-timing-function;
                    }

                    &[data-motion='to-end'] {
                        animation: exitToRight $switch-menus-duration $switch-menus-timing-function;
                    }
                }

                .es-menu-bar-flyout-pane {
                    margin: 0 auto;
                    max-width: map.get(variables.$container-max-widths, xxl);

                    /* at xxl breakpoint only, match es-container padding */
                    @include breakpoints.media-breakpoint-up(xxl) {
                        padding-left: variables.$grid-gutter-width * 0.5 !important;
                        padding-right: variables.$grid-gutter-width * 0.5 !important;
                    }
                }
            }
        }

        &:not(.full-width) {
            border: 1px solid variables.$gray-50;
            border-radius: 0 0 variables.$spacer variables.$spacer;
            box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.25);
            left: var(--reka-navigation-menu-viewport-left);
            width: var(--reka-navigation-menu-viewport-width);

            @media not (prefers-reduced-motion) {
                transition:
                    height $switch-menus-duration $switch-menus-timing-function,
                    left $switch-menus-duration $switch-menus-timing-function;

                &[data-state='open'] {
                    animation: menuOpenWithShadow var(--es-menu-bar-open-close-duration) $open-close-timing-function;
                }

                &[data-state='closed'] {
                    animation: menuCloseWithShadow var(--es-menu-bar-open-close-duration) $open-close-timing-function;
                }
            }

            .es-menu-bar-flyout {
                padding: variables.$spacer * 1.5;
                width: 300px;

                @media not (prefers-reduced-motion) {
                    &[data-motion='from-start'],
                    &[data-motion='from-end'] {
                        .es-menu-bar-flyout-pane {
                            animation: fadeIn $switch-menus-duration $switch-menus-timing-function;
                        }
                    }

                    &[data-motion='to-start'],
                    &[data-motion='to-end'] {
                        /* no-op animation needed so Reka UI persists the exiting menu, allowing the actual exit animation to show */
                        animation: presenceExitAnimationForContent $switch-menus-duration $switch-menus-timing-function;

                        /**
                         * animation needs to be on the child to enable a smooth cross-fade, otherwise
                         * both parents are visible simultaneously next to each other
                         */
                        .es-menu-bar-flyout-pane {
                            animation: fadeOut $switch-menus-duration $switch-menus-timing-function;
                        }
                    }
                }
            }
        }
    }

    :deep(.es-menu-bar-flyout) {
        left: 0;
        position: absolute;
        top: 0;
        z-index: 3;
    }

    /* this could be in EsMenuBarContent but needs to be here to share SASS variables */
    :deep(.es-menu-bar-color-band) {
        left: 0;
        position: absolute;
        right: 0;
        top: calc(var(--reka-navigation-menu-viewport-height) - 8px);

        @media not (prefers-reduced-motion) {
            transition: top $switch-menus-duration $switch-menus-timing-function;
        }
    }
}

.es-menu-bar-overlay {
    background-color: variables.$black;
    height: 2 * 100vh;
    left: 0;
    opacity: 0.25;
    position: fixed;
    top: var(--es-menu-bar-height);
    width: 100vw;
    z-index: 999;

    &-enter-active,
    &-leave-active {
        transition: opacity var(--es-menu-bar-open-close-duration) $open-close-timing-function;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
}
</style>

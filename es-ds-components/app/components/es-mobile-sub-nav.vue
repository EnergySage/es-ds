<script setup lang="ts">
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuSub, NavigationMenuTrigger } from 'reka-ui';

interface IProps {
    defaultValue?: string;
    name: string;
}
const props = withDefaults(defineProps<IProps>(), {
    defaultValue: '',
});

const activeMenuId = ref('');

const closeMenu: (...args: any[]) => void = inject('closeMenu', () => {});
const decreaseDepth = inject('decreaseDepth', () => {});
const goBack = inject('goBack', () => {});
const increaseDepth: (...args: any[]) => void = inject('increaseDepth', () => {});
const isElementWithinMenu: (...args: any[]) => boolean = inject('isElementWithinMenu', () => true);
const registerSubNavCloseHandler: Function | undefined = inject('registerSubNavCloseHandler');
const waitForAnimationDuration = inject('waitForAnimationDuration', () => {});

const escapeKeyDown = (e: any) => {
    // prevent the Esc key from immediately closing all submenus prior to the mobile nav animating closed
    // (i.e. the visible submenu disappears, then the mobile nav animates closed, which is jarring)
    e.preventDefault();

    // close the mobile nav in a controlled way
    closeMenu();
};

const focusOutside = (e: any) => {
    const classesOnTarget = [...e.target.classList];

    if (classesOnTarget.includes('es-mobile-sub-nav-item-trigger')) {
        // if the user has moved focus outside of the active submenu and onto
        // a parent submenu item, close the active submenu
        goBack();
    } else if (!isElementWithinMenu(e.target)) {
        // if focus is on something outside of the overall menu, close it
        closeMenu();
    }
};

const subNavCloseMenu = async (waitForAnimation: boolean = true) => {
    // start animating up to the parent menu
    decreaseDepth();

    // wait for animation to complete
    if (waitForAnimation) {
        await waitForAnimationDuration();
    }

    // close the menu
    activeMenuId.value = '';
};

watch(activeMenuId, (newVal: string, oldVal: string) => {
    // if the menu is opening
    if (newVal && !oldVal) {
        increaseDepth(props.name);

        if (registerSubNavCloseHandler) {
            registerSubNavCloseHandler(subNavCloseMenu);
        }
    }
});
</script>

<template>
    <navigation-menu-sub
        v-bind="$attrs"
        v-model="activeMenuId"
        class="es-mobile-sub-nav"
        :default-value="defaultValue"
        orientation="vertical">
        <navigation-menu-list class="es-mobile-sub-nav-list m-0 p-0">
            <navigation-menu-item class="es-mobile-sub-nav-item">
                <navigation-menu-trigger
                    class="es-mobile-sub-nav-item-trigger d-block font-size-75 font-weight-bolder m-0 p-0 text-left w-100">
                    <span class="d-flex justify-content-between p-100 rounded-sm w-100">
                        {{ name }}
                        <icon-chevron-right
                            height="20px"
                            width="20px" />
                    </span>
                </navigation-menu-trigger>
                <navigation-menu-content
                    v-bind="$attrs"
                    class="es-mobile-sub-nav-item-content bg-white"
                    @escape-key-down="escapeKeyDown"
                    @focus-outside="focusOutside"
                    @interact-outside.prevent.stop
                    @pointer-down-outside.prevent.stop>
                    <slot />
                </navigation-menu-content>
            </navigation-menu-item>
        </navigation-menu-list>
    </navigation-menu-sub>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables';

$transition-duration: 100ms;

.es-mobile-sub-nav {
    :deep(> div) {
        /* disable Reka UI's automatically-applied position relative so our menus can position properly */
        position: static !important;
    }

    :deep(.es-mobile-sub-nav-list) {
        list-style: none;

        li {
            margin: 0;
        }
    }

    :deep(.es-mobile-sub-nav-item-trigger) {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        border: none;
        border-bottom: 1px solid variables.$gray-100;
        /* specify color here so it can be overridden in active state */
        color: variables.$dark-blue;

        /*& > span > svg {
            color: variables.$gray-400;
        }*/

        @media not (prefers-reduced-motion) {
            transition:
                border-color $transition-duration ease-in-out,
                color $transition-duration ease-in-out;

            & > span {
                transition: background-color $transition-duration ease-in-out;

                & > svg {
                    transition: color $transition-duration ease-in-out;
                }
            }
        }

        &[data-state='open'] {
            border-bottom-color: transparent;
            color: variables.$white;

            & > span {
                background-color: variables.$dark-blue;

                & > svg {
                    color: variables.$white;
                }
            }
        }
    }

    :deep(.es-mobile-sub-nav-item-content[data-state='open']) {
        border-top: 1px solid variables.$gray-100;
        bottom: 0;
        left: 100vw;
        position: absolute;
        top: 0;
        width: 100%;

        @include breakpoints.media-breakpoint-up(sm) {
            left: var(--mobile-nav-width)
        }
    }
}
</style>

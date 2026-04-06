<script setup lang="ts">
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuSub,
    NavigationMenuTrigger,
} from 'reka-ui';

interface IProps {
    name: string;
}
const props = defineProps<IProps>();

const subNavParentElement = useTemplateRef('subNavParentElement');
const subNavTrigger = useTemplateRef('subNavTrigger');

const activeMenuId = ref('');

const backButtonSimulatedFocus = inject('backButtonSimulatedFocus', ref(false));
const closeButtonSimulatedFocus = inject('closeButtonSimulatedFocus', ref(false));
const closeMenu: (...args: any[]) => void = inject('closeMenu', () => {});
const decreaseDepth = inject('decreaseDepth', () => {});
const goBack = inject('goBack', () => {});
const increaseDepth: (...args: any[]) => void = inject('increaseDepth', () => {});
const isElementWithinMenu: (...args: any[]) => boolean = inject('isElementWithinMenu', () => true);
const registerSubNavCloseHandler: Function | undefined = inject('registerSubNavCloseHandler');
const waitForAnimationDuration = inject('waitForAnimationDuration', () => Promise.resolve(true));
const widthPx = inject(
    'widthPx',
    computed(() => '400px'),
);

const escapeKeyDown = (e: any) => {
    // prevent the Esc key from immediately closing all submenus prior to the mobile nav animating closed
    // (i.e. the visible submenu disappears, then the mobile nav animates closed, which is jarring)
    e.preventDefault();

    // close the mobile nav in a controlled way
    closeMenu();
};

const handleTriggerClick = () => {
    // if the menu was open and is being closed by clicking the trigger
    // (which should only be possible via keyboard), close the menu
    if (activeMenuId.value) {
        decreaseDepth();
    }
};

let focusOutsideHandled = false;

const focusOutside = (e: any) => {
    // some browsers can cycle focus through body when shifting focus, causing
    // this handler to be fired twice. to prevent goBack() from being called
    // more times than we want, we have this guard to prevent focusOutside
    // from being called more than once within the same tick
    if (focusOutsideHandled) return;
    focusOutsideHandled = true;
    nextTick(() => {
        focusOutsideHandled = false;
    });

    // we only need to do anything with this submenu if it's actually open
    if (activeMenuId.value) {
        const classesOnTarget = [...e.target.classList];

        if (classesOnTarget.includes('es-mobile-sub-nav-item-trigger')) {
            // if the user has moved focus outside of the this submenu and onto
            // another submenu trigger, close this submenu
            const triggerSubNav = e.target.closest('.es-mobile-sub-nav');
            if (triggerSubNav !== subNavParentElement?.value?.$el) {
                goBack();
            }
        } else if (!isElementWithinMenu(e.target)) {
            // if focus is on something outside of the overall menu, close it
            closeMenu();
        }
    }
};

const handleSrBackClick = () => {
    // explicitly focus the trigger before closing the submenu. without this,
    // assistive technologies (e.g. VoiceOver) lose focus when the submenu content
    // (which contains the sr-only button) is removed from the DOM.
    (subNavTrigger.value as any)?.$el?.focus();
    goBack();
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
    <navigation-menu-item>
        <navigation-menu-sub
            ref="subNavParentElement"
            v-bind="$attrs"
            v-model="activeMenuId"
            class="es-mobile-sub-nav"
            orientation="vertical">
            <navigation-menu-trigger
                ref="subNavTrigger"
                class="es-mobile-sub-nav-item-trigger d-block font-size-75 font-weight-bolder m-0 p-0 text-left w-100"
                @click="handleTriggerClick">
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
                @focus-outside.prevent.stop="focusOutside"
                @interact-outside.prevent.stop
                @pointer-down-outside.prevent.stop>
                <navigation-menu-list class="es-mobile-sub-nav-list list-unstyled m-0 p-0">
                    <slot />
                </navigation-menu-list>

                <!--
                    back button for keyboard / screen readers only,
                    so you can go back when in this subnav's focus trap.
                    when given focus, the visible back button in the
                    nav content header will get a visible focus outline.
                -->
                <es-button
                    class="sr-only"
                    inline
                    variant="link"
                    @blur="backButtonSimulatedFocus = false"
                    @click="handleSrBackClick"
                    @focus="backButtonSimulatedFocus = true">
                    Back
                </es-button>

                <!--
                    close button for keyboard / screen readers only,
                    so you can go back when in this subnav's focus trap.
                    when given focus, the visible close button in the
                    nav content header will get a visible focus outline.
                -->
                <es-button
                    class="sr-only"
                    inline
                    variant="link"
                    @blur="closeButtonSimulatedFocus = false"
                    @click="closeMenu"
                    @focus="closeButtonSimulatedFocus = true">
                    Close
                </es-button>
            </navigation-menu-content>
        </navigation-menu-sub>
    </navigation-menu-item>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables';

$transition-duration: 100ms;

.es-mobile-sub-nav {
    :deep(.es-mobile-sub-nav-list) {
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
    }

    :deep(.es-mobile-sub-nav-item-content[data-state='open']) {
        bottom: 0;
        left: 100vw;
        position: absolute;
        top: 0;
        width: 100%;

        @include breakpoints.media-breakpoint-up(sm) {
            left: v-bind(widthPx);
        }
    }
}
</style>

<script setup lang="ts">
import { NavigationMenuContent, NavigationMenuList } from 'reka-ui';
import type { ShallowRef } from 'vue';

const mobileNavParentElement = useTemplateRef('mobileNavParentElement');

// reactive flags set by hidden sr-only buttons in submenus to simulate focus on visible header buttons
const backButtonSimulatedFocus = ref(false);
const closeButtonSimulatedFocus = ref(false);

// injected variables provided from EsMobileNav
const animationDuration = inject('animationDuration', 200);
const closeMenu: (...args: any[]) => void = inject('closeMenu', () => {});
const currentDepth = inject(
    'currentDepth',
    computed(() => 0),
);
const displayedName = inject('displayedName', '');
const from = inject('from', ref<'left' | 'right'>('left'));
const goBack = inject('goBack', () => {});
const width = inject('width', ref(400));
const widthPx = inject(
    'widthPx',
    computed(() => '400px'),
);

// derived values for CSS custom properties set directly on the element
const animationDurationMs = `${animationDuration}ms`;
const contentPaneTransformXs = computed(() => `translateX(${currentDepth.value * -100}vw)`);
const contentPaneTransformSm = computed(() => `translateX(${currentDepth.value * -1 * width.value}px)`);
const left = computed(() => (from.value === 'left' ? '0' : 'auto'));
const menuClosedTranslateX = computed(() => (from.value === 'right' ? '100%' : '-100%'));
const registerScrollableContentArea = inject<
    (areaTemplateRef: Readonly<ShallowRef<InstanceType<typeof NavigationMenuContent> | null>>) => void
>('registerScrollableContentArea', () => {});
const right = computed(() => (from.value === 'right' ? '0' : 'auto'));

// directional animation of the submenu titles as you're going down and back up
const direction = ref(1);
const transitionName = computed(() =>
    direction.value > 0 ? 'es-mobile-nav-title-forward' : 'es-mobile-nav-title-back',
);
watch(
    currentDepth,
    (newVal, oldVal) => {
        direction.value = newVal > oldVal ? 1 : -1;
    },
    { flush: 'sync' },
);

const focusOutside = (e: any) => {
    // if focus is on something outside of the overall menu, close it
    if (!isElementWithinMenu(e.target)) {
        closeMenu();
    }
};

const isElementWithinMenu = (element: any) => {
    if (!mobileNavParentElement?.value?.$el) {
        return false;
    }

    const parent: Node = mobileNavParentElement.value.$el;
    return parent.contains(element);
};

onMounted(() => {
    // give EsMobileNav a reference to the scrollable content area so it can set the scroll position
    registerScrollableContentArea(mobileNavParentElement);
});

provide('backButtonSimulatedFocus', backButtonSimulatedFocus);
provide('closeButtonSimulatedFocus', closeButtonSimulatedFocus);
provide('isElementWithinMenu', isElementWithinMenu);
</script>

<template>
    <!-- teleported to body to escape any ancestor stacking context (e.g. es-sticky-bar) -->
    <teleport to="body">
        <navigation-menu-content
            v-bind="$attrs"
            ref="mobileNavParentElement"
            class="es-mobile-nav-content bg-white d-flex flex-column pb-50 position-fixed px-50"
            :style="{
                '--es-mobile-nav-animation-duration': animationDurationMs,
                '--es-mobile-nav-closed-translate-x': menuClosedTranslateX,
                '--es-mobile-nav-content-pane-transform-sm': contentPaneTransformSm,
                '--es-mobile-nav-content-pane-transform-xs': contentPaneTransformXs,
                '--es-mobile-nav-left': left,
                '--es-mobile-nav-right': right,
                '--es-mobile-nav-width': widthPx,
            }"
            @focus-outside.prevent.stop="focusOutside"
            @interact-outside.prevent.stop
            @pointer-down-outside.prevent.stop>
            <div
                class="es-mobile-nav-content-header align-items-center bg-white d-flex flex-shrink-0 justify-content-center position-sticky w-100">
                <!-- back button -->
                <transition name="es-mobile-nav-back">
                    <es-button
                        v-if="currentDepth > 0"
                        class="es-mobile-nav-back-button p-50 position-absolute text-blue-900"
                        :class="{ focus: backButtonSimulatedFocus }"
                        inline
                        variant="link"
                        @click="goBack">
                        <icon-arrow-left aria-hidden="true" />
                        <span class="sr-only">back</span>
                    </es-button>
                </transition>

                <!-- logo or subnav title, with smooth transition between them -->
                <div class="es-mobile-nav-title-outer-container">
                    <transition :name="transitionName">
                        <div
                            :key="displayedName || 'logo'"
                            class="es-mobile-nav-title-inner-container align-items-center d-flex justify-content-center">
                            <div
                                v-if="displayedName"
                                class="font-weight-bolder">
                                {{ displayedName }}
                            </div>
                            <es-logo
                                v-else
                                alt=""
                                aria-hidden="true"
                                height="30px"
                                width="135px" />
                        </div>
                    </transition>
                </div>

                <!-- close button -->
                <es-button
                    class="es-mobile-nav-close-button p-50 position-absolute text-blue-900"
                    :class="{ focus: closeButtonSimulatedFocus }"
                    inline
                    variant="link"
                    @click="closeMenu">
                    <icon-x />
                    <span class="sr-only">close</span>
                </es-button>
            </div>
            <div
                class="es-mobile-nav-content-pane d-flex flex-column flex-grow-1 justify-content-between position-relative">
                <navigation-menu-list class="list-unstyled">
                    <slot />
                </navigation-menu-list>
                <div class="es-mobile-nav-content-footer">
                    <slot name="footer" />
                </div>
            </div>
        </navigation-menu-content>
    </teleport>
</template>

<!-- unscoped: targets Reka UI-rendered elements that don't receive Vue's scoped attribute -->
<style lang="scss">
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables';

@keyframes esMobileNavOpen {
    from {
        transform: translateX(var(--es-mobile-nav-closed-translate-x));
    }
    to {
        transform: translateX(0);
    }
}

@keyframes esMobileNavClose {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(var(--es-mobile-nav-closed-translate-x));
    }
}

.es-mobile-nav-content {
    --es-mobile-nav-header-height: 88px;

    bottom: 0;
    box-shadow: 0 0 6px 0 rgba(34, 38, 51, 0.2);
    left: 0;
    overflow-x: hidden;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1020;

    @media not (prefers-reduced-motion) {
        &[data-state='open'] {
            animation: esMobileNavOpen var(--es-mobile-nav-animation-duration) ease-out;
        }

        &[data-state='closed'] {
            animation: esMobileNavClose var(--es-mobile-nav-animation-duration) ease-in;
        }
    }

    @include breakpoints.media-breakpoint-up(sm) {
        left: var(--es-mobile-nav-left);
        right: var(--es-mobile-nav-right);
        width: var(--es-mobile-nav-width);
    }
}

.es-mobile-nav-content-header {
    border-bottom: 1px solid variables.$gray-100;
    height: var(--es-mobile-nav-header-height);
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
}

.es-mobile-nav-back-button {
    left: variables.$spacer * 0.5;
    transform: translateY(-50%);
    top: 50%;

    svg {
        height: 20px !important;
        width: 20px !important;
    }
}

.es-mobile-nav-close-button {
    right: variables.$spacer;
    transform: translateY(-50%);
    top: 50%;

    svg {
        height: 20px !important;
        width: 20px !important;
    }
}

.es-mobile-nav-content-pane {
    transform: var(--es-mobile-nav-content-pane-transform-xs);

    @media not (prefers-reduced-motion) {
        transition: transform var(--es-mobile-nav-animation-duration) ease-in-out;
    }

    @include breakpoints.media-breakpoint-up(sm) {
        transform: var(--es-mobile-nav-content-pane-transform-sm);
    }
}
</style>

<!-- scoped: targets native elements directly in this component's template -->
<style lang="scss" scoped>
.es-mobile-nav-back-enter-from,
.es-mobile-nav-back-leave-to {
    opacity: 0;
}

@media not (prefers-reduced-motion) {
    .es-mobile-nav-back-enter-active,
    .es-mobile-nav-back-leave-active {
        transition: opacity var(--es-mobile-nav-animation-duration) ease-in-out;
    }
}

.es-mobile-nav-title-outer-container {
    /* necessary to keep the logo/titles centered as they show/hide and animate */
    display: grid;
}

.es-mobile-nav-title-inner-container {
    /* necessary to keep the logo/titles centered as they show/hide and animate */
    grid-area: 1 / 1;
    height: 30px;
}

.es-mobile-nav-title-back-enter-from {
    opacity: 0;
    transform: translateX(-20px);
}

.es-mobile-nav-title-back-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.es-mobile-nav-title-forward-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.es-mobile-nav-title-forward-leave-to {
    opacity: 0;
    transform: translateX(-20px);
}

@media not (prefers-reduced-motion) {
    .es-mobile-nav-title-forward-enter-active,
    .es-mobile-nav-title-forward-leave-active,
    .es-mobile-nav-title-back-enter-active,
    .es-mobile-nav-title-back-leave-active {
        transition:
            opacity 0.2s ease,
            transform 0.2s ease;
    }
}
</style>

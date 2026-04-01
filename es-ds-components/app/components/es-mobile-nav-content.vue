<script setup lang="ts">
import { NavigationMenuContent } from 'reka-ui';

// injected variables provided from EsMobileNav
const closeMenu: (...args: any[]) => void = inject('closeMenu', () => {});
const currentDepth = inject(
    'currentDepth',
    computed(() => 0),
);
const displayedName = inject('displayedName', '');
const goBack = inject('goBack', () => {});
const isElementWithinMenu: (...args: any[]) => boolean = inject('isElementWithinMenu', () => true);

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
</script>

<template>
    <!-- most styles defined with :deep() in EsMobileNav due to Reka UI's rendering method -->
    <navigation-menu-content
        v-bind="$attrs"
        class="es-mobile-nav-content bg-white pb-50 px-50"
        @focus-outside="focusOutside"
        @interact-outside.prevent.stop
        @pointer-down-outside.prevent.stop>
        <div
            class="es-mobile-nav-content-header align-items-center d-flex justify-content-center position-relative w-100">
            <!-- back button -->
            <es-button
                class="es-mobile-nav-back-button p-50 position-absolute text-blue-900"
                :class="{ hide: currentDepth === 0 }"
                inline
                variant="link"
                @click="goBack">
                <icon-arrow-left />
                <span class="sr-only">back</span>
            </es-button>

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
                            aria-hidden
                            height="30px"
                            width="135px" />
                    </div>
                </transition>
            </div>

            <!-- close button -->
            <es-button
                class="es-mobile-nav-close-button p-50 position-absolute text-blue-900"
                inline
                variant="link"
                @click="closeMenu">
                <icon-x />
                <span class="sr-only">close</span>
            </es-button>
        </div>
        <div class="es-mobile-nav-content-pane position-relative">
            <slot />
        </div>
    </navigation-menu-content>
</template>

<style lang="scss" scoped>
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

<script setup lang="ts">
import { NavigationMenuContent } from 'reka-ui';

const closeMenu: (...args: any[]) => void = inject('closeMenu', () => {});
const currentDepth = inject('currentDepth', 0);
const displayedName = inject('displayedName', '');
const goBack = inject('goBack', () => {});
const isElementWithinMenu: (...args: any[]) => boolean = inject('isElementWithinMenu', () => true);

const focusOutside = (e: any) => {
    // if focus is on something outside of the overall menu, close it
    if (!isElementWithinMenu(e.target)) {
        closeMenu();
    }
};
</script>

<template>
    <!-- styles defined with :deep() in EsMobileNav due to Reka UI's rendering method -->
    <navigation-menu-content
        v-bind="$attrs"
        class="es-mobile-nav-content bg-white pb-50 px-50"
        @focus-outside="focusOutside"
        @interact-outside.prevent.stop
        @pointer-down-outside.prevent.stop>
        <div class="es-mobile-nav-content-header align-items-center d-flex justify-content-center position-relative w-100">

            <!-- back button -->
            <es-button
                class="es-mobile-nav-back-button p-50 position-absolute text-blue-900"
                :class="{ 'hide': currentDepth === 0 }"
                inline
                variant="link"
                @click="goBack">
                <icon-arrow-left />
                <span class="sr-only">back</span>
            </es-button>

            <div v-if="displayedName" class="font-weight-bolder">
                {{ displayedName }}
            </div>
            <es-logo
                v-else
                aria-hidden
                height="30px"
                width="135px" />

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

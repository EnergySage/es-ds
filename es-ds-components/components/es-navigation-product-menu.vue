<script setup lang="ts">
import Menubar from 'primevue/menubar';

interface EsNavigationProductMenuItemInterface {
    link: string;
    name: string;
}

interface EsNavigationProductMenuInterface extends EsNavigationProductMenuItemInterface {
    items: EsNavigationProductMenuItemInterface[];
}

const props = defineProps<{
    products: EsNavigationProductMenuInterface[];
}>();
</script>

<template>
    <menubar
        :model="props.products"
        :pt="{
            root: 'es-navigation-product-menu',
            menu: 'es-navigation-product-menu-list d-flex justify-content-end list-unstyled mb-0',
            menuitem: 'es-navigation-product-menu-item position-relative',
            action: ({ context }) => ({
                class: [
                    'es-navigation-product-menu-action d-block px-100 px-xl-200',
                    {
                        active: context.active,
                    },
                ],
            }),
            label: 'es-navigation-product-menu-label d-inline-block position-relative pb-50',
            submenu: 'es-navigation-product-menu-submenu bg-white list-unstyled position-absolute',
        }" />
</template>

<style lang="scss">
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

$navigation-height: 128px;

@keyframes overlayShow {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes esNavigationProductMenuOpen {
    0% {
        opacity: 0;
        transform: translateX(-50%) scaleY(60%);
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) scaleY(100%);
    }
}

.es-navigation-product-menu {
    /* hide the random menu show/hide button that appears but doesn't do anything */
    & > a[role='button'] {
        display: none;
    }

    &-list {
        outline: 0 none;
    }

    /* ensure this active state only applies to top-level menu items, not ones in the flyout */
    &-list > &-item > div > &-action:hover,
    &-list > &-item[data-p-focused='true'] > div > &-action {
        color: variables.$dark-blue;
        text-decoration: none;

        .es-navigation-product-menu-label::after {
            border-bottom: 2px solid variables.$warm-orange;
            bottom: 0;
            content: '';
            left: 0;
            position: absolute;
            right: 0;
        }
    }

    &-item {
        &:last-child {
            .es-navigation-product-menu-action {
                padding-right: 0 !important;
            }
        }
    }

    &-action {
        color: variables.$dark-blue;
        cursor: pointer;
        font-weight: variables.$font-weight-semibold;
        /* prevent text from selecting when you double-click or double-tap to open/close */
        user-select: none;

        svg {
            display: none;
        }
    }

    &-submenu {
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        z-index: 1002;
    }

    &-item[aria-expanded='true'] > .es-navigation-product-menu-submenu {
        /* border-top: 1px solid variables.$gray-300; */
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
        padding: variables.$spacer 0;

        @media not (prefers-reduced-motion: reduce) {
            animation: 0.1s ease-out forwards esNavigationProductMenuOpen;
            animation-delay: 50ms;
            opacity: 0;
            transform: translateX(-50%) scaleY(60%);
            transform-origin: center top;
        }
    }

    &-submenu &-item {
        min-width: 300px;
    }

    &-submenu &-action {
        color: variables.$dark-blue;
        font-size: variables.$font-size-sm;
        padding: (variables.$spacer * 0.5) 0;
    }

    &-submenu > &-item > div > &-action:hover,
    &-submenu > &-item[data-p-focused='true'] > div > &-action {
        color: variables.$dark-blue;

        .es-navigation-product-menu-label {
            text-decoration: underline;
        }
    }
}
</style>

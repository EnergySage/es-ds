<script setup>
import MegaMenu from 'primevue/megamenu';

const topBandItems = [
    {
        label: 'Tips & guides',
        items: [
            [
                {
                    label: 'Solar',
                    items: [
                        {
                            label: 'Home solar guide',
                            url: 'https://www.energysage.com/solar/',
                        },
                        {
                            label: 'Community solar guide',
                            url: 'https://www.energysage.com/community-solar/',
                        },
                        {
                            label: 'Best solar panels',
                            url: 'https://www.energysage.com/solar/best-solar-panels-complete-ranking/',
                        },
                        {
                            label: 'How much do solar panels cost?',
                            url: 'https://www.energysage.com/local-data/solar-panel-cost/',
                        },
                    ],
                },
                {
                    label: 'Backup power',
                    items: [
                        {
                            label: 'Backup power guide',
                            url: 'https://www.energysage.com/energy-storage/',
                        },
                        {
                            label: 'Best home batteries',
                            url: 'https://www.energysage.com/energy-storage/best-home-batteries/',
                        },
                        {
                            label: 'Home batteries vs. generators',
                            url: 'https://www.energysage.com/energy-storage/battery-backup-power-vs-generators-which-is-right-for-you/',
                        },
                    ],
                },
            ],
        ],
    },
    {
        label: 'Solar calculator',
        url: 'https://www.energysage.com/solar/calculator/',
    },
    {
        label: 'About us',
        items: [
            [
                {
                    label: 'Our company',
                    items: [
                        {
                            label: 'Mission & values',
                            url: 'https://www.energysage.com/about-us/company/',
                        },
                        {
                            label: 'How it works',
                            url: 'https://www.energysage.com/shop/home-solar/',
                        },
                        {
                            label: 'Our team',
                            url: 'https://www.energysage.com/about-us/team/',
                        },
                        {
                            label: 'Our Energy Advisors',
                            url: 'https://www.energysage.com/energy-advisors/',
                        },
                        {
                            label: 'Careers',
                            url: 'https://www.energysage.com/about-us/careers/',
                        },
                    ],
                },
            ],
        ],
    },
    {
        label: 'Account',
        items: [
            [
                {
                    label: 'Account',
                    items: [
                        {
                            label: 'Sign in',
                            url: 'https://www.energysage.com/login/',
                        },
                        {
                            label: 'Create an account',
                            url: 'https://accounts.energysage.com/register/?next=https://www.energysage.com/register-thanks/',
                        },
                    ],
                },
            ],
        ],
    },
];

const globalNavContent = getEsNavBarGlobalContent();

const productBandItems = globalNavContent.products.map((item) => ({
    label: item.name,
    // url: item.link,
    items: item.topics
        ? [
              ...item.topics.map((topic) => ({
                  label: topic.name,
                  url: topic.link,
                  items: [
                      ...topic.subtopics.map((subtopic) => ({
                          label: subtopic.name,
                          url: subtopic.link,
                      })),
                  ],
              })),
          ]
        : item.items
          ? [
                ...item.items.map((subItem) => ({
                    class: subItem.emphasize ? 'font-weight-bold' : undefined,
                    label: subItem.name,
                    target: subItem.newTab ? '_blank' : undefined,
                    url: subItem.link,
                })),
            ]
          : undefined,
}));

console.log('product', productBandItems);
</script>

<template>
    <div class="es-navigation">
        <div class="es-navigation-bar position-relative">
            <b-container>
                <mega-menu
                    :model="topBandItems"
                    :pt="{
                        root: 'es-navigation-mega-menu align-items-center d-flex position-relative',
                        menu: 'es-navigation-mega-menu-list d-flex flex-grow-1 justify-content-between list-unstyled mb-0 ml-500',
                        menuitem: 'es-navigation-mega-menu-item',
                        action: ({ context }) => ({
                            class: [
                                'es-navigation-mega-menu-item-action d-block',
                                {
                                    active: context.active,
                                },
                            ],
                        }),
                        panel: 'es-navigation-mega-menu-panel position-absolute',
                        column: 'es-navigation-mega-menu-column',
                        submenu: 'es-navigation-mega-menu-submenu list-unstyled',
                        submenuHeader: 'es-navigation-mega-menu-submenu-header eyebrow',
                    }">
                    <template #start>
                        <slot name="logo" />
                    </template>
                </mega-menu>
                <es-navigation-product-menu
                    class="mt-150"
                    :products="productBandItems" />
            </b-container>
        </div>
    </div>
</template>

<style lang="scss">
@use 'sass:map';
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

$navigation-height: 112px;

@keyframes overlayShow {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes panelOpen {
    0% {
        opacity: 0;
        transform: scaleY(60%);
    }
    100% {
        opacity: 1;
        transform: scaleY(100%);
    }
}

.es-navigation {
    /* darkened overlay */
    &:has(.es-navigation-mega-menu-item[aria-expanded='true']),
    &:has(.es-navigation-product-menu-item[aria-expanded='true']) {
        &::before {
            animation: 0.1s ease-in-out forwards overlayShow;
            background-color: rgba(0, 0, 0, 0.075);
            bottom: 0;
            content: '';
            left: 0;
            position: fixed;
            right: 0;
            top: 0;
            z-index: 990;
        }
    }

    &-bar {
        background-color: variables.$white;
        box-shadow: 0 4px 4px hsla(0, 0%, 87%, 0.25);
        z-index: 1000;
    }

    &-mega-menu {
        & > div[data-pc-section='start'] > svg {
            height: 42px !important;
            width: auto !important;
        }

        /* hide the random menu show/hide button that appears but doesn't do anything */
        & > a[role='button'] {
            display: none;
        }

        &-item {
            &-action {
                color: variables.$dark-blue;
                font-size: variables.$font-size-sm;
                padding: (variables.$spacer * 0.5) 0;
                user-select: none;

                &:hover {
                    color: variables.$dark-blue;
                }
                &.active {
                    background-color: variables.$blue-300;
                    box-shadow: none;
                }
            }

            &[data-p-focused='true'] {
                & > div > .es-navigation-mega-menu-item-action:not(:hover) {
                    /*background-color: variables.$blue-200 !important;
                    box-shadow: 0px 5px 10px 0px variables.$soft-blue !important;*/
                    text-decoration: underline;
                }
            }
        }

        &-list {
            outline: 0 none;

            /* ensure this only applies to top-level menu items, not ones in the flyout */
            & > .es-navigation-mega-menu-item {
                & > div > .es-navigation-mega-menu-item-action {
                    background-color: variables.$gray-50;
                    border-radius: variables.$border-radius-sm;
                    color: variables.$dark-blue;
                    cursor: pointer;
                    font-size: variables.$font-size-base;
                    font-weight: variables.$font-weight-bolder;
                    padding: variables.$spacer;
                    transition: all 0.2s ease-in-out;

                    &:hover {
                        background-color: variables.$blue-50;
                        color: variables.$dark-blue;
                        text-decoration: none;
                    }
                    &.active {
                        background-color: variables.$blue-200 !important;
                        box-shadow: 0px 5px 10px 0px variables.$soft-blue !important;
                    }
                }

                &[data-p-focused='true'] {
                    & > div > .es-navigation-mega-menu-item-action {
                        background-color: variables.$blue-300;
                        box-shadow: none;
                        text-decoration: none;
                    }
                }

                &[aria-expanded='true'] > .es-navigation-mega-menu-panel {
                    border-top: 1px solid variables.$gray-300;
                    padding: variables.$spacer 0;

                    @media not (prefers-reduced-motion: reduce) {
                        animation: 0.1s ease-out forwards panelOpen;
                        animation-delay: 50ms;
                        opacity: 0;
                        transform: scaleY(60%);
                        transform-origin: center top;
                    }

                    /* white background of submenu */
                    &::before {
                        background-color: variables.$white;
                        /* TODO: match the box shadow of the nav in a way that doesn't bleed above it */
                        /*box-shadow: 0 11px 10px rgba(0, 0, 0, 0.1);*/
                        bottom: 0;
                        content: '';
                        left: calc(((100vw - map.get(variables.$container-max-widths, 'xl')) * -1) / 2 - 15px);
                        position: absolute;
                        right: calc(((100vw - map.get(variables.$container-max-widths, 'xl')) * -1) / 2 - 15px);
                        top: 0;
                        z-index: -1;
                    }
                }
            }
        }

        /* don't add padding here as this div is always visible even if menu is collapsed */
        &-panel {
            left: 0;
            right: 0;
            top: $navigation-height;
            z-index: 1002;
        }
    }
}

@include breakpoints.media-breakpoint-up(lg) {
    .es-navigation {
        &-bar {
            box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
            padding-top: variables.$spacer;
            z-index: 1000;
        }
    }
}
</style>

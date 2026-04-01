<script setup lang="ts">
import { largeNestedMenuItems, type EsMobileNavSampleItemInterface } from '@/utils/mobile-nav-sample-items';

const simpleMenuItems: EsMobileNavSampleItemInterface[] = [
    {
        name: 'Adobe',
        href: 'https://www.adobe.com',
    },
    {
        name: 'Amazon',
        href: 'https://www.amazon.com',
    },
    {
        name: 'Apple',
        href: 'https://www.apple.com',
    },
    {
        name: 'Google',
        href: 'https://www.google.com',
    },
    {
        name: 'Meta',
        href: 'https://www.meta.com',
    },
    {
        name: 'Microsoft',
        href: 'https://www.microsoft.com',
    },
    {
        name: 'Netflix',
        href: 'https://www.netflix.com',
    },
    {
        name: 'NVIDIA',
        href: 'https://www.nvidia.com/',
    },
    {
        name: 'Oracle',
        href: 'https://www.oracle.com',
    },
    {
        name: 'Salesforce',
        href: 'https://www.salesforce.com',
    },
    {
        name: 'Samsung',
        href: 'https://www.samsung.com',
    },
    {
        name: 'Tesla',
        href: 'https://www.tesla.com',
    },
];
</script>

<template>
    <div>
        <h1>Mobile nav</h1>
        <p class="mb-500">
            Extended from
            <nuxt-link
                to="https://reka-ui.com/docs/components/navigation-menu"
                target="_blank">
                Reka UI NavigationMenu
            </nuxt-link>
        </p>

        <div class="my-300">
            <h2>Basic example</h2>
            <p>The mobile nav, at its simplest, can display a list of links.</p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in simpleMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Submenus</h2>
            <p>
                The mobile nav supports submenus down to any depth you want. Here is an example of a nav that goes two
                levels deep.
            </p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in largeNestedMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                        <es-mobile-sub-nav
                            v-else
                            :name="item.name">
                            <template
                                v-for="subItem in item.items"
                                :key="subItem.name">
                                <es-mobile-nav-link
                                    v-if="subItem.href"
                                    :href="subItem.href"
                                    :name="subItem.name" />
                                <es-mobile-sub-nav
                                    v-else
                                    :name="subItem.name">
                                    <template
                                        v-for="subSubItem in subItem.items"
                                        :key="subSubItem.name">
                                        <es-mobile-nav-link
                                            v-if="subSubItem.href"
                                            :href="subSubItem.href"
                                            :name="subSubItem.name" />
                                    </template>
                                </es-mobile-sub-nav>
                            </template>
                        </es-mobile-sub-nav>
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>
    </div>
</template>

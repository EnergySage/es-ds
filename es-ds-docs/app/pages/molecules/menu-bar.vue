<script setup lang="ts">
import { siteNavigationSampleItems } from '@/utils/nav-sample-items';

definePageMeta({
    layout: 'minimal',
});
</script>

<template>
    <div>
        <es-container>
            <es-menu-bar
                full-width
                :height="88"
                :show-overlay-when-open="false">
                <es-menu-bar-item
                    v-for="item in siteNavigationSampleItems"
                    :key="item.name">
                    <es-menu-bar-trigger>
                        {{ item.name }}
                    </es-menu-bar-trigger>
                    <es-menu-bar-flyout>
                        <es-menu-bar-flyout-column
                            v-for="section in item.items"
                            :key="section.name"
                            :heading="section.name">
                            <es-menu-bar-flyout-link
                                v-for="link in section.items"
                                :key="link.name"
                                :href="link.href || ''"
                                :name="link.name" />
                        </es-menu-bar-flyout-column>
                    </es-menu-bar-flyout>
                </es-menu-bar-item>
            </es-menu-bar>
        </es-container>
        <ds-main-layout>
            <h1>Menu bar</h1>
            <p>
                Extended from
                <nuxt-link
                    to="https://reka-ui.com/docs/components/navigation-menu"
                    target="_blank">
                    Reka UI NavigationMenu
                </nuxt-link>
            </p>
            <p class="mb-500">The menu bar assumes it is at the top of the viewport</p>

            <div class="my-300">
                <h2>Basic example</h2>
            </div>
            <!--
                UP TOP
                height change
                full width
                transparent
                not transparent

                IN PAGE
                not full width
                overlay off
            -->

            <div class="my-300">
                <h2>Not full width</h2>
                <es-menu-bar :show-overlay-when-open="false">
                    <es-menu-bar-item
                        v-for="(item, index) in siteNavigationSampleItems[0]!.items"
                        :key="item.name">
                        <es-menu-bar-trigger>
                            {{ item.name }}
                        </es-menu-bar-trigger>
                        <es-menu-bar-flyout
                            :align="esMenuBarFlyoutDefaultAlign(index, siteNavigationSampleItems[0]!.items)">
                            <es-menu-bar-flyout-link
                                v-for="link in item.items"
                                :key="link.name"
                                :href="link.href || ''"
                                :name="link.name" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                </es-menu-bar>
            </div>
        </ds-main-layout>
    </div>
</template>

<script setup lang="ts">
import { accountMenuItems, menuBarSampleItems } from '@/utils/menu-bar-sample-items';
import { largeNestedMenuItems } from '@/utils/mobile-nav-sample-items';

definePageMeta({
    layout: 'minimal',
});

const samplePageContent = Array(10).fill('test content for scrolling');
</script>

<template>
    <div class="site-navigation-bg">
        <es-sticky-bar transparent-on-desktop>
            <es-skip-to-content-link />
            <div
                class="site-navigation align-items-center d-flex justify-content-lg-between position-relative px-md-150">
                <!-- mobile nav -->
                <es-mobile-nav class="d-lg-none">
                    <es-mobile-nav-trigger>
                        <span class="sr-only">Open navigation menu</span>
                        <icon-hamburger aria-hidden="true" />
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
                                        v-else-if="subItem.items?.length"
                                        :name="subItem.name">
                                        <template
                                            v-for="subSubItem in subItem.items"
                                            :key="subSubItem.name">
                                            <es-mobile-nav-link
                                                v-if="subSubItem.href"
                                                :href="subSubItem.href"
                                                :name="subSubItem.name" />
                                        </template>
                                        <es-mobile-nav-custom-item v-if="item.cta?.href">
                                            <es-nav-cta-card
                                                class="mb-100"
                                                :heading="item.cta.heading"
                                                :href="item.cta.href"
                                                :subtitle="item.cta.subtitle"
                                                :target="item.cta.target">
                                                <template
                                                    v-if="item.cta.icon"
                                                    #icon>
                                                    <icon-battery-charging-vertical
                                                        v-if="item.cta.icon === 'battery-charging-vertical'"
                                                        aria-hidden="true" />
                                                    <icon-charging-station
                                                        v-else-if="item.cta.icon === 'charging-station'"
                                                        aria-hidden="true" />
                                                    <icon-house-line
                                                        v-else-if="item.cta.icon === 'house-line'"
                                                        aria-hidden="true" />
                                                    <icon-solar
                                                        v-else-if="item.cta.icon === 'solar'"
                                                        aria-hidden="true" />
                                                </template>
                                            </es-nav-cta-card>
                                        </es-mobile-nav-custom-item>
                                    </es-mobile-sub-nav>
                                </template>
                                <es-mobile-nav-custom-item v-if="item.cta?.href">
                                    <es-nav-cta-card
                                        class="mb-100"
                                        :heading="item.cta.heading"
                                        :href="item.cta.href"
                                        :subtitle="item.cta.subtitle"
                                        :target="item.cta.target">
                                        <template
                                            v-if="item.cta.icon"
                                            #icon>
                                            <icon-battery-charging-vertical
                                                v-if="item.cta.icon === 'battery-charging-vertical'"
                                                aria-hidden="true" />
                                            <icon-charging-station
                                                v-else-if="item.cta.icon === 'charging-station'"
                                                aria-hidden="true" />
                                            <icon-house-line
                                                v-else-if="item.cta.icon === 'house-line'"
                                                aria-hidden="true" />
                                            <icon-solar
                                                v-else-if="item.cta.icon === 'solar'"
                                                aria-hidden="true" />
                                        </template>
                                    </es-nav-cta-card>
                                </es-mobile-nav-custom-item>
                            </es-mobile-sub-nav>
                        </template>
                        <template #footer>
                            <div class="px-100 py-200">
                                <es-button
                                    class="w-100"
                                    href="https://accounts.energysage.com/login/">
                                    Sign in
                                </es-button>
                            </div>
                        </template>
                    </es-mobile-nav-content>
                </es-mobile-nav>

                <a
                    href="https://www.energysage.com"
                    class="site-navigation-logo">
                    <es-logo
                        alt="EnergySage"
                        class="d-lg-none"
                        height="30px"
                        width="135px" />
                    <es-logo
                        alt="EnergySage"
                        class="d-none d-lg-block"
                        height="45px"
                        width="205px" />
                </a>

                <!-- desktop nav -->
                <div class="d-flex flex-nowrap">
                    <es-menu-bar
                        class="d-none d-lg-block"
                        full-width
                        :height="88">
                        <es-menu-bar-item
                            v-for="item in menuBarSampleItems"
                            :key="item.name">
                            <es-menu-bar-trigger>
                                {{ item.name }}
                            </es-menu-bar-trigger>
                            <es-menu-bar-content>
                                <es-menu-bar-section v-if="item.cta?.href">
                                    <es-nav-cta-card
                                        class="mb-100"
                                        :heading="item.cta.heading"
                                        :href="item.cta.href"
                                        :subtitle="item.cta.subtitle"
                                        :target="item.cta.target">
                                        <template
                                            v-if="item.cta.icon"
                                            #icon>
                                            <icon-battery-charging-vertical
                                                v-if="item.cta.icon === 'battery-charging-vertical'"
                                                aria-hidden="true" />
                                            <icon-charging-station
                                                v-else-if="item.cta.icon === 'charging-station'"
                                                aria-hidden="true" />
                                            <icon-house-line
                                                v-else-if="item.cta.icon === 'house-line'"
                                                aria-hidden="true" />
                                            <icon-solar
                                                v-else-if="item.cta.icon === 'solar'"
                                                aria-hidden="true" />
                                        </template>
                                    </es-nav-cta-card>
                                </es-menu-bar-section>
                                <es-menu-bar-section
                                    v-for="section in item.items"
                                    :key="section.name"
                                    :heading="section.name">
                                    <es-menu-bar-link
                                        v-for="link in section.items"
                                        :key="link.name"
                                        :href="link.href || ''"
                                        :name="link.name" />
                                </es-menu-bar-section>
                            </es-menu-bar-content>
                        </es-menu-bar-item>
                    </es-menu-bar>
                    <es-menu-bar
                        class="d-none d-lg-block ml-100"
                        :height="88">
                        <es-menu-bar-item>
                            <es-menu-bar-trigger>
                                <icon-person-circle
                                    class="mr-25"
                                    height="32px"
                                    width="32px" />
                                Brittany
                            </es-menu-bar-trigger>
                            <es-menu-bar-content>
                                <es-menu-bar-link
                                    v-for="link in accountMenuItems"
                                    :key="link.name"
                                    :href="link.href || ''"
                                    :name="link.name" />
                            </es-menu-bar-content>
                        </es-menu-bar-item>
                    </es-menu-bar>
                </div>
            </div>
        </es-sticky-bar>
        <ds-main-layout>
            <h1>Site navigation</h1>
            <p>
                This page demonstrates how to use the
                <nuxt-link to="/molecules/mobile-nav">mobile nav</nuxt-link> and
                <nuxt-link to="/molecules/menu-bar">menu bar</nuxt-link> inside of a
                <nuxt-link to="/molecules/sticky-bar">sticky bar</nuxt-link>.
            </p>

            <p
                v-for="(content, index) in samplePageContent"
                :key="index"
                class="my-500">
                {{ content }}
            </p>
        </ds-main-layout>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

:deep(.site-navigation) {
    height: 88px;
}

.site-navigation-bg {
    background: linear-gradient(180deg, variables.$soft-blue, variables.$white 33%, variables.$white 100%);
}

.site-navigation-logo {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    @include breakpoints.media-breakpoint-up(lg) {
        left: auto;
        position: static;
        top: auto;
        transform: none;
    }
}
</style>

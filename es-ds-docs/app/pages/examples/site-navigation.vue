<script setup lang="ts">
import { accountMenuItems, siteNavigationSampleItems } from '@/utils/nav-sample-items';

definePageMeta({
    layout: 'minimal',
});

const samplePageContent = Array(10).fill('test content for scrolling');

const isSignedIn = ref(false);
</script>

<template>
    <div class="site-navigation-container">
        <es-sticky-bar transparent-starting-at-breakpoint="xl">
            <es-skip-to-content-link />
            <div class="site-navigation align-items-center d-flex justify-content-between mx-auto px-md-150 px-xxl-0">
                <!-- mobile main nav -->
                <es-mobile-nav class="d-xl-none">
                    <es-mobile-nav-trigger>
                        <span class="sr-only">Open navigation menu</span>
                        <icon-hamburger aria-hidden="true" />
                    </es-mobile-nav-trigger>
                    <es-mobile-nav-content>
                        <template
                            v-for="item in siteNavigationSampleItems"
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
                                        v-else-if="subItem.items?.length || subItem.cta?.href"
                                        :name="subItem.name">
                                        <template
                                            v-for="subSubItem in subItem.items"
                                            :key="subSubItem.name">
                                            <es-mobile-nav-link
                                                v-if="subSubItem.href"
                                                :href="subSubItem.href"
                                                :name="subSubItem.name" />
                                        </template>
                                        <es-mobile-nav-custom-item v-if="subItem.cta?.href">
                                            <es-nav-cta-card
                                                class="mb-100"
                                                :heading="subItem.cta.heading"
                                                :href="subItem.cta.href"
                                                :subtitle="subItem.cta.subtitle"
                                                :target="subItem.cta.target">
                                                <template
                                                    v-if="subItem.cta.icon"
                                                    #icon>
                                                    <ds-site-navigation-icon :name="subItem.cta.icon" />
                                                </template>
                                            </es-nav-cta-card>
                                        </es-mobile-nav-custom-item>
                                        <es-mobile-nav-custom-item v-else-if="item.cta?.href">
                                            <es-nav-cta-card
                                                class="mb-100"
                                                :heading="item.cta.heading"
                                                :href="item.cta.href"
                                                :subtitle="item.cta.subtitle"
                                                :target="item.cta.target">
                                                <template
                                                    v-if="item.cta.icon"
                                                    #icon>
                                                    <ds-site-navigation-icon :name="item.cta.icon" />
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
                                            <ds-site-navigation-icon :name="item.cta.icon" />
                                        </template>
                                    </es-nav-cta-card>
                                </es-mobile-nav-custom-item>
                            </es-mobile-sub-nav>
                        </template>
                        <template
                            v-if="!isSignedIn"
                            #footer>
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
                        class="d-xl-none"
                        height="30px"
                        width="135px" />
                    <es-logo
                        alt="EnergySage"
                        class="d-none d-xl-block"
                        height="45px"
                        width="205px" />
                </a>

                <!-- mobile account nav -->
                <es-mobile-nav
                    v-if="isSignedIn"
                    class="d-xl-none"
                    from="right">
                    <es-mobile-nav-trigger>
                        <span class="sr-only">Open account menu</span>
                        <icon-person-circle aria-hidden="true" />
                    </es-mobile-nav-trigger>
                    <es-mobile-nav-content>
                        <template
                            v-for="item in accountMenuItems"
                            :key="item.name">
                            <es-mobile-nav-link
                                v-if="item.href"
                                :href="item.href"
                                :name="item.name" />
                        </template>
                    </es-mobile-nav-content>
                </es-mobile-nav>

                <!-- desktop nav -->
                <div class="d-none d-xl-flex flex-xl-nowrap">
                    <es-menu-bar
                        full-width
                        :height="88">
                        <es-menu-bar-item
                            v-for="item in siteNavigationSampleItems"
                            :key="item.name">
                            <es-menu-bar-trigger>
                                {{ item.name }}
                            </es-menu-bar-trigger>
                            <es-menu-bar-flyout>
                                <es-menu-bar-flyout-column v-if="item.cta?.href">
                                    <es-nav-cta-card
                                        class="mb-100"
                                        :heading="item.cta.heading"
                                        :href="item.cta.href"
                                        :subtitle="item.cta.subtitle"
                                        :target="item.cta.target">
                                        <template
                                            v-if="item.cta.icon"
                                            #icon>
                                            <ds-site-navigation-icon :name="item.cta.icon" />
                                        </template>
                                    </es-nav-cta-card>
                                </es-menu-bar-flyout-column>
                                <es-menu-bar-flyout-column
                                    v-for="section in item.items"
                                    :key="section.name"
                                    :heading="section.name">
                                    <es-menu-bar-flyout-link
                                        v-for="link in section.items"
                                        :key="link.name"
                                        :href="link.href || ''"
                                        :name="link.name" />
                                    <es-menu-bar-flyout-custom-item v-if="section.cta?.href">
                                        <es-nav-cta-card
                                            class="mt-100"
                                            :heading="section.cta.heading"
                                            :href="section.cta.href"
                                            :subtitle="section.cta.subtitle"
                                            :target="section.cta.target">
                                            <template
                                                v-if="section.cta.icon"
                                                #icon>
                                                <ds-site-navigation-icon :name="section.cta.icon" />
                                            </template>
                                        </es-nav-cta-card>
                                    </es-menu-bar-flyout-custom-item>
                                </es-menu-bar-flyout-column>
                            </es-menu-bar-flyout>
                        </es-menu-bar-item>
                        <es-menu-bar-item v-if="!isSignedIn">
                            <es-menu-bar-link href="https://www.energysage.com/login/">
                                <icon-person-circle
                                    class="mr-25"
                                    height="32px"
                                    width="32px" />
                                Sign in
                            </es-menu-bar-link>
                        </es-menu-bar-item>
                    </es-menu-bar>
                    <es-menu-bar
                        v-if="isSignedIn"
                        class="ml-100"
                        :height="88">
                        <es-menu-bar-item>
                            <es-menu-bar-trigger>
                                <icon-person-circle
                                    class="mr-25"
                                    height="32px"
                                    width="32px" />
                                Brittany
                            </es-menu-bar-trigger>
                            <es-menu-bar-flyout align="end">
                                <es-menu-bar-flyout-link
                                    v-for="link in accountMenuItems"
                                    :key="link.name"
                                    :href="link.href || ''"
                                    :name="link.name" />
                            </es-menu-bar-flyout>
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
                <nuxt-link to="/molecules/sticky-bar">sticky bar</nuxt-link>. It also shows the background behavior
                when the sticky bar is set to be transparent on desktop.
            </p>
            <p>
                The mobile nav is displayed on xs, sm, md, and lg breakpoints. The menu bar is displayed on xl and xxl
                breakpoints.
            </p>
            <div>
                <es-radio-button-group
                    id="user-signed-in-radio-group"
                    label="The nav content will be different depending on whether or not the user is signed in. You can toggle signed in state below to see each variation.">
                    <es-radio-button
                        id="signed-out"
                        v-model="isSignedIn"
                        display-name="User is signed out"
                        inline
                        name="is-signed-in"
                        :value="false" />
                    <es-radio-button
                        id="signed-in"
                        v-model="isSignedIn"
                        display-name="User is signed in"
                        inline
                        name="is-signed-in"
                        :value="true" />
                </es-radio-button-group>
            </div>

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
@use 'sass:map';

.site-navigation-container {
    background: linear-gradient(180deg, variables.$soft-blue, variables.$white 33%, variables.$white 100%);
}

.site-navigation {
    height: 88px;
    max-width: map.get(variables.$container-max-widths, xxl);

    /* at xxl breakpoint only, match es-container padding */
    @include breakpoints.media-breakpoint-up(xxl) {
        padding-left: variables.$grid-gutter-width * 0.5 !important;
        padding-right: variables.$grid-gutter-width * 0.5 !important;
    }
}

.site-navigation-logo {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    @include breakpoints.media-breakpoint-up(xl) {
        left: auto;
        position: static;
        top: auto;
        transform: none;
    }
}
</style>

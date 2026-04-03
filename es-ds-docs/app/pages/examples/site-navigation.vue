<script setup lang="ts">
import { largeNestedMenuItems } from '@/utils/mobile-nav-sample-items';

definePageMeta({
    layout: 'minimal',
});

const samplePageContent = Array(10).fill('test content for scrolling');
</script>

<template>
    <div>
        <es-sticky-bar>
            <div class="site-navigation align-items-center d-flex position-relative">
                <!-- mobile nav -->
                <es-mobile-nav>
                    <es-mobile-nav-trigger>
                        <span class="sr-only">Open navigation menu</span>
                        <icon-hamburger aria-hidden />
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
                                                        aria-hidden />
                                                    <icon-charging-station
                                                        v-else-if="item.cta.icon === 'charging-station'"
                                                        aria-hidden />
                                                    <icon-house-line
                                                        v-else-if="item.cta.icon === 'house-line'"
                                                        aria-hidden />
                                                    <icon-solar
                                                        v-else-if="item.cta.icon === 'solar'"
                                                        aria-hidden />
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
                                                aria-hidden />
                                            <icon-charging-station
                                                v-else-if="item.cta.icon === 'charging-station'"
                                                aria-hidden />
                                            <icon-house-line
                                                v-else-if="item.cta.icon === 'house-line'"
                                                aria-hidden />
                                            <icon-solar
                                                v-else-if="item.cta.icon === 'solar'"
                                                aria-hidden />
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
                    class="site-navigation-logo position-absolute">
                    <es-logo
                        alt="EnergySage"
                        height="30px"
                        width="135px" />
                </a>
            </div>
        </es-sticky-bar>
        <ds-main-layout>
            <h1>Site navigation</h1>
            <p>
                This page demonstrates how to use the
                <nuxt-link to="/molecules/mobile-nav">mobile nav</nuxt-link> inside of a
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
:deep(.site-navigation) {
    height: 88px;
}

.site-navigation-logo {
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
</style>

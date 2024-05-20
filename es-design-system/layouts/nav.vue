<template>
    <div>
        <es-nav-bar
            :account-content="accountContent"
            :global-content="globalContent">
            <template #logo-mobile>
                <ds-es-logo
                    width="128px"
                    height="28px" />
            </template>
            <template #logo-desktop>
                <!-- small desktop logo -->
                <ds-es-logo
                    class="d-none d-lg-block d-xl-none"
                    width="150px"
                    height="42px" />
                <!-- large desktop logo-->
                <ds-es-logo
                    class="d-none d-xl-block"
                    width="200px"
                    height="42px" />
            </template>
            <template #logo-desktop-sticky>
                <ds-es-logo
                    width="128px"
                    height="28px" />
            </template>
        </es-nav-bar>

        <b-navbar
            class="d-xl-none mb-100"
            type="dark"
            variant="primary">
            <b-navbar-nav>
                <b-nav-item v-b-toggle.sidebar-1>
                    Menu
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-sidebar
            id="sidebar-1"
            class="d-xl-none"
            :title="`ES DS ${$config.version}`"
            shadow>
            <ds-link-list class="mx-100" />
        </b-sidebar>
        <div class="d-flex justify-content-center">
            <div class="ds-side-nav d-none d-xl-block flex-shrink-0 p-100">
                <ds-link-list />
            </div>
            <b-container class="pt-xl-100 mx-0">
                <b-row class="mb-100">
                    <b-col cols="12">
                        <es-breadcrumbs :items="breadcrumbs" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        cols="12">
                        <Nuxt />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { getEsNavBarAccountContent, getEsNavBarGlobalContent } from '@energysage/es-vue-base';

/* eslint-disable vue/multi-word-component-names, vue/component-definition-name-casing */
export default {
    name: 'NavLayout',
    computed: {
        accountContent() {
            return getEsNavBarAccountContent();
        },
        breadcrumbs() {
            const paths = this.$route.path.split('/');

            // Set removes dupes from path
            return [...new Set(paths)].map((path) => {
                let text = 'Home';
                // Convert to CamelCase to be inline with component naming
                if (path) {
                    text = path.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    text = text[0].toUpperCase() + text.slice(1);
                }
                return {
                    text,
                    to: `/${path}`,
                };
            });
        },
        globalContent() {
            return getEsNavBarGlobalContent();
        },
    },
};
</script>

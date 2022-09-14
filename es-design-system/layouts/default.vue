<template>
    <div>
        <b-navbar
            class="mb-3"
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
            :title="`ES DS ${$config.version}`"
            shadow>
            <DsLinkList />
        </b-sidebar>
        <b-container>
            <b-row>
                <b-col
                    cols="12">
                    <Nuxt />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import {
    BContainer,
    BNavbar,
    BNavbarNav,
    BNavItem,
    BRow,
    BCol,
    BSidebar,
    VBTogglePlugin,
} from 'bootstrap-vue';
import DsLinkList from '@/components/ds-link-list.vue';

/* eslint-disable vue/multi-word-component-names, vue/component-definition-name-casing */
export default {
    name: 'default',
    directives: {
        VBTogglePlugin,
    },
    components: {
        BContainer,
        BRow,
        BCol,
        BNavbar,
        BSidebar,
        BNavbarNav,
        BNavItem,
        DsLinkList,
    },
};
</script>

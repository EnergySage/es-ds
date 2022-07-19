<template>
    <div class="m-0 p-0">
        <b-container>
            <b-navbar>
                <b-navbar-brand
                    :to="{ name: 'index___en' }">
                    EnergySage Design System
                </b-navbar-brand>
            </b-navbar>
            <b-row>
                <b-col
                    cols="12"
                    class="mr-sm-4 mb-1">
                    <DsLinkList />
                </b-col>
            </b-row>
        </b-container>
        <Nuxt />
    </div>
</template>

<script>
import {
    // BLink,
    BContainer,
    BRow,
    BCol,
    BNavbar,
    BNavbarBrand,
} from 'bootstrap-vue';
import DsLinkList from '@/components/ds-link-list.vue';

/* eslint-disable vue/multi-word-component-names, vue/component-definition-name-casing */
export default {
    name: 'default',
    components: {
        // BLink,
        BContainer,
        BRow,
        BCol,
        BNavbar,
        BNavbarBrand,
        DsLinkList,
    },
};
</script>

<template>
    <b-container>
        <b-navbar>
            <b-navbar-brand
                :to="{ name: 'index___en' }">
                EnergySage Design System
            </b-navbar-brand>
        </b-navbar>
        <b-row>
            <b-col
                md="3"
                sm="4"
                cols="12">
                <DsLinkList />
            </b-col>
            <b-col
                md="9"
                sm="8"
                cols="12">
                <Nuxt />
            </b-col>
        </b-row>
    </b-container>
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

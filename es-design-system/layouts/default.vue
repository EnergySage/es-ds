<template>
    <div>
        <b-navbar
            class="mb-3"
            type="dark"
            variant="primary">
            <b-navbar-nav>
                <b-nav-item @click="sidebarOpen = !sidebarOpen">
                    Menu
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
        <b-offcanvas
            id="sidebar-1"
            v-model="sidebarOpen"
            :title="`ES DS ${$config.version}`"
            shadow>
            <DsLinkList />
        </b-offcanvas>
        <b-container>
            <b-row class="mb-3">
                <b-col cols="12">
                    <es-breadcrumbs :items="breadcrumbs" />
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="12">
                    <slot />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

/* eslint-disable vue/multi-word-component-names, vue/component-definition-name-casing */
export default {
    name: 'default',
    data() {
        return {
            sidebarOpen: false,
        };
    },
    computed: {
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
    },
};
</script>

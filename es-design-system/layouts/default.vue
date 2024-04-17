<template>
    <div>
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
        <div class="d-flex justify-content-xl-center">
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

/* eslint-disable vue/multi-word-component-names, vue/component-definition-name-casing */
export default {
    name: 'default',
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

<style lang="scss" scoped>
.ds-side-nav {
    width: 300px;
}
</style>

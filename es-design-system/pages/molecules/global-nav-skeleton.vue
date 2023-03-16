<template>
    <div>
        <h1>
            GlobalNav component
        </h1>
        <div class="border-top py-3">
            <!-- this is the normal usage of a component and changes to GlobalNav.vue
                 will require the es-vue-base to get rebuilt -->
            <global-nav>
                Component from es-vue-base
            </global-nav>
        </div>
        <div class="border-top border-bottom py-3">
            <!-- Global Navigation Skeleton development takes place in this div -->
            <nav class="navbar navbar-expand-lg navbar-light">
                <!-- Placeholder for Hamburger button-->
                <!-- Collapsable Product Navigation Bar-->
                <div id="navbarSupportedContent"
                     class="collapse navbar-collapse">
                    <ul class="navbar-nav mr-auto">
                        <li
                            v-for="productHeader in productHeaders"
                            :id="`${header}-nav`"
                            :key="productHeader"
                            class="nav-item dropdown">
                            <a
                                id="`${menu}-dropdown`"
                                class="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {{ productHeader }}
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/GlobalNav.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/global-nav-skeleton.vue" />
    </div>
</template>
<script>

export default {
    name: 'HelloWorldDocs',
    data() {
        return {
            visible: false,
            compCode: '',
            docCode: '',
            productHeaders: [
                'Home Solar',
                'Community Solar',
                'Heating & Cooling',
                'Back Up Power',
                'EV Charging',
                'For Businesses',
            ],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./global-nav-skeleton.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/GlobalNav.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

<style lang="scss" scoped>
/* All styles will eventually be refactored into GlobalNav.vue */
.dropdown-toggle::after {
    content: none;
}

</style>

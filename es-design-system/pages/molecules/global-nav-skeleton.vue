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
                <button
                    v-show="!isExpanded"
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    @click="$event => isExpanded =!isExpanded">
                    <span
                        class="navbar-toggler-icon" />
                </button>
                <!-- Collapsable Product Navigation Bar-->
                <div
                    id="navbarSupportedContent"
                    class="collapse navbar-collapse"
                    :class="{ show: isExpanded }">
                    <button
                        v-show="isExpanded && !activeHeader"
                        class="d-lg-none"
                        type="button"
                        @click="$event => isExpanded = false">
                        X
                    </button>
                    <button
                        v-show="activeHeader"
                        class="d-lg-none"
                        type="button"
                        @click="$event => activeHeader = ''">
                        Back
                    </button>
                    <ul class="navbar-nav mr-auto">
                        <!-- Product Header -->
                        <li
                            v-for="header in Object.keys(productHeaders)"
                            :id="`${header}-nav`"
                            :key="header"
                            class="nav-item dropdown">
                            <!--Mobile Button Headers -->
                            <button
                                v-show="header == activeHeader || !activeHeader"
                                id="`${header}-dropdown`"
                                class="d-lg-none btn btn-light w-100 dropdown-toggle"
                                aria-haspopup="true"
                                aria-expanded="false"
                                @click="$event => activeHeader = header">
                                {{ header }}
                            </button>
                            <!--Desktop Dropdown Headers-->
                            <div
                                id="`${header}-dropdown`"
                                class="d-none d-lg-block nav-link dropdown-toggle"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {{ header }}
                            </div>
                            <!-- Dropdown Panel-->
                            <div
                                class="dropdown-menu"
                                aria-labelledby="`${header}-dropdown`">
                                <ul
                                    class="list-unstyled">
                                    <!-- Product Subheader -->
                                    <li
                                        v-for="subHeader in Object.keys(productHeaders[header].subHeaders)"
                                        :id="`${subHeader}-nav`"
                                        :key="subHeader"
                                        class="nav-item">
                                        <a
                                            class="dropdown-item"
                                            :href="productHeaders[header].subHeaders[subHeader].link">
                                            {{ subHeader }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
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
            productHeaders: {
                'Home Solar': {
                    subHeaders: {
                        'Home Solar 1': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 2': {
                            link: 'https://www.energysage.com/',
                        },
                    },
                },
                'Community Solar': {
                    subHeaders: {
                        'Community Solar 1': {
                            link: 'https://communitysolar.energysage.com/',
                        },
                        'Community Solar 2': {
                            link: 'https://communitysolar.energysage.com/',
                        },
                    },
                },
                'Heating & Cooling': {
                    subHeaders: {
                        'Heating & Cooling 1': {
                            link: 'https://heatpumps.energysage.com/',
                        },
                        'Heating & Cooling 2': {
                            link: 'https://heatpumps.energysage.com/',
                        },
                    },
                },
                'Back Up Power': {
                    subHeaders: {
                        'Back Up Power 1': {
                            link: 'https://www.energysage.com/energy-storage/',
                        },
                        'Back Up Power 2': {
                            link: 'https://www.energysage.com/energy-storage/',
                        },
                    },
                },
                'EV Charging': {
                    subHeaders: {
                        'EV Charging 1': {
                            link: 'https://news.energysage.com/electric-vehicle-chargers-overview/',
                        },
                        'EV Charging 2': {
                            link: 'https://news.energysage.com/electric-vehicle-chargers-overview/',
                        },
                    },
                },
                'For Businesses': {
                    subHeaders: {
                        'For Businesses 1': {
                            link: 'https://www.energysage.com/businesses/',
                        },
                        'For Businesses 2': {
                            link: 'https://www.energysage.com/businesses/',
                        },
                    },
                },
            },
            isExpanded: false,
            activeHeader: '',
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
// .dropdown-toggle::after {
//     content: none;
// }
@media all and (max-width: 992px) {
    .navbar .nav-item .dropdown-menu{ display: none; }

}

@media all and (min-width: 992px) {

.navbar .nav-item .dropdown-menu{ display: none; }

.navbar .nav-item:hover .dropdown-menu{ display: block; }
}

.dropdown-toggle::after {
    content: none;
}

</style>

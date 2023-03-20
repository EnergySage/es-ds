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
                <!-- Mobile Hamburger Menu -->
                <button
                    v-show="level == 0"
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    @click="$event => level = 1">
                    <span
                        class="navbar-toggler-icon" />
                </button>
                <!-- Collapsable Product Navigation Bar -->
                <div
                    id="navbarSupportedContent"
                    class="collapse navbar-collapse"
                    :class="{ show: level != 0 }">
                    <!-- Mobile Back to Home Button -->
                    <button
                        v-show="level == 1"
                        class="d-lg-none mb-3"
                        type="button"
                        @click="$event => level = 0">
                        X
                    </button>
                    <!-- Mobile Back to Headers -->
                    <button
                        v-show="level == 2"
                        class="d-lg-none mb-3"
                        type="button"
                        @click="$event => {activeHeader = ''
                                           level = 1}">
                        Back
                    </button>
                    <!-- Mobile Active Header and See All Banner -->
                    <span
                        v-show="level == 2"
                        class="d-lg-none mb-3">
                        <h3>
                            {{ activeHeader }}
                            <a
                                class="float-right"
                                :href="productHeaders[activeHeader]?.link">
                                See All
                            </a>
                        </h3>
                    </span>
                    <!-- Product Headers -->
                    <ul class="navbar-nav mr-auto">
                        <li
                            v-for="header in Object.keys(productHeaders)"
                            :id="`${header}-nav`"
                            :key="header"
                            class="nav-item dropdown">
                            <!-- Mobile Header Buttons -->
                            <button
                                v-show="!activeHeader"
                                id="`${header}-mobile`"
                                class="d-lg-none btn btn-outline-dark w-100"
                                aria-haspopup="true"
                                aria-expanded="false"
                                @click="$event => {activeHeader = header
                                                   level = 2}">
                                {{ header }}
                            </button>
                            <ul
                                class="d-lg-none list-unstyled">
                                <!-- Mobile Sub-Header Links -->
                                <li
                                    v-for="subHeader in Object.keys(productHeaders[header].subHeaders)"
                                    :id="`${subHeader}-mobile`"
                                    :key="subHeader"
                                    class="nav-item">
                                    <a
                                        v-show="header == activeHeader"
                                        :href="productHeaders[header].subHeaders[subHeader].link">
                                        {{ subHeader }}
                                    </a>
                                </li>
                            </ul>
                            <!-- Desktop Header Dropdowns -->
                            <div
                                id="`${header}-desktop`"
                                class="d-none d-lg-block nav-link dropdown-toggle"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {{ header }}
                            </div>
                            <!-- Desktop Dropdown Panel-->
                            <div
                                class="dropdown-menu"
                                aria-labelledby="`${header}-desktop`">
                                <ul
                                    class="list-unstyled">
                                    <!-- Desktop Sub-Header Links -->
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
                    link: 'https://www.energysage.com/',
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
                    link: 'https://communitysolar.energysage.com/',
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
                    link: 'https://heatpumps.energysage.com/',
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
                    link: 'https://www.energysage.com/energy-storage/',
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
                    link: 'https://news.energysage.com/electric-vehicle-chargers-overview/',
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
                    link: 'https://www.energysage.com/businesses/',
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
            /* levels 0, 1, 2 correspond to home, header, and subheader levels */
            level: 0,
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

@media all and (min-width: 992px) {
.navbar .nav-item:hover .dropdown-menu{ display: block; }
}

.dropdown-toggle::after {
    content: none;
}

</style>

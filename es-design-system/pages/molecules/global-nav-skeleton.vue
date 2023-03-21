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
            <!-- active development of global nav lives in this div-->
            <nav
                class="navbar navbar-expand navbar-light bg-light">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    for="data--main-menu"
                    class="menu-toggle" />
                <input
                    id="data--main-menu"
                    class="menu-checkbox"
                    aria-labelledby="data--main-menu"
                    type="checkbox">
                <div
                    id="navbarNavDropdown"
                    class="collapse navbar-collapse menu">
                    <div class="menu-header">
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            for="data--main-menu"
                            class="menu-toggle" />
                    </div>
                    MENU
                    <ul class="navbar-nav">
                        <li
                            v-for="header in Object.keys(productHeaders)"
                            :key="header"
                            class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {{ header }}
                            </a>
                            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                            <label
                                :for="`menu-${header}`"
                                class="dropdown-label nav-link">
                                {{ header }}
                            </label>
                            <input
                                :id="`menu-${header}`"
                                :name="`menu-${header}`"
                                type="checkbox"
                                class="menu-checkbox">
                            <div class="menu">
                                <div class="menu-header">
                                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                    <label
                                        :for="`menu-${header}`"
                                        class="menu-toggle" />
                                    {{ header }}
                                </div>
                                <ul
                                    class="dropdown-menu"
                                    :aria-labelledby="`menu-${header}`">
                                    <li
                                        v-for="subHeader in Object.keys(productHeaders[header].subHeaders)"
                                        :key="subHeader">
                                        <a
                                            class="dropdown-item nav-item nav-link"
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

@media only screen and (min-width: 992px) {
    .navbar .nav-item:hover .dropdown-menu{ display: block; }
}

.dropdown-toggle::after {
    content: none;
}

.menu-checkbox {
    display: none;
}

.menu-header {
    display: none;
}

.menu-toggle {
    display: none;
}

.dropdown-label {
    display: none;
}

@media only screen and (max-width: 992px) {
    .navbar-collapse {
        align-items: start;
    }

    .dropdown {
        position: unset;
    }

    .dropdown-menu {
        top: 50px;
    }

    .dropdown-toggle {
        display: none;
    }

    .dropdown-label {
        cursor: pointer;
        display: block;
    }

    .dropdown-label::after {
        content: "▶️";
    }

    .menu {
        background: #fff;
        flex-direction: column;
        height: 100%;
        left: 0;
        min-height: 100vh;
        position: absolute;
        top: 0;
        transform: translate3d(-100%, 0, 0);
        transition: transform 0.2s;
        width: 100%;
    }

    .menu-checkbox:checked + .menu {
        transform: translate3d(0, 0, 0);
    }

    .menu-header {
        background-color: #ccc;
        display: flex;
        width: 100%;
    }

    .menu-toggle {
        background-color: #098312;
        cursor: pointer;
        display: block;
        height: 40px;
        width: 40px;
    }

    .menu ul {
        display: block;
        width: 100%;
    }

    .menu ul li {
        display: block;
        width: 100%;
    }

}

</style>

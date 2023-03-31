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
            <div id="nav-main">
                <div class="content-overlay" />
                <nav
                    class="navbar navbar-expand navbar-light bg-light nav-es-global py-0">
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
                        <ul class="navbar-nav d-flex flex-column w-100">
                            <div class="row mx-0 d-flex justify-content-around align-items-center">
                                <div class="navbar-brand">
                                    EnergySage
                                </div>
                                <li
                                    v-for="header in Object.keys(topHeaders)"
                                    :key="header"
                                    class="nav-item">
                                    <a
                                        v-if="!topHeaders[header].link"
                                        class="nav-link dropdown-toggle"
                                        href="#"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        {{ header }}
                                    </a>
                                    <a
                                        v-else
                                        class="nav-link"
                                        :href="topHeaders[header].link">
                                        {{ header }}
                                    </a>
                                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                    <label
                                        v-if="!topHeaders[header].link"
                                        :for="`menu-${header}`"
                                        class="dropdown-label nav-link">
                                        {{ header }}
                                    </label>
                                    <input
                                        :id="`menu-${header}`"
                                        :name="`menu-${header}`"
                                        type="checkbox"
                                        class="menu-checkbox">
                                    <div
                                        v-if="!topHeaders[header].link"
                                        class="menu">
                                        <div class="menu-header">
                                            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                            <label
                                                :for="`menu-${header}`"
                                                class="menu-toggle" />
                                            {{ header }}
                                        </div>
                                        <ul
                                            class="dropdown-menu dropdown-menu-full-page"
                                            :aria-labelledby="`menu-${header}`">
                                            <li
                                                v-for="topic in Object.keys(topHeaders[header].topics)"
                                                :key="topic"
                                                class="nav-item topic-group col-lg-4">
                                                <a
                                                    class="nav-link dropdown-toggle font-weight-bold"
                                                    :class="(topHeaders[header].topics[topic].link ? 'dropdown-item' : '')"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                    :href="topHeaders[header].topics[topic].link ?
                                                        topHeaders[header].topics[topic].link : null">
                                                    {{ topic }}
                                                </a>
                                                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                                <label
                                                    :for="`topMenu-${topic}`"
                                                    class="dropdown-label nav-link">
                                                    {{ topic }}
                                                </label>
                                                <input
                                                    :id="`topMenu-${topic}`"
                                                    :name="`topMenu-${topic}`"
                                                    type="checkbox"
                                                    class="menu-checkbox">
                                                <div
                                                    class="menu submenu">
                                                    <div class="menu-header">
                                                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                                        <label
                                                            :for="`topMenu-${topic}`"
                                                            class="menu-toggle" />
                                                        <a
                                                            :class="topHeaders[header].topics[topic].link ?
                                                                'nav-link': 'nav-link disabled'"
                                                            :href="topHeaders[header].topics[topic].link ?
                                                                topHeaders[header].topics[topic].link : null">
                                                            {{ topic }}
                                                        </a>
                                                    </div>
                                                    <ul
                                                        class="visible-lg"
                                                        style="list-style: none; padding-left: 0; top: 0;">
                                                        <li
                                                            v-for="subtopic in
                                                                Object.keys(topHeaders[header].topics[topic].subtopics)"
                                                            :key="subtopic">
                                                            <a
                                                                class="dropdown-item nav-item nav-link"
                                                                :href="topHeaders[header].topics[topic]
                                                                    .subtopics[subtopic].link">
                                                                {{ subtopic }}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </div>
                            <div class="row mx-0 d-flex justify-content-around">
                                <li
                                    v-for="header in Object.keys(productHeaders)"
                                    :key="header"
                                    class="nav-item dropdown">
                                    <a
                                        class="nav-link dropdown-toggle"
                                        href="#"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        {{ header }}
                                    </a>
                                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                    <label
                                        :for="`productMenu-${header}`"
                                        class="dropdown-label nav-link">
                                        {{ header }}
                                    </label>
                                    <input
                                        :id="`productMenu-${header}`"
                                        :name="`productMenu-${header}`"
                                        type="checkbox"
                                        class="menu-checkbox">
                                    <div class="menu">
                                        <div class="menu-header">
                                            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                            <label
                                                :for="`productMenu-${header}`"
                                                class="menu-toggle" />
                                            {{ header }}
                                        </div>
                                        <ul
                                            class="dropdown-menu mt-0"
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
                            </div>
                        </ul>
                    </div>
                </nav>
            </div> <!-- nav-main -->
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
            topHeaders: {
                'Energy Tips': {
                    topics: {
                        'Solar Energy': {
                            subtopics: {
                                'Solar Panels Buyers Guide': {
                                    link: 'https://www.energysage.com/solar-panels/',
                                },
                                'Solar Calculator': {
                                    link: 'https://www.energysage.com/solar/calculator/',
                                },
                                'Best Solar Panels': {
                                    link: 'https://www.energysage.com/',
                                },
                                'Financing & Rebates': {
                                    link: 'https://www.energysage.com/',
                                },
                            },
                            link: 'https://www.energysage.com/',
                        },
                        'Back Up Power': {
                            subtopics: {
                                'Battery Storage Guide': {
                                    link: 'https://www.energysage.com/',
                                },
                                'Solar Incentives': {
                                    link: 'https://www.energysage.com/',
                                },
                                'Solar Rebates': {
                                    link: 'https://www.energysage.com/',
                                },
                                'Guide to Loans': {
                                    link: 'https://www.energysage.com/',
                                },
                            },
                        },
                    },
                },
                'Solar Calculator': {
                    topics: {},
                    link: 'https://www.energysage.com/solar/calculator',
                },
                'About Us': {
                    topics: {},
                },
            },
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
    mounted() {
        // overlay script starts
        const overlay = document.querySelector('.content-overlay');
        // eslint-disable-next-line max-len
        document.querySelectorAll('.nav-es-global .nav-item .dropdown-toggle, .nav-es-global .nav-item .dropdown-menu').forEach((element) => {
            element.addEventListener('mouseover', () => { overlay.style.display = 'block'; });
            element.addEventListener('mouseout', () => { overlay.style.display = 'none'; });
        });
        // overlay script ends
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

<template>
    <div id="nav-main">
        <div class="content-overlay" />
        <nav
            class="nav-es-global navbar navbar-expand navbar-light py-0">
            <div class="d-flex d-lg-none col-2 px-0">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    for="data--main-menu"
                    class="mb-0">
                    <IconHamburger class="menu-toggle align-self-center" />
                </label>
            </div>
            <div class="d-flex d-lg-none col-8 align-self-center justify-content-center px-0">
                <es-logo
                    width="128px"
                    height="28px" />
            </div>
            <div class="d-flex d-lg-none justify-content-end col-2 px-0">
                <a
                    class="text-dark text-decoration-none"
                    :href="profileIconDropdown.loggedIn['My Account'].link"
                    aria-label="Link to profile">
                    <IconPerson class="align-self-center" />
                </a>
            </div>
            <input
                id="data--main-menu"
                class="menu-checkbox main-menu-checkbox"
                aria-labelledby="data--main-menu"
                type="checkbox">
            <div
                id="navbarNavDropdown"
                class="collapse navbar-collapse menu">
                <div class="menu-header d-lg-none d-flex align-items-center justify-content-center h-100">
                    <div class="col-3" />
                    <div class="col-6 align-self-center text-center py-100">
                        <es-logo
                            width="128px"
                            height="28px" />
                    </div>
                    <div class="d-flex col-3 justify-content-end">
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            for="data--main-menu"
                            class="mb-0">
                            <IconX class="menu-toggle align-self-center" />
                        </label>
                    </div>
                </div>
                <div
                    id="compareButton_mobile"
                    class="container px-100 pt-100 d-lg-none text-center justify-content-center"
                    style="display: none">
                    Create an account to compare and see quotes from our verified installers.
                    <EsButton class="btn btn-secondary btn-md my-100 w-100">
                        Compare quotes
                    </EsButton>
                </div>
                <ul class="navbar-nav d-flex flex-column w-100">
                    <div class="row mx-0 d-flex justify-content-around align-items-center">
                        <div class="navbar-brand d-none d-lg-block">
                            <es-logo
                                width="200px"
                                height="42px" />
                        </div>
                        <li
                            v-for="header in Object.keys(topHeaders)"
                            :key="header"
                            class="nav-item top-header">
                            <a
                                v-if="!topHeaders[header].link"
                                class="nav-link dropdown-toggle py-150"
                                href="#"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <div class="d-lg-flex align-items-center eyebrow-lg">
                                    <span class="mr-50">
                                        <IconCircleChevronDown
                                            class="top-header-icon"
                                            style="height: 16px; width: 16px;" />
                                    </span>
                                    {{ header }}
                                </div>
                                <div class="font-weight-light font-size-xs pl-150">
                                    {{ topHeaders[header].subHeading }}
                                </div>
                            </a>
                            <a
                                v-else
                                class="nav-link d-flex align-items-center w-100 h-100 px-0 py-lg-150 px-lg-50"
                                :href="topHeaders[header].link">
                                <div class="d-flex d-lg-block">
                                    <div
                                        v-if="header=='Solar Calculator'"
                                        class="d-lg-none pr-50">
                                        <IconCalculator />
                                    </div>
                                    <div
                                        class="d-lg-flex align-items-center eyebrow-lg">
                                        {{ header }}
                                    </div>
                                    <div class="font-weight-light font-size-xs d-none d-lg-block">
                                        {{ topHeaders[header].subHeading }}
                                    </div>
                                </div>
                            </a>
                            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                            <label
                                v-if="!topHeaders[header].link"
                                :for="`menu-${header}`"
                                class="dropdown-label nav-link d-flex d-lg-none px-0 w-100 h-100 align-items-center
                                    justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div
                                        v-if="header=='Energy Tips'"
                                        class="pr-50">
                                        <IconLightBulb />
                                    </div>
                                    <div
                                        v-else-if="header=='About Us'"
                                        class="pr-50">
                                        <IconESLeaf />
                                    </div>
                                    {{ header }}
                                </div>
                                <IconChevronRight
                                    class="expand-icon"
                                    style="height: 18px;" />
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
                                        class="menu-toggle nav-link d-flex w-100 h-100 mb-0 align-items-center
                                            font-size-sm">
                                        <IconChevronLeft height="18px" />
                                        MAIN MENU
                                    </label>
                                    <div class="d-flex col-3 justify-content-end">
                                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                        <label
                                            for="data--main-menu"
                                            class="mb-0">
                                            <IconX class="menu-toggle align-self-center" />
                                        </label>
                                    </div>
                                </div>
                                <div class="dropdown-menu dropdown-menu-full-page">
                                    <div class="py-lg-100 dropdown-menu-primary">
                                        <div class="mb-3 mb-lg-0 pl-lg-200">
                                            <ul
                                                class="dropdown-list "
                                                :aria-labelledby="`menu-${header}`">
                                                <li
                                                    class="d-lg-none nav-item nav-link font-weight-bold d-flex w-100
                                                        align-items-center ml-50 ml-50">
                                                    {{ header }}
                                                </li>
                                                <li
                                                    v-for="topic in Object.keys(topHeaders[header].topics)"
                                                    :key="topic"
                                                    class="nav-item topic-group px-0">
                                                    <a
                                                        class="nav-link dropdown-toggle eyebrow-lg border-bottom"
                                                        :class="(topHeaders[header].topics[topic].link
                                                            ? 'dropdown-item' : '')"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        :href="topHeaders[header].topics[topic].link ?
                                                            topHeaders[header].topics[topic].link : '#'">
                                                        {{ topic }}
                                                        <IconArrowRight
                                                            v-if="topHeaders[header].topics[topic].link"
                                                            class="d-none d-lg-inline ml-n1"
                                                            height="16px" />
                                                    </a>
                                                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                                    <label
                                                        :for="`topMenu-${topic}`"
                                                        class="dropdown-label nav-link d-flex d-lg-none
                                                            align-items-center justify-content-between w-100 h-100
                                                            ml-50">
                                                        {{ topic }}
                                                        <IconChevronRight
                                                            class="expand-icon"
                                                            style="height: 18px;" />
                                                    </label>
                                                    <input
                                                        :id="`topMenu-${topic}`"
                                                        :name="`topMenu-${topic}`"
                                                        type="checkbox"
                                                        class="menu-checkbox">
                                                    <div
                                                        class="menu submenu">
                                                        <div class="menu-header">
                                                            <!-- vuejs-accessibility/label-has-for -->
                                                            <!-- eslint-disable-next-line -->
                                                            <label
                                                                :for="`topMenu-${topic}`"
                                                                class="menu-toggle d-flex w-100 h-100 mb-0
                                                                    align-items-center font-size-sm">
                                                                <div
                                                                    class="nav-link text-uppercase">
                                                                    <IconChevronLeft height="18px" />
                                                                    {{ topic }}
                                                                </div>
                                                            </label>
                                                            <div class="d-flex col-3 justify-content-end">
                                                                <!-- vuejs-accessibility/label-has-for -->
                                                                <!-- eslint-disable-next-line -->
                                                                <label
                                                                    for="data--main-menu"
                                                                    class="mb-0">
                                                                    <IconX class="menu-toggle align-self-center" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <ul
                                                            class="visible-lg"
                                                            style="list-style: none; padding-left: 0; top: 0;">
                                                            <li
                                                                class="d-lg-none">
                                                                <a
                                                                    v-if="topHeaders[header].topics[topic].link"
                                                                    class="nav-item nav-link font-weight-bold d-flex
                                                                        w-100 align-items-center ml-50"
                                                                    :href="topHeaders[header].topics[topic].link">
                                                                    {{ topic }}
                                                                </a>
                                                                <div
                                                                    v-else
                                                                    class="nav-item nav-link font-weight-bold d-flex
                                                                        w-100 align-items-center">
                                                                    {{ topic }}
                                                                </div>
                                                            </li>
                                                            <li
                                                                v-for="subtopic in
                                                                    Object.keys(topHeaders[header].
                                                                        topics[topic].subtopics)"
                                                                :key="subtopic">
                                                                <a
                                                                    class="dropdown-item nav-item nav-link d-flex
                                                                        align-items-center ml-50 ml-lg-0"
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
                                        <div class="pr-lg-200 dropdown-cta-right">
                                            <div class="font-size-50 p-lg-100">
                                                <a
                                                    class="d-block cta-link"
                                                    :href="topHeaders[header].dropdownCta.linkUrl"
                                                    :title="topHeaders[header].dropdownCta.linkName">
                                                    <nav-energy-tips
                                                        width="253px"
                                                        height="190px"
                                                        class="mb-100" />
                                                    <div class="eyebrow mb-50">
                                                        {{ topHeaders[header].dropdownCta.linkName }}
                                                    </div>

                                                    <p class="font-weight-bold">
                                                        {{ topHeaders[header].dropdownCta.lede }}
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-none d-lg-flex dropdown-cta-bottom">
                                        <div class="dropdown-cta-bottom--inner">
                                            <div class="text-white mr-450">
                                                <div class="font-size-300 font-weight-bold">
                                                    Compare quotes from our top installers.
                                                </div>
                                                <div>
                                                    Create an account to compare and shop for the best details.
                                                </div>
                                            </div>

                                            <div>
                                                <EsButton
                                                    outline
                                                    size="lg"
                                                    variant="secondary">
                                                    Compare quotes
                                                </EsButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <div class="d-none d-lg-block">
                            <li class="icon-dropdown">
                                <div class="container justify-content-center px-0">
                                    <span class="nav-item">
                                        <div
                                            class="nav-link dropdown-toggle py-100">
                                            <IconPerson class="align-self-center" />
                                            <div
                                                class="first-name align-self-center pl-50" />
                                        </div>
                                        <div class="menu">
                                            <ul
                                                id="loggedIn"
                                                class="dropdown-menu rounded mt-0 py-100"
                                                style="display: none">
                                                <li
                                                    v-for="item in Object.keys(profileIconDropdown.loggedIn)"
                                                    :key="item">
                                                    <a
                                                        class="dropdown-item nav-link"
                                                        :href="profileIconDropdown.loggedIn[item].link"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <span class="mx-50"> {{ item }} </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul
                                                id="loggedOut"
                                                class="dropdown-menu rounded mt-0"
                                                style="display: none">
                                                <a
                                                    class="d-flex justify-content-around text-decoration-none"
                                                    :href="profileIconDropdown.loggedOut['Sign in'].link">
                                                    <EsButton
                                                        :outline="true"
                                                        variant="secondary"
                                                        class="m-100 w-75">
                                                        Sign in
                                                    </EsButton>
                                                </a>
                                                <li>
                                                    <a
                                                        class="d-flex justify-content-around"
                                                        :href="profileIconDropdown
                                                            .loggedOut['Create an account'].link">
                                                        <EsButton
                                                            variant="link">
                                                            Create an account
                                                        </EsButton>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </span>
                                    <a
                                        id="compareButton_desktop"
                                        style="display: none"
                                        href="https://www.energysage.com/market/start/1">
                                        <EsButton class="btn btn-secondary my-25">
                                            Compare quotes
                                        </EsButton>
                                    </a>
                                </div>
                            </li>
                        </div>
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
                                class="dropdown-label nav-link d-flex d-lg-none align-items-center
                                    justify-content-between w-100 h-100 px-0 font-weight-bold">
                                {{ header }}
                                <IconChevronRight
                                    class="expand-icon"
                                    style="height: 18px;" />
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
                                        class="menu-toggle nav-link d-flex w-100 h-100 mb-0 align-items-center
                                            font-size-sm">
                                        <IconChevronLeft height="18px" />
                                        MAIN MENU
                                    </label>
                                    <div class="d-flex col-3 justify-content-end">
                                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                        <label
                                            for="data--main-menu"
                                            class="mb-0">
                                            <IconX class="menu-toggle align-self-center" />
                                        </label>
                                    </div>
                                </div>
                                <ul
                                    class="row dropdown-menu mt-0"
                                    :aria-labelledby="`menu-${header}`">
                                    <li
                                        class="d-lg-none nav-item nav-link font-weight-bold d-flex w-100
                                            align-items-center">
                                        {{ header }}
                                    </li>
                                    <li
                                        v-for="subHeader in Object.keys(productHeaders[header].subHeaders)"
                                        :key="subHeader">
                                        <a
                                            class="dropdown-item nav-item nav-link d-flex align-items-center"
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
    </div>
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsLogo from '../lib-assets/es-logo.vue';
import NavEnergyTips from '../lib-assets/nav-energy-tips.vue';

export default {
    name: 'EsNavbar',
    components: {
        EsButton,
        EsLogo,
        NavEnergyTips,
    },
    data() {
        return {
            visible: false,
            compCode: '',
            docCode: '',
            profileIconDropdown: {
                loggedIn: {
                    'My Account': {
                        link: 'https://www.energysage.com/profile/',
                    },
                    'Share Your Experience': {
                        link: 'https://www.energysage.com/share-your-experience/',
                    },
                    Settings: {
                        link: 'https://www.energysage.com/account-settings/router/',
                    },
                    'Refer a Friend': {
                        link: 'https://www.energysage.com/refer-a-friend/',
                    },
                    'Sign Out': {
                        link: 'https://www.energysage.com/logout/',
                    },
                },
                loggedOut: {
                    'Sign in': {
                        link: 'https://www.energysage.com/login/',
                    },
                    'Create an account': {
                        link: 'https://www.energysage.com/register/',
                    },
                },
            },
            topHeaders: {
                'Energy Tips': {
                    topics: {
                        Solar: {
                            subtopics: {
                                'Home solar guide': {
                                    link: 'https://www.energysage.com/solar/',
                                },
                                'Community solar guide': {
                                    link: 'https://www.energysage.com/solar/solar-101/what-is-community-solar/',
                                },
                                'Best solar panels': {
                                    link: 'https://news.energysage.com/best-solar-panels-complete-ranking/',
                                },
                                'What do solar panels cost? ': {
                                    link: 'https://www.energysage.com/local-data/solar-panel-cost/',
                                },
                            },
                            link: 'https://www.energysage.com/solar/',
                        },
                        'Backup Power': {
                            subtopics: {
                                'Backup power guide': {
                                    link: 'https://www.energysage.com/energy-storage/',
                                },
                                'Best home batteries': {
                                    link: 'https://news.energysage.com/best-solar-batteries/',
                                },
                                'Home batteries vs. generators': {
                                    link: 'https://news.energysage.com/battery-backup-power-vs-generators-which-is-right-for-you/',
                                },
                            },
                        },
                        'Heating & Cooling': {
                            subtopics: {
                                'Heat pump guide': {
                                    link: 'https://www.energysage.com/clean-heating-cooling/air-source-heat-pumps/',
                                },
                                'Best heat pumps': {
                                    link: 'https://www.energysage.com/',
                                },
                                'How do heat pumps work?': {
                                    link: 'https://news.energysage.com/how-do-heat-pumps-work/',
                                },
                            },
                        },
                        'Electric Vehicles': {
                            subtopics: {
                                'EV charging guide': {
                                    link: 'https://www.energysage.com/electric-vehicles/charging-your-ev/',
                                },
                                'Electric vehicle guide': {
                                    link: 'https://www.energysage.com/electric-vehicles/',
                                },
                                'Best EV chargers': {
                                    link: 'https://www.energysage.com/',
                                },
                                'What does it cost to charge an EV?': {
                                    link: 'https://news.energysage.com/electric-vehicle-charging-cost-vs-gas/',
                                },
                            },
                        },
                        'Smart Home': {
                            subtopics: {
                                'Home electricity guide': {
                                    link: 'http://www.energysage.com/electricity/',
                                },
                                'Home energy management guide': {
                                    link: 'http://www.energysage.com/energy-management/',
                                },
                                'Energy efficiency': {
                                    link: 'http://www.energysage.com/energy-efficiency/',
                                },
                                'Best smart home gadgets': {
                                    link: 'http://www.energysage.com/energy-products/',
                                },
                            },
                        },
                        'For Your Business': {
                            subtopics: {
                                'Clean energy guide for businesses': {
                                    link: 'http://www.energysage.com/',
                                },
                                'Solar for businesses': {
                                    link: 'https://news.energysage.com/commercial-solar-benefits-for-business/',
                                },
                                'Solar for nonprofit organizations': {
                                    link: 'https://news.energysage.com/solar-nonprofit-benefits-financing/',
                                },
                                'Energy storage for businesses': {
                                    link: 'https://news.energysage.com/energy-storage-for-businesses/',
                                },
                            },
                        },
                        'Clean Energy Financing': {
                            subtopics: {
                                'Guide to financing': {
                                    link: 'http://www.energysage.com/',
                                },
                                'How to pay for solar': {
                                    link: 'https://www.energysage.com/solar/how-to-go-solar/how-to-pay-for-solar/',
                                },
                                'What to know about solar loans': {
                                    link: 'https://news.energysage.com/solar-loans-overview/',
                                },
                            },
                        },
                        'EnergySage News': {
                            subtopics: {
                                Blog: {
                                    link: 'http://news.energysage.com/',
                                },
                            },
                        },
                    },
                    subHeading: 'Learn from experts',
                    dropdownCta: {
                        linkName: "Editor's Recommendation",
                        linkUrl: 'https://news.energysage.com/are-solar-panels-worth-it/',
                        lede: 'Everything you need to know about community solar: projects, costs, savings, and more',
                    },
                },
                'Solar Calculator': {
                    topics: {},
                    link: 'https://www.energysage.com/solar/calculator',
                    subHeading: 'Check your savings',

                },
                'About Us': {
                    topics: {
                        'Our Company': {
                            subtopics: {
                                'Mission & values': {
                                    link: 'https://www.energysage.com/about-us/company/',
                                },
                                'How it works': {
                                    link: '',
                                },
                                'Editorial team': {
                                    link: '',
                                },
                                'Partner with us': {
                                    link: 'https://www.energysage.com/partners/',
                                },
                                Careers: {
                                    link: 'https://www.energysage.com/about-us/careers/',
                                },
                                'Market research': {
                                    link: 'https://www.energysage.com/data/',
                                },
                                'Editorial guidelines': {
                                    link: 'https://www.energysage.com/editorial-guidelines/',
                                },
                                Press: {
                                    link: 'https://www.energysage.com/press/',
                                },
                            },
                        },
                    },
                    subHeading: 'Why choose EnergySage',
                    dropdownCta: {
                        linkName: 'Recent Press',
                        linkUrl: 'https://www.energysage.com/press/energysage-marketplace-intel-report-16',
                        lede: 'EnergySage Releases Its 16th Solar & Storage Marketplace Report',
                    },
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
                        'Home Solar 3': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 4': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 5': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 6': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 7': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 8': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 9': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 10': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 11': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 12': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 13': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 14': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 15': {
                            link: 'https://www.energysage.com/',
                        },
                        'Home Solar 16': {
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
        // Function to collapse all open menus
        function uncheck_menus() {
            document.querySelectorAll('.menu-checkbox').forEach((element) => {
                const checkbox = element;
                checkbox.checked = false;
            });
        }

        // Create an overlay to obscure page contents
        const overlay = document.querySelector('.content-overlay');

        // Function to show/hide overlay
        function show_overlay(overlay_visible) {
            overlay.style.display = overlay_visible ? 'block' : 'none';
        }

        // Show overlay and lock scrolling on body when menu is open
        function show_mobile_menus() {
            show_overlay(true);
            document.body.style.overflow = 'hidden';
        }

        // Close all submenus, hide overlay, and unlock scrolling when menu is closed
        function collapse_mobile_menus() {
            uncheck_menus();
            show_overlay(false);
            document.body.style.overflow = 'visible';
        }

        // Create a checkbox used to determine if any mobile menus are open
        const mainMenuCheckbox = document.querySelector('.main-menu-checkbox');

        // Collapse all open menus on window resize
        window.addEventListener('resize', () => {
            if (mainMenuCheckbox.checked) {
                collapse_mobile_menus();
            }
        });

        // Collapse all open menus on overlay click
        overlay.addEventListener('click', () => {
            collapse_mobile_menus();
        });

        // Show overlay on hovers for desktop only
        // eslint-disable-next-line max-len
        document.querySelectorAll(
            '.nav-es-global .nav-item .dropdown-toggle, .nav-es-global .nav-item .dropdown-menu',
        )
            .forEach((element) => {
                element.addEventListener('mouseover', () => {
                    show_overlay(true);
                });
                element.addEventListener('mouseout', () => {
                // Hide overlay on mouseout on desktop not mobile
                    show_overlay(mainMenuCheckbox.checked);
                });
            });

        // Toggle menu display on main menu open/close
        mainMenuCheckbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                show_mobile_menus();
            } else {
                collapse_mobile_menus();
            }
        });

        // get logged in/out state and display appropriate menu
        const menuDisplay = ({ loggedOut }) => {
            if (loggedOut) {
                // logged out so allow loggedOut menu and the compare buttons to be visible
                document.querySelector('.nav-es-global #loggedOut').style.display = null;
                document.querySelectorAll(
                    '.nav-es-global [id^="compareButton"]',
                ).forEach((e) => { e.style.display = null; });
            } else {
                // logged in so allow logged in menu to be visible, and show name with appropriate layout
                document.querySelector('.nav-es-global #loggedIn').style.display = null;
                document.querySelector('.nav-es-global .icon-dropdown .dropdown-toggle').style.display = 'flex';
                document.querySelector('.nav-es-global .icon-dropdown .dropdown-toggle .first-name')
                    .style.display = 'block';
            }
        };

        fetch('/api/account-first-name/', {
            headers: { Accept: 'application/json' },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const name = data?.first_name || null;
                document.querySelector('.nav-es-global .icon-dropdown .dropdown-toggle .first-name').innerHTML = name;
                menuDisplay({ loggedOut: (name === null) });
            }).catch((e) => {
                // eslint-disable-next-line no-console
                console.log('error', e);
                menuDisplay({ loggedOut: true });
            });
    },
};
</script>

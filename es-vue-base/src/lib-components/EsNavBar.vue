<template>
    <div id="nav-main">
        <div class="content-overlay" />
        <nav
            class="nav-es-global navbar navbar-expand navbar-light py-0">
            <!-- mobile hamburger menu button -->
            <div class="d-flex d-lg-none col-2 px-0">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    for="data--main-menu"
                    class="mb-0">
                    <IconHamburger class="menu-toggle align-self-center" />
                    <span class="sr-only">Open navigation menu</span>
                </label>
            </div>
            <!-- mobile logo -->
            <div class="d-flex d-lg-none col-8 align-self-center justify-content-center px-0">
                <es-logo
                    width="128px"
                    height="28px" />
            </div>
            <!-- mobile account menu -->
            <!-- TODO: link to login if logged out, otherwise profile -->
            <div class="d-flex d-lg-none justify-content-end col-2 px-0">
                <a
                    class="text-dark text-decoration-none"
                    :href="items.accountMenu.loggedIn.items[0].link"
                    aria-label="Link to profile">
                    <IconPerson class="align-self-center" />
                </a>
            </div>
            <input
                id="data--main-menu"
                class="menu-checkbox main-menu-checkbox"
                aria-labelledby="data--main-menu"
                type="checkbox">
            <!-- first-level menu on mobile, the whole nav on desktop-->
            <div
                id="navbarNavDropdown"
                class="menu top-level-menu align-items-start d-flex flex-grow-1">
                <!-- mobile menu header -->
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
                        <!-- desktop logo -->
                        <div class="navbar-brand d-none d-lg-block">
                            <es-logo
                                width="200px"
                                height="42px" />
                        </div>
                        <!-- top level menus -->
                        <li
                            v-for="topLevelMenu in items.topLevelMenus"
                            :key="topLevelMenu.name"
                            class="nav-item top-header">
                            <!-- desktop fly-out menu trigger -->
                            <a
                                v-if="!topLevelMenu.link"
                                class="nav-link dropdown-toggle d-none d-lg-block py-150"
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
                                    {{ topLevelMenu.name }}
                                </div>
                                <div class="font-weight-light font-size-xs pl-150">
                                    {{ topLevelMenu.subHeading }}
                                </div>
                            </a>
                            <!-- mobile+desktop top-level link -->
                            <a
                                v-else
                                class="nav-link d-flex align-items-center w-100 h-100 px-0 py-lg-150 px-lg-50"
                                :href="topLevelMenu.link">
                                <div class="d-flex d-lg-block">
                                    <icon-calculator
                                        v-if="topLevelMenu.icon === NAV_BAR_ICONS.CALCULATOR"
                                        class="d-lg-none mr-50" />
                                    <div
                                        class="d-lg-flex align-items-center eyebrow-lg">
                                        {{ topLevelMenu.name }}
                                    </div>
                                    <div class="font-weight-light font-size-xs d-none d-lg-block">
                                        {{ topLevelMenu.subHeading }}
                                    </div>
                                </div>
                            </a>
                            <!-- mobile fly-out menu trigger -->
                            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                            <label
                                v-if="!topLevelMenu.link"
                                :for="`menu-${topLevelMenu.name}`"
                                class="dropdown-label nav-link d-flex d-lg-none px-0 w-100 h-100 align-items-center
                                    justify-content-between">
                                <div class="align-items-center d-flex">
                                    <div class="mr-50">
                                        <icon-light-bulb v-if="topLevelMenu.icon === NAV_BAR_ICONS.LIGHT_BULB" />
                                        <icon-e-s-leaf v-if="topLevelMenu.icon === NAV_BAR_ICONS.ES_LEAF" />
                                    </div>
                                    {{ topLevelMenu.name }}
                                </div>
                                <IconChevronRight
                                    class="expand-icon"
                                    style="height: 18px;" />
                            </label>
                            <input
                                :id="`menu-${topLevelMenu.name}`"
                                :name="`menu-${topLevelMenu.name}`"
                                type="checkbox"
                                class="menu-checkbox">
                            <div
                                v-if="!topLevelMenu.link"
                                class="menu">
                                <div class="menu-header">
                                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                    <label
                                        :for="`menu-${topLevelMenu.name}`"
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
                                                :aria-labelledby="`menu-${topLevelMenu.name}`">
                                                <li
                                                    class="d-lg-none nav-item nav-link font-weight-bold d-flex w-100
                                                        align-items-center ml-50 ml-50">
                                                    {{ topLevelMenu.name }}
                                                </li>
                                                <li
                                                    v-for="topic in topLevelMenu.topics"
                                                    :key="topic.name"
                                                    class="nav-item topic-group px-0">
                                                    <a
                                                        class="nav-link dropdown-toggle d-none d-lg-block eyebrow-lg border-bottom"
                                                        :class="(topic.link
                                                            ? 'dropdown-item' : '')"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        :href="topic.link ?
                                                            topic.link : '#'">
                                                        {{ topic.name }}
                                                        <IconArrowRight
                                                            v-if="topic.link"
                                                            class="d-none d-lg-inline ml-n1"
                                                            height="16px" />
                                                    </a>
                                                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                                    <label
                                                        :for="`topMenu-${topic.name}`"
                                                        class="dropdown-label nav-link d-flex d-lg-none
                                                            align-items-center justify-content-between w-100 h-100
                                                            ml-50">
                                                        {{ topic.name }}
                                                        <IconChevronRight
                                                            class="expand-icon"
                                                            style="height: 18px;" />
                                                    </label>
                                                    <input
                                                        :id="`topMenu-${topic.name}`"
                                                        :name="`topMenu-${topic.name}`"
                                                        type="checkbox"
                                                        class="menu-checkbox">
                                                    <div
                                                        class="menu submenu">
                                                        <div class="menu-header">
                                                            <!-- vuejs-accessibility/label-has-for -->
                                                            <!-- eslint-disable-next-line -->
                                                            <label
                                                                :for="`topMenu-${topic.name}`"
                                                                class="menu-toggle d-flex w-100 h-100 mb-0
                                                                    align-items-center font-size-sm">
                                                                <div
                                                                    class="nav-link text-uppercase">
                                                                    <IconChevronLeft height="18px" />
                                                                    {{ topic.name }}
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
                                                                    v-if="topic.link"
                                                                    class="nav-item nav-link font-weight-bold d-flex
                                                                        w-100 align-items-center ml-50"
                                                                    :href="topic.link">
                                                                    {{ topic.name }}
                                                                </a>
                                                                <div
                                                                    v-else
                                                                    class="nav-item nav-link font-weight-bold d-flex
                                                                        w-100 align-items-center">
                                                                    {{ topic.name }}
                                                                </div>
                                                            </li>
                                                            <li
                                                                v-for="subtopic in topic.subtopics"
                                                                :key="subtopic.name">
                                                                <a
                                                                    class="dropdown-item nav-item nav-link d-flex
                                                                        align-items-center ml-50 ml-lg-0"
                                                                    :href="subtopic.link">
                                                                    {{ subtopic.name }}
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
                                                    :href="topLevelMenu.dropdownCta.linkUrl"
                                                    :title="topLevelMenu.dropdownCta.linkName">
                                                    <nav-energy-tips
                                                        width="253px"
                                                        height="190px"
                                                        class="mb-100" />
                                                    <div class="eyebrow mb-50">
                                                        {{ topLevelMenu.dropdownCta.linkName }}
                                                    </div>

                                                    <p class="font-weight-bold">
                                                        {{ topLevelMenu.dropdownCta.lede }}
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
                                            class="nav-link dropdown-toggle d-none d-lg-block py-100">
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
                                                    v-for="item in items.accountMenu.loggedIn.items"
                                                    :key="item.name">
                                                    <a
                                                        class="dropdown-item nav-link"
                                                        :href="item.link"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <span class="mx-50"> {{ item.name }} </span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <ul
                                                id="loggedOut"
                                                class="dropdown-menu rounded mt-0"
                                                style="display: none">
                                                <a
                                                    class="d-flex justify-content-around text-decoration-none"
                                                    :href="items.accountMenu.loggedOut.signIn.link">
                                                    <EsButton
                                                        :outline="true"
                                                        variant="secondary"
                                                        class="m-100 w-75">
                                                        {{ items.accountMenu.loggedOut.signIn.name }}
                                                    </EsButton>
                                                </a>
                                                <li>
                                                    <a
                                                        class="d-flex justify-content-around"
                                                        :href="items.accountMenu.loggedOut.createAccount.link">
                                                        <EsButton
                                                            variant="link">
                                                            {{ items.accountMenu.loggedOut.createAccount.name }}
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
                        <es-nav-bar-product-menu
                            v-for="product in items.products"
                            :key="product.name"
                            :items="product.items"
                            :name="product.name" />
                    </div>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsNavBarProductMenu from './EsNavBarProductMenu.vue';
import NAV_BAR_CONTENT from '../lib-data/es-nav-bar-content';
import { NAV_BAR_ICONS } from '../lib-utils/es-nav-bar-constants';

import EsLogo from '../lib-assets/es-logo.vue';
import NavEnergyTips from '../lib-assets/nav-energy-tips.vue';

export default {
    name: 'EsNavBar',
    components: {
        EsButton,
        EsLogo,
        EsNavBarProductMenu,
        NavEnergyTips,
    },
    data() {
        return {
            items: NAV_BAR_CONTENT,
            NAV_BAR_ICONS,
        };
    },
    mounted() {
        // CUSTOM GLOBAL-NAV SCRIPT STARTS

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

        // CUSTOM GLOBAL-NAV SCRIPT ENDS
    },
};
</script>

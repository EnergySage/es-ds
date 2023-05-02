<template>
    <div
        id="nav-main"
        class="nav-es-container">
        <div class="content-overlay" />
        <nav
            class="nav-es-global navbar navbar-expand navbar-light py-0">
            <!-- mobile hamburger menu button -->
            <div class="d-flex d-lg-none col-2 px-0">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    for="data--main-menu"
                    class="mb-0">
                    <icon-hamburger class="menu-toggle align-self-center" />
                    <span class="sr-only">Open navigation menu</span>
                </label>
            </div>
            <!-- mobile logo -->
            <a
                class="d-flex d-lg-none col-8 align-self-center justify-content-center px-0"
                :href="items.home.link">
                <es-logo
                    width="128px"
                    height="28px" />
                <span class="sr-only">
                    {{ items.home.name }}
                </span>
            </a>
            <!-- mobile account menu trigger -->
            <div class="d-flex d-lg-none justify-content-end col-2 px-0">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    class="mb-0 text-dark text-decoration-none"
                    for="data--account-menu">
                    <icon-person class="align-self-center" />
                    <span class="sr-only">Open account menu</span>
                </label>
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
                            <icon-x class="menu-toggle align-self-center" />
                            <span class="sr-only">Close</span>
                        </label>
                    </div>
                </div>
                <ul class="navbar-nav d-flex flex-column w-100">
                    <!-- top-level items on mobile, full top bar on desktop -->
                    <b-container class="align-items-center d-flex flex-lg-nowrap justify-content-between">
                        <a
                            class="navbar-brand d-none d-lg-block"
                            :href="items.home.link">
                            <!-- small desktop logo -->
                            <es-logo
                                class="d-none d-lg-block d-xl-none"
                                width="150px"
                                height="42px" />
                            <!-- large desktop logo-->
                            <es-logo
                                class="d-none d-xl-block"
                                width="200px"
                                height="42px" />
                            <span class="sr-only">
                                {{ items.home.name }}
                            </span>
                        </a>
                        <!-- top level menus -->
                        <es-nav-bar-top-level-menu
                            v-for="topLevelMenu in items.topLevelMenus"
                            :key="topLevelMenu.name"
                            :featured-article="topLevelMenu.featuredArticle"
                            :icon="topLevelMenu.icon"
                            :link="topLevelMenu.link"
                            :name="topLevelMenu.name"
                            :sub-heading="topLevelMenu.subHeading"
                            :topics="topLevelMenu.topics" />
                        <!-- desktop account menu -->
                        <es-nav-bar-account-menu
                            :auth-items="items.accountMenu.loggedIn.items"
                            class="d-none d-lg-block"
                            :logged-out="items.accountMenu.loggedOut" />
                    </b-container>
                    <!-- mobile+desktop product menus -->
                    <div class="row mx-0 d-flex justify-content-lg-center">
                        <es-nav-bar-product-menu
                            v-for="product in items.products"
                            :key="product.name"
                            :featured-article="product.featuredArticle"
                            :items="product.items"
                            :link="product.link"
                            :new-tab="product.newTab"
                            :name="product.name"
                            :topics="product.topics" />
                    </div>
                </ul>
            </div>
            <!-- mobile account menu checkbox -->
            <input
                id="data--account-menu"
                class="menu-checkbox account-menu-checkbox"
                aria-labelledby="data--account-menu"
                type="checkbox">
            <!-- mobile account menu -->
            <div class="menu top-level-menu align-items-start d-flex d-lg-none flex-grow-1">
                <!-- menu header -->
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
                            for="data--account-menu"
                            class="mb-0">
                            <icon-x class="menu-toggle align-self-center" />
                            <span class="sr-only">Close</span>
                        </label>
                    </div>
                </div>
                <!-- logged in menu -->
                <ul
                    class="loggedIn navbar-nav w-100"
                    style="display: none">
                    <li
                        v-for="item in items.accountMenu.loggedIn.items"
                        :key="item.name">
                        <a
                            class="dropdown-item nav-item nav-item-border-mobile nav-link align-items-center d-flex px-lg-100 py-lg-50"
                            :href="item.link">
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
                <!-- logged out menu -->
                <ul
                    class="loggedOut navbar-nav w-100"
                    style="display: none">
                    <li>
                        <EsButton
                            :href="items.accountMenu.loggedOut.signIn.link"
                            :outline="true"
                            variant="secondary"
                            class="m-100 w-100">
                            {{ items.accountMenu.loggedOut.signIn.name }}
                        </EsButton>
                    </li>
                    <li class="d-flex justify-content-center">
                        <EsButton
                            :href="items.accountMenu.loggedOut.createAccount.link"
                            variant="link">
                            {{ items.accountMenu.loggedOut.createAccount.name }}
                        </EsButton>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- sticky nav bar -->
        <nav class="nav-es-sticky bg-white d-none d-lg-block position-fixed py-25">
            <b-container class="align-items-center d-flex justify-content-between">
                <!-- EnergySage logo -->
                <a
                    class="navbar-brand d-none d-lg-block"
                    :href="items.home.link">
                    <!-- small desktop logo -->
                    <es-logo
                        width="128px"
                        height="28px" />
                    <span class="sr-only">
                        {{ items.home.name }}
                    </span>
                </a>
                <!-- desktop account menu -->
                <es-nav-bar-account-menu
                    :auth-items="items.accountMenu.loggedIn.items"
                    class="d-none d-lg-block"
                    :logged-out="items.accountMenu.loggedOut" />
            </b-container>
        </nav>
    </div>
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsNavBarAccountMenu from './EsNavBarAccountMenu.vue';
import EsNavBarProductMenu from './EsNavBarProductMenu.vue';
import EsNavBarTopLevelMenu from './EsNavBarTopLevelMenu.vue';
import NAV_BAR_CONTENT from '../lib-data/es-nav-bar-content';

import EsLogo from '../lib-assets/es-logo.vue';

export default {
    name: 'EsNavBar',
    components: {
        EsButton,
        EsLogo,
        EsNavBarAccountMenu,
        EsNavBarProductMenu,
        EsNavBarTopLevelMenu,
    },
    data() {
        return {
            items: NAV_BAR_CONTENT,
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
            if (overlay_visible) {
                overlay.classList.add('show');
            } else {
                overlay.classList.remove('show');
            }
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
        const accountMenuCheckbox = document.querySelector('.account-menu-checkbox');

        // Collapse all open menus on window resize
        window.addEventListener('resize', () => {
            if (mainMenuCheckbox.checked || accountMenuCheckbox.checked) {
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
            '.nav-es-container .nav-item .dropdown-toggle, .nav-es-container .nav-item .dropdown-menu',
        )
            .forEach((element) => {
                element.addEventListener('mouseover', () => {
                    show_overlay(true);
                });
                element.addEventListener('mouseout', () => {
                // Hide overlay on mouseout on desktop not mobile
                    show_overlay(mainMenuCheckbox.checked || accountMenuCheckbox.checked);
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

        // Toggle menu display on account menu open/close
        accountMenuCheckbox.addEventListener('change', (event) => {
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
                document.querySelectorAll('.nav-es-container .loggedOut').forEach((element) => {
                    // eslint-disable-next-line no-param-reassign
                    element.style.display = null;
                });
            } else {
                // logged in so allow logged in menu to be visible, and show name with appropriate layout
                document.querySelectorAll('.nav-es-container .loggedIn').forEach((element) => {
                    // eslint-disable-next-line no-param-reassign
                    element.style.display = null;
                });
                document.querySelector('.nav-es-container .icon-dropdown .dropdown-toggle').style.display = 'flex';
                document.querySelector('.nav-es-container .icon-dropdown .dropdown-toggle .first-name')
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
                document.querySelector(
                    '.nav-es-container .icon-dropdown .dropdown-toggle .first-name',
                ).innerHTML = name;
                menuDisplay({ loggedOut: (name === null) });
            }).catch((e) => {
                // eslint-disable-next-line no-console
                console.log('error', e);
                menuDisplay({ loggedOut: true });
            });

        // closes mobile menus upon navigating 'back' to the site
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/pageshow_event
        window.addEventListener('pageshow', () => {
            collapse_mobile_menus();
        });

        // set up options for sticky nav intersection observer
        const intersectionOptions = {
            rootMargin: '0px',
            threshold: 0.0,
        };

        // set up callback for sticky nav intersection observer
        const intersectionCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('scrolled');
                } else {
                    entry.target.classList.add('scrolled');
                }
            });
        };

        // initialize intersection observer to detect when nav scrolls out of viewport
        // https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
        const observer = new IntersectionObserver(intersectionCallback, intersectionOptions);
        const targetEl = document.querySelector('#nav-main');
        observer.observe(targetEl);

        // CUSTOM GLOBAL-NAV SCRIPT ENDS
    },
};
</script>

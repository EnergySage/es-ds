<template>
    <div
        id="nav-main"
        class="nav-es-container">
        <div class="content-overlay" />
        <nav
            class="nav-es-global navbar navbar-expand navbar-light py-0 font-size-base">
            <!-- mobile hamburger menu button -->
            <div class="d-flex d-lg-none col-2 px-0">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    for="data--main-menu"
                    class="mb-0">
                    <icon-hamburger class="menu-toggle align-self-center" />
                    <span class="sr-only">
                        {{ globalContent.mobileNavButtonAltText }}
                    </span>
                </label>
            </div>
            <!-- mobile logo -->
            <es-nav-bar-link
                class="d-flex d-lg-none col-8 align-self-center justify-content-center px-0"
                :href="globalContent.home.link">
                <div class="nav-es-logo-mobile">
                    <slot name="logo" />
                </div>
                <span class="sr-only">
                    {{ globalContent.home.name }}
                </span>
            </es-nav-bar-link>
            <!-- mobile account menu trigger -->
            <div class="d-flex d-lg-none justify-content-end col-2 px-0">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    class="mb-0 text-decoration-none"
                    for="data--account-menu">
                    <icon-person class="align-self-center account-icon" />
                    <span class="sr-only">
                        {{ accountContent.mobileAccountButtonAltText }}
                    </span>
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
                <div class="menu-header d-lg-none d-flex align-items-center justify-content-center h-100 mb-50">
                    <div class="col-3" />
                    <div class="col-6 align-self-center text-center py-100">
                        <div class="nav-es-logo-mobile">
                            <slot name="logo" />
                        </div>
                    </div>
                    <div class="d-flex col-3 justify-content-end">
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            for="data--main-menu"
                            class="mb-0">
                            <icon-x class="menu-toggle align-self-center" />
                            <span class="sr-only">
                                {{ globalContent.mobileCloseButtonAltText }}
                            </span>
                        </label>
                    </div>
                </div>
                <div class="navbar-nav d-flex flex-column w-100">
                    <!-- top-level items on mobile, full top bar on desktop -->
                    <b-container class="align-items-start d-flex flex-lg-nowrap justify-content-between top-level-nav">
                        <es-nav-bar-link
                            class="navbar-brand d-none d-lg-block pt-150"
                            :href="globalContent.home.link">
                            <div class="nav-es-logo-desktop">
                                <slot name="logo" />
                            </div>
                            <span class="sr-only">
                                {{ globalContent.home.name }}
                            </span>
                        </es-nav-bar-link>
                        <!-- top level menus -->
                        <es-nav-bar-top-level-menu
                            v-for="topLevelMenu in globalContent.topLevelMenus"
                            :key="topLevelMenu.name"
                            :home-name="globalContent.home.name"
                            :home-link="globalContent.home.link"
                            :close-button-text="globalContent.mobileCloseButtonAltText"
                            :featured-article="topLevelMenu.featuredArticle"
                            :icon="topLevelMenu.icon"
                            :link="topLevelMenu.link"
                            :main-menu-text="globalContent.mainMenuText"
                            :name="topLevelMenu.name"
                            :sub-heading="topLevelMenu.subHeading"
                            :topics="topLevelMenu.topics">
                            <template #logo>
                                <slot name="logo" />
                            </template>
                        </es-nav-bar-top-level-menu>
                        <!-- desktop account menu -->
                        <es-nav-bar-account-menu
                            :auth-items="accountContent.loggedIn.items"
                            class="d-none d-lg-block pt-100"
                            :logged-out="accountContent.loggedOut" />
                    </b-container>
                    <!-- mobile+desktop product menus -->
                    <b-container class="d-flex flex-lg-nowrap justify-content-lg-end product-menu">
                        <div class="row">
                            <es-nav-bar-product-menu
                                v-for="product in globalContent.products"
                                :key="product.name"
                                :home-name="globalContent.home.name"
                                :home-link="globalContent.home.link"
                                :close-button-text="globalContent.mobileCloseButtonAltText"
                                :featured-article="product.featuredArticle"
                                :items="product.items"
                                :link="product.link"
                                :main-menu-text="globalContent.mainMenuText"
                                :new-tab="product.newTab"
                                :name="product.name"
                                :see-all-text="globalContent.seeAllText"
                                :topics="product.topics">
                                <template #logo>
                                    <slot name="logo" />
                                </template>
                            </es-nav-bar-product-menu>
                        </div>
                    </b-container>
                </div>
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
                        <div class="nav-es-logo-mobile">
                            <slot name="logo" />
                        </div>
                    </div>
                    <div class="d-flex col-3 justify-content-end">
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            for="data--account-menu"
                            class="mb-0">
                            <icon-x class="menu-toggle align-self-center" />
                            <span class="sr-only">
                                {{ globalContent.mobileCloseButtonAltText }}
                            </span>
                        </label>
                    </div>
                </div>
                <!-- logged in menu -->
                <ul
                    class="loggedIn navbar-nav w-100"
                    style="display: none">
                    <li
                        v-for="item in accountContent.loggedIn.items"
                        :key="item.name">
                        <es-nav-bar-link
                            class="dropdown-item nav-item nav-item-border-mobile nav-link align-items-center d-flex px-lg-100 py-lg-50 font-weight-bold"
                            :href="item.link">
                            {{ item.name }}
                        </es-nav-bar-link>
                    </li>
                </ul>
                <!-- logged out menu -->
                <ul
                    class="loggedOut navbar-nav w-100"
                    style="display: none">
                    <li>
                        <EsButton
                            :href="accountContent.loggedOut.signIn.link"
                            class="m-100 w-100 text-white font-weight-bold">
                            {{ accountContent.loggedOut.signIn.name }}
                        </EsButton>
                    </li>
                    <li class="d-flex justify-content-center">
                        <EsButton
                            :href="accountContent.loggedOut.createAccount.link"
                            :outline="true"
                            class="mx-100 w-100 font-weight-bold">
                            {{ accountContent.loggedOut.createAccount.name }}
                        </EsButton>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- sticky nav bar -->
        <nav class="nav-es-sticky bg-white d-none d-lg-block position-fixed py-25">
            <b-container class="align-items-center d-flex justify-content-between">
                <!-- EnergySage logo -->
                <es-nav-bar-link
                    class="navbar-brand d-none d-lg-block"
                    :href="globalContent.home.link">
                    <div class="nav-es-logo-desktop-sticky">
                        <slot name="logo" />
                    </div>
                    <span class="sr-only">
                        {{ globalContent.home.name }}
                    </span>
                </es-nav-bar-link>
                <!-- desktop account menu -->
                <es-nav-bar-account-menu
                    :auth-items="accountContent.loggedIn.items"
                    class="d-none d-lg-block"
                    :logged-out="accountContent.loggedOut" />
            </b-container>
        </nav>
    </div>
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsNavBarAccountMenu from './EsNavBarAccountMenu.vue';
import EsNavBarLink from './EsNavBarLink.vue';
import EsNavBarProductMenu from './EsNavBarProductMenu.vue';
import EsNavBarTopLevelMenu from './EsNavBarTopLevelMenu.vue';

export default {
    name: 'EsNavBar',
    components: {
        EsButton,
        EsNavBarAccountMenu,
        EsNavBarLink,
        EsNavBarProductMenu,
        EsNavBarTopLevelMenu,
    },
    props: {
        accountContent: {
            type: Object,
            required: true,
        },
        globalContent: {
            type: Object,
            required: true,
        },
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
        document.querySelectorAll(
            // eslint-disable-next-line max-len
            '.nav-es-container .nav-item .dropdown-toggle, .nav-es-container .nav-item .dropdown-menu, .nav-es-container .nav-item.has-dropdown',
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
                const selector = '.nav-es-container .icon-dropdown .dropdown-toggle .first-name';
                document.querySelectorAll(selector).forEach((element) => {
                    // eslint-disable-next-line no-param-reassign
                    element.style.display = 'block';
                });
            }
        };

        fetch('/api/account-first-name/', {
            headers: { Accept: 'application/json' },
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const name = data?.first_name || null;
                const selector = '.nav-es-container .icon-dropdown .dropdown-toggle .first-name';
                document.querySelectorAll(selector).forEach((element) => {
                    // eslint-disable-next-line no-param-reassign
                    element.innerHTML = name;
                });
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

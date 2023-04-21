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
                <ul class="navbar-nav d-flex flex-column w-100">
                    <!-- top-level items on mobile, full top bar on desktop -->
                    <b-container class="align-items-center d-flex flex-lg-nowrap justify-content-between">
                        <!-- small desktop logo -->
                        <div class="navbar-brand d-none d-lg-block d-xl-none">
                            <es-logo
                                width="150px"
                                height="42px" />
                        </div>
                        <!-- large desktop logo-->
                        <div class="navbar-brand d-none d-xl-block">
                            <es-logo
                                width="200px"
                                height="42px" />
                        </div>
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
                        <div class="d-none d-lg-block">
                            <li class="icon-dropdown">
                                <div class="nav-item">
                                    <div class="nav-link dropdown-toggle d-none d-lg-flex flex-nowrap py-100">
                                        <IconPerson class="align-self-center" />
                                        <div class="first-name align-self-center pl-50">
                                            Sign in
                                        </div>
                                    </div>
                                    <div class="menu">
                                        <ul
                                            id="loggedIn"
                                            class="dropdown-menu account-menu rounded mt-0 py-100"
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
                                            class="dropdown-menu account-menu rounded mt-0"
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
                                </div>
                            </li>
                        </div>
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
        </nav>
    </div>
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsNavBarProductMenu from './EsNavBarProductMenu.vue';
import EsNavBarTopLevelMenu from './EsNavBarTopLevelMenu.vue';
import NAV_BAR_CONTENT from '../lib-data/es-nav-bar-content';

import EsLogo from '../lib-assets/es-logo.vue';

export default {
    name: 'EsNavBar',
    components: {
        EsButton,
        EsLogo,
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

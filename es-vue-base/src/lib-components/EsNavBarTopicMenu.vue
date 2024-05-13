<template>
    <li
        class="topic-group border-0 mb-lg-200"
        :class="{ 'nav-item': showItemsOnMobile }">
        <!-- desktop header, if it's a link -->
        <es-nav-bar-link
            v-if="link"
            class="dropdown-item nav-link topic-menu-header d-none d-lg-block font-size-sm mb-lg-50 position-relative px-lg-0 py-lg-50 text-gray"
            :href="link"
            :target="newTab ? '_blank' : null">
            <span class="align-items-center eyebrow d-flex link-name">
                {{ name }}
                <icon-arrow-right
                    class="d-none d-lg-inline-block ml-25"
                    height="24px"
                    width="24px" />
            </span>
            <span
                v-if="subHeading"
                class="d-block link-subheading">
                {{ subHeading }}
            </span>
        </es-nav-bar-link>
        <!-- desktop header, if it's not a link -->
        <p
            v-else
            class="dropdown-toggle topic-menu-header eyebrow align-items-center d-none d-lg-block mb-lg-50 position-relative px-lg-0 py-lg-50">
            <span class="d-block">
                {{ name }}
            </span>
            <span
                v-if="subHeading"
                class="d-block">
                {{ subHeading }}
            </span>
        </p>
        <!-- mobile nav item, tapping which drills down to submenu -->
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="checkboxId"
            class="dropdown-label nav-item-border-mobile nav-link align-items-center d-lg-none justify-content-between w-100 h-100 font-weight-bold"
            :class="{
                'd-flex': showItemsOnMobile,
                'd-none': !showItemsOnMobile
            }">
            {{ name }}
            <icon-chevron-right
                class="expand-icon"
                style="height: 24px;" />
        </label>
        <input
            :id="checkboxId"
            :name="checkboxId"
            type="checkbox"
            class="menu-checkbox">
        <div
            class="menu submenu">
            <div class="menu-header">
                <div class="col-3" />
                <div class="col-6 align-self-center text-center py-100">
                    <es-logo
                        width="128px"
                        height="28px" />
                    <span class="sr-only">
                        {{ homeName }}
                    </span>
                </div>
                <div class="d-flex col-3 justify-content-end">
                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label
                        for="data--main-menu"
                        class="mb-0">
                        <icon-x class="menu-toggle align-self-center" />
                        <span class="sr-only">
                            {{ closeButtonText }}
                        </span>
                    </label>
                </div>
            </div>
            <ul
                class="visible-lg list-unstyled"
                style="top: 0;">
                <li class="nav-item col-lg-12 d-lg-none mb-50">
                    <div class="col-2">
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            :for="checkboxId"
                            class="menu-toggle d-flex w-100 h-100 mb-0 align-items-center font-size-sm">
                            <IconArrowLeft
                                class="expand-icon"
                                style="height: 24px;" />
                        </label>
                    </div>
                    <div class="col-8 align-self-center text-center py-100">
                        <es-nav-bar-link
                            v-if="link"
                            class="nav-link font-weight-bold d-flex w-100 h-100 justify-content-center align-items-center"
                            :href="link"
                            :target="newTab ? '_blank' : null">
                            {{ name }}
                        </es-nav-bar-link>
                        <div
                            v-else
                            class="h-100">
                            <span
                                class="nav-item justify-content-center align-items-center d-flex font-weight-boldest h-100 text-decoration-none w-100">
                                {{ name }}
                            </span>
                        </div>
                    </div>
                    <div class="col-2">
                        &nbsp;
                    </div>
                </li>
                <li
                    v-for="item in items"
                    :key="item.name">
                    <es-nav-bar-link
                        class="dropdown-item nav-item nav-item-border-mobile nav-link d-flex align-items-center ml-lg-0 px-lg-0 py-lg-50"
                        :class="{ 'font-weight-bold': item.emphasize }"
                        :href="item.link"
                        :target="item.newTab ? '_blank' : null">
                        {{ item.name }}
                    </es-nav-bar-link>
                </li>
            </ul>
        </div>
        <!-- mobile link, shown only if we have a link and don't want to show child items on mobile -->
        <es-nav-bar-link
            v-if="link"
            class="nav-item nav-item-menu nav-item-border-mobile nav-link d-lg-none w-100 text-decoration-none"
            :class="{
                'd-none': showItemsOnMobile,
                'd-block': !showItemsOnMobile,
            }"
            :href="link"
            :target="newTab ? '_blank' : null">
            <span class="d-block eyebrow link-name">
                {{ name }}
            </span>
            <span
                v-if="subHeading"
                class="d-block font-size-sm link-subheading">
                {{ subHeading }}
            </span>
        </es-nav-bar-link>
    </li>
</template>

<script lang="js">
import EsNavBarLink from './EsNavBarLink.vue';

import EsLogo from '../lib-assets/es-logo.vue';

export default {
    name: 'EsNavBarTopicMenu',
    components: {
        EsLogo,
        EsNavBarLink,
    },
    props: {
        homeName: {
            type: String,
            required: true,
        },
        homeLink: {
            type: String,
            required: true,
        },
        closeButtonText: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
        link: {
            type: String,
            default: '',
        },
        newTab: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        showItemsOnMobile: {
            type: Boolean,
            default: true,
        },
        subHeading: {
            type: String,
            default: '',
        },
    },
    computed: {
        checkboxId() {
            return `topMenu-${this.name}`;
        },
    },
};
</script>

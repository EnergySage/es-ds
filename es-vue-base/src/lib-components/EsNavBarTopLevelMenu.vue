<template>
    <div class="nav-item nav-item-border-mobile top-header mx-0">
        <!-- desktop fly-out menu trigger -->
        <es-nav-bar-link
            v-if="!link"
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
                {{ name }}
            </div>
            <div class="font-weight-light font-size-xs pl-150">
                {{ subHeading }}
            </div>
        </es-nav-bar-link>
        <!-- mobile+desktop top-level link -->
        <es-nav-bar-link
            v-else
            class="nav-link d-flex align-items-center w-100 h-100 px-0 py-lg-150 px-lg-50"
            :href="link"
            :target="newTab ? '_blank' : null">
            <div class="d-flex d-lg-block">
                <icon-calculator
                    v-if="icon === NAV_BAR_ICONS.CALCULATOR"
                    class="d-lg-none mr-50" />
                <div
                    class="d-lg-flex align-items-center eyebrow-lg">
                    {{ name }}
                </div>
                <div class="font-weight-light font-size-xs d-none d-lg-block">
                    {{ subHeading }}
                </div>
            </div>
        </es-nav-bar-link>
        <!-- mobile fly-out menu trigger -->
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            v-if="!link"
            :for="checkboxId"
            class="dropdown-label nav-link d-flex d-lg-none px-0 w-100 h-100 align-items-center
                                    justify-content-between">
            <div class="align-items-center d-flex">
                <div class="mr-50">
                    <icon-light-bulb v-if="icon === NAV_BAR_ICONS.LIGHT_BULB" />
                    <icon-e-s-leaf v-if="icon === NAV_BAR_ICONS.ES_LEAF" />
                </div>
                {{ name }}
            </div>
            <IconChevronRight
                class="expand-icon"
                style="height: 18px;" />
        </label>
        <input
            v-if="!link"
            :id="checkboxId"
            :name="checkboxId"
            type="checkbox"
            class="menu-checkbox">
        <!-- fly-out menu -->
        <div
            v-if="!link"
            class="menu">
            <!-- mobile menu header -->
            <div class="menu-header">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    :for="checkboxId"
                    class="menu-toggle nav-link align-items-center d-flex font-size-sm h-100 mb-0 text-uppercase w-100">
                    <IconChevronLeft height="18px" />
                    {{ mainMenuText }}
                </label>
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
            <div class="dropdown-menu dropdown-menu-full-page">
                <b-container class="dropdown-menu-primary justify-content-lg-center py-lg-100">
                    <b-row class="flex-grow-1 justify-content-lg-center">
                        <div
                            class="mb-3 mb-lg-0"
                            :class="{
                                'col-lg-9': topics.length >= 3,
                                'col-lg-9 col-xl-6 col-xxl-5': topics.length == 2,
                                'col-lg-4': topics.length == 1
                            }">
                            <ul class="dropdown-list row w-auto">
                                <!-- name of top-level menu (won't ever be a link) -->
                                <li class="nav-item col-lg-12 d-lg-none">
                                    <span class="nav-link align-items-center border-bottom d-flex font-weight-bold w-100 h-100">{{ name }}</span>
                                </li>
                                <es-nav-bar-topic-menu
                                    v-for="topic in topics"
                                    :key="topic.name"
                                    :class="{
                                        'col-xl-4': topics.length >= 3,
                                        'col-lg-6': topics.length >= 2,
                                        'col-lg-12': topics.length == 1
                                    }"
                                    :close-button-text="closeButtonText"
                                    :items="topic.subtopics"
                                    :link="topic.link"
                                    :new-tab="topic.newTab"
                                    :name="topic.name" />
                            </ul>
                        </div>
                        <!-- article link with image within menu -->
                        <es-nav-bar-featured-article
                            class="col-lg-3"
                            :eyebrow="featuredArticle.linkName"
                            :link="featuredArticle.linkUrl"
                            :new-tab="featuredArticle.newTab"
                            :name="featuredArticle.lede"
                            :image500="featuredArticle.image500"
                            :image-alt="featuredArticle.imageAlt" />
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import EsNavBarFeaturedArticle from './EsNavBarFeaturedArticle.vue';
import EsNavBarLink from './EsNavBarLink.vue';
import EsNavBarTopicMenu from './EsNavBarTopicMenu.vue';
import { NAV_BAR_ICONS } from '../lib-utils/nav-bar-constants';

export default {
    name: 'EsNavBarTopLevelMenu',
    components: {
        EsNavBarFeaturedArticle,
        EsNavBarLink,
        EsNavBarTopicMenu,
    },
    props: {
        closeButtonText: {
            type: String,
            required: true,
        },
        featuredArticle: {
            type: Object,
            default: () => ({}),
        },
        icon: {
            type: String,
            default: '',
        },
        topics: {
            type: Array,
            default: () => [],
        },
        link: {
            type: String,
            default: '',
        },
        mainMenuText: {
            type: String,
            required: true,
        },
        newTab: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        subHeading: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            NAV_BAR_ICONS,
        };
    },
    computed: {
        checkboxId() {
            return `menu-${this.name}`;
        },
    },
};
</script>

<template>
    <li class="nav-item nav-item-border-mobile top-header mx-0">
        <!-- desktop fly-out menu trigger -->
        <a
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
        </a>
        <!-- mobile+desktop top-level link -->
        <a
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
        </a>
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
                    class="menu-toggle nav-link align-items-center d-flex font-size-sm mb-0 w-100 h-100">
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
                <b-container class="dropdown-menu-primary justify-content-lg-center py-lg-100">
                    <b-row class="flex-grow-1 justify-content-lg-center">
                        <div
                            class="mb-3 mb-lg-0"
                            :class="{
                                'col-lg-9': topics.length > 3,
                                'col-lg-4': topics.length <= 3
                            }">
                            <ul
                                class="dropdown-list row w-auto"
                                :aria-labelledby="checkboxId">
                                <!-- name of top-level menu (won't ever be a link) -->
                                <li class="nav-item col-lg-12 d-lg-none">
                                    <span class="nav-link align-items-center border-bottom d-flex font-weight-bold w-100 h-100">{{ name }}</span>
                                </li>
                                <es-nav-bar-topic-menu
                                    v-for="topic in topics"
                                    :key="topic.name"
                                    :class="{
                                        'col-lg-6 col-xl-4': topics.length > 3,
                                        'col-lg-12': topics.length <= 3
                                    }"
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
                            :name="featuredArticle.lede" />
                    </b-row>
                </b-container>
            </div>
        </div>
    </li>
</template>

<script lang="js">
import EsNavBarFeaturedArticle from './EsNavBarFeaturedArticle.vue';
import EsNavBarTopicMenu from './EsNavBarTopicMenu.vue';
import { NAV_BAR_ICONS } from '../lib-utils/es-nav-bar-constants';

export default {
    name: 'EsNavBarTopLevelMenu',
    components: {
        EsNavBarFeaturedArticle,
        EsNavBarTopicMenu,
    },
    props: {
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

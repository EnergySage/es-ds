<template>
    <div
        class="nav-item top-header mx-0"
        :class="{ 'has-dropdown': !link }">
        <div class="top-header-inner w-100">
            <!-- desktop link and fly-out menu trigger -->
            <es-nav-bar-link
                class="nav-link d-none d-lg-block py-100 font-weight-bolder"
                :class="{ 'dropdown-toggle': !link }"
                :href="link || '#'"
                :data-toggle="link ? undefined : 'dropdown'"
                :aria-haspopup="link ? undefined : true"
                :aria-expanded="link ? undefined : false"
                :target="link && newTab ? '_blank' : undefined">
                <div class="d-lg-flex align-items-center">
                    {{ name }}
                </div>
            </es-nav-bar-link>
            <!-- mobile link and fly-out menu trigger -->
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <component
                :is="link ? 'es-nav-bar-link' : 'label'"
                class="nav-link d-flex d-lg-none align-items-center w-100 h-100 px-0 py-lg-100 px-100 font-weight-bold justify-content-between"
                :class="{ 'dropdown-label': !link }"
                :for="link ? undefined : checkboxId"
                :href="link || undefined"
                :target="newTab ? '_blank' : undefined">
                <div class="align-items-center d-flex">
                    {{ name }}
                </div>
                <IconArrowRight
                    v-if="!link"
                    class="expand-icon"
                    style="height: 24px;" />
            </component>
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
                    <div class="col-3" />
                    <div class="col-6 align-self-center text-center py-100">
                        <div class="nav-es-logo-mobile align-items-center d-flex">
                            <slot name="logo" />
                        </div>
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
                                    <li class="nav-item col-lg-12 d-lg-none mb-50 topic-menu-back">
                                        <div class="col-2">
                                            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                                            <label
                                                :for="checkboxId"
                                                class="menu-toggle nav-link align-items-center d-flex font-size-sm h-100 mb-0 px-0 text-uppercase w-100">
                                                <IconArrowLeft
                                                    class="expand-icon"
                                                    style="height: 24px;" />
                                            </label>
                                        </div>
                                        <div class="col-8 align-self-center text-center py-100">
                                            <span class="nav-link justify-content-center align-items-center d-flex font-weight-boldest w-100 h-100">{{ name }}</span>
                                        </div>
                                        <div class="col-2" />
                                    </li>
                                    <es-nav-bar-topic-menu
                                        v-for="topic in topics"
                                        :key="topic.name"
                                        :class="{
                                            'col-xl-4': topics.length >= 3,
                                            'col-lg-6': topics.length >= 2,
                                            'col-lg-12': topics.length == 1
                                        }"
                                        :home-name="homeName"
                                        :home-link="homeLink"
                                        :close-button-text="closeButtonText"
                                        :items="topic.subtopics"
                                        :link="topic.link"
                                        :new-tab="topic.newTab"
                                        :name="topic.name">
                                        <template #logo>
                                            <slot name="logo" />
                                        </template>
                                    </es-nav-bar-topic-menu>
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
    </div>
</template>

<script lang="js">
import EsNavBarFeaturedArticle from './EsNavBarFeaturedArticle.vue';
import EsNavBarLink from './EsNavBarLink.vue';
import EsNavBarTopicMenu from './EsNavBarTopicMenu.vue';

export default {
    name: 'EsNavBarTopLevelMenu',
    components: {
        EsNavBarFeaturedArticle,
        EsNavBarLink,
        EsNavBarTopicMenu,
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
    computed: {
        checkboxId() {
            return `menu-${this.name}`;
        },
    },
};
</script>

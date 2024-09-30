<script lang="js">
export default {
    name: 'EsNavBarProductMenu',
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
        items: {
            type: Array,
            default: () => [],
        },
        link: {
            type: String,
            required: true,
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
        seeAllText: {
            type: String,
            required: true,
        },
        topics: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        checkboxId() {
            return `productMenu-${this.name}`;
        },
    },
};
</script>

<template>
    <div class="dropdown nav-item nav-item-border-mobile">
        <!-- desktop product link / hover menu trigger -->
        <es-nav-bar-link
            class="product-menu-header-link dropdown-toggle d-none d-lg-block px-lg-100 px-xl-200 py-lg-0 text-decoration-none"
            :href="link"
            :target="newTab ? '_blank' : null"
            aria-haspopup="true"
            aria-expanded="false">
            <span class="product-menu-header-text d-block position-relative pb-lg-50">
                {{ name }}
            </span>
        </es-nav-bar-link>
        <!-- mobile flyout menu trigger -->
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="checkboxId"
            class="dropdown-label nav-link d-flex d-lg-none align-items-center justify-content-between w-100 h-100 px-100 font-weight-bold">
            {{ name }}
            <icon-chevron-right
                class="expand-icon"
                style="height: 24px" />
        </label>
        <input
            :id="checkboxId"
            :name="checkboxId"
            type="checkbox"
            class="menu-checkbox" />
        <div class="menu">
            <div class="menu-header d-flex d-lg-none">
                <div class="col-3" />
                <div class="col-6 align-self-center text-center py-100">
                    <div class="nav-es-logo-mobile align-items-center d-flex">
                        <slot name="logo" />
                    </div>
                    <span class="sr-only">
                        {{ homeName }}
                    </span>
                </div>
                <!-- closes the entire mobile nav menu -->
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
            <!-- mobile+desktop flyout menu -->
            <!-- TODO: does anything match this aria-labelledby id? -->
            <ul
                v-if="items && items.length"
                class="product-menu-flyout dropdown-menu row border-0 mt-0 py-lg-100">
                <!-- mobile subnav header -->
                <li class="nav-link col-lg-12 d-lg-none mb-50">
                    <div class="col-2">
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            :for="checkboxId"
                            class="menu-toggle nav-link align-items-center d-flex font-size-sm h-100 mb-0 px-0 text-uppercase w-100">
                            <icon-arrow-left
                                class="expand-icon"
                                style="height: 24px" />
                        </label>
                    </div>
                    <div class="col-8 align-self-center text-center py-100">
                        <!--
                        <es-nav-bar-link
                            class="font-weight-boldest text-gray-900"
                            :href="link">
                            {{ name }}
                        </es-nav-bar-link>
                        <span class="font-weight-boldest text-gray-900">{{ name }}</span>
                        -->
                        <span
                            class="nav-link justify-content-center align-items-center d-flex font-weight-boldest w-100 h-100"
                            >{{ name }}</span
                        >
                    </div>
                    <div class="col-2" />
                </li>
                <!-- subnav items -->
                <li
                    v-for="item in items"
                    :key="item.name">
                    <es-nav-bar-link
                        class="dropdown-item nav-item nav-item-border-mobile nav-link align-items-center d-flex px-lg-100 py-lg-50 product-menu-link"
                        :class="{ 'font-weight-bold': item.emphasize }"
                        :href="item.link"
                        :target="item.newTab ? '_blank' : null">
                        {{ item.name }}
                    </es-nav-bar-link>
                </li>
            </ul>
            <div
                v-if="topics && topics.length"
                class="product-menu-flyout product-menu-flyout--large dropdown-menu border-0 flex-wrap mt-0 p-lg-150">
                <div class="nav-item d-lg-none mb-50">
                    <!-- mobile subnav header -->
                    <div class="col-2">
                        <!-- closes this menu level -->
                        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                        <label
                            :for="checkboxId"
                            class="menu-toggle nav-link align-items-center d-flex font-size-sm h-100 mb-0 px-0 text-uppercase w-100">
                            <icon-arrow-left
                                class="expand-icon"
                                style="height: 24px" />
                        </label>
                    </div>
                    <div class="col-8 align-self-center text-center py-100">
                        <p
                            class="align-items-center d-flex d-lg-none font-weight-bold justify-content-between mb-0 text-decoration-none w-100">
                            <span
                                class="nav-link justify-content-center align-items-center d-flex font-weight-boldest w-100 h-100"
                                >{{ name }}</span
                            >
                        </p>
                    </div>
                    <div class="col-2" />
                </div>
                <b-row
                    tag="ul"
                    class="d-block d-lg-flex list-unstyled">
                    <es-nav-bar-topic-menu
                        v-for="topic in topics"
                        :key="topic.name"
                        class="col-lg-4 d-block"
                        :home-name="homeName"
                        :home-link="homeLink"
                        :close-button-text="closeButtonText"
                        :items="topic.subtopics"
                        :link="topic.link"
                        :new-tab="topic.newTab"
                        :name="topic.name"
                        :show-items-on-mobile="topic.showItemsOnMobile"
                        :sub-heading="topic.subHeading">
                        <template #logo>
                            <slot name="logo" />
                        </template>
                    </es-nav-bar-topic-menu>
                    <li class="nav-item col-lg-4 d-block h-auto my-100 my-lg-0">
                        <es-nav-bar-featured-article
                            :eyebrow="featuredArticle.eyebrow"
                            :link="featuredArticle.link"
                            :name="featuredArticle.name"
                            :image500="featuredArticle.image500"
                            :image-alt="featuredArticle.imageAlt" />
                    </li>
                </b-row>
            </div>
        </div>
    </div>
</template>

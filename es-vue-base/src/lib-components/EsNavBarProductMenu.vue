<template>
    <li class="dropdown nav-item nav-item-border-mobile">
        <!-- desktop product link / hover menu trigger -->
        <a
            class="product-menu-header-link dropdown-toggle d-none d-lg-block px-lg-100 px-xl-200 py-lg-0 text-decoration-none text-gray"
            :href="link"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            <span class="product-menu-header-text d-block position-relative py-lg-50">
                {{ name }}
            </span>
        </a>
        <!-- mobile flyout menu trigger -->
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="checkboxId"
            class="dropdown-label nav-link d-flex d-lg-none align-items-center
                                    justify-content-between w-100 h-100 px-0 font-weight-bold">
            {{ name }}
            <icon-chevron-right
                class="expand-icon"
                style="height: 18px;" />
        </label>
        <input
            :id="checkboxId"
            :name="checkboxId"
            type="checkbox"
            class="menu-checkbox">
        <div class="menu">
            <div class="menu-header d-flex d-lg-none">
                <!-- closes this menu level -->
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    :for="checkboxId"
                    class="menu-toggle nav-link d-flex w-100 h-100 mb-0 align-items-center
                                            font-size-sm">
                    <IconChevronLeft height="18px" />
                    MAIN MENU
                </label>
                <!-- closes the entire mobile nav menu -->
                <div class="d-flex col-3 justify-content-end">
                    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                    <label
                        for="data--main-menu"
                        class="mb-0">
                        <IconX class="menu-toggle align-self-center" />
                    </label>
                </div>
            </div>
            <!-- mobile+desktop flyout menu -->
            <!-- TODO: does anything match this aria-labelledby id? -->
            <ul
                v-if="items && items.length"
                class="product-menu-flyout dropdown-menu row border-0 mt-0 py-lg-100"
                :aria-labelledby="`menu-${name}`">
                <li
                    class="nav-item nav-item-border-mobile nav-link align-items-center d-flex d-lg-none font-weight-bold w-100">
                    {{ name }}
                </li>
                <li
                    v-for="item in items"
                    :key="item.name">
                    <a
                        class="dropdown-item nav-item nav-item-border-mobile nav-link align-items-center d-flex px-lg-100 py-lg-50"
                        :href="item.link">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
            <div
                v-if="topics && topics.length"
                class="product-menu-flyout product-menu-flyout--large dropdown-menu row border-0 mt-0 p-lg-100">
                <p
                    class="nav-item nav-item-border-mobile nav-link align-items-center d-flex d-lg-none font-weight-bold mb-0 w-100">
                    {{ name }}
                </p>
                <b-row>
                    <es-nav-bar-topic-menu
                        v-for="topic in topics"
                        :key="topic.name"
                        class="col-lg-4"
                        :items="topic.subtopics"
                        :link="topic.link"
                        :name="topic.name"
                        :show-items-on-mobile="topic.showItemsOnMobile"
                        :sub-heading="topic.subHeading" />
                    <es-nav-bar-featured-article
                        class="col-lg-4 m-100 m-lg-0"
                        :eyebrow="featuredArticle.eyebrow"
                        :link="featuredArticle.link"
                        :name="featuredArticle.name" />
                </b-row>
            </div>
        </div>
    </li>
</template>

<script lang="js">
import EsNavBarFeaturedArticle from './EsNavBarFeaturedArticle.vue';
import EsNavBarTopicMenu from './EsNavBarTopicMenu.vue';

export default {
    name: 'EsNavBarProductMenu',
    components: {
        EsNavBarFeaturedArticle,
        EsNavBarTopicMenu,
    },
    props: {
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
        name: {
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

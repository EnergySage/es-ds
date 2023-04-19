<template>
    <li class="nav-item nav-item-border-mobile top-header">
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
            :href="link">
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
                                <li class="nav-item nav-item-border-mobile nav-link align-items-center d-flex d-lg-none font-weight-bold ml-50 w-100">
                                    {{ name }}
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
                                    :name="topic.name" />
                            </ul>
                        </div>
                        <!-- article link with image within menu -->
                        <div class="col-lg-3 dropdown-cta-right">
                            <div class="font-size-50 p-lg-100">
                                <a
                                    class="d-block cta-link"
                                    :href="featuredArticle.linkUrl"
                                    :title="featuredArticle.linkName">
                                    <nav-energy-tips
                                        width="253px"
                                        height="190px"
                                        class="mb-100" />
                                    <div class="eyebrow mb-50">
                                        {{ featuredArticle.linkName }}
                                    </div>

                                    <p class="font-weight-bold">
                                        {{ featuredArticle.lede }}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </b-row>
                </b-container>

                <!-- CTA banner at bottom of the nav for logged-out users -->
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
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsNavBarTopicMenu from './EsNavBarTopicMenu.vue';
import NavEnergyTips from '../lib-assets/nav-energy-tips.vue';
import { NAV_BAR_ICONS } from '../lib-utils/es-nav-bar-constants';

export default {
    name: 'EsNavBarTopLevelMenu',
    components: {
        EsButton,
        EsNavBarTopicMenu,
        NavEnergyTips,
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

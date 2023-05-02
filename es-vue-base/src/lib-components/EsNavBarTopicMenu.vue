<template>
    <li
        class="topic-group border-0 mb-lg-200"
        :class="{ 'nav-item': showItemsOnMobile }">
        <!-- desktop header, if it's a link -->
        <a
            v-if="link"
            class="dropdown-item nav-link topic-menu-header d-none d-lg-block font-size-50 mb-lg-50 position-relative px-lg-0 py-lg-50 text-gray"
            :href="link"
            :target="newTab ? '_blank' : null">
            <span class="align-items-center eyebrow d-flex font-size-50 font-weight-bolder text-gray">
                {{ name }}
                <icon-arrow-right
                    class="d-none d-lg-inline-block ml-25"
                    height="14px"
                    width="14px" />
            </span>
            <span
                v-if="subHeading"
                class="d-block font-italic">
                {{ subHeading }}
            </span>
        </a>
        <!-- desktop header, if it's not a link -->
        <p
            v-else
            class="dropdown-toggle topic-menu-header eyebrow align-items-center d-none d-lg-block font-size-50 font-weight-bolder mb-lg-50 position-relative px-lg-0 py-lg-50 text-gray">
            <span class="d-block">
                {{ name }}
            </span>
            <span
                v-if="subHeading"
                class="d-block font-italic">
                {{ subHeading }}
            </span>
        </p>
        <!-- mobile nav item, tapping which drills down to submenu -->
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="checkboxId"
            class="dropdown-label nav-link align-items-center border-bottom d-lg-none justify-content-between w-100 h-100"
            :class="{
                'd-flex': showItemsOnMobile,
                'd-none': !showItemsOnMobile
            }">
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
        <div
            class="menu submenu">
            <div class="menu-header">
                <!-- vuejs-accessibility/label-has-for -->
                <!-- eslint-disable-next-line -->
                <label
                    :for="checkboxId"
                    class="menu-toggle d-flex w-100 h-100 mb-0
                                                                    align-items-center font-size-sm">
                    <div
                        class="nav-link text-uppercase">
                        <IconChevronLeft height="18px" />
                        {{ name }}
                    </div>
                </label>
                <div class="d-flex col-3 justify-content-end">
                    <!-- vuejs-accessibility/label-has-for -->
                    <!-- eslint-disable-next-line -->
                    <label
                        for="data--main-menu"
                        class="mb-0">
                        <icon-x class="menu-toggle align-self-center" />
                        <span class="sr-only">Close</span>
                    </label>
                </div>
            </div>
            <ul
                class="visible-lg"
                style="list-style: none; padding-left: 0; top: 0;">
                <li class="d-lg-none">
                    <a
                        v-if="link"
                        class="nav-item nav-item-border-mobile nav-link font-weight-bold d-flex w-100 align-items-center ml-50"
                        :href="link"
                        :target="newTab ? '_blank' : null">
                        {{ name }}
                    </a>
                    <div
                        v-else
                        class="nav-item nav-item-border-mobile nav-link text-decoration-none font-weight-bold d-flex w-100 align-items-center">
                        {{ name }}
                    </div>
                </li>
                <li
                    v-for="item in items"
                    :key="item.name">
                    <a
                        class="dropdown-item nav-item nav-item-border-mobile nav-link d-flex align-items-center ml-50 ml-lg-0 px-lg-0 py-lg-50"
                        :class="{ 'font-weight-bold': item.emphasize }"
                        :href="item.link"
                        :target="newTab ? '_blank' : null">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </div>
        <!-- mobile link, shown only if we have a link and don't want to show child items on mobile -->
        <a
            v-if="link"
            class="nav-item nav-item-border-mobile nav-link d-lg-none w-100"
            :class="{
                'd-none': showItemsOnMobile,
                'd-block': !showItemsOnMobile
            }"
            :href="link"
            :target="newTab ? '_blank' : null">
            <span class="d-block">
                {{ name }}
            </span>
            <span
                v-if="subHeading"
                class="d-block font-italic">
                {{ subHeading }}
            </span>
        </a>
    </li>
</template>

<script lang="js">
export default {
    name: 'EsNavBarTopicMenu',
    props: {
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

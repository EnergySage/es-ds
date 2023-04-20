<template>
    <li class="nav-item topic-group border-0 mb-lg-200">
        <a
            v-if="link"
            class="dropdown-item dropdown-toggle nav-link topic-menu-header eyebrow align-items-center d-none d-lg-flex font-size-50 font-weight-bolder mb-lg-50 position-relative px-lg-0 py-lg-100 text-gray"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            :href="link">
            {{ name }}
            <icon-arrow-right
                class="d-none d-lg-inline-block ml-25"
                height="14px"
                width="14px" />
        </a>
        <p
            v-else
            class="dropdown-toggle topic-menu-header eyebrow align-items-center d-none d-lg-block font-size-50 font-weight-bolder mb-lg-50 position-relative px-lg-0 py-lg-100 text-gray">
            {{ name }}
        </p>
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="checkboxId"
            class="dropdown-label nav-link align-items-center border-bottom d-flex d-lg-none justify-content-between w-100 h-100">
            {{ name }}
            <IconChevronRight
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
                        <IconX class="menu-toggle align-self-center" />
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
                        :href="link">
                        {{ name }}
                    </a>
                    <div
                        v-else
                        class="nav-item nav-item-border-mobile nav-link font-weight-bold d-flex w-100 align-items-center">
                        {{ name }}
                    </div>
                </li>
                <li
                    v-for="item in items"
                    :key="item.name">
                    <a
                        class="dropdown-item nav-item nav-item-border-mobile nav-link d-flex align-items-center ml-50 ml-lg-0 px-lg-0 py-lg-50"
                        :href="item.link">
                        {{ item.name }}
                    </a>
                </li>
            </ul>
        </div>
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

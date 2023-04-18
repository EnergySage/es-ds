<template>
    <li
        class="nav-item dropdown">
        <a
            class="nav-link dropdown-toggle d-none d-lg-block"
            href="#"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            {{ name }}
        </a>
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="checkboxId"
            class="dropdown-label nav-link d-flex d-lg-none align-items-center
                                    justify-content-between w-100 h-100 px-0 font-weight-bold">
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
        <div class="menu">
            <div class="menu-header">
                <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
                <label
                    :for="checkboxId"
                    class="menu-toggle nav-link d-flex w-100 h-100 mb-0 align-items-center
                                            font-size-sm">
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
            <ul
                class="row dropdown-menu mt-0"
                :aria-labelledby="`menu-${name}`">
                <li
                    class="d-lg-none nav-item nav-link font-weight-bold d-flex w-100
                                            align-items-center">
                    {{ name }}
                </li>
                <li
                    v-for="item in items"
                    :key="item.name">
                    <a
                        class="dropdown-item nav-item nav-link d-flex align-items-center"
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
    name: 'EsNavBarProductMenu',
    props: {
        name: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },
    computed: {
        checkboxId() {
            return `productMenu-${this.name}`;
        },
    },
};
</script>

<script setup lang="ts">
import PrimevueMenu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';

interface EsNavigationProductMenuItemInterface {
    link: string;
    name: string;
}

interface EsNavigationProductMenuInterface extends EsNavigationProductMenuItemInterface {
    items: EsNavigationProductMenuItemInterface[];
}

const props = defineProps<{
    product: EsNavigationProductMenuInterface;
}>();

const isMenuExpanded = ref(false);
const menuRef = useTemplateRef('menu');

const menuItems: MenuItem[] | undefined = props.product.items?.length
    ? props.product.items.map((item) => ({
          label: item.name,
          url: item.link,
      }))
    : undefined;

const handleButtonClick = (e: any) => {
    if (menuRef.value) {
        menuRef.value.show(e);
        isMenuExpanded.value = true;
    }
};

const onLinkMouseLeave = (e: any) => {
    if (menuRef.value) {
        //menuRef.value.toggle(e);
    }
};

const onMenuBlur = () => {
    isMenuExpanded.value = false;
};

const onMenuFocus = () => {
    isMenuExpanded.value = true;
};
</script>

<template>
    <div class="es-navigation-product-menu align-items-center d-flex">
        <nuxt-link
            :aria-expanded="isMenuExpanded"
            :aria-haspopup="!!menuItems"
            role="menuitem"
            class="es-navigation-product-menu-link d-block text-center"
            :class="{ active: isMenuExpanded }"
            :href="props.product.link">
            <span class="es-navigation-product-menu-text d-inline-block position-relative pb-50">
                {{ props.product.name }}
            </span>
        </nuxt-link>
        <es-button
            class="pl-50 pb-50 text-dark-blue"
            inline
            size="sm"
            variant="link"
            @click="handleButtonClick">
            <icon-chevron-down />
        </es-button>
        <primevue-menu
            v-if="menuItems"
            ref="menu"
            :model="menuItems"
            popup
            :pt="{
                menu: 'es-navigation-product-menu-menu bg-white',
            }"
            @blur="onMenuBlur"
            @focus="onMenuFocus" />
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

.es-navigation-product-menu {
    &:last-child {
        .es-navigation-product-menu-link {
            text-align: right !important;
        }
    }

    &-link {
        color: variables.$dark-blue;
        font-weight: variables.$font-weight-semibold;

        &:hover {
            text-decoration: none;

            .es-navigation-product-menu-text {
                &::after {
                    border-bottom: 2px solid variables.$warm-orange;
                    bottom: 0;
                    content: '';
                    left: 0;
                    position: absolute;
                    right: 0;
                }
            }
        }
    }

    &-menu {
    }
}
</style>

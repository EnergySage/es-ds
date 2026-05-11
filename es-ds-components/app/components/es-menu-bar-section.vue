<script setup lang="ts">
import { NavigationMenuList } from 'reka-ui';

interface IProps {
    heading?: string;
}
withDefaults(defineProps<IProps>(), {
    heading: '',
});
</script>

<template>
    <es-col
        md="6"
        lg="4"
        xl="3">
        <h2
            v-if="heading"
            class="eyebrow">
            {{ heading }}
        </h2>
        <navigation-menu-list class="list-unstyled">
            <slot />
        </navigation-menu-list>
    </es-col>
</template>

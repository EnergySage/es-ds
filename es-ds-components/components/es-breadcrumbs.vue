<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';

const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
});
const route = useRoute();
const model = computed(() => {
    if (!props.items) {
        return [];
    }

    return props.items.map((item) => ({
        ...item,
        // mark breadcrumb as active if manually set or if it matches this route
        active: item.active || route.path === item.to || route.path === item.href,
        label: item.text,
        url: item.href,
    }));
});
</script>

<template>
    <breadcrumb
        :model="model"
        :pt="{
            menu: 'breadcrumb',
            menuitem: 'breadcrumb-item'
        }">
        <!-- eslint-disable vue/no-unused-vars -->
        <!-- eslint-disable vue/no-template-shadow -->
        <template #item="{ item, props }">
            <!--
                primevue breadcrumb doesn't support an active non-link state out of the box,
                so we have to implement it via this slot
                https://v3.primevue.org/breadcrumb/#api.options.MenuItem
            -->
            <span
                v-if="item.active"
                aria-current="location"
                class="font-weight-bold">
                {{ item.label }}
            </span>
            <!--
                primevue breadcrumb doesn't support NuxtLink out of the box,
                so we have to implement it via this slot
                https://v3.primevue.org/breadcrumb/#router
            -->
            <nuxt-link
                v-else-if="item.to"
                :to="item.to">
                {{ item.label }}
            </nuxt-link>
            <a
                v-else-if="item.url"
                :href="item.url"
                :target="item.target">
                {{ item.label }}
            </a>
            <span v-else>
                {{ item.label }}
            </span>
        </template>
        <template #separator>
            <span
                aria-hidden
                class="mx-50">/</span>
        </template>
    </breadcrumb>
</template>

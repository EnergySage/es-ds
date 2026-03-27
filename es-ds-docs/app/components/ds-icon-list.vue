<script setup lang="ts">
interface IconMetadata {
    name: string;
    component: any;
    phosphorName?: string;
}

interface IProps {
    icons: IconMetadata[];
    isDarkBackgroundActive?: boolean;
    showPhosphorName?: boolean;
}

withDefaults(defineProps<IProps>(), {
    isDarkBackgroundActive: false,
    showPhosphorName: false,
});
</script>

<template>
    <ul class="ds-icon-list list-unstyled">
        <li
            v-for="icon in icons"
            :key="icon.name"
            class="ds-icon-list-item align-items-center d-flex mb-50">
            <span
                class="d-flex px-100 py-50 rounded-sm"
                :class="{
                    'bg-dark-blue text-white': isDarkBackgroundActive,
                }">
                <component :is="icon.component" />
            </span>
            <span class="font-size-75 font-size-lg-100 ml-50">
                {{ icon.name }}
                <a
                    v-if="showPhosphorName && icon.phosphorName"
                    class="d-block font-italic font-size-50 text-muted"
                    :href="`https://phosphoricons.com/?q=${icon.phosphorName.replace(/-/g, '+')}`"
                    target="_blank">
                    {{ icon.phosphorName }}
                </a>
            </span>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

.ds-icon-list {
    column-count: 2;

    @include breakpoints.media-breakpoint-up(md) {
        column-count: 3;
    }

    @include breakpoints.media-breakpoint-up(xxl) {
        column-count: 4;
    }
}

.ds-icon-list-item {
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
}
</style>

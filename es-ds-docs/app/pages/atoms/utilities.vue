<script setup lang="ts">
import utilityClasses from '~/data/utility-classes.json';
</script>

<template>
    <div>
        <h1>Utilities</h1>
        <p>
            Utility classes are single-purpose CSS classes that provide a simple way to style an element without having to write custom CSS. They hook into our predefined spacing, sizing, and color scales, and they prevent the CSS that ships with an app from scaling with each new feature added. Here is a full list utility classes available.
        </p>

        <div class="category-list my-400">
            <h2>
                Active
            </h2>
            <div v-for="category in utilityClasses.categories" :key="category.name" class="category">
                <h2 class="bg-soft-blue font-size-75 mb-0 ml-n50 px-50 py-25 rounded">
                    {{ category.name }}
                </h2>
                <ul class="category-classes font-size-75 list-unstyled">
                    <li v-for="classData in category.classes" :key="classData.name">
                        {{ classData.display || classData.name }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="category-list my-400">
            <h2>
                Deprecated
            </h2>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

.category-classes {
    columns: 1;
    column-gap: variables.$spacer * 2;

    @include breakpoints.media-breakpoint-up(sm) {
        columns: 2;
    }

    @include breakpoints.media-breakpoint-up(md) {
        columns: 3;
    }

    @include breakpoints.media-breakpoint-up(lg) {
        columns: 4;
    }

    @include breakpoints.media-breakpoint-up(xl) {
        columns: 4;
    }

    @include breakpoints.media-breakpoint-up(xxl) {
        columns: 5;
    }
}

.category {
    break-inside: avoid;
}
</style>

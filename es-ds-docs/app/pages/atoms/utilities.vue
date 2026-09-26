<script setup lang="ts">
import utilityClasses from '~/data/utility-classes.json';
</script>

<template>
    <div>
        <h1>Utilities</h1>
        <p>
            Utility classes are single-purpose CSS classes that provide a simple way to style an element without having
            to write custom CSS. They hook into our predefined spacing, sizing, and color scales, and they prevent the
            CSS that ships with an app from scaling with each new feature added. Here is a full list utility classes
            available.
        </p>

        <div class="my-400">
            <div
                v-for="category in utilityClasses.categories"
                :key="category.name">
                <h2 class="category-heading bg-soft-blue font-size-75 mb-0 ml-n50 position-sticky px-50 py-25 rounded">
                    {{ category.name }}
                </h2>
                <ul class="category-classes font-size-75 list-unstyled">
                    <li
                        v-for="classData in category.classes"
                        :key="classData.name">
                        {{ classData.display || classData.name }}
                    </li>
                </ul>
            </div>
        </div>

        <es-collapse>
            <template #title>
                <h2 class="mb-0">Deprecated classes</h2>
            </template>

            <div
                v-for="category in utilityClasses.deprecated"
                :key="category.name">
                <h3 class="category-heading bg-soft-blue font-size-75 mb-0 px-50 py-25 rounded">
                    {{ category.name }}
                </h3>
                <es-data-table-simple
                    table-class="font-size-75"
                    striped>
                    <thead>
                        <tr>
                            <th class="py-50">Class name</th>
                            <th class="py-50">Replace with</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="classData in category.classes"
                            :key="classData.name">
                            <td class="py-25">{{ classData.name }}</td>
                            <td class="py-25">{{ classData.replaceWith }}</td>
                        </tr>
                    </tbody>
                </es-data-table-simple>
            </div>
        </es-collapse>
    </div>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;
@use '@energysage/es-ds-styles/scss/variables' as variables;

.category-heading {
    top: 0;
}

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
</style>

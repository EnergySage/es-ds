<script setup lang="ts">
import Column from 'primevue/column';
import type { ComponentOptionsMixin } from 'vue';

// magic solution for wrapping Column successfully
// https://www.reddit.com/r/vuejs/comments/1g17u7u/comment/lvjv91h/
defineOptions({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Column',
    extends: (Column as unknown as ComponentOptionsMixin).extends,
    inheritAttrs: false,
});
</script>

<!-- eslint-disable vue/valid-template-root -->
<template>
    <!--
    While this file needs to exist to keep Nuxt happy, it doesn't actually do anything.
    Instances of es-data-table-column are placed inside es-data-table, and es-data-table handles their display.
    -->
</template>

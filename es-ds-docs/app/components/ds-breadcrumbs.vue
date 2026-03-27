<script setup lang="ts">
const route = useRoute();

const breadcrumbs = computed(() => {
    let pathSoFar = '';
    const paths = route.path.split('/');

    // Set removes dupes from path
    return [...new Set(paths)].map((path) => {
        pathSoFar += path ? `/${path}` : '';

        let text = 'Home';
        // Convert to CamelCase to be in line with component naming
        if (path) {
            text = path.replace(/-([a-z])/g, (g) => ` ${g[1]}`);
            text = text[0]!.toUpperCase() + text.slice(1);
        }
        return {
            text,
            to: pathSoFar || '/',
        };
    });
});
</script>

<template>
    <es-breadcrumbs :items="breadcrumbs" />
</template>

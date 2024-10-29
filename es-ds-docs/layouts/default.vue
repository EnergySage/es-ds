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
            text = text[0].toUpperCase() + text.slice(1);
        }
        return {
            text,
            to: pathSoFar || '/',
        };
    });
});
</script>

<template>
    <div class="d-flex justify-content-center">
        <es-container class="pt-100 mx-0">
            <es-row>
                <es-col
                    class="d-none d-xl-block"
                    xl="3">
                    <div class="ds-side-nav flex-shrink-0">
                        <ds-link-list />
                    </div>
                </es-col>
                <es-col xl="9">
                    <div class="mb-100">
                        <es-breadcrumbs :items="breadcrumbs" />
                    </div>
                    <div class="mb-300">
                        <slot />
                    </div>
                </es-col>
            </es-row>
        </es-container>
    </div>
</template>

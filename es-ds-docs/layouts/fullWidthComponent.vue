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
    <!--
        use this layout only for components that are meant to appear at full page width,
        and therefore need more horizontal space than 9 columns on large desktop
        to showcase what it will look like on a real page
    -->
    <div>
        <div class="d-flex justify-content-center">
            <div class="ds-side-nav d-none d-xl-block flex-shrink-0 p-100">
                <ds-link-list />
            </div>
            <es-container class="pt-xl-100 mx-0">
                <es-row class="mb-100">
                    <es-col cols="12">
                        <es-breadcrumbs :items="breadcrumbs" />
                    </es-col>
                </es-row>
                <es-row>
                    <es-col
                        class="mb-300"
                        cols="12">
                        <slot />
                    </es-col>
                </es-row>
            </es-container>
        </div>
    </div>
</template>

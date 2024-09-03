<<<<<<< HEAD
=======
<template>
    <div class="d-flex justify-content-center">
        <b-container class="pt-100 mx-0">
            <b-row>
                <b-col class="d-none d-xl-block" xl="3">
                    <div class="ds-side-nav flex-shrink-0">
                        <ds-link-list />
                    </div>
                </b-col>
                <b-col xl="9">
                    <div class="mb-100">
                        <es-breadcrumbs :items="breadcrumbs" />
                    </div>
                    <div class="mb-300">
                        <slot />
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

>>>>>>> esds-3.0-vue3-primevue
<script setup>

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
    <div>
        <div class="d-flex justify-content-center">
            <div class="ds-side-nav d-none d-xl-block flex-shrink-0 p-100">
                <ds-link-list />
            </div>
            <b-container class="pt-xl-100 mx-0">
                <b-row class="mb-100">
                    <b-col cols="12">
                        <es-breadcrumbs :items="breadcrumbs" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        class="mb-300"
                        cols="12">
                        <slot />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

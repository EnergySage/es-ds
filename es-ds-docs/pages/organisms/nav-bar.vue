<script setup>
definePageMeta({
    layout: 'nav',
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
const navScriptSource = ref(null);

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-nav-bar.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);

        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./nav-bar.vue?raw');
        docCode.value = $prism.normalizeCode(docSource.default);

        const compSourceText = compSource.default;
        const scriptRegex = /\/\/ CUSTOM GLOBAL-NAV SCRIPT STARTS([\s\S]+)\/\/ CUSTOM GLOBAL-NAV SCRIPT ENDS/;
        navScriptSource.value = [
            ...compSourceText.match(scriptRegex)[0]
        ];

        $prism.highlight();
    }
});
</script>

<template>
    <h1>
        EsNavBar
    </h1>
    <p>
        The nav bar is a specialized component intended for use outside the normal content
        container. See above.
    </p>

    <p
        v-for="index in 10"
        :key="index"
        class="my-800">
        Sample content to increase page length; for testing the sticky nav bar.
    </p>

    <!-- print out EsNavBar's mounted() script here so the rip-the-nav utility can access it -->
    <!-- eslint-disable vue/no-v-html -->
    <pre
        class="d-none"
        v-html="navScriptSource" />
    <!-- eslint-enable vue/no-v-html -->

    <ds-doc-source
        :comp-code="compCode"
        comp-source="es-ds-components/components/es-nav-bar.vue"
        :doc-code="docCode"
        doc-source="es-ds-docs/pages/organisms/nav-bar.vue" />
</template>

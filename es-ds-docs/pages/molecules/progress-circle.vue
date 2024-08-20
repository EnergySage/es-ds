<template>
    <div>
        <h1>
            Progress circle
        </h1>
        <p class="pb-200">
            Extended from <nuxt-link
                href="https://github.com/EnergySage/es-cdgm/blob/main/frontend/components/CircularProgress.vue"
                target="_blank">
                <code>es-cdgm</code> codebase
            </nuxt-link>
        </p>
        <es-progress-circle
            class="mb-100"
            :value="value"
            height="100px" />
        <div class="d-flex flex-nowrap">
            <button
                size="sm"
                class="mr-50"
                @click="value = value - 10">
                -10%
            </button>
            <button
                size="sm"
                @click="value = value + 10">
                +10%
            </button>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-progress-circle.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/es-progress-circle.vue" />
    </div>
</template>

<script setup>
const value = ref(10);
const heightRange = [50, 60, 70, 80, 90, 100];
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref("");

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-progress-circle.vue?raw');
    const docSource = await import("./progress-circle.vue?raw");
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

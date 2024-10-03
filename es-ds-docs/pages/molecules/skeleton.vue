<script setup lang="ts">
const loading = ref(true);

const asyncTimeout = async (seconds = 3) => {
    const millisecondTimeout = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondTimeout);
    });
};

const startLoading = async () => {
    loading.value=true;
    await asyncTimeout();
    loading.value=false;
};

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-skeleton.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./skeleton.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }

    startLoading();
});
</script>

<template>
    <div>
        <h1>Skeleton</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/skeleton/"
                target="_blank">
                PrimeVue Skeleton
            </nuxt-link>
        </p>

        <h2>Basic examples</h2>
        <b-row class="mb-500">
            <b-col lg="6">
                <es-skeleton
                    height="5rem" />
            </b-col>
        </b-row>

        <h2>EsSkeletonWrapper</h2>
        <b-row class="mb-500 d-flex">
            <b-col lg="2">
                <es-button @click="startLoading()">Reload content</es-button>
            </b-col>
            <b-col
                lg="8"
                class="ml-100">
                <es-skeleton-wrapper :loading="loading">
                    <template #loading>
                        <es-skeleton width="85%"></es-skeleton>
                        <es-skeleton width="55%"></es-skeleton>
                    </template>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas viverra nunc sapien, non rhoncus elit tincidunt vitae.
                    </p>
                </es-skeleton-wrapper>
            </b-col>
        </b-row>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-skeleton.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/skeleton.vue" />
    </div>
</template>

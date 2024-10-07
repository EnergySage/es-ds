<script setup lang="ts">
const loading = ref(true);

const asyncTimeout = async (seconds = 3) => {
    const millisecondTimeout = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondTimeout);
    });
};

const startLoading = async () => {
    loading.value = true;
    await asyncTimeout();
    loading.value = false;
};

const esSkeletonProps = [
    ['animation', 'String', 'wave', `Options are 'wave', 'fade', or 'none'`],
    ['height', 'String', '1rem', `Manually set height`],
    ['width', 'String', 'auto', `Manually set width`],
    ['size', 'String', 'null', `Manually set width and height, overriding 'height' and 'width' props`],
];

const esSkeletonImgProps = [
    ['aspect', 'String', '16:9', `Adds a container around the skeleton image with given aspect ratio`],
    ['noAspect', 'Boolean', 'false', `Override the default aspect ratio and height, width, or size`],
    ...esSkeletonProps,
];

const esSkeletonWrapperProps = [
    ['loading', 'Boolean', 'false', `Determines whether to show loading template or default content`],
];

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
            and
            <nuxt-link
                href="https://bootstrap-vue.org/docs/components/skeleton/"
                target="_blank">
                Bootstrap Skeleton
            </nuxt-link>
            styles
        </p>

        <h2>Basic examples</h2>
        <p>Wave animation:</p>
        <es-row class="mb-200">
            <es-col lg="6">
                <es-skeleton />
                <es-skeleton width="75%" />
                <es-skeleton height="3rem" />
            </es-col>
            <es-col
                lg="6"
                class="d-flex">
                <es-skeleton size="5rem" />
                <es-skeleton
                    size="4rem"
                    class="rounded-circle ml-100" />
            </es-col>
        </es-row>

        <p>Fade animation:</p>
        <es-row class="mb-500">
            <es-col lg="6">
                <es-skeleton
                    animation="fade"
                    height="33px"
                    width="100%" />
                <es-skeleton
                    animation="fade"
                    height="25px"
                    width="100%" />
            </es-col>
        </es-row>

        <h2>Helper components</h2>

        <h3>Skeleton image</h3>
        <es-row class="mb-500 d-flex">
            <es-col lg="6">
                <es-skeleton-img />
            </es-col>
            <es-col lg="6">
                <es-skeleton-img aspect="3:1" />
            </es-col>
            <es-col
                cols="12"
                class="mt-100">
                <es-skeleton-img
                    no-aspect
                    height="5rem" />
            </es-col>
        </es-row>

        <h3>Skeleton wrapper</h3>
        <es-row class="mb-500 d-flex">
            <es-col
                cols="12"
                lg="3"
                class="mb-100 mb-lg-0">
                <es-button @click="startLoading()">Reload content</es-button>
            </es-col>
            <es-col
                lg="7"
                class="ml-lg-100">
                <es-skeleton-wrapper :loading="loading">
                    <template #loading>
                        <es-skeleton width="85%"></es-skeleton>
                        <es-skeleton width="55%"></es-skeleton>
                    </template>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nunc sapien, non
                        rhoncus elit tincidunt vitae.
                    </p>
                </es-skeleton-wrapper>
            </es-col>
        </es-row>

        <div class="my-500">
            <h2>EsSkeleton props</h2>
            <ds-prop-table :rows="esSkeletonProps" />
        </div>

        <div class="my-500">
            <h2>EsSkeletonImg props</h2>
            <ds-prop-table :rows="esSkeletonImgProps" />
        </div>

        <div class="my-500">
            <h2>EsSkeletonWrapper props</h2>
            <ds-prop-table :rows="esSkeletonWrapperProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-skeleton.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/skeleton.vue" />
    </div>
</template>

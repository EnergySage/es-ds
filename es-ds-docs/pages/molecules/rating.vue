<template>
    <div>
        <h1>
            Rating
        </h1>
        <p>
            Extended from <nuxt-link
                href="https://primevue.org/rating/"
                target="_blank">
                PrimveVue Rating
        </nuxt-link>
        </p>
        <div class="my-500">
            <h2>
                Form Input
            </h2>
            <es-rating
                :read-only="false" />
            <h2 class="mt-500">
                Static Display
            </h2>
            <div
                v-for="i in 11"
                :key="i">
                <es-rating
                    :rating="(i-1)/2" />
            </div>
        </div>
        <div class="d-flex flex-column flex-md-row">
            <div class="bg-gray-50 justify-content-center d-flex p-200 mb-200 mb-md-0 mr-md-200">
                <es-rating :rating="4.5" />
            </div>
            <div class="bg-blue-50 justify-content-center d-flex p-200 mb-200 mb-md-0 mr-md-200">
                <es-rating :rating="4.5" />
            </div>
            <div class="bg-blue-900 justify-content-center d-flex p-200 mb-200 mb-md-0 mr-md-200">
                <es-rating :rating="4.5" />
            </div>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="@energysage/es-ds-components/components/es-rating.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/rating.vue" />
    </div>
</template>

<script setup lang="ts">


const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-rating.vue?raw');
    const docSource = await import('./rating.vue?raw');
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<style lang="scss">
.code-holder {
    .code-input {
        appearance: textfield;

        &.lg {
            font-size: 3rem;
            height: 6rem;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }
}

</style>
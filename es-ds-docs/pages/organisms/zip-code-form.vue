<script setup>
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-zip-code-form.vue?raw');
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./zip-code-form.vue?raw');
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <h1>Zip code form</h1>
        <!-- TODO uncomment when these components exist in new DS -->
        <!-- <p class="mb-500">
            Intended for use inside
            <b-link to="/organisms/es-cta-banner">EsCtaBanner</b-link>,
            <b-link to="/organisms/es-cta-card">EsCtaCard</b-link>,
            and hero modules.
        </p> -->
        <p class="mb-500"></p>

        <div class="mb-500">
            <h2>
                Responsive example
            </h2>
            <p class="mb-200">
                The zip code form is wrapped in grid columns that constrain the width at certain breakpoints.
                The <code>stackUntil</code> prop is set to <code>lg</code> so the input and button begin displaying
                side-by-side at that breakpoint.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    class="d-flex justify-content-center"
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            See local offers
                        </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-zip-code-form.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/zip-code-form.vue" />
    </div>
</template>


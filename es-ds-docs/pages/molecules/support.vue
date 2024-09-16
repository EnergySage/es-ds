<script setup>
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-support.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./support.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const link = 'https://www.energysage.com';
const placeholderImage = 'https://a-us.storyblok.com/f/1006156/110x110/d215996a95/default-installer-logo.png';

const supportProps = [
    [
        'link',
        'String',
        'n/a',
        `
        Required. Url that this points users to.
        `,
    ],
    [
        'src',
        'String',
        'n/a',
        `
        Required. Url for the image (usually a person's headshot).
        `,
    ],
];
</script>

<template>
    <div>
        <h1>Support</h1>

        <div class="my-500">
            <h2>Default</h2>
            <es-support
                :link="link"
                :src="placeholderImage" />
            <h2 class="mt-500">Custom copy</h2>
            <es-support
                :link="link"
                :src="placeholderImage">
                <template #title> Need help with your quotes? </template>
                <template #linkCopy> Schedule a free call with Jessica, your EnergySage specialist. </template>
            </es-support>
        </div>

        <div class="mb-500">
            <h2>EsSupport props</h2>
            <ds-prop-table :rows="supportProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-support.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/support.vue" />
    </div>
</template>

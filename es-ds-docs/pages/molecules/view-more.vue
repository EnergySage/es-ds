<script setup>
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-view-more.vue?raw');
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./view-more.vue?raw');
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const viewMoreProps = [
    [
        'content',
        'String',
        'n/a',
        `
        Required. Full content of text to be truncated.
        `,
    ],
    [
        'length',
        'Number',
        'n/a',
        `
        Required. Maximum character length of text before it is truncated
        `,
    ],
    [
        'clamp',
        'String',
        'Show more',
        `
        Text on button to expand content
        `,
    ],
    [
        'less',
        'String',
        'Show less',
        `
        Text on button to truncate content
        `,
    ],
];
</script>

<template>
    <div>
        <h1>View more</h1>
        <p>
            Using
            <nuxt-link
                href="https://www.npmjs.com/package/html-truncate"
                target="_blank">
                html-truncate </nuxt-link
            >.
        </p>

        <es-view-more
            class="my-500"
            :length="100"
            :content="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex.
                Nullam vestibulum ex mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi
                molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum.
                Mauris vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus.
                Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet
                sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam. `" />

        <div class="mb-500">
            <h2>EsViewMore props</h2>
            <ds-prop-table :rows="viewMoreProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-view-more.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/view-more.vue" />
    </div>
</template>

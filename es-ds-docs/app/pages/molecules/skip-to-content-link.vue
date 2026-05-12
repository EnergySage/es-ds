<script setup lang="ts">
const esSkipToContentLinkProps = [
    [
        'href',
        'string',
        "'#main-content'",
        `
        Set this to the id of the HTML element that contains the main content of the page.
        The skip to content link will function as a jump link to that location.
        `,
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-skip-to-content-link.vue?raw');
        const docSource = await import('../../components/ds-main-layout.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Skip to content link</h1>
        <p>
            When screen reader users are browsing pages on a site, they start at the beginning of the page and have
            everything read out in order. This gets tedious upon multiple page views, especially when there are many
            links in the navigation to read through every time they land on a new page.
        </p>
        <p>
            For this reason, a key accessibility feature of many sites is to offer a skip to content link (hidden by
            default for visual users), that is read out as the first item on the page, so they can skip over the
            navigation and get straight into the main page content if they want to.
        </p>
        <p>
            For sighted keyboard users, this link becomes visible when it is tabbed to via keyboard, so it is clear
            what has focus at that point. But as soon as the user tabs to something else, it becomes invisible again so
            as not to disrupt the visual flow of the page.
        </p>
        <p>
            This site employs such a link. To see it in Chrome, Firefox, and Edge, try refreshing the page and then
            hitting the Tab key, which should give focus to the first focusable element on the page, which will be this
            link. To see it in Safari (which does not offer the same Tab key functionality), activate the VoiceOver
            screen reader in system settings, then navigate through the page; it should be one of the first elements
            read out to the user.
        </p>
        <div class="bg-warning-500 p-100 rounded">
            <p>
                <span class="font-weight-semibold"> IMPORTANT: </span>
                in order for this link to work, two pieces need to be in place:
            </p>
            <ol class="mb-0">
                <li>it needs to be present on every page in your site or app that has your navigation</li>
                <li>
                    all such pages also need a corresponding id on the HTML element that contains the main content of
                    your page, so the skip to content link can function as a jump link to that location
                </li>
            </ol>
        </div>

        <div class="my-300">
            <h2>EsSkipToContentLink props</h2>
            <ds-prop-table
                :rows="esSkipToContentLinkProps"
                :widths="{
                    md: ['2', '2', '2', '6'],
                }" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/app/components/es-skip-to-content-link.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/app/components/ds-main-layout.vue" />
    </div>
</template>

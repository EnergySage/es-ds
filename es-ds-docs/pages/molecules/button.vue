<script setup lang="ts">
const propTableRows = ref([
    ['href', 'String', 'null', 'An external URL to navigate to when using a button as a link.'],
    [
        'inline',
        'Boolean',
        'false',
        "Use only for the 'link' variant. If true, removes the fixed padding and height from the " +
            'button so it can be aligned with other text next to it.',
    ],
    ['outline', 'Boolean', 'false', 'If true, changes to the outline version of the specified variant.'],
    ['size', 'String', '"md"', "The size of the button: 'md', or 'sm'."],
    ['to', 'String', 'null', 'An internal path to navigate to when using a button as a link'],
    ['variant', 'String', '"primary"', "The name of the desired button variant: 'primary', 'dark-bg', or 'link'."],
]);

const propTableWidths = ref({
    md: ['2', '2', '2', '6'],
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-button.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./button.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Button</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/button/"
                target="_blank">
                PrimeVue Button
            </nuxt-link>
            and
            <nuxt-link
                href="https://nuxt.com/docs/api/components/nuxt-link"
                target="_blank">
                NuxtLink
            </nuxt-link>
        </p>
        <p>
            When using a button, please ensure that the copy style is
            <ds-link
                to="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </ds-link>
        </p>

        <div class="my-500">
            <h2>Default</h2>
            <p>
                This is the default size for buttons. For the secondary button, add the <code>outline</code> boolean
                prop.
            </p>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap">
                <es-button> Primary button </es-button>
                <es-button outline> Secondary button </es-button>
                <es-button variant="link"> Link button </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Default on dark background</h2>
            <p>When the button will appear on a dark background, use the <code>dark-bg</code> variant.</p>
            <div class="multiple-buttons bg-dark-blue d-flex flex-column flex-sm-row flex-sm-wrap rounded p-100">
                <es-button variant="dark-bg"> Primary button </es-button>
                <es-button
                    outline
                    variant="dark-bg">
                    Secondary button
                </es-button>
                <es-button
                    class="text-white"
                    variant="link">
                    Link button
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Small</h2>
            <p>For a small button, pass in <code>size="sm"</code>.</p>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap">
                <es-button size="sm"> Primary button </es-button>
                <es-button
                    outline
                    size="sm">
                    Secondary button
                </es-button>
                <es-button
                    size="sm"
                    variant="link">
                    Link button
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Small on dark background</h2>
            <div class="multiple-buttons bg-dark-blue d-flex flex-column flex-sm-row flex-sm-wrap rounded p-100">
                <es-button
                    size="sm"
                    variant="dark-bg">
                    Primary button
                </es-button>
                <es-button
                    outline
                    size="sm"
                    variant="dark-bg">
                    Secondary button
                </es-button>
                <es-button
                    class="text-white"
                    size="sm"
                    variant="link">
                    Link button
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Icons</h2>
            <p>Icons will adjust their size automatically to match the size of the button.</p>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap mb-100">
                <es-button>
                    Primary button
                    <icon-chevron-right class="ml-25" />
                </es-button>
                <es-button>
                    <icon-chevron-right />
                </es-button>
                <es-button variant="link"> Link button <icon-arrow-right class="ml-25" /> </es-button>
            </div>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap">
                <es-button size="sm">
                    Primary button
                    <icon-chevron-right class="ml-25" />
                </es-button>
                <es-button size="sm">
                    <icon-chevron-right />
                </es-button>
                <es-button
                    size="sm"
                    variant="link">
                    Link button <icon-arrow-right class="ml-25" />
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Disabled</h2>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap">
                <es-button disabled>Primary button</es-button>
                <es-button
                    disabled
                    outline
                    >Secondary button</es-button
                >
                <es-button
                    disabled
                    variant="link"
                    >Link button</es-button
                >
            </div>
        </div>

        <div class="my-500">
            <h2>Disabled on dark background</h2>
            <div class="multiple-buttons bg-dark-blue d-flex flex-column flex-sm-row flex-sm-wrap rounded p-100">
                <es-button
                    disabled
                    variant="dark-bg"
                    >Primary button</es-button
                >
                <es-button
                    disabled
                    outline
                    variant="dark-bg"
                    >Secondary button</es-button
                >
                <es-button
                    disabled
                    variant="link"
                    >Link button</es-button
                >
            </div>
        </div>

        <div class="my-500">
            <h2>Inline link</h2>
            <p>
                The <code>link</code> button variant can also appear within a paragraph of text by adding the
                <code>inline</code> prop.
            </p>
            <es-card>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                <es-button
                    inline
                    variant="link">
                    eiusmod tempor
                </es-button>
                incididunt ut labore et dolore magna aliqua.
            </es-card>
        </div>

        <div class="my-500">
            <h2>Loading</h2>
            <p>
                This example shows how to use the
                <a
                    href="https://bootstrap-vue.org/docs/components/spinner"
                    target="_blank">
                    spinner from Bootstrap Vue
                </a>
                to display a loading indicator within a button.
            </p>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap mb-100">
                <es-button class="position-relative">
                    <span class="invisible"> Default button </span>
                    <es-spinner
                        class="position-absolute"
                        label="Loading"
                        role="status" />
                </es-button>
                <es-button>
                    <span> Default button </span>
                    <es-spinner
                        class="ml-50"
                        label="Loading"
                        role="status" />
                </es-button>
            </div>
            <div class="multiple-buttons d-flex flex-column flex-sm-row flex-sm-wrap">
                <es-button
                    class="position-relative"
                    size="sm">
                    <span class="invisible"> Small button </span>
                    <es-spinner
                        class="position-absolute"
                        label="Loading"
                        role="status" />
                </es-button>
                <es-button size="sm">
                    <span> Small button </span>
                    <es-spinner
                        class="ml-50"
                        label="Loading"
                        role="status" />
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Props</h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-button.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/button.vue" />
    </div>
</template>

<style lang="scss" scoped>
.multiple-buttons {
    gap: 1rem;
}
</style>

<script setup lang="ts">
const esNavCtaCardProps = [
    [
        'heading',
        'String',
        'n/a',
        `
        Required. The primary heading of the CTA card.
        `,
    ],
    [
        'href',
        'String',
        'n/a',
        `
        Required. The URL to which the CTA card should go.
        `,
    ],
    [
        'subtitle',
        'String',
        "''",
        `
        Descriptive text to appear underneath the heading.
        `,
    ],
    [
        'target',
        'String',
        "'_self'",
        `
        Indicates whether or not the link should open in a new window. By default, it will
        open in the same window. To open in a new window, pass '_blank'.
        `,
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-nav-cta-card.vue?raw');

        const docSource = await import('./nav-cta-card.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Nav CTA card</h1>
        <p>
            This CTA card is designed for a width-limited environment such as inside a mobile nav menu or a
            multi-column desktop nav menu. It can link to any URL and can take any of our icons.
        </p>

        <div class="my-300">
            <h2>Basic example</h2>
            <es-row>
                <es-col
                    sm="10"
                    md="8"
                    lg="6"
                    xxl="5">
                    <es-nav-cta-card
                        class="mb-100"
                        heading="Get an instant quote"
                        href="https://www.energysage.com"
                        subtitle="Free, personalized solar quotes that’ll save you thousands"
                        target="_blank">
                        <template #icon>
                            <icon-solar aria-hidden="true" />
                        </template>
                    </es-nav-cta-card>

                    <es-nav-cta-card
                        heading="Plan energy recommendations"
                        href="https://www.energysage.com"
                        subtitle="See energy recommendations for your home with just an address"
                        target="_blank">
                        <template #icon>
                            <icon-house-line aria-hidden="true" />
                        </template>
                    </es-nav-cta-card>
                </es-col>
            </es-row>
        </div>

        <div class="my-300">
            <h2>No subtitle</h2>
            <es-row>
                <es-col
                    sm="10"
                    md="8"
                    lg="6"
                    xxl="5">
                    <es-nav-cta-card
                        heading="Get a home battery installed"
                        href="https://www.energysage.com"
                        target="_blank">
                        <template #icon>
                            <icon-battery-charging-vertical aria-hidden="true" />
                        </template>
                    </es-nav-cta-card>
                </es-col>
            </es-row>
        </div>

        <div class="my-300">
            <h2>No icon</h2>
            <es-row>
                <es-col
                    sm="10"
                    md="8"
                    lg="6"
                    xxl="5">
                    <es-nav-cta-card
                        class="mb-100"
                        heading="Get an instant quote"
                        href="https://www.energysage.com"
                        subtitle="Free, personalized solar quotes that’ll save you thousands"
                        target="_blank" />
                    <es-nav-cta-card
                        heading="Get an instant quote"
                        href="https://www.energysage.com"
                        target="_blank" />
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>EsNavCtaCard props</h2>
            <ds-prop-table :rows="esNavCtaCardProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-nav-cta-card.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/nav-cta-card.vue" />
    </div>
</template>

<script setup lang="ts">
const mainExamples = ref([
    {
        name: 'Default',
        text: 'Default button',
    },
    {
        name: 'Default (text with icon)',
        icon: true,
        text: 'Default button',
    },
    {
        name: 'Default (icon only)',
        icon: true,
    },
    {
        name: 'Small',
        size: 'sm',
        text: 'Small button',
    },
    {
        name: 'Small (text with icon)',
        icon: true,
        size: 'sm',
        text: 'Small button',
    },
    {
        name: 'Small (icon only)',
        icon: true,
        size: 'sm',
    },
]);

const linkExamples = ref([
    {
        name: 'Default',
        secondButton: {
            text: 'Submit',
        },
        text: 'Cancel',
        variant: 'link',
    },
    {
        name: 'Small',
        size: 'sm',
        secondButton: {
            text: 'Submit',
        },
        text: 'Cancel',
        variant: 'link',
    },
    {
        arrow: true,
        name: 'Default with arrow',
        text: 'Learn about our rating system',
        variant: 'link',
    },
    {
        arrow: true,
        name: 'Small with arrow',
        size: 'sm',
        text: 'Learn about our rating system',
        variant: 'link',
    },
    {
        name: 'Inline',
        inline: true,
    },
]);

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
    md: ['3', '1', '3', '5'],
    lg: ['2', '1', '1', '8'],
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

        <p class="mb-200">
            Icons inside default buttons are sized automatically to 24px; and in small buttons to 18px.
        </p>

        <div class="my-500">
            <h2>Primary</h2>
            <p>
                This is the default style for buttons. For a small button, use the <code>size="sm"</code> prop value.
            </p>

            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in mainExamples"
                    :key="example.name"
                    :zebra-stripes="false"
                    vertically-center-content>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Description </template>
                        <template #value>
                            <span class="font-weight-semibold">
                                {{ example.name }}
                            </span>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Normal </template>
                        <template #value>
                            <es-button :size="example.size">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Disabled </template>
                        <template #value>
                            <es-button
                                disabled
                                :size="example.size">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="my-500">
            <h2>Secondary</h2>
            <p>For this style, add the <code>outline</code> boolean prop.</p>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in mainExamples"
                    :key="example.name"
                    :zebra-stripes="false"
                    vertically-center-content>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Description </template>
                        <template #value>
                            <span class="font-weight-semibold">
                                {{ example.name }}
                            </span>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Normal </template>
                        <template #value>
                            <es-button
                                outline
                                :size="example.size">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Disabled </template>
                        <template #value>
                            <es-button
                                disabled
                                outline
                                :size="example.size">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="my-500">
            <h2>Link</h2>
            <p>
                This variant will render a button with the appearance of a link while maintaining the default padding
                and size of a button. This is useful when the link button will appear next to another button (e.g.
                within a modal), as they will remain vertically aligned relative to each other.
            </p>
            <p>Use the <code>variant="link"</code> prop value to enable it.</p>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in linkExamples"
                    :key="example.name"
                    :zebra-stripes="false"
                    vertically-center-content>
                    <ds-responsive-table-column
                        md="4"
                        lg="2"
                        xxl="2">
                        <template #name> Description </template>
                        <template #value>
                            <span class="font-weight-semibold">
                                {{ example.name }}
                            </span>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="4"
                        xxl="2">
                        <template #name> Normal </template>
                        <template #value>
                            <p v-if="example.inline">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                <es-button
                                    inline
                                    variant="link">
                                    eiusmod tempor
                                </es-button>
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div v-else-if="example.arrow">
                                <es-button
                                    class="px-0 text-left"
                                    :size="example.size"
                                    :variant="example.variant">
                                    {{ example.text }}
                                    <icon-arrow-right class="ml-25" />
                                </es-button>
                            </div>
                            <div v-else>
                                <es-button
                                    :size="example.size"
                                    :variant="example.variant">
                                    {{ example.text }}
                                </es-button>
                                <es-button :size="example.size">
                                    {{ example.secondButton?.text }}
                                </es-button>
                            </div>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="4"
                        xxl="2">
                        <template #name> Disabled </template>
                        <template #value>
                            <p v-if="example.inline">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                <es-button
                                    disabled
                                    inline
                                    variant="link">
                                    eiusmod tempor
                                </es-button>
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                            <div v-else-if="example.arrow">
                                <es-button
                                    class="px-0 text-left"
                                    disabled
                                    :size="example.size"
                                    :variant="example.variant">
                                    {{ example.text }}
                                    <icon-arrow-right class="ml-25" />
                                </es-button>
                            </div>
                            <div v-else>
                                <es-button
                                    disabled
                                    :size="example.size"
                                    :variant="example.variant">
                                    {{ example.text }}
                                </es-button>
                                <es-button
                                    disabled
                                    :size="example.size">
                                    {{ example.secondButton?.text }}
                                </es-button>
                            </div>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="bg-dark-blue my-500 p-100 rounded-lg text-white">
            <h2 class="text-white">Dark background</h2>
            <p>
                These variants are only meant to be used against a dark blue background. Use the
                <code>variant="dark-bg"</code> prop value to enable them.
            </p>

            <h3 class="mt-200 text-white">Primary</h3>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in mainExamples"
                    :key="example.name"
                    :zebra-stripes="false"
                    vertically-center-content>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Description </template>
                        <template #value>
                            <span class="font-weight-semibold">
                                {{ example.name }}
                            </span>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Normal </template>
                        <template #value>
                            <es-button
                                :size="example.size"
                                variant="dark-bg">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Disabled </template>
                        <template #value>
                            <es-button
                                disabled
                                :size="example.size"
                                variant="dark-bg">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>

            <h3 class="mt-200 text-white">Secondary</h3>
            <p>For this style, add the <code>outline</code> boolean prop.</p>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in mainExamples"
                    :key="example.name"
                    :zebra-stripes="false"
                    vertically-center-content>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Description </template>
                        <template #value>
                            <span class="font-weight-semibold">
                                {{ example.name }}
                            </span>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Normal </template>
                        <template #value>
                            <es-button
                                outline
                                :size="example.size"
                                variant="dark-bg">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3"
                        xxl="2">
                        <template #name> Disabled </template>
                        <template #value>
                            <es-button
                                disabled
                                outline
                                :size="example.size"
                                variant="dark-bg">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
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
            <div class="mb-100">
                <es-button class="mr-100 position-relative">
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
            <div>
                <es-button
                    class="mr-100 position-relative"
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

<template>
    <div>
        <h1>
            Button
        </h1>
        <p>
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/button"
                target="_blank">
                bootstrap-vue button
            </b-link>
        </p>

        <p>
            When using a button, please ensure that the copy style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
        </p>

        <p class="mb-200">
            Icons inside default buttons are sized automatically to 24px; and in
            small buttons to 18px.
        </p>

        <div class="my-500">
            <h2>
                Primary
            </h2>
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
                        <template #name>
                            Description
                        </template>
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
                        <template #name>
                            Normal
                        </template>
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
                        <template #name>
                            Disabled
                        </template>
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
            <h2>
                Secondary
            </h2>
            <p>
                For this style, add the <code>outline</code> boolean prop.
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
                        <template #name>
                            Description
                        </template>
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
                        <template #name>
                            Normal
                        </template>
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
                        <template #name>
                            Disabled
                        </template>
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
            <h2>
                Link
            </h2>
            <p>
                This variant will render a button with the appearance of a link while maintaining the default
                padding and size of a button. This is useful when the link button will appear next to another
                button (e.g. within a modal), as they will remain vertically aligned relative to each other.
            </p>
            <p>
                Use the <code>variant="link"</code> prop value to enable it.
            </p>
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
                        <template #name>
                            Description
                        </template>
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
                        <template #name>
                            Normal
                        </template>
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
                                    {{ example.secondButton.text }}
                                </es-button>
                            </div>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="4"
                        xxl="2">
                        <template #name>
                            Disabled
                        </template>
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
                                    {{ example.secondButton.text }}
                                </es-button>
                            </div>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="bg-dark-blue my-500 p-100 rounded-lg text-white">
            <h2 class="text-white">
                Dark background
            </h2>
            <p>
                These variants are only meant to be used against a dark blue background.
                Use the <code>variant="dark-bg"</code> prop value to enable them.
            </p>

            <h3 class="mt-200 text-white">
                Primary
            </h3>
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
                        <template #name>
                            Description
                        </template>
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
                        <template #name>
                            Normal
                        </template>
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
                        <template #name>
                            Disabled
                        </template>
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

            <h3 class="mt-200 text-white">
                Secondary
            </h3>
            <p>
                For this style, add the <code>outline</code> boolean prop.
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
                        <template #name>
                            Description
                        </template>
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
                        <template #name>
                            Normal
                        </template>
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
                        <template #name>
                            Disabled
                        </template>
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
            <h2>
                Loading
            </h2>
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
                    <span class="invisible">
                        Default button
                    </span>
                    <b-spinner
                        class="position-absolute"
                        label="Loading"
                        role="status" />
                </es-button>
                <es-button>
                    <span>
                        Default button
                    </span>
                    <b-spinner
                        class="ml-50"
                        label="Loading"
                        role="status" />
                </es-button>
            </div>
            <div>
                <es-button
                    class="mr-100 position-relative"
                    size="sm">
                    <span class="invisible">
                        Small button
                    </span>
                    <b-spinner
                        class="position-absolute"
                        label="Loading"
                        role="status" />
                </es-button>
                <es-button size="sm">
                    <span>
                        Small button
                    </span>
                    <b-spinner
                        class="ml-50"
                        label="Loading"
                        role="status" />
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>

        <es-collapse
            id="legacy-collapse"
            v-model="legacyCollapseVisible"
            :is-programmatic-until-user-input="false">
            <template #title>
                <h2 class="mb-0">
                    Legacy variants
                </h2>
            </template>
            <p>
                These legacy variants have all been updated to match the new button styling.
            </p>

            <div
                v-for="legacyVariant in legacyVariants"
                :key="legacyVariant.name">
                <h3 class="mt-200">
                    {{ legacyVariant.name }}
                </h3>
                <p>
                    Use <code>variant="{{ legacyVariant.variant }}"</code>
                    <span v-if="legacyVariant.outline">
                        and <code>outline="true"</code>
                    </span>
                    for this style.
                </p>
                <ds-responsive-table class="responsive-table-typography">
                    <ds-responsive-table-row
                        v-for="example in legacyExamples"
                        :key="example.name"
                        :zebra-stripes="false"
                        vertically-center-content>
                        <ds-responsive-table-column
                            md="4"
                            lg="3"
                            xxl="2">
                            <template #name>
                                Description
                            </template>
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
                            <template #name>
                                Normal
                            </template>
                            <template #value>
                                <es-button
                                    :outline="legacyVariant.outline"
                                    :size="example.size"
                                    :variant="legacyVariant.variant">
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
                            <template #name>
                                Disabled
                            </template>
                            <template #value>
                                <es-button
                                    disabled
                                    :outline="legacyVariant.outline"
                                    :size="example.size"
                                    :variant="legacyVariant.variant">
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
        </es-collapse>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsButton.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-button.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsButtonDocs',
    data() {
        return {
            legacyCollapseVisible: false,
            legacyExamples: [
                {
                    name: 'Default',
                    text: 'Default button',
                },
                {
                    name: 'Small',
                    size: 'sm',
                    text: 'Small button',
                },
            ],
            legacyVariants: [
                {
                    name: 'Danger',
                    outline: false,
                    variant: 'danger',
                },
                {
                    name: 'Danger outline',
                    outline: true,
                    variant: 'danger',
                },
                {
                    name: 'Dark',
                    outline: false,
                    variant: 'dark',
                },
                {
                    name: 'Dark outline',
                    outline: true,
                    variant: 'dark',
                },
                {
                    name: 'Highlight',
                    outline: false,
                    variant: 'highlight',
                },
                {
                    name: 'Highlight outline',
                    outline: true,
                    variant: 'highlight',
                },
                {
                    name: 'Highlight dark',
                    outline: false,
                    variant: 'highlight-dark',
                },
                {
                    name: 'Highlight dark outline',
                    outline: true,
                    variant: 'highlight-dark',
                },
                {
                    name: 'Info',
                    outline: false,
                    variant: 'info',
                },
                {
                    name: 'Info outline',
                    outline: true,
                    variant: 'info',
                },
                {
                    name: 'Light',
                    outline: false,
                    variant: 'light',
                },
                {
                    name: 'Light outline',
                    outline: true,
                    variant: 'light',
                },
                {
                    name: 'Mid',
                    outline: false,
                    variant: 'mid',
                },
                {
                    name: 'Mid outline',
                    outline: true,
                    variant: 'mid',
                },
                {
                    name: 'Mid dark',
                    outline: false,
                    variant: 'mid-dark',
                },
                {
                    name: 'Mid dark outline',
                    outline: true,
                    variant: 'mid-dark',
                },
                {
                    name: 'Secondary',
                    outline: false,
                    variant: 'secondary',
                },
                {
                    name: 'Secondary outline',
                    outline: true,
                    variant: 'secondary',
                },
                {
                    name: 'Success',
                    outline: false,
                    variant: 'success',
                },
                {
                    name: 'Success outline',
                    outline: true,
                    variant: 'success',
                },
                {
                    name: 'Warning',
                    outline: false,
                    variant: 'warning',
                },
                {
                    name: 'Warning outline',
                    outline: true,
                    variant: 'warning',
                },

            ],
            linkExamples: [
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
            ],
            mainExamples: [
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
            ],
            propTableRows: [
                [
                    'inline',
                    'false',
                    'Use only for the \'link\' variant. If true, removes the fixed padding and height from the '
                    + 'button so it can be aligned with other text next to it.',
                ],
                [
                    'outline',
                    'false',
                    'If true, changes to the outline version of the specified variant.',
                ],
                [
                    'size',
                    '"md"',
                    'The size of the button: \'md\', or \'sm\'.',
                ],
                [
                    'variant',
                    '"primary"',
                    'The name of the desired button variant: \'primary\', \'dark-bg\', or \'link\'.',
                ],
            ],
            propTableWidths: {
                md: ['3', '4', '5'],
                lg: ['2', '2', '8'],
            },
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-button.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsButton.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

<style lang="scss" scoped>
@use '~@energysage/es-bs-base/scss/variables' as variables;

/**
 * ensures buttons are spaced out nicely on mobile and desktop
 * for the purposes of this documentation page while keeping the
 * example code patterns simple and easy to copy out.
 *
 * normally, one would want to use "mb-50" or "mr-50" utility classes
 * on the buttons to accomplish this spacing.
 */
.button-table {
    button {
        margin-bottom: variables.$spacer * 0.5;
        margin-right: variables.$spacer * 0.5;
    }
}
</style>

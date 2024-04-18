<template>
    <div>
        <h1>
            Button
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/button">
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
            Icons inside of default buttons should be 24px or 1.5rem (the default for ESDS icons).
            Icons inside of small buttons should be 18px or 1.125rem.
        </p>

        <div class="my-450">
            <h2>
                Primary
            </h2>
            <p>
                This is the default style for buttons. For a small button, use the <code>size="sm"</code> prop value.
            </p>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in primaryExamples"
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
                                    :class="{ 'ml-25': example.text }"
                                    :height="example.size === 'sm' ? '1.125rem' : undefined"
                                    :width="example.size === 'sm' ? '1.125rem' : undefined" />
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
                                    :class="{ 'ml-25': example.text }"
                                    :height="example.size === 'sm' ? '1.125rem' : undefined"
                                    :width="example.size === 'sm' ? '1.125rem' : undefined" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="my-450">
            <h2>
                Secondary
            </h2>
            <p>
                For this style, add the <code>outline</code> boolean prop.
            </p>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in secondaryExamples"
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
                                :outline="example.outline"
                                :size="example.size">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }"
                                    :height="example.size === 'sm' ? '1.125rem' : undefined"
                                    :width="example.size === 'sm' ? '1.125rem' : undefined" />
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
                                :outline="example.outline"
                                :size="example.size">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }"
                                    :height="example.size === 'sm' ? '1.125rem' : undefined"
                                    :width="example.size === 'sm' ? '1.125rem' : undefined" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="my-450">
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

        <div class="bg-dark-blue my-450 p-100 rounded-lg text-white">
            <h2 class="text-white">
                Dark mode
            </h2>
            <p>
                This variant is only meant to be used against a dark blue background.
                Use the <code>variant="dark-mode"</code> prop value to enable it.
            </p>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in darkModeExamples"
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
                                :outline="example.outline"
                                :size="example.size"
                                :variant="example.variant">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }"
                                    :height="example.size === 'sm' ? '1.125rem' : undefined"
                                    :width="example.size === 'sm' ? '1.125rem' : undefined" />
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
                                :outline="example.outline"
                                :size="example.size"
                                :variant="example.variant">
                                {{ example.text }}
                                <icon-chevron-right
                                    v-if="example.icon"
                                    :class="{ 'ml-25': example.text }"
                                    :height="example.size === 'sm' ? '1.125rem' : undefined"
                                    :width="example.size === 'sm' ? '1.125rem' : undefined" />
                            </es-button>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="my-450">
            <h2>
                Width change across breakpoints
            </h2>
            <p>
                Often, designs will specify buttons to be full width on mobile and content width on desktop.
                Below is an example of how to easily accomplish this.
            </p>
            <div class="mb-200">
                <es-button class="w-100 w-lg-auto">
                    Responsive button
                </es-button>
            </div>
        </div>

        <div class="my-450">
            <h2>
                Props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>

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
            darkModeExamples: [
                {
                    name: 'Default',
                    text: 'Default button',
                    variant: 'dark-mode',
                },
                {
                    name: 'Default (text with icon)',
                    icon: true,
                    text: 'Default button',
                    variant: 'dark-mode',
                },
                {
                    name: 'Default (icon only)',
                    icon: true,
                    variant: 'dark-mode',
                },
                {
                    name: 'Small',
                    size: 'sm',
                    text: 'Small button',
                    variant: 'dark-mode',
                },
                {
                    name: 'Small (text with icon)',
                    icon: true,
                    size: 'sm',
                    text: 'Small button',
                    variant: 'dark-mode',
                },
                {
                    name: 'Small (icon only)',
                    icon: true,
                    size: 'sm',
                    variant: 'dark-mode',
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
                    name: 'Inline',
                    inline: true,
                },
            ],
            primaryExamples: [
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
                    'The size of the button: \'lg\', \'md\', or \'sm\'. Large and medium will render exactly '
                    + 'the same.',
                ],
                [
                    'variant',
                    '"primary"',
                    'The name of the desired button variant: \'primary\', \'dark-mode\', or \'link\'.',
                ],
            ],
            propTableWidths: {
                md: ['3', '4', '5'],
                lg: ['2', '2', '8'],
            },
            secondaryExamples: [
                {
                    name: 'Default',
                    outline: true,
                    text: 'Default button',
                },
                {
                    name: 'Default (text with icon)',
                    icon: true,
                    outline: true,
                    text: 'Default button',
                },
                {
                    name: 'Default (icon only)',
                    icon: true,
                    outline: true,
                },
                {
                    name: 'Small',
                    outline: true,
                    size: 'sm',
                    text: 'Small button',
                },
                {
                    name: 'Small (text with icon)',
                    icon: true,
                    outline: true,
                    size: 'sm',
                    text: 'Small button',
                },
                {
                    name: 'Small (icon only)',
                    icon: true,
                    outline: true,
                    size: 'sm',
                },
            ],
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

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
                Primary Button
            </h2>
            <table class="table button-table mb-200">
                <thead>
                    <tr>
                        <th scope="col">
                            State
                        </th>
                        <th scope="col">
                            Examples
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            Normal
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button>
                                    Default button
                                </es-button>
                                <es-button>
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>
                                <es-button>
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button size="sm">
                                    Small button
                                </es-button>

                                <es-button size="sm">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button size="sm">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            Disabled
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button disabled>
                                    Default button
                                </es-button>

                                <es-button disabled>
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>

                                <es-button disabled>
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    disabled
                                    size="sm">
                                    Small button
                                </es-button>

                                <es-button
                                    disabled
                                    size="sm">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    disabled
                                    size="sm">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="my-450">
            <h2>
                Secondary Button
            </h2>
            <table class="table button-table mb-200">
                <thead>
                    <tr>
                        <th scope="col">
                            State
                        </th>
                        <th scope="col">
                            Examples
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            Normal
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button variant="secondary">
                                    Default button
                                </es-button>
                                <es-button variant="secondary">
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>
                                <es-button variant="secondary">
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                </es-button>

                                <es-button
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    size="sm"
                                    variant="secondary">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            Disabled
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button
                                    disabled
                                    variant="secondary">
                                    Default button
                                </es-button>

                                <es-button
                                    disabled
                                    variant="secondary">
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>

                                <es-button
                                    disabled
                                    variant="secondary">
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    disabled
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                </es-button>

                                <es-button
                                    disabled
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    disabled
                                    size="sm"
                                    variant="secondary">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="my-450">
            <h2>
                Outline Primary Button
            </h2>
            <table class="table button-table mb-200">
                <thead>
                    <tr>
                        <th scope="col">
                            State
                        </th>
                        <th scope="col">
                            Examples
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            Normal
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button outline>
                                    Default button
                                </es-button>
                                <es-button outline>
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>
                                <es-button outline>
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    outline
                                    size="sm">
                                    Small button
                                </es-button>

                                <es-button
                                    outline
                                    size="sm">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    outline
                                    size="sm">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            Disabled
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button
                                    disabled
                                    outline>
                                    Default button
                                </es-button>

                                <es-button
                                    disabled
                                    outline>
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>

                                <es-button
                                    disabled
                                    outline>
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    disabled
                                    outline
                                    size="sm">
                                    Small button
                                </es-button>

                                <es-button
                                    disabled
                                    outline
                                    size="sm">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    disabled
                                    outline
                                    size="sm">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="my-450">
            <h2>
                Outline Secondary Button
            </h2>
            <table class="table button-table mb-200">
                <thead>
                    <tr>
                        <th scope="col">
                            State
                        </th>
                        <th scope="col">
                            Examples
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            Normal
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button
                                    outline
                                    variant="secondary">
                                    Default button
                                </es-button>
                                <es-button
                                    outline
                                    variant="secondary">
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>
                                <es-button
                                    outline
                                    variant="secondary">
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    outline
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                </es-button>

                                <es-button
                                    outline
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    outline
                                    size="sm"
                                    variant="secondary">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            Disabled
                        </td>
                        <td>
                            <div class="mb-50">
                                <es-button
                                    disabled
                                    outline
                                    variant="secondary">
                                    Default button
                                </es-button>

                                <es-button
                                    disabled
                                    outline
                                    variant="secondary">
                                    Default button
                                    <icon-chevron-right class="ml-25" />
                                </es-button>

                                <es-button
                                    disabled
                                    outline
                                    variant="secondary">
                                    <icon-chevron-right />
                                </es-button>
                            </div>
                            <div>
                                <es-button
                                    disabled
                                    outline
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                </es-button>

                                <es-button
                                    disabled
                                    outline
                                    size="sm"
                                    variant="secondary">
                                    Small button
                                    <icon-chevron-right
                                        class="ml-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>

                                <es-button
                                    disabled
                                    outline
                                    size="sm"
                                    variant="secondary">
                                    <icon-chevron-right
                                        height="1.125rem"
                                        width="1.125rem" />
                                </es-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="my-450">
            <h2>
                Dark Background
            </h2>
            <div class="bg-gray pb-100 px-200 pt-200 rounded-lg">
                <es-button class="mb-100 mr-50">
                    Primary button
                </es-button>
                <es-button
                    class="mb-100 mr-50"
                    variant="secondary">
                    Secondary button
                </es-button>
                <es-button
                    class="mb-100 mr-50"
                    outline>
                    Outline primary button
                </es-button>
                <es-button
                    class="mb-100 mr-50"
                    outline
                    variant="secondary">
                    Outline secondary button
                </es-button>
            </div>
        </div>

        <div class="my-450">
            <h2>
                Link button
            </h2>
            <p>
                The <code>link</code> variant will render a button with the appearance of a link while
                maintaining the default padding and size of a button. This is useful when the link button
                will appear next to another button (e.g. within a modal), as they will remain vertically
                aligned relative to each other.
            </p>
            <table class="table button-table mb-200">
                <thead>
                    <tr>
                        <th scope="col">
                            State
                        </th>
                        <th scope="col">
                            Examples
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            Default
                        </td>
                        <td>
                            <div>
                                <es-button variant="link">
                                    Link button
                                </es-button>
                                <es-button>
                                    Default button
                                </es-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            Small
                        </td>
                        <td>
                            <div>
                                <es-button
                                    size="sm"
                                    variant="link">
                                    Link button
                                </es-button>
                                <es-button size="sm">
                                    Small button
                                </es-button>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td scope="row">
                            Inline
                        </td>
                        <td>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. In tellus
                                <es-button
                                    inline
                                    size="sm"
                                    variant="link">
                                    integer feugiat scelerisque
                                </es-button>
                                varius. Risus in hendrerit gravida rutrum. Faucibus interdum posuere lorem ipsum
                                dolor sit amet consectetur adipiscing. Mi tempus imperdiet nulla malesuada pellentesque
                                elit.
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                Deprecated Buttons (do not use)
            </h2>
            <p class="mb-200">
                It is recommended not to use these variants and to refactor your code to remove instances of them.
                They are a legacy artifact of Bootstrap, don't match EnergySage branding, and will be removed in a
                future version of ESDS.
            </p>
            <div class="button-table mb-200">
                <es-button variant="success">
                    Success button
                </es-button>
                <es-button variant="info">
                    Info button
                </es-button>
                <es-button variant="warning">
                    Warning button
                </es-button>
                <es-button variant="danger">
                    Danger button
                </es-button>
                <es-button variant="light">
                    Light button
                </es-button>
                <es-button variant="dark">
                    Dark button
                </es-button>
                <es-button variant="mid">
                    Mid button
                </es-button>
                <es-button variant="mid-dark">
                    Mid dark button
                </es-button>
                <es-button variant="highlight">
                    Highlight button
                </es-button>
                <es-button variant="highlight-dark">
                    Highlight dark button
                </es-button>
            </div>
            <div class="button-table mb-50">
                <es-button
                    outline
                    variant="success">
                    Success button
                </es-button>
                <es-button
                    outline
                    variant="info">
                    Info button
                </es-button>
                <es-button
                    outline
                    variant="warning">
                    Warning button
                </es-button>
                <es-button
                    outline
                    variant="danger">
                    Danger button
                </es-button>
                <es-button
                    outline
                    variant="light">
                    Light button
                </es-button>
                <es-button
                    outline
                    variant="dark">
                    Dark button
                </es-button>
                <es-button
                    outline
                    variant="mid">
                    Mid button
                </es-button>
                <es-button
                    outline
                    variant="mid-dark">
                    Mid dark button
                </es-button>
                <es-button
                    outline
                    variant="highlight">
                    Highlight button
                </es-button>
                <es-button
                    outline
                    variant="highlight-dark">
                    Highlight dark button
                </es-button>
            </div>
        </div>

        <div class="my-450">
            <h2>
                EsButton props
            </h2>
            <b-table
                :fields="propTableColumns"
                :items="propTableRows"
                striped />
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
            propTableColumns: [
                'name',
                'type',
                'description',
            ],
            propTableRows: [
                {
                    name: 'inline',
                    type: 'boolean',
                    description: `
                        Use only for the 'link' variant. If true, removes the fixed padding and height from the
                        button so it can be aligned with other text next to it. Defaults to false.
                    `,
                },
                {
                    name: 'outline',
                    type: 'boolean',
                    description: `
                        If true, changes to the outline version of the specified variant. Defaults to false.
                    `,
                },
                {
                    name: 'size',
                    type: 'string',
                    description: `
                        The size of the button: 'lg', 'md', or 'sm'. Large and medium will render exactly the
                        same. Defaults to 'md'.
                    `,
                },
                {
                    name: 'variant',
                    type: 'string',
                    description: `
                        The name of the desired button variant: 'primary', 'secondary', or 'link'.
                        Defaults to 'primary'.
                    `,
                },
            ],
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            // /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            // const docSource = await import('!raw-loader!./es-button.vue');
            // const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsButton.vue');
            // /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
            //
            // this.docCode = this.$prism.normalizeCode(docSource.default);
            // this.compCode = this.$prism.normalizeCode(compSource.default);
            // this.$prism.highlight(this);
        }
    },
};
</script>

<style lang="scss" scoped>
@import '@energysage/es-bs-base/scss/includes';

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
        margin-bottom: $spacer * 0.5;
        margin-right: $spacer * 0.5;
    }
}
</style>

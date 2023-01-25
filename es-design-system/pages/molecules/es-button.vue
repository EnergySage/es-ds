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

        <p class="mb-4">
            When using a button, please ensure that the copy style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
        </p>

        <h2>
            Primary Button
        </h2>
        <table class="table mb-4">
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
                        <div class="mb-2">
                            <es-button
                                size="lg">
                                Large button
                            </es-button>
                            <es-button size="lg">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>
                            <es-button size="lg">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>
                        </div>
                        <div>
                            <es-button size="sm">
                                Small button
                            </es-button>

                            <es-button size="sm">
                                Small button
                                <icon-chevron-right
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button size="sm">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Disabled
                    </td>
                    <td>
                        <div class="mb-2">
                            <es-button
                                disabled
                                size="lg">
                                Large button
                            </es-button>

                            <es-button
                                disabled
                                size="lg">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>

                            <es-button
                                disabled
                                size="lg">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                disabled
                                size="sm">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2>
            Secondary Button
        </h2>
        <table class="table mb-4">
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
                        <div class="mb-2">
                            <es-button
                                size="lg"
                                variant="secondary">
                                Large button
                            </es-button>
                            <es-button
                                size="lg"
                                variant="secondary">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>
                            <es-button
                                size="lg"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                size="sm"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Disabled
                    </td>
                    <td>
                        <div class="mb-2">
                            <es-button
                                disabled
                                size="lg"
                                variant="secondary">
                                Large button
                            </es-button>

                            <es-button
                                disabled
                                size="lg"
                                variant="secondary">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>

                            <es-button
                                disabled
                                size="lg"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                disabled
                                size="sm"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2>
            Outline Primary Button
        </h2>
        <table class="table mb-4">
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
                        <div class="mb-2">
                            <es-button
                                outline
                                size="lg">
                                Large button
                            </es-button>
                            <es-button
                                outline
                                size="lg">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>
                            <es-button
                                outline
                                size="lg">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                outline
                                size="sm">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Disabled
                    </td>
                    <td>
                        <div class="mb-2">
                            <es-button
                                disabled
                                outline
                                size="lg">
                                Large button
                            </es-button>

                            <es-button
                                disabled
                                outline
                                size="lg">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>

                            <es-button
                                disabled
                                outline
                                size="lg">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                disabled
                                outline
                                size="sm">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <h2>
            Outline Secondary Button
        </h2>
        <table class="table mb-4">
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
                        <div class="mb-2">
                            <es-button
                                outline
                                size="lg"
                                variant="secondary">
                                Large button
                            </es-button>
                            <es-button
                                outline
                                size="lg"
                                variant="secondary">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>
                            <es-button
                                outline
                                size="lg"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                outline
                                size="sm"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Disabled
                    </td>
                    <td>
                        <div class="mb-2">
                            <es-button
                                disabled
                                outline
                                size="lg"
                                variant="secondary">
                                Large button
                            </es-button>

                            <es-button
                                disabled
                                outline
                                size="lg"
                                variant="secondary">
                                Large button
                                <icon-chevron-right
                                    class="ml-1"
                                    height="1.25rem"
                                    width="1.25rem" />
                            </es-button>

                            <es-button
                                disabled
                                outline
                                size="lg"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1.25rem"
                                    width="1.25rem" />
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
                                    class="ml-2"
                                    height="1rem"
                                    width="1rem" />
                            </es-button>

                            <es-button
                                disabled
                                outline
                                size="sm"
                                variant="secondary">
                                <icon-chevron-right
                                    height="1rem"
                                    width="1rem" />
                            </es-button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsButton.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-button.vue" />
    </div>
</template>

<script>
import { EsButton, IconChevronRight } from '@energysage/es-vue-base';

export default {
    name: 'EsButtonDocs',
    components: {
        EsButton,
        IconChevronRight,
    },
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-button.vue');
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsButton.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

/**
 * ensures buttons are spaced out nicely on mobile and desktop
 * for the purposes of this documentation page while keeping the
 * example code patterns simple and easy to copy out.
 *
 * normally, one would want to use "mb-2" or "mr-2" utility classes
 * on the buttons to accomplish this spacing.
 */
button {
    margin-bottom: $spacer * 0.5;
    margin-right: $spacer * 0.5;
}
</style>

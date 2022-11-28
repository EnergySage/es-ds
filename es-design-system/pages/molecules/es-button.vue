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

        <table class="table my-5">
            <thead>
                <tr>
                    <th scope="col">
                        Variant
                    </th>
                    <th scope="col">
                        Small
                    </th>
                    <th scope="col">
                        Default
                    </th>
                    <th scope="col">
                        Large
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">
                        Primary
                    </td>
                    <td>
                        <es-button size="sm">
                            Small button
                        </es-button>
                    </td>
                    <td>
                        <es-button>
                            Medium button
                        </es-button>
                    </td>
                    <td>
                        <es-button size="lg">
                            Large button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Primary (Disabled)
                    </td>
                    <td>
                        <es-button
                            disabled
                            size="sm">
                            Small button
                        </es-button>
                    </td>
                    <td>
                        <es-button disabled>
                            Medium button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            disabled
                            size="lg">
                            Large button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Primary Outline
                    </td>
                    <td>
                        <es-button
                            :outline="true"
                            size="sm">
                            Small button
                        </es-button>
                    </td>
                    <td>
                        <es-button :outline="true">
                            Medium button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            :outline="true"
                            size="lg">
                            Large button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Primary Outline (Disabled)
                    </td>
                    <td>
                        <es-button
                            disabled
                            :outline="true"
                            size="sm">
                            Small button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            disabled
                            :outline="true">
                            Medium button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            disabled
                            :outline="true"
                            size="lg">
                            Large button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Dark (Secondary)
                    </td>
                    <td>
                        <es-button
                            variant="dark"
                            :outline="false"
                            size="sm">
                            Small button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="dark"
                            :outline="false">
                            Medium button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="dark"
                            :outline="false"
                            size="lg">
                            Large button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Dark Outline
                    </td>
                    <td>
                        <es-button
                            variant="dark"
                            :outline="true"
                            size="sm">
                            Small button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="dark"
                            :outline="true">
                            Medium button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="dark"
                            :outline="true"
                            size="lg">
                            Large button
                        </es-button>
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
import { EsButton } from '@energysage/es-vue-base';

export default {
    name: 'EsButtonDocs',
    components: {
        EsButton,
    },
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-badge.vue');
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsBadge.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
    },
};
</script>

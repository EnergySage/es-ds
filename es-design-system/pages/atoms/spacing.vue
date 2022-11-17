<template>
    <div>
        <b-row>
            <b-col>
                <h1>
                    Spacing
                </h1>
                <p>
                    Extended from <b-link href="https://getbootstrap.com/docs/4.6/utilities/spacing/">
                        bootstrap spacing
                    </b-link>
                </p>
                <table class="table table-bordered my-5">
                    <thead>
                        <tr>
                            <th scope="col">
                                Class Name
                            </th>
                            <th scope="col">
                                EM Value
                            </th>
                            <th scope="col">
                                Approximate PX Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="space in spacers"
                            :key="space.alias">
                            <td>
                                <code>{{ space.alias }}</code>
                            </td>
                            <td>
                                {{ space.em }}
                            </td>
                            <td>
                                {{ space.px }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/spacing.vue" />
    </div>
</template>

<script>
import sassSpacers from '@energysage/es-bs-base/scss/variables/_spacers.scss';

export default {
    name: 'AtomsSpace',
    data() {
        const spacers = Object.keys(sassSpacers)
            .map((key) => ({ key, value: sassSpacers[key] }))
            .map((item) => {
                const alias = `p-${item.key.replace(/s/, '')} m-${item.key.replace(/s/, '')}`;
                const em = Number(item.value.replace(/rem/, ''));
                const px = em * 16; // Assuming we'll never change base font-size
                return {
                    alias,
                    em,
                    px,
                };
            });

        // eslint-disable-next-line no-debugger
        // debugger;
        return {
            spacers,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./spacing.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.$prism.highlight(this);
    },
};
</script>

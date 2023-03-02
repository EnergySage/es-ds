<template>
    <div>
        <h1>
            Spacing
        </h1>
        <p>
            Extended from <b-link href="https://getbootstrap.com/docs/4.6/utilities/spacing/">
                bootstrap spacing
            </b-link>
        </p>

        <div class="mb-5">
            <p>
                Each spacing class is named for the percentage of the base size (16px) that generates the associated
                pixel value.
            </p>
            <p>
                For example, 32px is 200% of 16px, so the classes are named <code>p-200 m-200</code>.
            </p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Class Name
                        </th>
                        <th scope="col">
                            REM Value
                        </th>
                        <th scope="col">
                            PX Value
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
        </div>

        <div class="my-5">
            <h2>
                Deprecated Spacing
            </h2>
            <p>
                The following remain for backward compatibility but should not be used. Please refactor any code
                that does use them, as they will be removed in a future version of ESDS.
            </p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Class Name
                        </th>
                        <th scope="col">
                            REM Value
                        </th>
                        <th scope="col">
                            PX Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="space in deprecatedSpacers"
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
        </div>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/spacing.vue" />
    </div>
</template>

<script>
import sassDeprecatedSpacers from '@energysage/es-bs-base/scss/variables/_deprecated-spacers.scss';
import sassSpacers from '@energysage/es-bs-base/scss/variables/_spacers.scss';

export default {
    name: 'AtomsSpace',
    data() {
        const deprecatedSpacers = this.convertSpacerVariablesToTableEntries(sassDeprecatedSpacers);
        const spacers = this.convertSpacerVariablesToTableEntries(sassSpacers);

        // eslint-disable-next-line no-debugger
        // debugger;
        return {
            deprecatedSpacers,
            spacers,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./spacing.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        convertSpacerVariablesToTableEntries(vars) {
            return Object.keys(vars)
                .map((key) => ({ key, value: vars[key] }))
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
        },
    },
};
</script>

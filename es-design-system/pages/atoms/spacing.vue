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

        <div class="mb-450">
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
                            Class name
                        </th>
                        <th scope="col">
                            Multiplier (rem)
                        </th>
                        <th scope="col">
                            Spacing (px)
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

        <div class="my-450">
            <h2>
                Deprecated Spacing
            </h2>
            <p>
                The following class names remain for backward compatibility but should not be used.
                Please refactor any code that does use them, as they will be removed in a future version of ESDS.
            </p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Class name
                        </th>
                        <th scope="col">
                            Updated name
                        </th>
                        <th scope="col">
                            Multiplier (rem)
                        </th>
                        <th scope="col">
                            Spacing (px)
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
                            <code>{{ space.newAlias }}</code>
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
import sassSpacers from '@energysage/es-bs-base/scss/variables/_spacers.scss';

export default {
    name: 'AtomsSpacing',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    computed: {
        deprecatedSpacers() {
            return this.tableEntries
                // filter out updated spacers
                .filter((spacer) => spacer.key > 0 && spacer.key < 10)
                // find the equivalent spacer from the updated naming scheme
                .map((entry) => {
                    const newKey = this.spacers.find((spacer) => spacer.px === entry.px).key;
                    return {
                        ...entry,
                        newKey,
                        newAlias: this.generateAlias(newKey),
                    };
                });
        },
        spacers() {
            // filter out deprecated spacers
            return this.tableEntries.filter((spacer) => spacer.key < 1 || spacer.key > 6);
        },
        tableEntries() {
            return this.convertSpacerVariablesToTableEntries(sassSpacers);
        },
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
                    const key = parseInt(item.key.replace(/s/, ''), 10);
                    const alias = this.generateAlias(key);
                    const em = Number(item.value.replace(/rem/, ''));
                    const px = em * 16; // Assuming we'll never change base font-size
                    return {
                        alias,
                        em,
                        key,
                        px,
                    };
                });
        },
        generateAlias(key) {
            return `p-${key} m-${key}`;
        },
    },
};
</script>

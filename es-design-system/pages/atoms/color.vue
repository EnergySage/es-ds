<template>
    <div>
        <h1>
            Colors
        </h1>
        <p>
            Below you will find our named color definitions. They are meant to convey the meaning of the color
            using a defined naming convention. When working, please use these color definitions and try to avoid
            introducing new unamed colors.
        </p>
        <p>
            All colors have CSS utility classes associated with them.
            <code>text-{COLOR_NAME}</code> for text color and <code>bg-{COLOR_NAME}</code>
            for background color.
        </p>

        <div class="my-450">
            <h2>
                Brand Colors
            </h2>
            <b-row>
                <b-col
                    v-for="(value, alias) in brandColors"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="['teal', 'yellow'].includes(alias)"
                        :hex="value"
                        :token="alias" />
                    <p class="font-weight-semibold mb-0 mt-50">
                        {{ brandColorNames[alias] || alias }}
                    </p>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Tints
            </h2>
            <p class="mb-200">
                Tints are to be used as background colors for tables, badges, tags, labels, hovers, and notifications.
                They may also be used in graphics and charts as needed.
            </p>
            <h3>
                Primary Palette
            </h3>
            <b-row>
                <b-col
                    v-for="(value, alias) in cyanTints"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        is-light
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row class="mb-200">
                <b-col
                    v-for="(value, alias) in grayTints"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :is-light="['gray-600', 'gray-500'].includes(alias)"
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <h3>
                Secondary Palette
            </h3>
            <b-row>
                <b-col
                    v-for="(value, alias) in pinkTints"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        is-light
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    v-for="(value, alias) in tealTints"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        is-light
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    v-for="(value, alias) in yellowTints"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        is-light
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    v-for="(value, alias) in orangeTints"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        is-light
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Shades
            </h2>
            <p class="mb-200">
                Shades are to only be used if additional contrast is needed to comply to WCAG AA accessibility
                standards. Avoid using shades as background colors.
            </p>
            <h3>
                Primary Palette
            </h3>
            <b-row>
                <b-col
                    v-for="(value, alias) in cyanShades"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row class="mb-200">
                <b-col
                    v-for="(value, alias) in grayShades"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <h3>
                Secondary Palette
            </h3>
            <b-row>
                <b-col
                    v-for="(value, alias) in pinkShades"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    v-for="(value, alias) in tealShades"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    v-for="(value, alias) in yellowShades"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Grayscale
            </h2>
            <b-row>
                <b-col
                    v-for="(value, alias) in grays"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :is-light="[
                            'white', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500'
                        ].includes(alias)"
                        :show-border="['white', 'gray-100'].includes(alias)"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Product Colors
            </h2>
            <p>
                These colors are used to generate
                <b-link
                    href="https://bootstrap-vue.org/docs/reference/color-variants"
                    target="_blank">
                    variants of Bootstrap components.
                </b-link>
                Primary and secondary are the most commonly-used variants. The others may be deprecated
                for certain components; see the component documentation for details.
            </p>
            <b-row>
                <b-col
                    v-for="(value, alias) in variants"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-200">
                    <ds-color-swatch
                        :hex="value"
                        :is-light="alias === 'light'"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/color.vue" />
    </div>
</template>

<script>
import sassBrandColors from '@energysage/es-bs-base/scss/variables/_brand-colors.scss';
import sassCyans from '@energysage/es-bs-base/scss/variables/_cyans.scss';
import sassGrays from '@energysage/es-bs-base/scss/variables/_grays.scss';
import sassOranges from '@energysage/es-bs-base/scss/variables/_oranges.scss';
import sassPinks from '@energysage/es-bs-base/scss/variables/_pinks.scss';
import sassTeals from '@energysage/es-bs-base/scss/variables/_teals.scss';
import sassYellows from '@energysage/es-bs-base/scss/variables/_yellows.scss';
import sassVariants from '@energysage/es-bs-base/scss/variables/_variants.scss';

export default {
    name: 'AtomsColor',
    data() {
        return {
            brandColors: sassBrandColors,
            brandColorNames: {
                cyan: 'ES Blue',
                gray: 'ES Slate',
                pink: 'ES Pink',
                teal: 'ES Teal',
                yellow: 'ES Yellow',
                orange: 'ES Orange',
            },
            variants: sassVariants,
            grays: sassGrays,
            compCode: '',
            docCode: '',
        };
    },
    computed: {
        cyan() {
            return this.slice(sassCyans, ['cyan-500']);
        },
        cyanShades() {
            return this.slice(sassCyans, ['cyan-600', 'cyan-700', 'cyan-800']);
        },
        cyanTints() {
            return this.slice(sassCyans, ['cyan-400', 'cyan-300', 'cyan-200', 'cyan-100']);
        },
        orangeTints() {
            return this.slice(sassOranges, ['orange-400', 'orange-300', 'orange-200', 'orange-100']);
        },
        pinkShades() {
            return this.slice(sassPinks, ['pink-600', 'pink-700', 'pink-800']);
        },
        pinkTints() {
            return this.slice(sassPinks, ['pink-400', 'pink-300', 'pink-200', 'pink-100']);
        },
        gray() {
            return this.slice(sassGrays, ['gray-900']);
        },
        grayShades() {
            return this.slice(sassGrays, ['gray-1000', 'gray-1100', 'gray-1200']);
        },
        grayTints() {
            return this.slice(sassGrays, ['gray-800', 'gray-700', 'gray-600', 'gray-500']);
        },
        tealShades() {
            return this.slice(sassTeals, ['teal-600', 'teal-700', 'teal-800']);
        },
        tealTints() {
            return this.slice(sassTeals, ['teal-400', 'teal-300', 'teal-200', 'teal-100']);
        },
        yellowShades() {
            return this.slice(sassYellows, ['yellow-600', 'yellow-700', 'yellow-800']);
        },
        yellowTints() {
            return this.slice(sassYellows, ['yellow-400', 'yellow-300', 'yellow-200', 'yellow-100']);
        },
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./color.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        slice(colors, tokens) {
            const result = {};
            tokens.forEach((token) => {
                result[token] = colors[token];
            });
            return result;
        },
    },
};
</script>

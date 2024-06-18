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
            All colors (except restricted colors) have CSS utility classes associated with them.
            <code>text-{COLOR_NAME}</code> for text color and <code>bg-{COLOR_NAME}</code>
            for background color.
        </p>

        <div class="my-500">
            <h2>
                Core colors
            </h2>
            <b-row>
                <b-col
                    v-for="(value, alias) in coreColors"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="[
                            'white', 'soft-blue', 'medium-blue', 'warm-orange'
                        ].includes(alias)"
                        :hex="value"
                        :token="alias" />
                    <p class="font-weight-semibold mb-0 mt-50">
                        {{ coreColorNames[alias] || alias }}
                    </p>
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <h2>
                Primary
            </h2>
            <b-row>
                <b-col
                    v-for="[alias, value] in blues"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="[
                            'blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400'
                        ].includes(alias)"
                        :hex="value"
                        :show-border="['blue-50', 'blue-100'].includes(alias)"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <h2>
                Secondary
            </h2>
            <b-row>
                <b-col
                    v-for="[alias, value] in oranges"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="true"
                        :hex="value"
                        :show-border="['orange-50', 'orange-100'].includes(alias)"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <h2>
                Neutrals
            </h2>
            <b-row>
                <b-col
                    v-for="[alias, value] in neutrals"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="[
                            'gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500'
                        ].includes(alias)"
                        :hex="value"
                        :show-border="['gray-50', 'gray-100'].includes(alias)"
                        :token="alias" />
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <h2>
                Feedback
            </h2>

            <b-row class="mt-200">
                <b-col lg="6">
                    <h3>
                        Success
                    </h3>
                    <b-row>
                        <b-col
                            v-for="[alias, value] in successColors"
                            :key="alias"
                            cols="6"
                            sm="4"
                            md="3"
                            lg="4"
                            class="mb-100 text-center">
                            <ds-color-swatch
                                :is-light="true"
                                :hex="value"
                                :show-border="['success-50'].includes(alias)"
                                :token="alias" />
                        </b-col>
                    </b-row>
                </b-col>

                <b-col lg="6">
                    <h3>
                        Warning
                    </h3>
                    <b-row>
                        <b-col
                            v-for="[alias, value] in warningColors"
                            :key="alias"
                            cols="6"
                            sm="4"
                            md="3"
                            lg="4"
                            class="mb-100 text-center">
                            <ds-color-swatch
                                :is-light="true"
                                :hex="value"
                                :show-border="['warning-50'].includes(alias)"
                                :token="alias" />
                        </b-col>
                    </b-row>
                </b-col>

                <b-col lg="6">
                    <h3>
                        Error
                    </h3>
                    <b-row>
                        <b-col
                            v-for="[alias, value] in errorColors"
                            :key="alias"
                            cols="6"
                            sm="4"
                            md="3"
                            lg="4"
                            class="mb-100 text-center">
                            <ds-color-swatch
                                :is-light="true"
                                :hex="value"
                                :show-border="['error-50'].includes(alias)"
                                :token="alias" />
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <h2>
                Restricted colors
            </h2>
            <p>
                Use only for charts and data.
            </p>
            <b-row>
                <b-col
                    v-for="(value, alias) in chartColors"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="[
                            'myrtle-cactus-blue',
                            'sunny-yellow',
                            'petal-purple',
                            'white-oak',
                            'earthy-brown'
                        ].includes(alias)"
                        :hex="value"
                        :show-border="['white', 'soft-blue'].includes(alias)"
                        :style="{ backgroundColor: value }"
                        :token="alias" />
                    <p class="font-weight-semibold mb-0 mt-50">
                        {{ chartColorNames[alias] || alias }}
                    </p>
                </b-col>
            </b-row>
        </div>

        <es-collapse
            id="legacy-collapse"
            v-model="legacyCollapseVisible"
            :is-programmatic-until-user-input="false">
            <template #title>
                <h2 class="mb-0">
                    Legacy color names
                </h2>
            </template>
            <p>
                These legacy color names have all been updated to pull from the new brand colors above.
                Care was taken to match the old colors to the closest new color available, but you may still find
                differences when upgrading to the new visual identity.
            </p>
            <p>
                Please be sure to check all screens
                and pages of your app and make adjustments as necessary, paying close attention to whether text
                color is still accessible against the new background color using the
                <b-link
                    href="https://webaim.org/resources/contrastchecker/"
                    target="_blank">
                    WebAIM color contrast checker
                </b-link>.
            </p>

            <div class="my-200">
                <h3>
                    Brand Colors
                </h3>
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
                            :is-light="['teal', 'yellow', 'pink', 'orange'].includes(alias)"
                            :hex="value"
                            :token="alias" />
                        <p class="font-weight-semibold mb-0 mt-50">
                            {{ brandColorNames[alias] || alias }}
                        </p>
                    </b-col>
                </b-row>
            </div>

            <div class="my-200">
                <h3>
                    Primary Tints
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
                            :is-light="['cyan-100', 'cyan-200', 'cyan-300'].includes(alias)"
                            :hex="value"
                            :show-border="['cyan-100'].includes(alias)"
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
                            :is-light="['gray-500'].includes(alias)"
                            :hex="value"
                            :token="alias" />
                    </b-col>
                </b-row>
            </div>

            <div class="my-200">
                <h3>
                    Secondary Tints
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
                            :show-border="['pink-100'].includes(alias)"
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
                            :show-border="['teal-100'].includes(alias)"
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
                            :show-border="['yellow-100'].includes(alias)"
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
                            :show-border="['orange-100'].includes(alias)"
                            :token="alias" />
                    </b-col>
                </b-row>
            </div>

            <div class="my-200">
                <h3>
                    Primary Shades
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
            </div>

            <div class="my-200">
                <h3>
                    Secondary Shades
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
                            :is-light="true"
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
                            :is-light="true"
                            :token="alias" />
                    </b-col>
                </b-row>
            </div>

            <div class="my-200">
                <h3>
                    Grayscale
                </h3>
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
                                'white', 'gray-100', 'gray-150', 'gray-200', 'gray-300', 'gray-400', 'gray-500'
                            ].includes(alias)"
                            :show-border="['white', 'gray-100', 'gray-150'].includes(alias)"
                            :token="alias" />
                    </b-col>
                </b-row>
            </div>

            <div class="my-200">
                <h3>
                    Product Colors
                </h3>
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
                            :is-light="['danger', 'info', 'light', 'success', 'warning'].includes(alias)"
                            :token="alias" />
                    </b-col>
                </b-row>
            </div>
        </es-collapse>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/color.vue" />
    </div>
</template>

<script>
import sassBlues from '@energysage/es-bs-base/scss/variables/_blues.scss';
import sassCoreColors from '@energysage/es-bs-base/scss/variables/_core-colors.scss';
import sassErrorColors from '@energysage/es-bs-base/scss/variables/_error-colors.scss';
import sassNeutrals from '@energysage/es-bs-base/scss/variables/_neutrals.scss';
import sassOranges from '@energysage/es-bs-base/scss/variables/_oranges.scss';
import sassSuccessColors from '@energysage/es-bs-base/scss/variables/_success-colors.scss';
import sassWarningColors from '@energysage/es-bs-base/scss/variables/_warning-colors.scss';

import sassBrandColors from '@energysage/es-bs-base/scss/variables/_brand-colors.scss';
import sassCyans from '@energysage/es-bs-base/scss/variables/_cyans.scss';
import sassGrays from '@energysage/es-bs-base/scss/variables/_grays.scss';
import sassPinks from '@energysage/es-bs-base/scss/variables/_pinks.scss';
import sassTeals from '@energysage/es-bs-base/scss/variables/_teals.scss';
import sassYellows from '@energysage/es-bs-base/scss/variables/_yellows.scss';
import sassVariants from '@energysage/es-bs-base/scss/variables/_variants.scss';

const prepareColors = (colors) => Object.entries(colors).reverse();

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
            blues: prepareColors(sassBlues),
            // defining chart colors here just for documentation purposes
            // they should NOT be put into SASS and should NOT have bg-color utility classes
            // TODO: move these into a set of JS const variables exported from es-vue-base?
            chartColors: {
                'myrtle-cactus-blue': '#3ea2bd',
                'sunny-yellow': '#ffc021',
                'petal-purple': '#ca77d1',
                'leaf-green': '#4a9158',
                'white-oak': '#d4b595',
                'earthy-brown': '#9a6d51',
            },
            chartColorNames: {
                'myrtle-cactus-blue': 'ES myrtle cactus blue',
                'sunny-yellow': 'ES sunny yellow',
                'petal-purple': 'ES petal purple',
                'leaf-green': 'ES leaf green',
                'white-oak': 'ES white oak',
                'earthy-brown': 'ES earthy brown',
            },
            coreColors: sassCoreColors,
            coreColorNames: {
                white: 'ES white',
                'soft-blue': 'ES soft blue',
                'medium-blue': 'ES medium blue',
                'dark-blue': 'ES dark blue',
                'warm-orange': 'ES warm orange',
            },
            errorColors: prepareColors(sassErrorColors),
            grays: sassGrays,
            legacyCollapseVisible: false,
            neutrals: prepareColors(sassNeutrals),
            oranges: prepareColors(sassOranges),
            successColors: prepareColors(sassSuccessColors),
            variants: sassVariants,
            warningColors: prepareColors(sassWarningColors),
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

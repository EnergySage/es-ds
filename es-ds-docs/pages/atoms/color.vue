<script setup lang="ts">
// with vite, sass variable exports must be defined as xyz.module.scss in order to be
// imported into JS as an object rather than a string of the file contents
// https://github.com/vitejs/vite/discussions/9601#discussioncomment-3359769
import sassBlues from '@energysage/es-ds-styles/scss/modules/blues.module.scss';
import sassCoreColors from '@energysage/es-ds-styles/scss/modules/core-colors.module.scss';
import sassErrorColors from '@energysage/es-ds-styles/scss/modules/error-colors.module.scss';
import sassNeutrals from '@energysage/es-ds-styles/scss/modules/neutrals.module.scss';
import sassOranges from '@energysage/es-ds-styles/scss/modules/oranges.module.scss';
import sassSuccessColors from '@energysage/es-ds-styles/scss/modules/success-colors.module.scss';
import sassWarningColors from '@energysage/es-ds-styles/scss/modules/warning-colors.module.scss';

import sassBrandColors from '@energysage/es-ds-styles/scss/modules/brand-colors.module.scss';
import sassCyans from '@energysage/es-ds-styles/scss/modules/cyans.module.scss';
import sassGrays from '@energysage/es-ds-styles/scss/modules/grays.module.scss';
import sassPinks from '@energysage/es-ds-styles/scss/modules/pinks.module.scss';
import sassTeals from '@energysage/es-ds-styles/scss/modules/teals.module.scss';
import sassYellows from '@energysage/es-ds-styles/scss/modules/yellows.module.scss';
import sassVariants from '@energysage/es-ds-styles/scss/modules/variants.module.scss';

// utility functions
const prepareColors = (colors: any) => Object.entries(colors).reverse() as unknown as [string, string][];
const slice = (colors: any, tokens: any) => {
    const result: any = {};
    tokens.forEach((token: any) => {
        result[token] = colors[token];
    });
    return result;
};

const brandColors = sassBrandColors;
const brandColorNames = {
    cyan: 'ES Blue',
    gray: 'ES Slate',
    pink: 'ES Pink',
    teal: 'ES Teal',
    yellow: 'ES Yellow',
    orange: 'ES Orange',
};
const blues = prepareColors(sassBlues);
// defining chart colors here just for documentation purposes
// they should NOT be put into SASS and should NOT have bg-color utility classes
// TODO: move these into a set of JS const variables exported from es-ds-components?
const chartColors = {
    'myrtle-cactus-blue': '#3ea2bd',
    'sunny-yellow': '#ffc021',
    'petal-purple': '#ca77d1',
    'leaf-green': '#4a9158',
    'white-oak': '#d4b595',
    'earthy-brown': '#9a6d51',
};
const chartColorNames = {
    'myrtle-cactus-blue': 'ES myrtle cactus blue',
    'sunny-yellow': 'ES sunny yellow',
    'petal-purple': 'ES petal purple',
    'leaf-green': 'ES leaf green',
    'white-oak': 'ES white oak',
    'earthy-brown': 'ES earthy brown',
};
const coreColors = sassCoreColors;
const coreColorNames = {
    white: 'ES white',
    'soft-blue': 'ES soft blue',
    'medium-blue': 'ES medium blue',
    'dark-blue': 'ES dark blue',
    'warm-orange': 'ES warm orange',
};
const errorColors = prepareColors(sassErrorColors);
const grays = sassGrays;
const neutrals = prepareColors(sassNeutrals);
const oranges = prepareColors(sassOranges);
const successColors = prepareColors(sassSuccessColors);
const variants = sassVariants;
const warningColors = prepareColors(sassWarningColors);

// const cyan = slice(sassCyans, ['cyan-500']);
const cyanShades = slice(sassCyans, ['cyan-600', 'cyan-700', 'cyan-800']);
const cyanTints = slice(sassCyans, ['cyan-400', 'cyan-300', 'cyan-200', 'cyan-100']);
const orangeTints = slice(sassOranges, ['orange-400', 'orange-300', 'orange-200', 'orange-100']);
const pinkShades = slice(sassPinks, ['pink-600', 'pink-700', 'pink-800']);
const pinkTints = slice(sassPinks, ['pink-400', 'pink-300', 'pink-200', 'pink-100']);
// const gray = slice(sassGrays, ['gray-900']);
const grayShades = slice(sassGrays, ['gray-1000', 'gray-1100', 'gray-1200']);
const grayTints = slice(sassGrays, ['gray-800', 'gray-700', 'gray-600', 'gray-500']);
const tealShades = slice(sassTeals, ['teal-600', 'teal-700', 'teal-800']);
const tealTints = slice(sassTeals, ['teal-400', 'teal-300', 'teal-200', 'teal-100']);
const yellowShades = slice(sassYellows, ['yellow-600', 'yellow-700', 'yellow-800']);
const yellowTints = slice(sassYellows, ['yellow-400', 'yellow-300', 'yellow-200', 'yellow-100']);

const { $prism } = useNuxtApp();
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const docSource = await import('./color.vue?raw');

        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Colors</h1>
        <p>
            Below you will find our named color definitions. They are meant to convey the meaning of the color using a
            defined naming convention. When working, please use these color definitions and try to avoid introducing
            new unamed colors.
        </p>
        <p>
            All colors (except restricted colors) have CSS utility classes associated with them.
            <code>text-{COLOR_NAME}</code> for text color and <code>bg-{COLOR_NAME}</code>
            for background color.
        </p>

        <div class="my-500">
            <h2>Core colors</h2>
            <es-row>
                <es-col
                    v-for="(value, alias) in coreColors"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <!-- @vue-expect-error -->
                    <ds-color-swatch
                        :is-light="['white', 'soft-blue', 'medium-blue', 'warm-orange'].includes(alias)"
                        :hex="value"
                        :show-border="['white'].includes(alias)"
                        :token="alias" />
                    <p class="font-weight-semibold mb-0 mt-50">
                        <!-- @vue-expect-error -->
                        {{ coreColorNames[alias] || alias }}
                    </p>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Primary</h2>
            <es-row>
                <es-col
                    v-for="[alias, value] in blues"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="['blue-50', 'blue-100', 'blue-200', 'blue-300', 'blue-400'].includes(alias)"
                        :hex="value"
                        :show-border="['blue-50', 'blue-100'].includes(alias)"
                        :token="alias" />
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Secondary</h2>
            <es-row>
                <es-col
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
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Neutrals</h2>
            <es-row>
                <es-col
                    v-for="[alias, value] in neutrals"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="
                            ['gray-50', 'gray-100', 'gray-200', 'gray-300', 'gray-400', 'gray-500'].includes(alias)
                        "
                        :hex="value"
                        :show-border="['gray-50', 'gray-100'].includes(alias)"
                        :token="alias" />
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Feedback</h2>

            <es-row class="mt-200">
                <es-col lg="6">
                    <h3>Success</h3>
                    <es-row>
                        <es-col
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
                        </es-col>
                    </es-row>
                </es-col>

                <es-col lg="6">
                    <h3>Warning</h3>
                    <es-row>
                        <es-col
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
                        </es-col>
                    </es-row>
                </es-col>

                <es-col lg="6">
                    <h3>Error</h3>
                    <es-row>
                        <es-col
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
                        </es-col>
                    </es-row>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Restricted colors</h2>
            <p>Use only for charts and data.</p>
            <es-row>
                <es-col
                    v-for="(value, alias) in chartColors"
                    :key="alias"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                    class="mb-100 text-center">
                    <ds-color-swatch
                        :is-light="
                            [
                                'myrtle-cactus-blue',
                                'sunny-yellow',
                                'petal-purple',
                                'white-oak',
                                'earthy-brown',
                            ].includes(alias)
                        "
                        :hex="value"
                        :show-border="['white', 'soft-blue'].includes(alias)"
                        :style="{ backgroundColor: value }"
                        :token="alias" />
                    <p class="font-weight-semibold mb-0 mt-50">
                        {{ chartColorNames[alias] || alias }}
                    </p>
                </es-col>
            </es-row>
        </div>

        <es-collapse>
            <template #title>
                <h2 class="mb-0">Legacy color names</h2>
            </template>
            <p>
                These legacy color names have all been updated to pull from the new brand colors above. Care was taken
                to match the old colors to the closest new color available, but you may still find differences when
                upgrading to the new visual identity.
            </p>
            <p>
                Please be sure to check all screens and pages of your app and make adjustments as necessary, paying
                close attention to whether text color is still accessible against the new background color using the
                <a
                    href="https://webaim.org/resources/contrastchecker/"
                    target="_blank">
                    WebAIM color contrast checker </a
                >.
            </p>

            <div class="my-200">
                <h3>Brand Colors</h3>
                <es-row>
                    <es-col
                        v-for="(value, alias) in brandColors"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-100 text-center">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :is-light="['teal', 'yellow', 'pink', 'orange'].includes(alias)"
                            :hex="value"
                            :token="alias" />
                        <p class="font-weight-semibold mb-0 mt-50">
                            <!-- @vue-expect-error -->
                            {{ brandColorNames[alias] || alias }}
                        </p>
                    </es-col>
                </es-row>
            </div>

            <div class="my-200">
                <h3>Primary Tints</h3>
                <es-row>
                    <es-col
                        v-for="(value, alias) in cyanTints"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :is-light="['cyan-100', 'cyan-200', 'cyan-300'].includes(alias)"
                            :hex="value"
                            :show-border="['cyan-100'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row class="mb-200">
                    <es-col
                        v-for="(value, alias) in grayTints"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :is-light="['gray-500'].includes(alias)"
                            :hex="value"
                            :token="alias" />
                    </es-col>
                </es-row>
            </div>

            <div class="my-200">
                <h3>Secondary Tints</h3>
                <es-row>
                    <es-col
                        v-for="(value, alias) in pinkTints"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            is-light
                            :hex="value"
                            :show-border="['pink-100'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row>
                    <es-col
                        v-for="(value, alias) in tealTints"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            is-light
                            :hex="value"
                            :show-border="['teal-100'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row>
                    <es-col
                        v-for="(value, alias) in yellowTints"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            is-light
                            :hex="value"
                            :show-border="['yellow-100'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row>
                    <es-col
                        v-for="(value, alias) in orangeTints"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            is-light
                            :hex="value"
                            :show-border="['orange-100'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
            </div>

            <div class="my-200">
                <h3>Primary Shades</h3>
                <es-row>
                    <es-col
                        v-for="(value, alias) in cyanShades"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row class="mb-200">
                    <es-col
                        v-for="(value, alias) in grayShades"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :token="alias" />
                    </es-col>
                </es-row>
            </div>

            <div class="my-200">
                <h3>Secondary Shades</h3>
                <es-row>
                    <es-col
                        v-for="(value, alias) in pinkShades"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :is-light="true"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row>
                    <es-col
                        v-for="(value, alias) in tealShades"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :token="alias" />
                    </es-col>
                </es-row>
                <es-row>
                    <es-col
                        v-for="(value, alias) in yellowShades"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :is-light="true"
                            :token="alias" />
                    </es-col>
                </es-row>
            </div>

            <div class="my-200">
                <h3>Grayscale</h3>
                <es-row>
                    <es-col
                        v-for="(value, alias) in grays"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :is-light="
                                [
                                    'white',
                                    'gray-100',
                                    'gray-150',
                                    'gray-200',
                                    'gray-300',
                                    'gray-400',
                                    'gray-500',
                                ].includes(alias)
                            "
                            :show-border="['white', 'gray-100', 'gray-150'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
            </div>

            <div class="my-200">
                <h3>Product Colors</h3>
                <p>
                    These colors are used to generate
                    <a
                        href="https://bootstrap-vue.org/docs/reference/color-variants"
                        target="_blank">
                        variants of Bootstrap components.
                    </a>
                    Primary and secondary are the most commonly-used variants. The others may be deprecated for certain
                    components; see the component documentation for details.
                </p>
                <es-row>
                    <es-col
                        v-for="(value, alias) in variants"
                        :key="alias"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                        class="mb-200">
                        <!-- @vue-expect-error -->
                        <ds-color-swatch
                            :hex="value"
                            :is-light="['danger', 'info', 'light', 'success', 'warning'].includes(alias)"
                            :token="alias" />
                    </es-col>
                </es-row>
            </div>
        </es-collapse>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/color.vue" />
    </div>
</template>

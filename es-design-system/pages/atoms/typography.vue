<template>
    <div>
        <h1>
            Typography
        </h1>
        <p>
            Extended from <b-link
                href="https://getbootstrap.com/docs/4.6/content/typography/"
                target="_blank">
                bootstrap typography.
            </b-link>
        </p>
        <p>
            When writing a heading, please ensure that the copy style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
            Also, please
            <b-link
                target="_blank"
                href="https://a11y-style-guide.com/style-guide/section-general.html#kssref-general-typography">
                do not
            </b-link>
            rely only on the appearance of the font (color, shape, font variation, placement, etc.)
            to convey meaning.
        </p>

        <div class="my-500">
            <h2>
                Headings
            </h2>
            <ds-responsive-table class="responsive-table-typography">
                <ds-responsive-table-row
                    v-for="example in headingExamples"
                    :key="example.name">
                    <ds-responsive-table-column md="3">
                        <template #name>
                            Example
                        </template>
                        <template #value>
                            <component
                                :is="example.tag"
                                :class="example.class">
                                {{ example.name }}
                            </component>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name>
                            Mobile
                        </template>
                        <template #value>
                            <p class="mb-25">
                                <span class="font-italic">
                                    Size:
                                </span>
                                {{ `${example.sizeMobilePx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.sizeMobileRem}` }}
                            </p>
                            <p class="font-size-75 mb-0">
                                <span class="font-italic">
                                    Line height:
                                </span>
                                {{ `${example.lineHeightMobilePx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.lineHeightMobileRem}` }}
                            </p>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name>
                            Desktop
                        </template>
                        <template #value>
                            <p class="mb-25">
                                <span class="font-italic">
                                    Size:
                                </span>
                                {{ `${example.sizeDesktopPx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.sizeDesktopRem}` }}
                            </p>
                            <p class="font-size-75 mb-0">
                                <span class="font-italic">
                                    Line height:
                                </span>
                                {{ `${example.lineHeightDesktopPx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.lineHeightDesktopRem}` }}
                            </p>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name>
                            Attributes
                        </template>
                        <template #value>
                            <p class="mb-25">
                                <span class="font-italic">
                                    Weight:
                                </span>
                                {{ example.fontWeight }}
                            </p>
                            <p class="font-size-75 mb-25">
                                <span class="font-italic">
                                    Bottom margin:
                                </span>
                                {{ `${example.marginBottomPx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.marginBottomRem}` }}
                            </p>
                            <p
                                v-if="example.letterSpacingPx"
                                class="font-size-75 mb-25">
                                <span class="font-italic">
                                    Letter spacing:
                                </span>
                                {{ `${example.letterSpacingPx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.letterSpacingRem}` }}
                            </p>
                            <p class="font-size-75 mb-0">
                                <span class="font-italic">
                                    Color:
                                </span>
                                {{ example.color }}
                            </p>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="my-500">
            <h2>
                Eyebrow with heading
            </h2>
            <p>
                An eyebrow is commonly used just above a heading to indicate a category. Below is an example of how to
                accomplish this while meeting accessibility guidelines regarding heading order, but still achieving a
                Heading 1 font size for the question.
            </p>
            <div class="border pb-lg-100 px-100 px-lg-200 pt-100 pt-lg-200 rounded">
                <h3 class="eyebrow mb-25">
                    Property details
                </h3>
                <h4 class="h1">
                    What is your address?
                </h4>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Eyebrow as visual treatment only
            </h2>
            <p>
                Occasionally, an eyebrow will be used in a situation where is not appropriate to use a heading element,
                like on a customer name below a
                <b-link
                    href="https://css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes/#aa-hey-what-about-the-figure-element"
                    target="_blank">
                    quote from their review.
                </b-link>
                Below is an example of how to accomplish this.
            </p>
            <div class="border pb-lg-100 px-100 px-lg-200 pt-100 pt-lg-200 rounded">
                <figure>
                    <blockquote class="font-size-300">
                        “Working with this company was a breeze. They were so friendly and helpful.”
                    </blockquote>
                    <figcaption>
                        <p class="eyebrow mb-0 text-body">
                            Sofia
                        </p>
                        <p>
                            Homeowner
                        </p>
                    </figcaption>
                </figure>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Body
            </h2>
            <ds-responsive-table class="responsive-table-typography mb-100">
                <ds-responsive-table-row
                    v-for="example in bodyExamples"
                    :key="example.name">
                    <ds-responsive-table-column
                        md="4"
                        lg="3">
                        <template #name>
                            Example
                        </template>
                        <template #value>
                            <component
                                :is="example.tag"
                                :class="example.class"
                                :href="example.tag === 'a' ? 'https://www.energysage.com/' : null"
                                :target="example.tag === 'a' ? '_blank' : null">
                                {{ example.name }}
                            </component>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3">
                        <template #name>
                            Size
                        </template>
                        <template #value>
                            <p class="mb-25">
                                <span class="font-italic">
                                    Size:
                                </span>
                                {{ `${example.fontSizePx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.fontSizeRem}` }}
                            </p>
                            <p class="font-size-75 mb-0">
                                <span class="font-italic">
                                    Line height:
                                </span>
                                {{ `${example.lineHeightPx}px` }}
                                <span class="d-inline-block mx-25">
                                    /
                                </span>
                                {{ `${example.lineHeightRem}` }}
                            </p>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column
                        md="4"
                        lg="3">
                        <template #name>
                            Attributes
                        </template>
                        <template #value>
                            <p class="mb-25">
                                <span class="font-italic">
                                    Weight:
                                </span>
                                {{ example.fontWeight }}
                            </p>
                            <p class="font-size-75 mb-0">
                                <span class="font-italic">
                                    Color:
                                </span>
                                {{ example.color }}
                            </p>
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>

            <h3>
                Bulleted lists
            </h3>
            <p>
                Here is an example of an unordered list.
            </p>
            <ul>
                <li>
                    This is the first item.
                </li>
                <li>
                    This is the second item.
                </li>
                <li>
                    This is the third item.
                </li>
            </ul>
            <p>
                Here is an example of an ordered list.
            </p>
            <ol>
                <li>
                    This is the first item.
                </li>
                <li>
                    This is the second item.
                </li>
                <li>
                    This is the third item.
                </li>
            </ol>
            <p>
                Here is an example of an unstyled list.
            </p>
            <ul class="list-unstyled">
                <li>
                    This is the first item.
                </li>
                <li>
                    This is the second item.
                </li>
                <li>
                    This is the third item.
                </li>
            </ul>
        </div>

        <b-row class="my-500">
            <b-col>
                <h2>
                    Font weight
                </h2>
                <p>
                    These utility classes will apply the associated font weight to text.
                </p>
                <ds-responsive-table class="responsive-table-typography">
                    <ds-responsive-table-row
                        v-for="data in fontWeightItems"
                        :key="data.name">
                        <ds-responsive-table-column
                            md="4"
                            lg="3"
                            xxl="2">
                            <template #name>
                                Name
                            </template>
                            <template #value>
                                <code>{{ data.name }}</code>
                            </template>
                        </ds-responsive-table-column>
                        <ds-responsive-table-column
                            md="2"
                            lg="1">
                            <template #name>
                                Weight
                            </template>
                            <template #value>
                                {{ data.weight }}
                            </template>
                        </ds-responsive-table-column>
                        <ds-responsive-table-column
                            md="6"
                            lg="8"
                            xxl="9">
                            <template #name>
                                Example
                            </template>
                            <template #value>
                                <span :class="data.name">The quick brown fox jumps over the lazy dog.</span>
                            </template>
                        </ds-responsive-table-column>
                    </ds-responsive-table-row>
                </ds-responsive-table>
            </b-col>
        </b-row>

        <b-row class="my-500">
            <b-col>
                <h2>
                    Font size
                </h2>
                <p>
                    These utility classes will apply the associated font size to text. Responsive versions for
                    each breakpoint are also available (e.g. <code>font-size-sm-400</code>,
                    <code>font-size-md-400</code>, <code>font-size-lg-400</code>, <code>font-size-xl-400</code>,
                    <code>font-size-xxl-400</code>).
                </p>
                <ds-responsive-table class="responsive-table-typography">
                    <ds-responsive-table-row
                        v-for="data in fontSizeItems"
                        :key="data.name">
                        <ds-responsive-table-column
                            md="4"
                            lg="3"
                            xxl="2">
                            <template #name>
                                Name
                            </template>
                            <template #value>
                                <code>{{ data.name }}</code>
                            </template>
                        </ds-responsive-table-column>
                        <ds-responsive-table-column
                            md="2"
                            lg="1">
                            <template #name>
                                Size
                            </template>
                            <template #value>
                                {{ calculateActualFontSize(data.size) }}
                            </template>
                        </ds-responsive-table-column>
                        <ds-responsive-table-column
                            md="6"
                            lg="8"
                            xxl="9">
                            <template #name>
                                Example
                            </template>
                            <template #value>
                                <span :class="data.name">The quick brown fox jumps over the lazy dog.</span>
                            </template>
                        </ds-responsive-table-column>
                    </ds-responsive-table-row>
                </ds-responsive-table>
            </b-col>
        </b-row>

        <es-collapse
            id="legacy-collapse"
            v-model="legacyCollapseVisible"
            :is-programmatic-until-user-input="false">
            <template #title>
                <h2 class="mb-0">
                    Legacy class names
                </h2>
            </template>
            <p>
                The typography class names below are deprecated and have been updated to the new style that
                is the closest match. Avoid using them in new code, and refactor your existing code to remove
                instances of them. They will be removed in a future version of ESDS.
            </p>

            <div class="my-500">
                <h3>
                    Display (deprecated)
                </h3>
                <ds-responsive-table class="responsive-table-typography">
                    <ds-responsive-table-row
                        v-for="example in displayExamples"
                        :key="example.name">
                        <ds-responsive-table-column>
                            <template #name>
                                Name
                            </template>
                            <template #value>
                                <code>
                                    {{ example.class }}
                                </code>
                            </template>
                        </ds-responsive-table-column>
                        <ds-responsive-table-column>
                            <template #name>
                                Example
                            </template>
                            <template #value>
                                <h1 :class="example.class">
                                    {{ example.name }}
                                </h1>
                            </template>
                        </ds-responsive-table-column>
                    </ds-responsive-table-row>
                </ds-responsive-table>
            </div>

            <b-row class="my-500">
                <b-col>
                    <h2>
                        Font size (deprecated)
                    </h2>
                    <ds-responsive-table class="responsive-table-typography">
                        <ds-responsive-table-row
                            v-for="data in deprecatedFontSizeItems"
                            :key="data.name">
                            <ds-responsive-table-column
                                md="4"
                                lg="3"
                                xxl="2">
                                <template #name>
                                    Name
                                </template>
                                <template #value>
                                    <code>{{ data.name }}</code>
                                </template>
                            </ds-responsive-table-column>
                            <ds-responsive-table-column
                                md="2"
                                lg="1">
                                <template #name>
                                    Size
                                </template>
                                <template #value>
                                    {{ calculateActualFontSize(data.size) }}
                                </template>
                            </ds-responsive-table-column>
                            <ds-responsive-table-column
                                md="6"
                                lg="8"
                                xxl="9">
                                <template #name>
                                    Example
                                </template>
                                <template #value>
                                    <span :class="data.name">The quick brown fox jumps over the lazy dog.</span>
                                </template>
                            </ds-responsive-table-column>
                        </ds-responsive-table-row>
                    </ds-responsive-table>
                </b-col>
            </b-row>
        </es-collapse>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/typography.vue" />
    </div>
</template>

<script>
import sassHeadingFontSizesDesktop from '@energysage/es-bs-base/scss/variables/_heading-font-sizes-desktop.scss';
import sassHeadingFontSizesMobile from '@energysage/es-bs-base/scss/variables/_heading-font-sizes-mobile.scss';
import sassHeadingGeneral from '@energysage/es-bs-base/scss/variables/_heading-general.scss';
import sassHeadingLineHeightsDesktop from '@energysage/es-bs-base/scss/variables/_heading-line-heights-desktop.scss';
import sassHeadingLineHeightsMobile from '@energysage/es-bs-base/scss/variables/_heading-line-heights-mobile.scss';
import sassHeadingEyebrow from '@energysage/es-bs-base/scss/variables/_heading-eyebrow.scss';
import sassFontSizes from '@energysage/es-bs-base/scss/variables/_font-sizes.scss';
import sassFontWeights from '@energysage/es-bs-base/scss/variables/_font-weights.scss';
import sassLineHeights from '@energysage/es-bs-base/scss/variables/_line-heights.scss';
import sassPostFontSizesDesktop from '@energysage/es-bs-base/scss/variables/_post-font-sizes-desktop.scss';
import sassPostFontSizesMobile from '@energysage/es-bs-base/scss/variables/_post-font-sizes-mobile.scss';
import sassPostGeneral from '@energysage/es-bs-base/scss/variables/_post-general.scss';
import sassPostLineHeightsDesktop from '@energysage/es-bs-base/scss/variables/_post-line-heights-desktop.scss';
import sassPostLineHeightsMobile from '@energysage/es-bs-base/scss/variables/_post-line-heights-mobile.scss';
import sassType from '@energysage/es-bs-base/scss/variables/_type.scss';

const deprecatedFontSizes = ['xl', 'xxl'];
const excludedFontSizes = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'];

const BASE_FONT_SIZE_PX = 16;

export default {
    name: 'AtomsTypography',
    data() {
        return {
            deprecatedFontSizeItems: [
                ...Object.entries(sassFontSizes)
                    .filter(([key]) => deprecatedFontSizes.some((suffix) => key.endsWith(suffix)))
                    .map(([name, size]) => ({ name, size })),
            ],
            fontSizeItems: [
                ...Object.entries(sassFontSizes)
                    .filter(([key]) => !excludedFontSizes.some((suffix) => key.endsWith(suffix)))
                    .map(([name, size]) => ({ name, size })),
            ],
            fontWeightItems: [
                ...Object.entries(sassFontWeights).map(([name, weight]) => ({
                    name,
                    weight,
                })),
            ],
            legacyCollapseVisible: false,
            docCode: '',
        };
    },
    computed: {
        bodyExamples() {
            const seeds = [
                {
                    name: 'Extra small body',
                    key: 'xs',
                    tag: 'span',
                },
                {
                    name: 'Small body',
                    key: 'sm',
                    tag: 'span',
                },
                {
                    name: 'Regular body',
                    key: 'base',
                    tag: 'span',
                },
                {
                    name: 'Large body',
                    key: 'lg',
                    tag: 'span',
                },
                {
                    name: 'Link small body',
                    key: 'sm',
                    tag: 'a',
                },
                {
                    name: 'Link regular body',
                    key: 'base',
                    tag: 'a',
                },
                {
                    name: 'Link large body',
                    key: 'lg',
                    tag: 'a',
                },
            ];

            return seeds.reduce((result, seed) => {
                const fontSizeRem = sassFontSizes[`font-size-${seed.key}`];
                const fontSizePx = parseFloat(fontSizeRem.replace('rem', '')) * BASE_FONT_SIZE_PX;
                const lineHeightRem = sassLineHeights[`line-height-${seed.key}`];
                const lineHeightPx = Math.round(
                    (parseFloat(lineHeightRem.replace('rem', '')) * BASE_FONT_SIZE_PX) * 10,
                ) / 10;
                result.push({
                    ...seed,
                    class: seed.key !== 'base' ? `font-size-${seed.key}` : null,
                    color: seed.tag === 'a' ? sassType['link-color'] : sassType['body-color'],
                    fontSizePx,
                    fontSizeRem,
                    fontWeight: seed.tag === 'a' ? sassType['link-weight'] : sassType['font-weight-base'],
                    lineHeightPx,
                    lineHeightRem,
                });
                return result;
            }, []);
        },
        displayExamples() {
            const result = [];

            // display-1 through display-4
            for (let i = 1; i <= 4; i += 1) {
                result.push({
                    class: `display-${i}`,
                    name: `Display ${i}`,
                });
            }

            return result;
        },
        headingExamples() {
            const result = [];

            // post1 through post2
            for (let i = 1; i <= 3; i += 1) {
                result.push(this.createHeadingExample(
                    `post${i}`,
                    'post',
                    'Post',
                    sassPostGeneral,
                    sassPostFontSizesMobile,
                    sassPostFontSizesDesktop,
                    sassPostLineHeightsMobile,
                    sassPostLineHeightsDesktop,
                ));
            }

            // h1 through h6
            for (let i = 1; i <= 6; i += 1) {
                result.push(this.createHeadingExample(
                    `h${i}`,
                    'h',
                    'Heading',
                    sassHeadingGeneral,
                    sassHeadingFontSizesMobile,
                    sassHeadingFontSizesDesktop,
                    sassHeadingLineHeightsMobile,
                    sassHeadingLineHeightsDesktop,
                ));
            }

            // eyebrow
            result.push(this.createHeadingExample(
                'eyebrow',
                'h',
                'Eyebrow',
                {
                    color: sassHeadingEyebrow.color,
                    fontWeight: sassHeadingEyebrow.fontWeight,
                    marginBottom: sassHeadingEyebrow.marginBottom,
                    letterSpacing: sassHeadingEyebrow.letterSpacing,
                },
                {
                    eyebrow: sassHeadingEyebrow.fontSize,
                },
                {
                    eyebrow: sassHeadingEyebrow.fontSize,
                },
                {
                    eyebrow: sassHeadingEyebrow.lineHeight,
                },
                {
                    eyebrow: sassHeadingEyebrow.lineHeight,
                },
            ));

            return result;
        },
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./typography.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        calculateActualFontSize(remStr) {
            if (!remStr) {
                return '';
            }
            const multiplier = parseFloat(remStr.replace('rem', ''));
            return `${multiplier * 16}px`;
        },
        createHeadingExample(
            identifier,
            categoryPrefix,
            categoryName,
            generalInfo,
            mobileFontSizes,
            desktopFontSizes,
            mobileLineHeights,
            desktopLineHeights,
        ) {
            const sizeMobileRem = mobileFontSizes[identifier];
            const sizeDesktopRem = desktopFontSizes[identifier];
            const sizeMobilePx = parseFloat(sizeMobileRem.replace('rem', '')) * BASE_FONT_SIZE_PX;
            const sizeDesktopPx = parseFloat(sizeDesktopRem.replace('rem', '')) * BASE_FONT_SIZE_PX;
            const lineHeightMobileRem = mobileLineHeights[identifier];
            const lineHeightMobilePx = Math.round(
                (parseFloat(lineHeightMobileRem.replace('rem', '')) * BASE_FONT_SIZE_PX) * 10,
            ) / 10;
            const lineHeightDesktopRem = desktopLineHeights[identifier];
            const lineHeightDesktopPx = Math.round(
                (parseFloat(lineHeightDesktopRem.replace('rem', '')) * BASE_FONT_SIZE_PX) * 10,
            ) / 10;
            const marginBottomRem = generalInfo.marginBottom;
            const marginBottomPx = parseFloat(marginBottomRem.replace('rem', '')) * BASE_FONT_SIZE_PX;

            const isEyebrow = identifier === 'eyebrow';
            const isHeading = identifier[0] === 'h';

            let letterSpacingRem = '';
            let letterSpacingPx = '';

            if (isEyebrow) {
                letterSpacingRem = generalInfo.letterSpacing;
                letterSpacingPx = parseFloat(letterSpacingRem.replace('rem', '')) * BASE_FONT_SIZE_PX;
            }

            return {
                class: isHeading ? '' : identifier,
                color: generalInfo.color,
                fontWeight: generalInfo.fontWeight,
                letterSpacingPx,
                letterSpacingRem,
                lineHeightDesktopPx,
                lineHeightDesktopRem,
                lineHeightMobilePx,
                lineHeightMobileRem,
                marginBottomPx,
                marginBottomRem,
                name: isEyebrow ? 'Eyebrow' : `${categoryName} ${identifier.replace(categoryPrefix, '')}`,
                sizeDesktopPx,
                sizeDesktopRem,
                sizeMobilePx,
                sizeMobileRem,
                // eslint-disable-next-line no-nested-ternary
                tag: isEyebrow ? 'h2' : isHeading ? identifier : 'h1',
            };
        },
    },
};
</script>

<style lang="scss" scoped>
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;

.responsive-table-typography {
    ::v-deep dl {
        dd {
            max-height: 180px;
            overflow: hidden;
        }
    }
}

@include breakpoints.media-breakpoint-up(xl) {
    .responsive-table-typography {
        ::v-deep dl {
            dd {
                max-height: none;
                overflow: visible;
            }
        }
    }
}
</style>

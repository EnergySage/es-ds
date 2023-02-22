<template>
    <div>
        <h1>
            Typography
        </h1>
        <p>
            Extended from <b-link href="https://getbootstrap.com/docs/4.6/content/typography/">
                bootstrap typography.
            </b-link>
            Please
            <b-link
                target="_blank"
                href="https://a11y-style-guide.com/style-guide/section-general.html#kssref-general-typography">
                do not
            </b-link>
            rely only on the appearance of the font (color, shape, font variation, placement, etc.)
            to convey meaning.
        </p>
        <p>
            When writing a heading, please ensure that the copy style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
        </p>
        <div class="my-5">
            <ul class="list-unstyled">
                <li>
                    <h1>
                        h1. Heading
                    </h1>
                </li>
                <li>
                    <h2>
                        h2. Heading
                    </h2>
                </li>
                <li>
                    <h3>
                        h3. Heading
                    </h3>
                </li>
                <li>
                    <h4>
                        h4. Heading
                    </h4>
                </li>
                <li>
                    <h5>
                        h5. Heading
                    </h5>
                </li>
                <li>
                    <h6>
                        h6. Heading
                    </h6>
                </li>
                <li>
                    <h3 class="eyebrow">
                        Eyebrow
                    </h3>
                </li>
                <li>
                    <p>
                        Paragraph: Mint lime taco salsa lemon lime minty tabasco
                        pepper apple vinaigrette chai tea portobello mushrooms
                        couscous eating together green bowl tahini drizzle mint
                        crispy iceberg lettuce orange dill lentils lime Southern
                        Italian mediterranean vegetables pasta lemon. Hummus
                        falafel bowl red grapes plums peppermint artichoke hearts
                        ultimate crunchy seaweed lemonade zest walnut mushroom tart
                        macadamia nut cookies apples hearts of palm cherries Thai
                        super chili lemon tahini dressing seeds sweet potato dragon
                        fruit smoked tofu.
                    </p>
                </li>
                <li>
                    <b-link href="#foo">
                        Example link
                    </b-link>
                </li>
            </ul>
        </div>

        <div class="my-5">
            <h2>
                Eyebrow with heading
            </h2>
            <p>
                An eyebrow is commonly used just above a heading to indicate a category. Below is an example of how to
                accomplish this while meeting accessibility guidelines regarding heading order, but still achieving a
                Heading 1 font size for the question.
            </p>
            <div class="border pb-lg-3 px-3 px-lg-4 pt-3 pt-lg-4 rounded">
                <h3 class="eyebrow mb-1">
                    Property details
                </h3>
                <h4 class="h1">
                    What is your address?
                </h4>
            </div>
        </div>

        <div class="my-5">
            <h2>
                Eyebrow as visual treatment only
            </h2>
            <p>
                Occasionally, an eyebrow will be used in a situation where is not appropriate to use a heading element,
                like in the case of a
                <b-link
                    href="https://css-tricks.com/quoting-in-html-quotations-citations-and-blockquotes/"
                    target="_blank">
                    quote from a customer review.
                </b-link>
                Below is an example of how to accomplish this.
            </p>
            <div class="border pb-lg-3 px-3 px-lg-4 pt-3 pt-lg-4 rounded">
                <figure>
                    <blockquote class="font-size-lg">
                        &quot;Working with this company was a breeze. They were so friendly and helpful.&quot;
                    </blockquote>
                    <figcaption>
                        <p class="eyebrow mb-0">
                            Sofia
                        </p>
                        <p>
                            Homeowner
                        </p>
                    </figcaption>
                </figure>
            </div>
        </div>

        <b-row class="my-5">
            <b-col>
                <h2>
                    Font weight utility classes
                </h2>
                <b-table
                    fixed
                    :fields="fontFields"
                    :items="fontWeightItems"
                    striped>
                    <template #cell(example)="data">
                        <span :class="data.item.name">sample text at {{ data.item.weight }} weight</span>
                    </template>
                </b-table>
            </b-col>
        </b-row>

        <b-row class="my-5">
            <b-col>
                <h2>
                    Font size utility classes
                </h2>
                <b-table
                    fixed
                    :fields="fontFields"
                    :items="fontSizeItems"
                    striped>
                    <template #cell(example)="data">
                        <span :class="data.item.name">sample text at {{ data.item.size }} size</span>
                    </template>
                </b-table>
            </b-col>
        </b-row>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/typography.vue" />
    </div>
</template>

<script>
import sassType from '@energysage/es-bs-base/scss/variables/_type.scss';

export default {
    name: 'AtomsTypography',
    data() {
        return {
            sassType,
            fontFields: [
                'name',
                // virtual column that can reference two fields
                { key: 'example', label: 'Example' },
            ],
            fontWeightItems: [
                {
                    name: 'font-weight-lighter',
                    weight: '200',
                },
                {
                    name: 'font-weight-light',
                    weight: '300',
                },
                {
                    name: 'font-weight-normal',
                    weight: '400',
                },
                {
                    name: 'font-weight-semibold',
                    weight: '500',
                },
                {
                    name: 'font-weight-bold',
                    weight: '600',
                },
                {
                    name: 'font-weight-bolder',
                    weight: '700',
                },
            ],
            fontSizeItems: [
                {
                    name: 'font-size-xs',
                    size: sassType.xs,
                },
                {
                    name: 'font-size-sm',
                    size: sassType.sm,
                },
                {
                    name: 'font-size-base',
                    size: sassType.base,
                },
                {
                    name: 'font-size-lg',
                    size: sassType.lg,
                },
                {
                    name: 'font-size-xl',
                    size: sassType.xl,
                },
                {
                    name: 'font-size-xxl',
                    size: sassType.xxl,
                },
            ],
            docCode: '',
        };
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
};
</script>

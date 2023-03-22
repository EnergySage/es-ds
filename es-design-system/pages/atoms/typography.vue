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
        <div class="my-450">
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

        <div class="my-450">
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

        <div class="my-450">
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

        <b-row class="my-450">
            <b-col>
                <h2>
                    Font weight
                </h2>
                <p>
                    These utility classes will apply the associated font weight to text.
                </p>
                <div class="responsive-table">
                    <div
                        v-for="data in fontWeightItems"
                        :key="data.name"
                        class="responsive-table-row">
                        <dl>
                            <dt>
                                Name
                            </dt>
                            <dd>
                                {{ data.name }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Weight
                            </dt>
                            <dd>
                                {{ data.weight }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Example
                            </dt>
                            <dd>
                                <span :class="data.name">The quick brown fox jumps over the lazy dog.</span>
                            </dd>
                        </dl>
                    </div>
                </div>
            </b-col>
        </b-row>

        <b-row class="my-450">
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
                <div class="responsive-table responsive-table-font-size">
                    <div
                        v-for="data in fontSizeItems"
                        :key="data.name"
                        class="responsive-table-row">
                        <dl>
                            <dt>
                                Name
                            </dt>
                            <dd>
                                {{ data.name }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Size
                            </dt>
                            <dd>
                                {{ calculateActualFontSize(data.size) }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Example
                            </dt>
                            <dd>
                                <span :class="data.name">The quick brown fox jumps over the lazy dog.</span>
                            </dd>
                        </dl>
                    </div>
                </div>
            </b-col>
        </b-row>

        <b-row class="my-450">
            <b-col>
                <h2>
                    Font size (deprecated)
                </h2>
                <p>
                    These utility classes are deprecated. Avoid using them and refactor your code to remove instances
                    of them. They will be removed in a future version of ESDS.
                </p>
                <div class="responsive-table responsive-table-font-size">
                    <div
                        v-for="data in deprecatedFontSizeItems"
                        :key="data.name"
                        class="responsive-table-row">
                        <dl>
                            <dt>
                                Name
                            </dt>
                            <dd>
                                {{ data.name }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Size
                            </dt>
                            <dd>
                                {{ calculateActualFontSize(data.size) }}
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                Example
                            </dt>
                            <dd>
                                <span :class="data.name">The quick brown fox jumps over the lazy dog.</span>
                            </dd>
                        </dl>
                    </div>
                </div>
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
            deprecatedFontSizeItems: [
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
            fontSizeItems: [
                {
                    name: 'font-size-50',
                    size: sassType.s50,
                },
                {
                    name: 'font-size-75',
                    size: sassType.s75,
                },
                {
                    name: 'font-size-100',
                    size: sassType.s100,
                },
                {
                    name: 'font-size-200',
                    size: sassType.s200,
                },
                {
                    name: 'font-size-300',
                    size: sassType.s300,
                },
                {
                    name: 'font-size-400',
                    size: sassType.s400,
                },
                {
                    name: 'font-size-500',
                    size: sassType.s500,
                },
                {
                    name: 'font-size-600',
                    size: sassType.s600,
                },
                {
                    name: 'font-size-700',
                    size: sassType.s700,
                },
                {
                    name: 'font-size-800',
                    size: sassType.s800,
                },
                {
                    name: 'font-size-900',
                    size: sassType.s900,
                },
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
    methods: {
        calculateActualFontSize(remStr) {
            const multiplier = parseFloat(remStr.replace('rem', ''));
            return `${multiplier * 16}px`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

/* pilot implementation of a responsive table */
/* TODO: extract this to a reusable component within es-design-system docs site */

.responsive-table {
    border-top: $border-width solid $border-color;

    &-row {
        border-bottom: $border-width solid $border-color;
        padding: 0.5rem 0.5rem 0;

        &:nth-child(even) {
            background-color: $gray-200;
        }
    }

    dl {
        display: flex;
        margin: 0;

        dt {
            width: 30%;
        }

        dd {
            width: 70%;
        }
    }
}

.responsive-table-font-size {
    dl {
        dd {
            max-height: 180px;
            overflow: hidden;
        }
    }
}

@include media-breakpoint-up(sm) {
    .responsive-table {
        dl {
            dt {
                width: 24%;
            }

            dd {
                width: 76%;
            }
        }
    }
}

@include media-breakpoint-up(md) {
    .responsive-table {
        /* undo mobile styles */
        border-top-style: none;

        dl,
        dt,
        dd {
            margin: 0;
            padding: 0;
        }

        /* ensure background is full height of row */
        dd {
            height: 100%;
            padding: 0.5rem 0;
        }

        /* undo mobile styles */
        dl {
            display: block;

            dt,
            dd {
                width: auto;
            }
        }

        /* column widths */
        dl:nth-child(1) {
            width: 26%;
        }

        dl:nth-child(2) {
            width: 12%;
        }

        dl:nth-child(3) {
            width: 62%;
        }

        &-row {
            /* undo mobile styles */
            border-bottom-style: none;
            display: flex;
            padding: 0;

            &:nth-child(even) {
                background-color: transparent;
            }

            &:first-child {
                dt {
                    border-bottom: $border-width solid $border-color;
                    border-top: $border-width solid $border-color;
                    padding: 0.5rem 0;
                }

                dd {
                    height: auto;
                }
            }

            /* visually hide table columns within all rows except the first */
            &:not(:first-child) {
                dt {
                    /* don't use display none because then screen readers won't read out the label */
                    left: -9999em;
                    position: absolute;
                }
            }

            /* zebra-stripe every odd row */
            &:nth-child(odd) {
                dd {
                    background-color: $gray-200;
                }
            }
        }

        /* side padding on left-most cells */
        dl:first-child {
            dd,
            dt {
                padding-left: 0.5rem;
            }
        }

        /* side padding on right-most cells */
        dl:last-child {
            dd,
            dt {
                padding-right: 0.5rem;
            }
        }
    }
}

@include media-breakpoint-up(xl) {
    .responsive-table-font-size {
        dl {
            dd {
                max-height: none;
                overflow: visible;
            }
        }
    }

    .responsive-table {
        /* column widths */
        dl:nth-child(1) {
            width: 20%;
        }

        dl:nth-child(2) {
            width: 10%;
        }

        dl:nth-child(3) {
            width: 70%;
        }
    }
}

@include media-breakpoint-up(xxl) {
    .responsive-table {
        /* column widths */
        dl:nth-child(1) {
            width: 16%;
        }

        dl:nth-child(2) {
            width: 10%;
        }

        dl:nth-child(3) {
            width: 74%;
        }
    }
}
</style>

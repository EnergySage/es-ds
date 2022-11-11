<template>
    <div>
        <h1>
            Typography
        </h1>
        <p>
            Extended from <b-link href="https://getbootstrap.com/docs/4.6/content/typography/">
                bootstrap typography
            </b-link>
        </p>
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
                    Example Link
                </b-link>
            </li>
        </ul>
        <b-row class="my-5 border-top pt-5">
            <b-col>
                <h2>
                    Font Weight Utility Classes
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
        <b-row class="my-5 border-top pt-5">
            <b-col>
                <h2>
                    Font Size Utility Classes
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
                    name: 'font-size-xs',
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
        };
    },
};
</script>

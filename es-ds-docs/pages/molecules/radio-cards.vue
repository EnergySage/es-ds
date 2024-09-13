<script setup lang="ts">
const form = ref({
    installTimeline: '',
    propertyType: '',
    storageReason: '',
});

const propertyTypeOptions = [
    { label: 'Home', value: 'residential' },
    { label: 'Business', value: 'commercial' },
    { label: 'Nonprofit', value: 'nonprofit' },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storageReasonOptions: { [key: string]: any }[] = [
    {
        title: 'Back up power',
        description: 'Run appliances during a power outage, with backup power',
        icon: 'IconSettingsVertical',
        component: resolveComponent('icon-settings-vertical'),
        value: 'Back up power',
    },
    {
        title: 'Maximize savings',
        description: 'Avoid paying for energy during peak hours',
        icon: 'IconShoppingBag',
        component: resolveComponent('icon-shopping-bag'),
        value: 'Maximize savings',
    },
    {
        title: 'Self supply',
        description: 'Limit how much energy you pull from the grid',
        icon: 'IconPersonCheck',
        component: resolveComponent('icon-person-check'),
        value: 'Self supply',
    },
];

const installTimelineLabel = 'What’s your timeline for installing heat pumps?';
const installTimelineOptions = [
    { label: 'ASAP', value: 'ASAP' },
    { label: 'Within the next 2-4 weeks', value: '2-4 weeks' },
    { label: 'Within the next 2-4 months', value: '2-4 months' },
    { label: '5+ months', value: '5+ months' },
];

const test2Options = ref([
    { text: 'Toggle this custom radio', value: 'first', id: 'idFirst' },
    { text: 'Or toggle this other custom radio', value: 'second', id: 'idSecond' },
    { text: 'This one is Disabled', value: 'third', disabled: true, id: 'idThird' },
    { text: 'This is the 4th radio', value: { fourth: 4 }, id: 'idFourth' },
]);
const test2Selected = ref('first');

const { $prism } = useNuxtApp();
const componentCodeRadioCard = ref('');
const componentCodeRadioCards = ref('');
const docCode = ref('');
if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const componentCodeRadioCardSource = await import(
        '@energysage/es-ds-components/components/es-form-radio-card.vue?raw'
    );
    const componentCodeRadioCardsSource = await import(
        '@energysage/es-ds-components/components/es-form-radio-cards.vue?raw'
    );
    const docSource = await import('./radio-cards.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    componentCodeRadioCard.value = $prism.normalizeCode(componentCodeRadioCardSource.default);
    componentCodeRadioCards.value = $prism.normalizeCode(componentCodeRadioCardsSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

function handleSubmit() {
    // eslint-disable-next-line no-console
    console.log('handleSubmit');
}

// Name, Type, Default, Description
const propTableRowsRadioCard = [
    ['id', 'String', 'n/a', 'Required.'],
    ['name', 'String', 'n/a', 'Required. Name of radio group'],
    ['value', 'Any', 'n/a', 'Required. Value of radio button'],
    ['disabled', 'Boolean', 'false', 'Optional. When present, it specifies that the radio button should be disabled.'],
    [
        'inline',
        'Boolean',
        'false',
        'Optional. When present, it specifies that the radio buttons should be displayed inline.',
    ],
    [
        'displayName',
        'String',
        `''`,
        'Optional. Required, if not using the default slot. The text to display next to the radio button.',
    ],
    ['v-model', 'Any', 'n/a', 'Required.'],
];

const propTableRowsRadioCards = [
    ['id', 'String', 'n/a', 'Required.'],
    ['label', 'String', 'n/a', 'Required.'],
    ['name', 'String', `''`, 'Optional.'], // TODO: should this be required?
    ['options', 'Array', 'undefined', 'Optional. Alternative to creating an es-form-radio-card in the default slot.'],
    ['inline', 'Boolean', 'false', 'Optional.'], // TODO: example of this?
    ['modelValue', 'Any', 'undefined', 'Optional. Required, if using the options prop'],
    ['hasIcon', 'Boolean', 'false', 'Optional. Adds a "has-icon" class to the radiogroup'],
    ['labelClass', 'String', `''`, 'Optional. Apply class to the input label. Defaults to "font-size-h3"'],
    ['labelSrOnly', 'Boolean', 'false', 'Optional. Applies an `sr-only` class to the label'],
];
</script>

<template>
    <div>
        <h1>Radio cards</h1>
        <p class="mb-200 mb-lg-500">
            Extended from <ds-link to="https://v3.primevue.org/radiobutton/"> prime-vue form-radio </ds-link>
        </p>

        <h2>Radio Card</h2>
        <div class="mb-200 mb-lg-500">
            <es-form-radio-card
                id="idRadioCard1"
                v-model="form.propertyType"
                name="radioCard1"
                :value="propertyTypeOptions[0].value"
                >{{ propertyTypeOptions[0].label }}</es-form-radio-card
            >
        </div>

        <h2>Default</h2>
        <p>
            Responsive font sizing is applied by default. This means the text will be smaller on mobile and larger on
            desktop.
        </p>
        <es-card class="mb-200 mb-lg-500">
            <form @submit="handleSubmit">
                <es-form-radio-cards
                    id="idRadioCards1"
                    name="radioCards1"
                    label="What type of property do you want quotes for?">
                    <es-form-radio-card
                        v-for="option in propertyTypeOptions"
                        :id="`id${option.value}`"
                        :key="option.value"
                        v-model="form.propertyType"
                        name="radioCards1"
                        :value="option.value"
                        :display-name="option.label" />
                </es-form-radio-cards>
            </form>
            <p class="mb-0">
                <span class="font-weight-bold">Selection:</span>
                {{ form.propertyType || '[none]' }}
            </p>
        </es-card>

        <h2>Custom card styling</h2>
        <p>
            This example demonstrates customizing the content, spacing, and typography of the cards, as well as
            changing the layout based on the breakpoint.
        </p>
        <es-card class="mb-200 mb-lg-500">
            <form @submit="handleSubmit">
                <es-form-radio-cards
                    id="idCustomCardStyling"
                    label="What’s the main reason you want a battery?"
                    model-value="form.storageReason"
                    has-icon>
                    <b-row>
                        <b-col
                            v-for="option in storageReasonOptions"
                            :key="option.value"
                            cols="12"
                            lg="4">
                            <es-form-radio-card
                                :id="option.value"
                                v-model="form.storageReason"
                                class="align-items-center d-block d-lg-flex flex-column font-size-base font-weight-normal line-height-base pt-lg-200 px-lg-200 text-lg-center"
                                name="customCardStyling"
                                :value="option.value">
                                <component
                                    :is="option.component"
                                    class="d-none d-lg-block mb-50"
                                    height="48px"
                                    width="48px" />
                                <span class="font-weight-bolder mb-lg-100">
                                    {{ option.title }}
                                </span>
                                <span class="d-lg-none">
                                    {{ ' - ' }}
                                </span>
                                <span>
                                    {{ option.description }}
                                </span>
                            </es-form-radio-card>
                        </b-col>
                    </b-row>
                </es-form-radio-cards>
            </form>
            <p class="mb-0">
                <span class="font-weight-bold">Selection:</span>
                {{ form.storageReason || '[none]' }}
            </p>
        </es-card>

        <h2>Detached label</h2>
        <p>
            This example demonstrates a case where more control is needed over the position of the field label on the
            desktop breakpoint, so it is rendered separately of the radio cards component. We do still need to pass the
            label text into the radio cards component for accessibility purposes, but hide it visually by passing in a
            prop.
        </p>
        <div class="border mb-500 p-100 p-lg-200 rounded">
            <form @submit="handleSubmit">
                <b-row>
                    <b-col
                        cols="12"
                        lg="4">
                        <h1 aria-hidden>
                            {{ installTimelineLabel }}
                        </h1>
                    </b-col>
                    <b-col
                        cols="12"
                        lg="8">
                        <es-form-radio-cards
                            id="idDetachedLabel"
                            :label="installTimelineLabel"
                            name="detachedLabel"
                            label-sr-only>
                            <es-form-radio-card
                                v-for="option in installTimelineOptions"
                                :id="option.value"
                                :key="option.value"
                                v-model="form.installTimeline"
                                name="detachedLabel"
                                :value="option.value">
                                {{ option.label }}
                            </es-form-radio-card>
                        </es-form-radio-cards>
                    </b-col>
                </b-row>
            </form>
            <p class="mb-0">
                <span class="font-weight-bold">Selection:</span>
                {{ form.installTimeline || '[none]' }}
            </p>
        </div>

        <h2>Passing options</h2>
        <div class="border mb-500 p-100 p-lg-200 rounded">
            <form @submit="handleSubmit">
                <es-form-radio-cards
                    id="idPassingOptions"
                    v-model="test2Selected"
                    label="Passing Options"
                    name="passingOptions"
                    :options="test2Options" />
            </form>
            <p class="mb-0">
                <span class="font-weight-bold">Selection:</span>
                {{ test2Selected || '[none]' }}
            </p>
        </div>

        <div class="mb-500">
            <h2>EsFormRadioCard props</h2>
            <ds-prop-table :rows="propTableRowsRadioCard" />
        </div>

        <div class="mb-500">
            <h2>EsFormRadioCards props</h2>
            <ds-prop-table :rows="propTableRowsRadioCards" />
        </div>

        <ds-doc-source
            comp-title="Radio card component"
            :comp-code="componentCodeRadioCard"
            comp-source="es-ds-components/src/lib-components/es-form-radio-card.vue" />

        <ds-doc-source
            comp-title="Radio cards component"
            :comp-code="componentCodeRadioCards"
            comp-source="es-ds-components/src/lib-components/es-form-radio-cards.vue" />

        <ds-doc-source
            doc-title="Radio card & radio cards documentation"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-cards.vue" />
    </div>
</template>

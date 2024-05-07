<template>
    <div>
        <h1>
            Radio cards
        </h1>
        <p class="mb-200 mb-lg-450">
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/form-radio#button-style-radios"
                target="_blank">
                bootstrap-vue form-radio
            </b-link>
        </p>

        <h2>
            Default
        </h2>
        <p>
            Responsive font sizing is applied by default; the label matches Heading 1 and the card content
            matches Heading 2. This means the text will be smaller on mobile and larger on desktop.
        </p>
        <div class="border mb-200 mb-lg-450 p-100 p-lg-200 rounded">
            <form @submit="handleSubmit">
                <es-form-radio-cards
                    v-model="form.propertyType"
                    label="What type of property do you want quotes for?">
                    <es-form-radio-card
                        v-for="option in propertyTypeOptions"
                        :key="option.value"
                        :value="option.value">
                        {{ option.label }}
                    </es-form-radio-card>
                </es-form-radio-cards>
            </form>
            <p class="mb-0">
                <span class="font-weight-bold">Selection:</span>
                {{ form.propertyType || '[none]' }}
            </p>
        </div>

        <h2>
            Custom card styling
        </h2>
        <p>
            This example demonstrates customizing the content, spacing, and typography of the cards,
            as well as changing the layout based on the breakpoint.
        </p>
        <div class="border mb-450 p-100 p-lg-200 rounded">
            <form @submit="handleSubmit">
                <es-form-radio-cards
                    v-model="form.storageReason"
                    label="What’s the main reason you want a battery?">
                    <b-row>
                        <b-col
                            v-for="option in storageReasonOptions"
                            :key="option.value"
                            cols="12"
                            lg="4">
                            <es-form-radio-card
                                class="align-items-center d-block d-lg-flex flex-column font-size-base font-weight-normal line-height-base p-100 p-lg-200 text-lg-center"
                                :value="option.value">
                                <component
                                    :is="option.icon"
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
        </div>

        <h2>
            Detached label
        </h2>
        <p>
            This example demonstrates a case where more control is needed over the position of the field
            label on the desktop breakpoint, so it is rendered separately of the radio cards component.
            We do still need to pass the label text into the radio cards component for accessibility
            purposes, but hide it visually by passing in a prop.
        </p>
        <div class="border mb-450 p-100 p-lg-200 rounded">
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
                            v-model="form.installTimeline"
                            :label="installTimelineLabel"
                            label-sr-only>
                            <es-form-radio-card
                                v-for="option in installTimelineOptions"
                                :key="option.value"
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

        <h2 class="mt-450">
            EsFormRadioCards props
        </h2>
        <b-table
            :fields="propTableFields"
            :items="radioCardsPropDocumentation"
            striped />

        <h2 class="mt-450">
            EsFormRadioCard props
        </h2>
        <b-table
            :fields="propTableFields"
            :items="radioCardPropDocumentation"
            striped />

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormRadioCards.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-radio-cards.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsFormRadioCardsDocs',
    data() {
        return {
            form: {
                installTimeline: '',
                propertyType: '',
                storageReason: '',
            },
            installTimelineLabel: 'What’s your timeline for installing heat pumps?',
            installTimelineOptions: [
                { label: 'ASAP', value: 'ASAP' },
                { label: 'Within the next 2-4 weeks', value: '2-4 weeks' },
                { label: 'Within the next 2-4 months', value: '2-4 months' },
                { label: '5+ months', value: '5+ months' },
            ],
            propertyTypeOptions: [
                { label: 'Home', value: 'residential' },
                { label: 'Business', value: 'commercial' },
                { label: 'Nonprofit', value: 'nonprofit' },
            ],
            storageReasonOptions: [
                {
                    title: 'Back up power',
                    description: 'Run appliances during a power outage',
                    icon: 'IconSettingsVertical',
                    value: 'Back up power',
                },
                {
                    title: 'Maximize savings',
                    description: 'Avoid paying for energy during peak hours',
                    icon: 'IconShoppingBag',
                    value: 'Maximize savings',
                },
                {
                    title: 'Self supply',
                    description: 'Limit how much energy you pull from the grid',
                    icon: 'IconPersonCheck',
                    value: 'Self supply',
                },
            ],
            propTableFields: [
                'name',
                'description',
                'defaultValue',
            ],
            radioCardsPropDocumentation: [
                {
                    name: 'label',
                    description: `
                        Required. Describes the selection the user is being asked to make.
                    `,
                    defaultValue: 'n/a',
                },
                {
                    name: 'labelClass',
                    description: 'Optional. The CSS class names that should be applied to the label element.',
                    defaultValue: 'font-size-h1 font-weight-bolder mb-4 pb-0 text-dark',
                },
                {
                    name: 'labelSrOnly',
                    description: 'Optional. If true, hides the field label visually.',
                    defaultValue: 'false',
                },
            ],
            radioCardPropDocumentation: [
                {
                    name: 'value',
                    description: 'Required. The value that should be saved if this item is selected.',
                    defaultValue: 'n/a',
                },
            ],
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-form-radio-cards.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsFormRadioCards.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        handleSubmit() {},
    },
};
</script>

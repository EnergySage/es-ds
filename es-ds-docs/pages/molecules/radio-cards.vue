
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
const storageReasonOptions: { [key:string]: any }[] = [
    {
        title: 'Back up power',
        description: 'Run appliances during a power outage',
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
]

function handleSubmit() {
    console.log('handleSubmit');
}

</script>

<template>
    <div>
        <h1>
            Radio cards
        </h1>
        <p class="mb-200 mb-lg-500">
            Extended from <ds-link
                to="https://v3.primevue.org/radiobutton/">
                prime-vue form-radio
            </ds-link>
        </p>

        <h2>
            Radio Card
        </h2>
        <es-form-radio-card
            id="idRadioCard1"
            v-model="form.propertyType"
            name="radioCard1"
            :value="propertyTypeOptions[0].value"
        >{{ propertyTypeOptions[0].label }}</es-form-radio-card>

        <h2>
            Default
        </h2>
        <p>
            Responsive font sizing is applied by default. This means the text will be smaller on
            mobile and larger on desktop.
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

        <h2>
            Custom card styling
        </h2>
        <p>
            This example demonstrates customizing the content, spacing, and typography of the cards,
            as well as changing the layout based on the breakpoint.
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

    </div>
</template>

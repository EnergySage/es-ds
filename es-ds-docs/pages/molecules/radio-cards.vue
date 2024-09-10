
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleSubmit(e: any) {
    console.log(e);
}

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
            display-name="test1"
            :model-value="form.propertyType"
            :value="propertyTypeOptions[0].value"
            @radio-card:update="(val) => form.propertyType = val"
        />

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
                    v-model="form.propertyType"
                    label="What type of property do you want quotes for?">
                    <es-form-radio-card
                        v-for="option in propertyTypeOptions"
                        :id="`id${option.value}`"
                        :key="option.value"
                        :display-name="option.label"
                        group-name="radioCards1"
                        :model-value="form.propertyType"
                        :value="option.value"
                        @radio-card:update="(val) => form.propertyType = val">
                        {{ option.label }}
                    </es-form-radio-card>
                </es-form-radio-cards>
            </form>
            <p class="mb-0">
                <span class="font-weight-bold">Selection:</span>
                {{ form.propertyType || '[none]' }}
            </p>
        </es-card>

    </div>
</template>

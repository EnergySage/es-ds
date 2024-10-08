<script setup>
const startingNumberOfRooms = 1;
const numberOfRooms = ref(startingNumberOfRooms);

const averageBillAmount = 200;
const billAmount = ref(averageBillAmount);

const startingPercentage = 50;
const percentage = ref(startingPercentage);

const propTableRows = [
    ['ariaLabel', 'String', 'null', 'Accessible label for slider handle.'],
    ['ariaLabelledby', 'String', 'null', 'Id of an element containing an accessible description for the slider.'],
    ['disabled', 'Boolean', 'false', 'Indicates whether or not the slider should be disabled.'],
    ['startingValue', 'Number', '1', 'Required. Initial value of slider.'],
    ['min', 'Number', '1', 'Required. Minimum value of slider.'],
    ['max', 'Number', '100', 'Required. Maximum value of slider.'],
    ['step', 'Number', '1', 'Step factor to increment/decrement the value.'],
    ['labelFormatter', 'Function', '(val) => val', 'Function that modifies min and max labels.'],
    ['tooltipFormatter', 'Function', '(val) => val', 'Function that modifies tooltip label.'],
].sort((a, b) => a[0].localeCompare(b[0]));

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-slider.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./slider.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Slider</h1>

        <p class="mb-450">
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/slider/"
                target="_blank">
                PrimeVue Slider
            </nuxt-link>
        </p>

        <div class="my-450">
            <h2>Simple example</h2>
            <p class="mb-300">
                This slider allows the user to select a value from 1 to 20 with an allowed step increment of 1.
            </p>
            <h3
                id="number-of-rooms-label"
                class="mb-500 text-center">
                How many rooms are in your house?
            </h3>
            <es-row class="justify-content-center">
                <es-col cols="10">
                    <es-slider
                        v-model="numberOfRooms"
                        aria-labelledby="number-of-rooms-label"
                        :min="1"
                        :max="20"
                        :step="1"
                        :starting-value="startingNumberOfRooms" />
                </es-col>
            </es-row>
        </div>

        <div class="my-450">
            <h2>Label and tooltip formatting</h2>
            <p class="mb-300">
                This slider uses formatting functions to add a dollar sign to the minimum/maximum labels and the
                tooltip showing the current value.
            </p>
            <h3
                id="monthly-bill-label"
                class="mb-500 text-center">
                How much is your average monthly bill?
            </h3>
            <es-row class="justify-content-center">
                <es-col cols="10">
                    <es-slider
                        v-model="billAmount"
                        aria-labelledby="monthly-bill-label"
                        :min="50"
                        :max="1200"
                        :step="25"
                        :starting-value="averageBillAmount"
                        :label-formatter="(val) => `$${val}`"
                        :tooltip-formatter="(val) => `$${val}`" />
                </es-col>
            </es-row>
        </div>

        <div class="my-450">
            <h2>Disabled</h2>
            <p class="mb-300">
                This slider is disabled. Use this state sparingly and only as a temporary visual indication (for
                example, during a form submission), as there is a known issue with PrimeVue's slider where it can still
                receive focus via keyboard when disabled and the value of the slider can be modified via the keyboard.
            </p>
            <h3
                id="percentage-label"
                class="mb-500 text-center">
                What percentage of your home do you want to heat or cool?
            </h3>
            <es-row class="justify-content-center">
                <es-col cols="10">
                    <es-slider
                        v-model="percentage"
                        aria-labelledby="percentage-label"
                        disabled
                        :min="0"
                        :max="100"
                        :step="10"
                        :starting-value="startingPercentage"
                        :label-formatter="(val) => `${val}%`"
                        :tooltip-formatter="(val) => `${val}%`" />
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>EsSlider props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-slider.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/slider.vue" />
    </div>
</template>

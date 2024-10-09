<script setup lang="ts">
const numberOfRooms = ref(1);
const billAmount = ref(200);
const percentage = ref(50);

const creditScore = ref(650);
const updateCreditScore = (val: number) => {
    creditScore.value = val;
};

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
                        :step="1" />
                </es-col>
            </es-row>
            <p class="mt-300">Selected value: {{ numberOfRooms }}</p>
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
                        :label-formatter="(val: number) => `$${val}`"
                        :tooltip-formatter="(val: number) => `$${val}`" />
                </es-col>
            </es-row>
            <p class="mt-300">Selected value: {{ `$${billAmount}` }}</p>
        </div>

        <div class="my-450">
            <h2>Manual data binding</h2>
            <p class="mb-300">
                Though two-day data binding via <code>v-model</code> is recommended, it's also possible to use the
                <code>startingValue</code> prop and listen to the <code>@change</code> event to hook up the slider to a
                variable.
            </p>
            <h3
                id="credit-score-label"
                class="mb-500 text-center">
                What is the minimum credit score necessary to qualify?
            </h3>
            <es-row class="justify-content-center">
                <es-col cols="10">
                    <es-slider
                        aria-labelledby="credit-score-label"
                        :min="0"
                        :max="800"
                        :starting-value="creditScore"
                        :step="25"
                        @change="updateCreditScore" />
                </es-col>
            </es-row>
            <p class="mt-300">Selected value: {{ creditScore }}</p>
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
                        :label-formatter="(val: number) => `${val}%`"
                        :tooltip-formatter="(val: number) => `${val}%`" />
                </es-col>
            </es-row>
            <p class="mt-300">Selected value: {{ `${percentage}%` }}</p>
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

        <es-collapse class="mt-500">
            <template #title>
                <h2>Migration from ESDS 2.0/Nuxt 2</h2>
            </template>
            <p>
                The <code>data</code> and <code>marks</code> props from the ESDS 2.0 version of EsSlider are no longer
                supported, both for simplicity and due to the underlying PrimeVue component not supporting the
                functionality.
            </p>
            <p>
                Previously, the <code>data</code> prop took an array of numbers that specified the available values to
                select in the slider (e.g. <code>[0, 25, 50, 75, 100, 250, 500, 750, 1000]</code>). The available
                slider values are now specified via the <code>min</code>, <code>max</code>, and
                <code>step</code> props. This means that it's no longer possible to have slider values with
                non-standard gaps between them, as in the array example above where values start out 25 apart, then
                150, then 250, etc.
            </p>
            <p>
                The <code>marks</code> prop generally took an array of two numbers (e.g. <code>[50, 1200]</code>) to
                denote where the minimum and maximum labels should appear beneath the slider. To enforce UX best
                practices and because the PrimeVue component doesn't support display of labeled marks at arbitrary
                points along the slider, minimum and maximum labels will now always display at the start and end of the
                slider, and the <code>marks</code> prop is no longer available.
            </p>
        </es-collapse>
    </div>
</template>

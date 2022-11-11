<template>
    <div>
        <h1>
            Slider
        </h1>
        <p class="pb-5">
            Extended from <b-link href="https://nightcatsama.github.io/vue-slider-component/">
                vue-slider-component
            </b-link>
        </p>
        <es-slider
            class="mt-5"
            :starting-value="startingValue"
            :data="data"
            :marks="marks"
            :min="min"
            :max="max"
            @change="changeEvent" />
    </div>
</template>
<script>
import { EsSlider } from '@energysage/es-vue-base';

export default {
    name: 'EsSliderDocs',
    components: {
        EsSlider,
    },
    data() {
        return {
            startingValue: 0,
            data: [0, 25, 50, 75, 100],
            marks: [0, 100],
            min: 0,
            max: 100,
        };
    },
    methods: {
        changeEvent($event) {
            // eslint-disable-next-line no-alert
            alert($event);
        },
    },
};
</script>

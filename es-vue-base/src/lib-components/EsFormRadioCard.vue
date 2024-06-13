<template>
    <b-form-radio
        class="es-form-radio-card es-card interactive w-100"
        :value="value">
        <slot />
    </b-form-radio>
</template>

<script>
import { BFormRadio } from 'bootstrap-vue';

export default {
    name: 'EsFormRadioCard',
    components: {
        BFormRadio,
    },
    props: {
        value: {
            type: String,
            required: true,
            default: '',
        },
    },
};
</script>

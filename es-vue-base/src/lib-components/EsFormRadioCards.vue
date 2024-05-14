<template>
    <b-form-group
        v-slot="{ ariaDescribedby }"
        :label="label"
        :label-class="labelClass"
        :label-sr-only="labelSrOnly">
        <b-form-radio-group
            :aria-describedby="ariaDescribedby"
            buttons
            button-variant="outline-primary"
            :checked="value"
            class="es-form-radio-cards d-flex justify-content-center"
            :class="{ 'has-icon': hasIcon }"
            :name="label"
            stacked
            v-bind="$attrs"
            v-on="$listeners">
            <slot />
        </b-form-radio-group>
    </b-form-group>
</template>

<script>
import { BFormGroup, BFormRadioGroup } from 'bootstrap-vue';

export default {
    name: 'EsFormRadioCards',
    components: {
        BFormGroup,
        BFormRadioGroup,
    },
    props: {
        hasIcon: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            required: true,
        },
        labelClass: {
            type: String,
            default: 'font-size-h1 font-weight-bolder mb-200 pb-0 text-dark',
        },
        labelSrOnly: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>

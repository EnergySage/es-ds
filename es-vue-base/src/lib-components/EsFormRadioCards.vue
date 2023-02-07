<template>
    <b-form-group
        v-slot="{ ariaDescribedby }"
        :label="label"
        :label-class="labelClass"
        :label-sr-only="labelSrOnly">
        <b-form-radio-group
            :aria-describedby="ariaDescribedby"
            buttons
            button-variant="outline-dark"
            :checked="value"
            class="EsFormRadioCards d-flex justify-content-center"
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
        label: {
            type: String,
            required: true,
        },
        labelClass: {
            type: String,
            default: 'font-size-h1 font-weight-bolder mb-4 pb-0 text-dark',
        },
        labelSrOnly: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.EsFormRadioCards {
  &.btn-group-vertical {
    /* undo default radio group 'buttons' style that prevents full width */
    align-items: stretch;
  }
}
</style>

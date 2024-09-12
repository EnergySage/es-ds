<script setup lang="ts">
interface IOptions {
    id: string;
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    disabled?: boolean;
    inline?: boolean;
}

interface IProps {
    id: string;
    label: string;
    name?: string;
    options?: IOptions[];
    inline?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue?: any;
    hasIcon?: boolean;
    labelClass?: string;
    labelSrOnly?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
    name: '',
    options: undefined,
    inline: false,
    modelValue: undefined,
    hasIcon: false,
    labelClass: 'font-size-h3',
    labelSrOnly: false,
});

const emit = defineEmits(['update:model-value']);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleUpdate(value: any) {
    emit('update:model-value', value);
}
</script>

<template>
    <fieldset
        :id="`${props.id}-fieldset`"
        class="form-group">
        <legend
            :id="`${props.id}-legend`"
            class="font-size-h1 font-weight-bolder mb-200 pb-0 text-dark"
            tabindex="-1">
            <!-- How are these classes getting added?: bv-no-focus-ring col-form-label pt-0 -->
            {{ props.label }}
        </legend>
        <div>
            <div
                :id="`${props.id}-radiogroup`"
                role="radiogroup"
                tabindex="-1"
                class="es-form-radio-cards d-flex justify-content-center btn-group-vertical"
                :class="{ 'has-icon': props.hasIcon }">
                <!-- How are these classes getting added?: btn-group-toggle btn-group-vertical bv-no-focus-ring -->
                <slot :options="options">
                    <es-form-radio-card
                        v-for="option in options"
                        :id="option.id"
                        :key="option.value"
                        :disabled="option?.disabled || false"
                        :name="props.name"
                        :value="option.value"
                        :model-value="props.modelValue"
                        :inline="props.inline || false"
                        @update:model-value="handleUpdate">
                        <span
                            :class="{
                                [props.labelClass]: props.labelClass,
                                'sr-only': props.labelSrOnly,
                            }">
                            {{ option.text }}
                        </span>
                    </es-form-radio-card>
                </slot>
            </div>
        </div>
    </fieldset>
</template>

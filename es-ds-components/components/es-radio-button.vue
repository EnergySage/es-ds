<script setup lang="ts">
import RadioButton from 'primevue/radiobutton';

interface IProps {
    disabled?: boolean;
    displayName: string;
    groupName?: string;
    inline?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    displayName: '',
    groupName: '',
    inline: false,
    value: null,
});
</script>

<template>
    <div :class="`custom-control custom-radio custom-control${inline ? '-inline' : ''}`">
        <radio-button
            class="custom-control-input"
            input-class="custom-radio-input"
            v-bind="$attrs"
            :disabled="disabled"
            :input-id="`${props.value}-${props.groupName}`"
            :name="props.groupName"
            :value="props.value" />
        <slot>
            <label
                :for="`${props.value}-${props.groupName}`"
                class="custom-control-label">
                {{ props.displayName }}
            </label>
        </slot>
    </div>
</template>

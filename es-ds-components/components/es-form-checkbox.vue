<script setup lang="ts">
const model = defineModel<boolean>({
    default: false,
});
defineOptions({
    inheritAttrs: false,
});
defineProps({
    id: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    indeterminate: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="custom-control custom-checkbox">
        <input
            v-bind="$attrs"
            :id="id"
            v-model="model"
            type="checkbox"
            class="custom-control-input"
            :indeterminate="indeterminate"
            :disabled="disabled" />
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            :for="id"
            class="custom-control-label">
            <slot />
        </label>
    </div>
</template>

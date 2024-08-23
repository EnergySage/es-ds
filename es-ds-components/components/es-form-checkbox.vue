<script setup lang="ts">
const model = defineModel({
    default: false,
});
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    indeterminate: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="custom-control custom-checkbox">
        <input
            type="checkbox"
            class="custom-control-input"
            v-model="model"
            v-bind="$attrs"
            :id="id"
            :indeterminate="indeterminate"
            :disabled="disabled"
        />
        <label :for="id" class="custom-control-label">
            <slot />
        </label>
    </div>
</template>

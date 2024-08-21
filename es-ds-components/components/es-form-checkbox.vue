<script setup lang="ts">
defineOptions({
  inheritAttrs: false
})
</script>

<template>
    <div
        class="custom-control custom-checkbox">
        <checkbox
            :pt="{
                root: 'custom-control-input'
            }"
            v-bind="$attrs"
        />
        <label class="custom-control-label">
            <slot />
        </label>
    </div>
</template>

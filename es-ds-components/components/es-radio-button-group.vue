<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true
    },

})
</script>

<template>
    <fieldset class="form-group" :id="id">
        <legend class="font-size-100" tabindex="-1">{{ label }}</legend>
        <slot />
    </fieldset>
</template>

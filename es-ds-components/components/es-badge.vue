<template>
    <span
        class="badge"
        :class="`badge-${variant}`">
        <!--
            @slot Badge Content
            -->
        <slot />
    </span>
</template>

<script setup lang="ts">
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        required: false,
    },
});
</script>

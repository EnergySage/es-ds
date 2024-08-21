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
const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
        required: false,
    },
});
</script>

<script setup lang="ts">
defineProps({
    variant: {
        type: String,
        default: 'primary',
        required: false,
    },
});
</script>

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

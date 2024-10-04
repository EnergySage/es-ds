<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="es-skeleton-wrapper">
        <slot
            v-if="loading"
            name="loading"  />
        <slot v-else />
    </div>
</template>

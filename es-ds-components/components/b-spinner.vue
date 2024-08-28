<script setup lang="ts">
defineProps({
    label: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'status',
    },
})
</script>

<template>
    <span
        :role="role"
        class="spinner-border">
        <span class="sr-only">
            {{ label }}
        </span>
    </span>
</template>

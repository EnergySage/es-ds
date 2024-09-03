<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: false,
        default: "",
    },
    description: {
        type: String,
        required: false,
        default: "",
    },
    label: {
        type: String,
        required: true,
    },
    labelFor: {
        type: String,
        required: false,
        default: "",
    },
    validFeedback: {
        type: String,
        required: false,
        default: "",
    },
    validated: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    invalidFeedback: {
        type: String,
        required: false,
        default: "",
    },
    state: {
        type: Boolean,
        required: false,
        default: null,
    }

})
</script>

<template>

</template>

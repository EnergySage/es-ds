<script setup lang="ts">
import Dropdown from 'primevue/dropdown';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
    },
});
</script>

<template>
    <h4 v-if="props.title">
        {{ props.title }}
    </h4>
    <Dropdown placeholder="{{ props.placeholder }}">

    </Dropdown>
</template>

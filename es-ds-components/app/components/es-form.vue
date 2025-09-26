<script setup lang="ts">
const props = defineProps({
    inline: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <form
        :class="{ 'form-inline': props.inline }"
        v-bind="$attrs">
        <slot />
    </form>
</template>

<script setup lang="ts">
interface Props {
    clearText?: string;
}

defineProps<Props>();

const emit = defineEmits<{
    clear: [];
}>();
</script>

<template>
    <button
        class="es-autocomplete-clear align-items-center bg-transparent border-0 d-flex flex-shrink-0 h-100 justify-content-center p-0 text-gray-700"
        type="button"
        :aria-label="clearText"
        @click="emit('clear')">
        <icon-x
            height="20px"
            width="20px" />
    </button>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;

// ≥44px square so it is comfortably tappable; a flex sibling of the input, so
// it can never overlap the entered text
.es-autocomplete-clear {
    cursor: pointer;
    width: 2.75rem;

    &:hover {
        color: variables.$gray-900;
    }

    &:focus-visible {
        outline: 0.125rem solid variables.$blue-600;
        outline-offset: -0.25rem;
    }
}
</style>

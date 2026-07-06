<script setup lang="ts">
interface Props {
    htmlFor: string;
    label: string;
    labelSrOnly?: boolean;
    required?: boolean;
}

defineProps<Props>();
</script>

<template>
    <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
    <label
        class="label justify-content-start"
        :class="{ 'sr-only': labelSrOnly }"
        :for="htmlFor">
        {{ label }}
        <span
            v-if="required"
            class="text-danger">
            *
        </span>
    </label>
</template>

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
        <!-- decoration: the field itself carries required/aria-required, so the
             asterisk would only be read out as "star" on top of it -->
        <span
            v-if="required"
            aria-hidden="true"
            class="text-danger">
            *
        </span>
    </label>
</template>

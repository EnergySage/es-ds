<script setup lang="ts">
import { PhArrowLeft } from "@phosphor-icons/vue";

interface Props {
    height?: string;
    width?: string;
}
withDefaults(defineProps<Props>(), {
    height: '24px',
    width: '24px',
});
</script>

<template>
    <ph-arrow-left :size="width" />
</template>

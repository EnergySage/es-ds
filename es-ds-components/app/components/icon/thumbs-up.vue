<script setup lang="ts">
import { PhThumbsUp } from '@phosphor-icons/vue';

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
    <ph-thumbs-up :size="width" />
</template>

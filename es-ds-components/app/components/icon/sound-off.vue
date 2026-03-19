<script setup lang="ts">
import { PhSpeakerX } from '@phosphor-icons/vue';

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
    <ph-speaker-x :size="width" />
</template>

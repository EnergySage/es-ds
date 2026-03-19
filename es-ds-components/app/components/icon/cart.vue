<script setup lang="ts">
import { PhShoppingCartSimple } from '@phosphor-icons/vue';

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
    <ph-shopping-cart-simple :size="width" />
</template>

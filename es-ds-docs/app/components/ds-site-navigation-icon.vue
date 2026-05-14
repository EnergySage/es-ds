<script setup lang="ts">
interface IProps {
    name: string;
}
defineProps<IProps>();
</script>

<template>
    <icon-battery-charging-vertical
        v-if="name === 'battery-charging-vertical'"
        aria-hidden="true" />
    <icon-bolt
        v-else-if="name === 'bolt'"
        aria-hidden="true" />
    <icon-charging-station
        v-else-if="name === 'charging-station'"
        aria-hidden="true" />
    <icon-fan
        v-else-if="name === 'fan'"
        aria-hidden="true" />
    <icon-house-line
        v-else-if="name === 'house-line'"
        aria-hidden="true" />
    <icon-light-bulb
        v-else-if="name === 'light-bulb'"
        aria-hidden="true" />
    <icon-solar
        v-else-if="name === 'solar'"
        aria-hidden="true" />
</template>

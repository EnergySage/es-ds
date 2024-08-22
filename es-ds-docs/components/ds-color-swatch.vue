<script setup lang="ts">

const props = defineProps({
    hex: {
        type: String,
        required: true,
    },
    isLight: {
        type: Boolean,
        default: false,
    },
    showBorder: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: true,
    },
});
const uppercaseHex = computed(() => props.hex.toUpperCase());
</script>

<template>
    <div
        class="font-size-75 px-50 py-200 rounded text-center"
        :class="{
            [`bg-${token}`]: true,
            'border': showBorder,
            'text-white': !isLight,
            'text-dark': isLight
        }">
        <p class="mb-50">
            {{ uppercaseHex }}
        </p>
        <p class="m-0">
            {{ token }}
        </p>
    </div>
</template>

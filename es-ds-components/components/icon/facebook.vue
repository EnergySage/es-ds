<script setup lang="ts">
interface IProps {
    height?: string;
    width?: string;
}
withDefaults(defineProps<IProps>(), {
    height: '32px',
    width: '32px',
});
</script>

<template>
    <svg
        fill="none"
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 .163a15.837 15.837 0 1 0 0 31.674A15.837 15.837 0 0 0 16 .163Zm5.824 8.277H19.78a2.044 2.044 0 0 0-1.634.51c-.306.409-.41 1.022-.41 1.43v2.657h3.985l-.51 4.088h-3.474V27.34H13.65V17.124h-3.474v-4.087h3.474v-2.86a5.21 5.21 0 0 1 1.328-3.986 5.109 5.109 0 0 1 3.78-1.328l3.066.102v3.576z"
            fill="currentColor"
            style="stroke-width: 1.15477" />
    </svg>
</template>

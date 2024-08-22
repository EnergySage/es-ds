<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';

const props = defineProps({
    value: {
        type: Number,
        required: true,
    },
    height: {
        type: String,
        default: '0.3125rem',
    },
    showValue: {
        type: Boolean,
        default: false,
    },
});
const progressBarPt = {
    value: {
        class: 'EsProgressValue progress-bar',
        style: {
            height: props.height,
            borderRadius: props.value === 100 ? '0' : '0 0.125rem 0.125rem 0',
        },
    },
};
</script>
<template>
    <progress-bar
        class="bg-gray-200 rounded-0"
        :pt="progressBarPt"
        :show-value="showValue"
        :value="value"
        v-bind="$attrs">
    </progress-bar>
</template>

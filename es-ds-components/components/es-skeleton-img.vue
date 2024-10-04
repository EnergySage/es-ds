<script setup lang="ts">
const props = defineProps({
    aspect: {
        type: String,
        default: '16:9',
    },
    noAspect: {
        type: Boolean,
        default: false,
    },
});

const aspects = props.aspect.split(':');
const aspectRatio = computed(() => `${(parseFloat(aspects[1])/parseFloat(aspects[0]))*100}%`);
</script>

<template>
    <es-skeleton
        v-if="noAspect"
        v-bind="$attrs"
        class="es-skeleton-img" />
    <div
        v-else
        class="d-flex">
        <div
            class="aspect-sizer flex-grow-1"
            :style="{ 'padding-bottom': aspectRatio, height: '0px' }" />
        <div
            class="aspect-content flex-grow-1 w-100 mw-100"
            style="margin-left: -100%;">
            <es-skeleton
                v-bind="$attrs"
                class="es-skeleton-img h-100 w-100" />
        </div>
    </div>
</template>

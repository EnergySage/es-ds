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
const aspectRatio = computed(() => `${(parseFloat(aspects[1]) / parseFloat(aspects[0])) * 100}%`);
</script>

<template>
    <!-- if noAspect is set, pass along to esSkeleton with all other props -->
    <es-skeleton
        v-if="noAspect"
        v-bind="$attrs" />
    <!-- if setting the aspect ratio, wrap skeleton in containers to determine responsive size  -->
    <!-- based on Bootstrap Aspect -->
    <div
        v-else
        class="d-flex">
        <div
            class="flex-grow-1"
            :style="{ 'padding-bottom': aspectRatio, height: '0px' }" />
        <div
            class="flex-grow-1 w-100 mw-100"
            style="margin-left: -100%">
            <es-skeleton
                v-bind="$attrs"
                class="h-100 w-100" />
        </div>
    </div>
</template>

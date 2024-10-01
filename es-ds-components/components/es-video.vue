<script setup lang="ts">
import { useElementSize } from '@vueuse/core';

interface IProps {
    altText: string,
    coverImageUrl: string,
    embedUrl: string;
}
const props = defineProps<IProps>();
const showVideo = ref(false);
function getVideoIdFromUrl(url: string) {
    const embedPattern = /https:\/\/www\.youtube\.com\/embed\/(?<videoId>[A-Za-z1-9-]+)/;
    const parsedUrl = embedPattern.exec(url);
    if (parsedUrl) {
        return parsedUrl?.groups?.videoId;
    }
    return '';
}
const videoId = getVideoIdFromUrl(props.embedUrl);

const placeholderCardEl = useTemplateRef('placeholder-card');
const cardDimensionElementSize: { width: number, height: number } = reactive(
    useElementSize(
        placeholderCardEl,
        { width: 0, height: 0 },
        { box: 'border-box' },
    ),
)
const cardDimensions = reactive({
    width: 0,
    height: 0,
})
function handleLoadVideo() {
    // Undo-reactivity to lock-in dimensions once images have loaded
    const { width, height } = cardDimensionElementSize
    cardDimensions.width = width;
    cardDimensions.height = height;
    showVideo.value = true;
}
</script>

<template>
    <div>
        <div
            v-if="showVideo"
            :style="{width: cardDimensions.width, height: cardDimensions.height}"
            class="iframe-container">
            <iframe
                :id="`youtube-video-${videoId}`"
                :width="cardDimensions.width"
                :height="cardDimensions.height"
                :src="props.embedUrl"
                class="overflow-hidden p-0 w-100"
                frameborder="0"
            ></iframe>
        </div>
        <es-card
            v-else
            ref="placeholder-card"
            class="EsVideo-button bg-transparent overflow-hidden p-0 position-relative w-100"
            variant="interactive"
            @click="handleLoadVideo">
            <slot v-if="$slots.default" />
            <img
                v-else
                :alt="props.altText"
                sizes="md:530px sm:275px"
                class="EsVideo-image d-block w-100"
                :src="props.coverImageUrl" />
            <icon-video-play
                class="EsVideo-icon position-absolute center-this"
                width="74px"
                height="54px" />
        </es-card>
    </div>
</template>

<style lang="scss" scoped>
.center-this {
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 2;
}
</style>

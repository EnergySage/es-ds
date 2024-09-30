<script setup lang="ts">
import { useScriptTag , useElementSize } from '@vueuse/core';

interface IProps {
    altText: string,
    coverImageUrl: string,
    embedUrl: string;
}
const props = defineProps<IProps>();
const showVideo = ref(false);

const placeholderCardEl = useTemplateRef('placeholder-card');
const cardDimensionElementSize: { width: number, height: number } = reactive(
    useElementSize(
        placeholderCardEl,
        { width: 0, height: 0 },
        { box: 'border-box' },
    ),
)

function getVideoIdFromUrl(url: string) {
    let pattern;
    const embedPattern = /https:\/\/www\.youtube\.com\/embed\/(?<videoId>[A-Za-z1-9-]+)/;
    const watchPattern = /http:\/\/www\.youtube\.com\/watch\?v=(?<videoId>[A-za-z1-9-]+)/;
    const sharePattern = /http:\/\/www\.youtube\.com\/live\/(?<videoId>[A-za-z1-9-]+)/;

    if (url.match(embedPattern)) {
        pattern = embedPattern;
    } else if (url.match(watchPattern)) {
        pattern = watchPattern;
    } else if (url.match(sharePattern)) {
        pattern = sharePattern
    } else {
        // eslint-disable-next-line no-debugger
        debugger;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    return pattern.exec(url).groups.videoId;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onPlayerReady(evt: any) {
    evt.target.playVideo();
}

const cardDimensions = reactive({
    width: 0,
    height: 0,
})
function handleLoadVideo() {
    // disconnect reactive dimentions at time of initialization
    // we just care about the width size once the placeholder image has loaded
    const { width, height } = cardDimensionElementSize;
    cardDimensions.width = width;
    cardDimensions.height = height;

    // Load the Script & hide the placeholder
    useScriptTag(
        'https://www.youtube.com/iframe_api',
        (el: HTMLScriptElement) => {
            console.log('useScriptTag fired ', el)
            // After this callback, the script has it's own callback mechanism via onYouTubeIframeAPIReady
            // Once onYouTubeIframeAPIReady fires, the vue callback vai the watch fires...
        },
    )
    showVideo.value = true;
}

const iFrameApiLoaded = ref(false);
onMounted(() => {
    /* eslint-disable  @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, no-unused-vars */
    // @ts-ignore-next-line
    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
        console.log('onYouTubeIframeAPIReady fired!');
        const videoId = getVideoIdFromUrl(props.embedUrl);

        /* eslint-disable  @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, no-unused-vars */
        // eslint-disable-next-line no-new
        new window.YT.Player(`youtube-player-${videoId}`, {
            height: cardDimensions.height,
            width: cardDimensions.width,
            videoId,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
            }
        });
        /* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, no-unused-vars */

        iFrameApiLoaded.value = true;
    }
    /* eslint-enable @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unused-vars, no-unused-vars */
});


// const player = ref({});
watch(iFrameApiLoaded, () => {
    console.log('iFrameApiLoaded callback fired!');
})

</script>

<template>
    <div>
        <pre>
            cardDimensions: {{ cardDimensions }}
        </pre>
        <!-- TODO: use <es-card tag="div" />? -->
        <div
            v-if="showVideo"
            class="iframe-container"
            :style="{ width: `${cardDimensions.width}px`, height: `${cardDimensions.height}px` }">
            <div :id="`youtube-player-${getVideoIdFromUrl(props.embedUrl)}`"></div>
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
                class="EsVideo-icon position-absolute"
                width="74px"
                height="54px" />
        </es-card>
    </div>
</template>

<style lang="scss" scoped>
.iframe-container {
    :deep(iframe) {
        width: 100%;
        height: 100%;
    }
}
</style>

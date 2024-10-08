<script setup lang="ts">
// Props
interface IProps {
    altText: string;
    coverImageUrl: string;
    embedUrl: string;
}
const props = defineProps<IProps>();
const showVideo = ref(false);

// Methods
function getVideoIdFromUrl(url: string) {
    const embedPattern = /https:\/\/www\.youtube\.com\/embed\/(?<videoId>[A-Za-z0-9-]+)/;
    const parsedUrl = embedPattern.exec(url);
    if (parsedUrl) {
        return parsedUrl?.groups?.videoId;
    }
    return '';
}

// Computed
const videoId = computed(() => getVideoIdFromUrl(props.embedUrl));
const embedUrlWithParams = computed(
    () => `https://www.youtube.com/embed/${videoId.value}?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en`,
);
</script>

<template>
    <div>
        <div
            v-if="showVideo"
            class="embed-responsive embed-responsive-16by9">
            <iframe
                :id="`youtube-video-${videoId}`"
                :src="embedUrlWithParams"
                class="embed-responsive-item"
                frameborder="0"></iframe>
        </div>
        <es-card
            v-else
            :id="`youtube-placeholder-${videoId}`"
            class="EsVideo-button bg-transparent overflow-hidden p-0 position-relative w-100"
            variant="interactive"
            @click="showVideo = true">
            <slot v-if="$slots.default" />
            <nuxt-img
                v-else
                class="EsVideo-image d-block w-100"
                sizes="md:530px sm:275px"
                :src="props.coverImageUrl"
                :alt="props.altText" />
            <icon-video-play
                class="EsVideo-icon position-absolute abs-center"
                width="74px"
                height="54px" />
        </es-card>
    </div>
</template>

<script setup lang="ts">
interface IProps {
    altText: string,
    coverImageUrl: string,
    embedUrl: string;
}
const props = defineProps<IProps>();
const showVideo = ref(false);

const autoplayUrl = computed(() => {
    const pieces = props.embedUrl.split('?');
    // "&cc_load_policy=1&cc_lang_pref=en" turns closed captions on by default
    // https://support.google.com/youtube/answer/171780?hl=en#zippy=%2Cadd-captions-to-an-embedded-video
    // but requires that the video owner upload non-auto-generated captions
    return `${pieces[0]}?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en`;
});

</script>

<template>
    <div>
        <!-- TODO: use <es-card tag="div" />? -->
        <div v-if="showVideo">
            Video goes here
            {{ autoplayUrl }}
        </div>
        <es-card
            v-else
            class="EsVideo-button bg-transparent overflow-hidden p-0 position-relative w-100"
            variant="interactive"
            @click="showVideo = true">
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

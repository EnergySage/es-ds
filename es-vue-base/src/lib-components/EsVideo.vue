<template>
    <div>
        <b-embed
            v-if="showVideo"
            allowfullscreen
            aspect="16by9"
            :src="autoplayUrl"
            :title="altText"
            type="iframe" />
        <es-card
            v-else
            class="EsVideo-button bg-transparent overflow-hidden p-0 position-relative w-100"
            variant="interactive"
            @click="showVideo = true">
            <slot
                v-if="hasImage"
                name="image" />
            <b-img
                v-else-if="coverImageUrl"
                :alt="altText"
                sizes="md:530px sm:275px"
                class="EsVideo-image d-block w-100"
                :src="coverImageUrl" />
            <icon-video-play
                class="EsVideo-icon position-absolute"
                width="74px"
                height="54px" />
            </es-button>
        </es-card>
    </div>
</template>

<script lang="js">
import { BImg, BEmbed } from 'bootstrap-vue';
import IconVideoPlay from '../lib-icons/icon-video-play.vue';

export default ({
    name: 'EsVideo',
    components: {
        BImg,
        BEmbed,
        IconVideoPlay,
    },
    props: {
        altText: {
            type: String,
            required: true,
        },
        coverImageUrl: {
            type: String,
            default: '',
        },
        embedUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            showVideo: false,
        };
    },
    computed: {
        hasImage() {
            return !!this.$slots.image;
        },
        autoplayUrl() {
            const pieces = this.embedUrl.split('?');
            // "&cc_load_policy=1&cc_lang_pref=en" turns closed captions on by default
            // https://support.google.com/youtube/answer/171780?hl=en#zippy=%2Cadd-captions-to-an-embedded-video
            // but requires that the video owner upload non-auto-generated captions
            return `${pieces[0]}?rel=0&autoplay=1&cc_load_policy=1&cc_lang_pref=en`;
        },
    },
});
</script>

<style lang="scss" scoped>
.EsVideo {
    &-button,
    &-image {
        height: auto;
    }

    &-icon {
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 2;
    }
}
</style>

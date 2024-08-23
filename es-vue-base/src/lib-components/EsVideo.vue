<template>
    <div class="EsLazyYoutube">
        <es-card
            v-if="showVideo"
            class="EsLazyYoutube-button bg-transparent overflow-hidden p-0 position-relative w-100"
            variant="interactive">
            <LazyYoutubeVideo
                allowfullscreen
                ref="lazyYoutube"
                autoplay="true"
                class="pb-0 EsLazyYoutube-restrict w-100 h-100"
                :style="videoStyles"
                :src="autoplayUrl"
                :title="altText" />
        </es-card>
        <es-card
            v-else
            class="EsLazyYoutube-button bg-transparent overflow-hidden p-0 position-relative w-100"
            variant="interactive"
            @click="showVideo = true">
            <slot
                v-if="hasImage"
                name="image" />
            <b-img
                v-else-if="coverImageUrl"
                :alt="altText"
                sizes="md:530px sm:275px"
                class="EsLazyYoutube-image d-block w-100"
                :src="coverImageUrl" />
            <icon-video-play
                class="EsLazyYoutube-icon position-absolute"
                width="74px"
                height="54px" />
        </es-card>
    </div>
</template>

<script lang="js">
// eslint-disable-next-line import/no-extraneous-dependencies
import LazyYoutubeVideo from 'vue-lazy-youtube-video';
import { BImg } from 'bootstrap-vue';
import EsCard from './EsCard.vue';
import IconVideoPlay from '../lib-icons/icon-video-play.vue';

export default ({
    name: 'EsLazyYoutube',
    components: {
        BImg,
        EsCard,
        IconVideoPlay,
        LazyYoutubeVideo,
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
        videoStyles() {
            return {
                position: 'relative',
                paddingBottom: '0 !important',
                height: '100%',
                width: '100%',
            };
        },
    },
    // eslint-disable-next-line max-len, no-param-reassign
    watch: { showVideo(val) { if (val) { this.$nextTick(() => { const videoInner = this.$refs.lazyYoutube.$el.querySelector('.y-video__inner'); if (videoInner) { videoInner.style.paddingBottom = '0'; const observer = new MutationObserver((mutations) => { mutations.forEach((mutation) => { if (mutation.attributeName === 'style') { mutation.target.style.paddingBottom = '0'; } }); }); observer.observe(videoInner, { attributes: true }); } }); } } },
});
</script>

<style lang="scss" scoped>
.EsLazyYoutube {
    display: flex;
    justify-content: center;
    align-items: center;
    &-button {
        height: 100%;
        padding-bottom: 0 !important;
        position: relative;
        width: 100%;
    }

    &-icon {
        left: 50%;
        padding-bottom: 0 !important;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 2;
    }
    &-image,
    &-restrict
    &-iframe,
    iframe
    {
        height: 100% !important;
        left: 0 !important;
        //object-fit: cover !important;
        padding-bottom: 0 !important;
        position: relative !important;
        top: 0 !important;
        width: 100% !important;
    }
}
.y-video__inner {
    height: 100% !important;
    position: relative !important;
    padding-bottom: 0 !important;
    width: 100% !important;
}

.y-video__media {
    height: 800px !important;
    padding-bottom: 0 !important;
    width: 800px !important;
}

.html5-video-player {
    height: 800px !important;
    padding-bottom: 0 !important;
    width: 800px !important;
}

.movie_player {
    height: 800px !important;
    padding-bottom: 0 !important;
    width: 800px !important;
}

</style>

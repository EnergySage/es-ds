<template>
    <b-container class="my-450">
        <b-col
            md="7"
            class="my-450 mx-auto text-center">
            <h1 class="font-weight-boldest display-3">
                {{ errorType }}
            </h1>
            <p
                v-if="checkValidError"
                id="msgError">
                {{ errorMsg }}
            </p>
            <p
                v-else
                id="msgGeneric">
                {{ genericMsg }}
            </p>
        </b-col>

        <b-row>
            <b-col
                v-for="(icon, index) in iconList"
                :key="index"
                cols="6"
                md="3">
                <a
                    class="align-items-center d-flex flex-column justify-content-center text-center"
                    :href="linkList[index]">
                    <div
                        class="bg-white d-flex justify-content-center mb-50 rounded-circle"
                        align-v="center">
                        <div
                            class="m-100 text-orange">
                            <component
                                :is="icon"
                                height="46px"
                                width="46px" />
                        </div>
                    </div>
                    <p class="'font-weight-bolder mb-200 mb-md-0'">{{ labelList[index] }}</p>
                </a>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="js">
import IconCommunitySolar from '../lib-icons/icon-community-solar.vue';
import IconContactUs from '../lib-icons/icon-contact-us.vue';
import IconMarketplace from '../lib-icons/icon-marketplace.vue';
import IconInfoBlogPost from '../lib-icons/icon-info-blog-post.vue';

export default {
    name: 'EsErrorPage',
    components: {
        IconCommunitySolar,
        IconContactUs,
        IconMarketplace,
        IconInfoBlogPost,
    },
    props: {
        errorType: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            errorCode: {
                // eslint-disable-next-line max-len
                err403: "Oops! If you're seeing this message, there's a good chance you have cookies or referrers turned off in your browser.",
                err404: 'Oops! We are terribly sorry, but there is nothing bright to see here.',
                err500: 'Oops! We are terribly sorry, but our server is not so bright today. Please try again.',
                err503: 'Service unavailable: The page you are requesting is temporarily unavailable.',
            },
            genericMsg: 'Oops! Something went wrong!',
            iconList: ['IconContactUs', 'IconCommunitySolar', 'IconInfoBlogPost', 'IconMarketplace'],
            linkList: ['mailto:hello@energysage.com', 'https://www.energysage.com/solar/', 'https://news.energysage.com/', 'https://www.energysage.com/market-intro/'],
            labelList: ['Contact Us', 'Learn About Solar', 'Informative Blog Post', 'EnergySage Marketplace'],
        };
    },
    computed: {
        error() {
            return `err${this.errorType}`;
        },
        errorMsg() {
            return this.errorCode[this.error];
        },
        checkValidError() {
            return Object.keys(this.errorCode).includes(this.error);
        },
    },

};
</script>

<template>
    <b-container class="my-450 bg-gray-50">
        <b-row>
            <b-col
                md="7"
                class="my-450 mx-auto text-center">
                <h1 class="font-weight-bolder display-3 text-gray-600">
                    {{ errorShortMessage }}
                </h1>
                <h2
                    id="msgError"
                    class="h4 text-gray-600">
                    {{ errorLongMessage }}
                </h2>
            </b-col>
        </b-row>
        <b-row>
            <b-col
                v-for="(item, index) in linkItems.errorLinks"
                :key="index"
                cols="6"
                md="3">
                <a
                    class="align-items-center d-flex flex-column justify-content-center text-center"
                    :href="item.link">
                    <div
                        class="bg-white d-flex justify-content-center mb-50 rounded-circle"
                        align-v="center">
                        <div
                            class="m-100 text-orange">
                            <component
                                :is="item.icon"
                                height="46px"
                                width="46px" />
                        </div>
                    </div>
                    <p class="'font-weight-bolder mb-200 mb-md-0'">{{ item.label }}</p>
                </a>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="js">
import { getEsErrorPageContent } from '../lib-utils/index';
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
            errorCodeToMessages: {
                403: {
                    shortMessage: 'Access Denied',
                    longMessage: "Oops! If you're seeing this message, there's a good chance you have cookies or "
                        + 'referrers turned off in your browser.',
                },
                404: {
                    shortMessage: 'Page Not Found',
                    longMessage: 'Oops! We are terribly sorry, but there is nothing bright to see here.',
                },
                500: {
                    shortMessage: 'Internal Server Error',
                    longMessage: 'Oops! We are terribly sorry, but our server is not so bright today. '
                        + 'Please try again.',
                },
                503: {
                    shortMessage: 'Service Unavailable',
                    longMessage: 'The page you are requesting is temporarily unavailable.',
                },
                default: {
                    longMessage: 'Oops! Something went wrong!',
                },
            },
            linkItems: getEsErrorPageContent(),
        };
    },
    computed: {
        messages() {
            return this.errorCodeToMessages[this.errorType];
        },
        errorShortMessage() {
            return this.messages?.shortMessage || this.errorType;
        },
        errorLongMessage() {
            return this.messages?.longMessage || this.errorCodeToMessages.default.longMessage;
        },
    },
};
</script>

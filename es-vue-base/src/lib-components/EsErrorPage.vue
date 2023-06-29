<template>
    <b-container class="my-450">
        <b-row>
            <b-col
                md="7"
                class="my-450 mx-auto text-center">
                <h1 class="font-weight-boldest display-3">
                    {{ errorType }}
                </h1>
                <h2
                    v-if="checkValidError"
                    id="msgError">
                    {{ errorCode[errorType] }}
                </h2>
                <h2
                    v-else
                    id="msgGeneric">
                    {{ genericMsg }}
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
            errorCode: {
                // eslint-disable-next-line max-len, quote-props
                '403': "Oops! If you're seeing this message, there's a good chance you have cookies or referrers turned off in your browser.",
                // eslint-disable-next-line quote-props
                '404': 'Oops! We are terribly sorry, but there is nothing bright to see here.',
                // eslint-disable-next-line quote-props
                '500': 'Oops! We are terribly sorry, but our server is not so bright today. Please try again.',
                // eslint-disable-next-line quote-props
                '503': 'Service unavailable: The page you are requesting is temporarily unavailable.',
            },
            genericMsg: 'Oops! Something went wrong!',
            linkItems: getEsErrorPageContent(),
        };
    },
    computed: {
        checkValidError() {
            return Object.keys(this.errorCode).includes(this.errorType);
        },
    },
};
</script>

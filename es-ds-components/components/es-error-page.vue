<script setup lang="ts">
import IconContactUs from './icon/contact-us.vue';
import IconCommunitySolar from './icon/community-solar.vue';
import IconInfoBlogPost from './icon/info-blog-post.vue';
import IconMarketplace from './icon/marketplace.vue';

const props = defineProps({
    errorType: {
        type: String,
        required: true,
    },
    esDomain: {
        type: String,
        default: null,
    },
});

const esDomain = computed(() => {
    return props.esDomain || 'https://www.energysage.com';
});

const linkItems = computed(() => {
    return [
        {
            icon: IconContactUs,
            link: 'mailto:hello@energysage.com',
            label: 'Contact us',
        },
        {
            icon: IconCommunitySolar,
            link: `${esDomain.value}/solar/`,
            label: 'Learn about solar',
        },
        {
            icon: IconInfoBlogPost,
            link: `${esDomain.value}/blog/`,
            label: 'EnergySage blog',
        },
        {
            icon: IconMarketplace,
            link: `${esDomain.value}/shop/home-solar/`,
            label: 'EnergySage marketplace',
        },
    ];
});

interface ErrorCode {
    shortMessage?: string;
    longMessage: string;
}

interface ErrorCodeMap {
    [key: string]: ErrorCode;
}

const errorCodeToMessages: ErrorCodeMap = {
    403: {
        shortMessage: 'Access denied',
        longMessage:
            "Oops! If you're seeing this message, there's a good chance you have cookies or " +
            'referrers turned off in your browser.',
    },
    404: {
        shortMessage: 'Page not found',
        longMessage: 'Oops! We are terribly sorry, but there is nothing bright to see here.',
    },
    500: {
        shortMessage: 'Internal server error',
        longMessage: 'Oops! We are terribly sorry, but our server is not so bright today. Please try again.',
    },
    503: {
        shortMessage: 'Service unavailable',
        longMessage: 'The page you are requesting is temporarily unavailable.',
    },
    default: {
        longMessage: 'Oops! Something went wrong!',
    },
};

const messages: ErrorCode = errorCodeToMessages[props.errorType];

const errorShortMessage = messages?.shortMessage || props.errorType;

const errorLongMessage = messages?.longMessage || errorCodeToMessages.default.longMessage;
</script>

<template>
    <div class="bg-gray-50">
        <es-container class="py-500 py-lg-800">
            <es-row>
                <es-col
                    md="7"
                    class="my-500 mx-auto text-center">
                    <h1 class="post1 text-gray-600">
                        {{ errorShortMessage }}
                    </h1>
                    <p
                        id="msgError"
                        class="font-size-lg text-gray-600">
                        {{ errorLongMessage }}
                    </p>
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    v-for="(item, index) in linkItems"
                    :key="index"
                    cols="6"
                    md="3">
                    <a
                        class="align-items-center d-flex flex-column justify-content-center text-center"
                        :href="item.link">
                        <div
                            class="bg-white d-flex justify-content-center mb-50 rounded-circle"
                            align-v="center">
                            <div class="m-100 text-orange">
                                <component
                                    :is="item.icon"
                                    height="53px"
                                    width="53px" />
                            </div>
                        </div>
                        <p class="mb-200 mb-md-0">{{ item.label }}</p>
                    </a>
                </es-col>
            </es-row>
        </es-container>
    </div>
</template>

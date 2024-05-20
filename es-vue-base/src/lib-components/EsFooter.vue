<template>
    <div class="es-footer clearfix">
        <!-- Make an impact -->
        <div class="bg-blue-900 text-white py-200 py-lg-300 px-200">
            <div class="container px-0">
                <div class="row">
                    <div class="col col-12 col-md-5 col-lg-4 font-size-200 font-size-md-400 font-weight-bold mb-150 mb-md-0">
                        {{ content.banner.headline }}
                        <br>
                        {{ content.banner.subHeadline }}
                    </div>
                    <div class="col col-12 col-md-7 col-lg-8">
                        {{ content.banner.body }}
                    </div>
                </div>
            </div>
        </div>  <!-- Make an impact -->
        <div class="bg-blue-800 py-200 pt-lg-200 pb-lg-150 px-200">
            <div class="container px-0">
                <div class="row">
                    <!-- Link columns -->
                    <div class="col col-12 col-lg-8 order-lg-1 text-white">
                        <div class="row">
                            <div
                                v-for="column in content.columns"
                                :key="column.title"
                                class="col col-6 col-md-3 mb-100 mb-lg-0">
                                <ul class="list-unstyled mb-lg-0">
                                    <li class="font-weight-bold font-size-75 font-size-md-100 mb-100 mb-lg-50">
                                        {{ column.title }}
                                    </li>
                                    <li
                                        v-for="link in column.links"
                                        :key="link.text"
                                        class="mt-0 mt-lg-25 mb-100 mb-lg-50 font-size-75">
                                        <es-nav-bar-link
                                            :href="link.url"
                                            :target="link.newTab ? '_blank' : null"
                                            class="text-reset">
                                            {{ link.text }}
                                        </es-nav-bar-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>  <!-- Link columns -->
                    <!-- Logo and Social-->
                    <div class="col col-12 col-lg-4 order-lg-0">
                        <es-nav-bar-link
                            class="d-block mb-150 d-flex justify-content-center justify-content-lg-start"
                            :href="content.home.link">
                            <span class="sr-only">
                                {{ content.home.name }}
                            </span>
                            <slot name="logo" />
                        </es-nav-bar-link>
                        <!-- Social icons -->
                        <div class="d-flex text-white justify-content-center justify-content-lg-start">
                            <es-nav-bar-link
                                v-for="iconLink in content.socialLinks"
                                :key="iconLink.text"
                                class="text-reset pr-150"
                                :href="iconLink.url"
                                target="_blank">
                                <span class="sr-only">{{ iconLink.text }}</span>
                                <component :is="iconLink.icon" />
                            </es-nav-bar-link>
                        </div>  <!-- Social icons -->
                    </div>  <!-- Logo and Social -->
                </div>
            </div>
        </div>
        <div class="bg-blue-700 text-blue-50 px-200 py-100">
            <div class="container px-0">
                <!-- Trademark Info -->
                <p class="font-size-75">
                    {{ content.trademarkText }}
                </p>
                <p class="mb-200 font-size-75">
                    {{ copyrightText }}
                </p>
                <!-- Trademark Info -->
                <!-- Legal -->
                <hr class="border-top border-blue-500 m-0">
                <div class="row justify-content-center pt-100">
                    <div
                        v-for="link in content.legalLinks"
                        :key="link.text"
                        class="col col-6 col-lg-auto font-size-75 font-weight-semibold font-size-md-50 font-weight-md-normal mt-25 mb-50 px-lg-300">
                        <es-nav-bar-link
                            :href="link.url"
                            class="text-reset font-weight-normal">
                            {{ link.text }}
                        </es-nav-bar-link>
                    </div>
                </div>  <!-- Legal -->
            </div>
        </div>
        <div class="bg-blue-50 px-200 py-100">
            <div class="container px-0">
                <!-- DOE -->
                <div class="d-lg-flex align-items-end">
                    <!-- eslint-disable-next-line -->
                    <img
                        :src="content.departmentOfEnergy.logoUrl"
                        alt="department of energy logo"
                        aria-hidden="true"
                        class="mr-100 mb-100 mb-lg-0"
                        width="99"
                        height="24">
                    <p class="mb-0 font-size-75 font-weight-normal font-weight-lg-semibold">
                        <es-nav-bar-link
                            :href="content.departmentOfEnergy.learnMore.link"
                            target="_blank"
                            class="text-blue-900">
                            {{ content.departmentOfEnergy.learnMore.text }}
                        </es-nav-bar-link>
                    </p>
                </div>  <!-- DOE -->
            </div>
        </div>
    </div>
</template>

<script lang="js">
import EsNavBarLink from './EsNavBarLink.vue';
import IconFacebook from '../lib-icons/icon-facebook.vue';
import IconTwitter from '../lib-icons/icon-twitter.vue';
import IconYoutube from '../lib-icons/icon-youtube.vue';
import IconLinkedin from '../lib-icons/icon-linkedin.vue';
import IconInstagram from '../lib-icons/icon-instagram.vue';

export default {
    name: 'EsFooter',
    components: {
        EsNavBarLink,
        // Used by content.socialLinks
        IconFacebook,
        IconTwitter,
        IconYoutube,
        IconInstagram,
        IconLinkedin,
    },
    props: {
        content: {
            type: Object,
            required: true,
        },
    },
    computed: {
        copyrightText() {
            return this.content.copyrightText.replace('{currentYear}', new Date().getFullYear());
        },
    },
};
</script>

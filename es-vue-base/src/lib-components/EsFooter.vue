<template>
    <div class="es-footer clearfix">
        <!-- Make an impact -->
        <div class="bg-gray text-white py-300 py-lg-500">
            <div class="container">
                <div class="row">
                    <div class="col col-12 col-md-5 col-lg-4 font-size-300 font-weight-bolder mb-150 mb-md-0">
                        {{ content.banner.headline }}
                        <br class="d-none d-md-block">
                        {{ content.banner.subHeadline }}
                    </div>
                    <div class="col col-12 col-md-7 col-lg-8">
                        {{ content.banner.body }}
                    </div>
                </div>
            </div>
        </div>  <!-- Make an impact -->
        <div class="container text-gray font-size-75 pt-200 pb-300">
            <div class="row">
                <!-- Link columns -->
                <div class="col col-12 col-lg-8 order-lg-1">
                    <div class="row">
                        <div
                            v-for="column in content.columns"
                            :key="column.title"
                            class="col col-6 col-md-3 mb-150">
                            <ul class="list-unstyled">
                                <li class="font-weight-bolder font-size-100 mb-50">
                                    {{ column.title }}
                                </li>
                                <li
                                    v-for="link in column.links"
                                    :key="link.text"
                                    class="mt-25 mb-50">
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
                <div class="col col-12 col-lg-4 order-lg-0 mb-200">
                    <es-nav-bar-link
                        class="d-block mb-150"
                        :href="content.home.link">
                        <span class="sr-only">
                            {{ content.home.name }}
                        </span>
                        <es-logo
                            height="36px"
                            width="160px" />
                    </es-nav-bar-link>
                    <!-- Social icons -->
                    <div class="d-flex text-gray-700">
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
            <hr class="border-top border-dark m-0">
            <!-- Trademark Info -->
            <p class="mt-150 mt-lg-200">
                {{ content.trademarkText }}
            </p>
            <p class="mb-200">
                {{ copyrightText }}
            </p>
            <!-- Trademark Info -->
            <!-- Legal -->
            <div class="row justify-content-between mb-150">
                <div
                    v-for="link in content.legalLinks"
                    :key="link.text"
                    class="col col-6 col-lg font-size-50 mt-25 mb-50">
                    <es-nav-bar-link
                        :href="link.url"
                        class="text-reset font-weight-normal">
                        {{ link.text }}
                    </es-nav-bar-link>
                </div>
            </div>  <!-- Legal -->
            <!-- DOE -->
            <div class="d-lg-flex align-items-end">
                <!-- eslint-disable-next-line -->
                <img
                    :src="content.departmentOfEnergy.logoUrl"
                    alt="department of energy logo"
                    aria-hidden="true"
                    class="mr-100 mb-100 mb-lg-0"
                    width="99"
                    height="25">
                <p class="mb-0">
                    <es-nav-bar-link
                        :href="content.departmentOfEnergy.learnMore.link"
                        target="_blank">
                        {{ content.departmentOfEnergy.learnMore.text }}
                    </es-nav-bar-link>
                </p>
            </div>  <!-- DOE -->
        </div>
    </div>
</template>

<script lang="js">
import EsNavBarLink from './EsNavBarLink.vue';
import EsLogo from '../lib-assets/es-logo.vue';
import IconFacebook from '../lib-icons/icon-facebook.vue';
import IconTwitter from '../lib-icons/icon-twitter.vue';
import IconYoutube from '../lib-icons/icon-youtube.vue';
import IconLinkedin from '../lib-icons/icon-linkedin.vue';
import IconInstagram from '../lib-icons/icon-instagram.vue';

export default {
    name: 'EsFooter',
    components: {
        EsLogo,
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

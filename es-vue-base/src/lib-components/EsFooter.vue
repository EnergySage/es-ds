<template>
    <div class="es-footer clearfix">
        <!-- Make an impact -->
        <div class="bg-gray text-white py-300 py-lg-450">
            <div class="container">
                <div class="row">
                    <div class="col col-12 col-md-5 col-lg-4 font-size-300 font-weight-bolder mb-150 mb-md-0">
                        Make an impact.
                        <br class="d-none d-md-block">
                        It's never been easier.
                    </div>
                    <div class="col col-12 col-md-7 col-lg-8">
                        We developed our one-of-a-kind marketplace with funding from the U.S. Department of Energy
                        to make clean home energy solutions affordable and accessible to all.
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
                            v-for="column in columns"
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
                                    <a
                                        :href="link.url"
                                        :target="link.newTab ? '_blank' : null"
                                        class="text-reset">
                                        {{ link.text }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>  <!-- Link columns -->
                <!-- Logo and Social-->
                <div class="col col-12 col-lg-4 order-lg-0 mb-200">
                    <a
                        class="d-block mb-150"
                        href="https://www.energysage.com/">
                        <span class="sr-only">EnergySage</span>
                        <es-logo
                            height="36px"
                            width="160px" />
                    </a>
                    <!-- Social icons -->
                    <div class="d-flex text-gray-700">
                        <a
                            v-for="iconLink in socialLinks"
                            :key="iconLink.text"
                            class="text-reset pr-150"
                            :href="iconLink.url">
                            <span class="sr-only">{{ iconLink.text }}</span>
                            <component :is="iconLink.icon" />
                        </a>
                    </div>  <!-- Social icons -->
                </div>  <!-- Logo and Social -->
            </div>
            <hr class="border-top border-dark m-0">
            <!-- Trademark Info -->
            <p class="mt-150 mt-lg-200">
                ENERGYSAGE is a registered trademark and the EnergySage logo is a trademark of EnergySage, Inc.
                Other trademarks are the property of either EnergySage, Inc. or our licensors
                and are used with permission.
            </p>
            <p class="mb-200">
                © Copyright 2009-{{ new Date().getFullYear() }} EnergySage, Inc. All rights reserved.
            </p>
            <!-- Trademark Info -->
            <!-- Legal -->
            <div class="row justify-content-between mb-150">
                <div
                    v-for="link in legalLinks"
                    :key="link.text"
                    class="col col-6 col-lg font-size-50 mt-25 mb-50">
                    <a
                        :href="link.url"
                        class="text-reset font-weight-normal">
                        {{ link.text }}
                    </a>
                </div>
            </div>  <!-- Legal -->
            <!-- DOE -->
            <div class="d-lg-flex align-items-end">
                <!-- eslint-disable-next-line -->
                <img
                    src="https://www-static.energysage.com/static/img/doe/doe-logo-179.943fe6467b04.png"
                    aria-hidden="true"
                    class="mr-100 mb-100 mb-lg-0"
                    width="99"
                    height="25">
                <p class="mb-0">
                    <a href="https://www.energy.gov/eere/solar/articles/eere-success-story-doe-funding-helps-build-one-stop-shop-rooftop-pv-systems">
                        Learn more about our success working with the US. Department of Energy.
                    </a>
                </p>
            </div>  <!-- DOE -->
        </div>
    </div>
</template>

<script lang="js">
import EsLogo from '../lib-assets/es-logo.vue';

export default {
    name: 'EsFooter',
    components: {
        EsLogo,
    },
    data() {
        return {
            columns: [
                // TODO: remove new tab option once other verticals adopt global nav
                {
                    title: 'Our offerings',
                    links: [
                        { text: 'Home solar', url: 'https://www.energysage.com/market-intro/' },
                        { text: 'Community solar', url: 'https://communitysolar.energysage.com', newTab: true },
                        { text: 'Heating & cooling', url: 'https://heatpumps.energysage.com', newTab: true },
                        { text: 'Backup power', url: 'https://www.energysage.com/energy-storage/' },
                        { text: 'EV charging', url: 'https://www.energysage.com/ev-charging/' },
                        { text: 'For your business', url: 'https://www.energysage.com/businesses/' },
                        { text: 'Other energy options', url: 'https://www.energysage.com/other-clean-options/' },
                    ],
                },
                {
                    title: 'Resources',
                    links: [
                        { text: 'Solar calculator', url: 'https://www.energysage.com/solar/calculator/' },
                        { text: 'Solar rebates', url: 'https://www.energysage.com/market/equipment-rebates/' },
                        { text: 'News', url: 'https://news.energysage.com', newTab: true },
                        { text: 'Help center', url: 'https://help.energysage.com', newTab: true },
                        { text: 'Home solar guide', url: 'https://www.energysage.com/market-intro/' },
                    ],
                },
                {
                    title: 'About us',
                    links: [
                        { text: 'Mission & values', url: 'https://www.energysage.com/about-us/company/' },
                        { text: 'How it works', url: 'https://www.energysage.com/market-intro/' },
                        { text: 'Careers', url: 'https://www.energysage.com/about-us/careers/' },
                        { text: 'Contact us', url: 'https://www.energysage.com/contact/' },
                        { text: 'Editorial guidelines', url: 'https://www.energysage.com/editorial-guidelines/' },
                    ],
                },
                {
                    title: 'Work with us',
                    links: [
                        { text: 'Solar companies', url: 'https://www.energysage.com/installers/' },
                        { text: 'Partner with us', url: 'https://www.energysage.com/partners/' },
                        { text: 'Market intel', url: 'https://www.energysage.com/data/' },
                        { text: 'Refer a friend', url: 'https://www.energysage.com/refer-a-friend/' },
                    ],
                },
            ],
            socialLinks: [
                { text: 'Facebook', url: 'https://www.facebook.com/EnergySage', icon: 'icon-facebook' },
                { text: 'LinkedIn', url: 'https://www.linkedin.com/company/energysage/', icon: 'icon-linkedin' },
                { text: 'Instagram', url: 'https://www.instagram.com/energysage_official/', icon: 'icon-instagram' },
                { text: 'Twitter', url: 'https://twitter.com/energysage', icon: 'icon-twitter' },
                { text: 'YouTube', url: 'https://www.youtube.com/c/EnergySage', icon: 'icon-youtube' },
            ],
            legalLinks: [
                { text: 'Terms of use', url: 'https://www.energysage.com/terms-of-use/' },
                { text: 'Privacy policy', url: 'https://www.energysage.com/privacy-policy/' },
                { text: 'Mobile terms of use', url: 'https://www.energysage.com/mobile-terms-of-use/' },
                { text: 'Non-discrimination policy', url: 'https://www.energysage.com/nondiscrimination/' },
            ],
        };
    },
};
</script>

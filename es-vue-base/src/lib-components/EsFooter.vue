<template>
    <div class="es-footer clearfix">
        <!-- Make an impact -->
        <div class="bg-gray text-white py-300 py-lg-450 px-100 px-sm-200 px-md-300">
            <div class="row">
                <div class="col col-12 col-md-5 col-lg-4 font-size-300 font-weight-bolder mb-150 mb-md-0">
                    Make an impact.
                    <br class="d-none d-md-block">
                    It's never been easier.
                </div>
                <div class="col col-12 col-md-7 col-lg-8">
                    Our one-of-a-kind marketplace was developed with funding from the U.S. Department of Energy
                    to make clean home energy solutions affordable and accessible to all.
                </div>
            </div>
        </div>  <!-- Make an impact -->
        <div class="text-gray font-size-75 pt-200 pb-300 px-100 px-sm-200 px-md-300">
            <div class="row">
                <!-- Link columns -->
                <div class="col col-12 col-lg-8 order-lg-1">
                    <div class="row">
                        <ul
                            v-for="columnHeader in Object.keys(columns)"
                            :key="columnHeader"
                            class="list-unstyled col col-6 col-md-3 mb-150">
                            <li class="font-weight-bolder font-size-100 mb-50">
                                {{ columnHeader }}
                            </li>
                            <li
                                v-for="link in columns[columnHeader]"
                                :key="link"
                                class="mt-25 mb-50">
                                <a
                                    :href="link.url"
                                    class="text-reset">
                                    {{ link.text }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>  <!-- Link columns -->
                <!-- Logo and Social-->
                <div class="col col-12 col-lg-4 order-lg-0 mb-200">
                    <div class="mb-150">
                        <!-- TODO: replace with logo component (CED-413) -->
                        <!-- eslint-disable-next-line -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="160" height="36" fill="none" viewBox="0 0 160 36"><g clip-path="url(#footer-a)"><path fill="#616161" d="M2.3 19.2c0 3.7 1 4.5 2.8 4.5 1.4 0 2.2-1.2 2.3-2.6h2.4c0 3-1.9 4.4-4.7 4.4-2.8 0-5.1-.9-5.1-6.8 0-4 .5-7.2 5.1-7.2 3.8 0 4.8 2 4.8 6.5v1.2H2.3Zm5.3-1.7c0-3.9-1.1-4.4-2.7-4.4-1.4 0-2.5.7-2.6 4.4h5.3ZM20.8 25.2v-9.3c0-1.5-.5-2.6-2.4-2.6-2.4 0-2.7 2-2.7 4v7.9h-2.2V14.5l-.1-2.8h2.3v1.8c1-1.5 2-2 3.7-2 2.8 0 3.6 1.7 3.6 4.4v9.3h-2.2ZM29 19.2c0 3.7 1 4.5 2.6 4.5 1.5 0 2.3-1.2 2.4-2.6h2.4c0 3-1.9 4.4-4.7 4.4-2.8 0-5.1-.9-5.1-6.8 0-4 .4-7.2 5-7.2 4 0 4.9 2 4.9 6.5v1.2h-7.6Zm5.2-1.7c0-3.9-1.1-4.4-2.7-4.4-1.4 0-2.6.7-2.6 4.4h5.3ZM42.3 13.8c1-2 2.1-2.3 4.2-2.3v2.2h-1.1c-2.5 0-3 1.7-3 3.6v7.9h-2.2V11.7h2.1v2ZM56 11.7h2.2v14.8c0 3-2 3.8-5 3.8-2.2 0-4.2-1.2-4-3.6h2.4c0 1.2.9 2 2 2 1.6 0 2.4-1 2.4-2.4v-2.8c-.6 1-1.8 1.7-3 1.7-3.7 0-4.4-3.2-4.4-7.2 0-6.1 3.1-6.5 4.2-6.5 1.4 0 2.5.6 3.2 1.9v-1.7m-2.5 1.6c-2.5 0-2.6 3-2.6 4.7 0 4.4 1 5.4 2.6 5.4 2.7 0 2.6-3.1 2.6-5 0-2 .1-5.1-2.6-5.1ZM66.2 22.7l3.3-11H72l-6.1 18.6h-2.3l1.5-5.1-4.5-13.5H63l3.2 11Z"/><path fill="#CA6F20" d="M78 25.5c-3 0-4.8-1.3-4.7-4.4h2.5c0 .8 0 2.6 2.2 2.6 1.3 0 2.3-.7 2.3-2 0-2.5-6.7-2.5-6.7-6.6 0-1.4.9-3.6 4.7-3.6 2.4 0 4.4 1.1 4.2 3.8h-2.4c0-1.4-.7-2.2-2-2.2s-2.2.7-2.2 1.8c0 2.4 6.7 2.4 6.7 6.5 0 3-2 4-4.6 4ZM92.7 23.2c-.7 1.6-1.8 2.3-3.4 2.3-2.9 0-3.7-1.9-3.7-4.5 0-4 4-4.2 7-4.1.1-1.8.1-3.8-2.2-3.8-1.5 0-2.2 1-2.1 2.4h-2.4c.1-3 1.7-4 4.6-4 3.4 0 4.3 1.8 4.3 4V22c0 1 .1 2.2.3 3.2h-2.4v-2Zm-5-2c0 1.3.7 2.5 2.2 2.5 1.3 0 3-.9 2.7-5.2-2 0-4.8-.2-4.8 2.7ZM106.2 11.7h2.1v14.8c0 3-2 3.8-4.9 3.8-2.2 0-4.2-1.2-4-3.6h2.4c0 1.2.8 2 2 2 1.5 0 2.4-1 2.4-2.4v-2.8h-.1c-.6 1-1.8 1.7-3 1.7-3.6 0-4.3-3.2-4.3-7.2 0-6.1 3-6.5 4.2-6.5 1.4 0 2.5.6 3.1 1.9v-1.7m-2.5 1.6c-2.5 0-2.5 3-2.5 4.7 0 4.4 1 5.4 2.6 5.4 2.6 0 2.5-3.1 2.5-5 0-2 .2-5.1-2.6-5.1ZM114.5 19.2c0 3.7 1 4.5 2.7 4.5 1.5 0 2.3-1.2 2.3-2.6h2.4c0 3-1.8 4.4-4.6 4.4-2.9 0-5.2-.9-5.2-6.8 0-4 .5-7.2 5.2-7.2 3.8 0 4.7 2 4.7 6.5v1.2h-7.5Zm5.2-1.7c0-3.9-1-4.4-2.7-4.4-1.3 0-2.5.7-2.5 4.4h5.2Z"/><path fill="#616161" d="M154 12c-.9-1.7-2.3-3.5-4-5.4-2.8-3.2-5.6-5.6-5.7-5.7a2.2 2.2 0 0 0-2.8 0 62.2 62.2 0 0 0-9.8 11c-1.4 2.4-2 4.4-2 6.2 0 7 5.3 12.6 12 13.2v3.3c0 .7.6 1.2 1.2 1.2s1-.5 1-1.2v-3.3c6.8-.6 12.2-6.3 12.2-13.2 0-1.8-.7-3.8-2-6.1ZM143.5 29h-1a11 11 0 0 1-10.5-11c0-6 11-15.5 11-15.5s11 9.4 11 15.5a11 11 0 0 1-10.5 11Z"/><path fill="#616161" d="M147.3 15.9a1 1 0 0 0-1-.4l-1.8.3.4-7.7a1 1 0 0 0-1.8-.5l-4.7 11.1a1 1 0 0 0 0 1c.2.4.6.6 1 .5l1.8-.3L140 26a1 1 0 0 0 1 1h.1c.3 0 .5-.3.7-.5l5.5-9.7a1 1 0 0 0 0-1m-1.2.8-4.7 8.3 1-6.5-2.9.5 4.2-9.7-.4 7.9 2.8-.5ZM158.6 22.6a1.4 1.4 0 0 0-1.5 1.5c0 .8.7 1.4 1.5 1.4.7 0 1.4-.6 1.4-1.4 0-.8-.7-1.5-1.4-1.5Zm1.1 1.5c0 .6-.5 1.1-1.1 1.1-.7 0-1.2-.5-1.2-1.1 0-.7.5-1.2 1.2-1.2.6 0 1.1.5 1.1 1.2Z"/><path fill="#616161" d="m159 23.8-.1-.3-.4-.1h-.4v1.3h.2v-.5h.2l.4.5h.2l-.4-.6c.2 0 .3-.1.3-.3Zm-.5.2h-.2v-.4h.4v.4h-.2Z"/></g><defs><clipPath id="footer-a"><path fill="#fff" d="M0 .4h160v35.3H0z"/></clipPath></defs></svg>
                    </div>
                    <!-- Social icons -->
                    <div class="d-flex text-gray-700">
                        <a
                            v-for="iconLink in socialLinks"
                            :key="iconLink"
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
                    :key="link"
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
export default {
    name: 'EsFooter',
    data() {
        return {
            columns: {
                'Our Topics': [
                    { text: 'Home solar', url: 'https://www.energysage.com/' },
                    { text: 'Community solar', url: 'https://communitysolar.energysage.com/' },
                    { text: 'For your business', url: 'https://www.energysage.com/businesses/' },
                    { text: 'Heating & cooling', url: 'https://heatpumps.energysage.com/' },
                    { text: 'Backup power', url: '' },
                    { text: 'EV charging', url: '' },
                    { text: 'Other energy options', url: '' },
                ],
                Resources: [
                    { text: 'Solar calculator', url: 'https://www.energysage.com/solar/calculator/' },
                    { text: 'Solar rebates', url: 'https://www.energysage.com/market/equipment-rebates/' },
                    { text: 'EnergySage news', url: 'https://news.energysage.com/' },
                    { text: 'Help center', url: 'https://help.energysage.com/' },
                    { text: 'Learn about solar', url: 'https://www.energysage.com/solar/' },
                ],
                Company: [
                    { text: 'Mission & values', url: 'https://www.energysage.com/about-us/company/' },
                    { text: 'How it works', url: 'https://www.energysage.com/market-intro/' },
                    { text: 'Editorial team', url: '' },
                    { text: 'Careers', url: 'https://www.energysage.com/about-us/careers/' },
                    { text: 'Contact us', url: 'https://www.energysage.com/contact/' },
                    { text: 'Editorial guidelines', url: 'https://www.energysage.com/editorial-guidelines/' },
                ],
                'Work with us': [
                    { text: 'Solar companies', url: 'https://www.energysage.com/installers/' },
                    { text: 'Corporate partners', url: 'https://www.energysage.com/partners/' },
                    { text: 'Community programs', url: 'https://www.energysage.com/partners/' },
                    { text: 'Market research', url: 'https://www.energysage.com/data/' },
                    { text: 'Refer a friend', url: 'https://www.energysage.com/refer-a-friend/' },
                ],
            },
            socialLinks: [
                { text: 'Facebook', url: 'https://www.facebook.com/EnergySage', icon: 'icon-facebook' },
                { text: 'LinkedIn', url: 'https://www.linkedin.com/company/energysage/', icon: 'icon-linkedin' },
                { text: 'Instagram', url: 'https://www.instagram.com/energysage_official/?hl=en', icon: 'icon-instagram' },
                { text: 'Twitter', url: 'https://twitter.com/energysage', icon: 'icon-twitter' },
                { text: 'YouTube', url: 'https://www.youtube.com/c/EnergySage', icon: 'icon-youtube' },
            ],
            legalLinks: [
                { text: 'Terms of use', url: 'https://www.energysage.com/terms-of-use/' },
                { text: 'Privacy policy', url: 'https://www.energysage.com/privacy-policy/' },
                { text: 'Mobile terms of use', url: 'https://www.energysage.com/mobile-terms-of-use/' },
                { text: 'Non-discrimination policy', url: 'https://www.energysage.com/nondiscrimination/' },
                { text: 'Site map', url: '' },
            ],
        };
    },
};
</script>

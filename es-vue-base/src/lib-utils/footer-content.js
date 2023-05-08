export default (
    ES_DOMAIN = 'https://www.energysage.com',
    NEWS_DOMAIN = 'https://news.energysage.com',
    COMMUNITY_SOLAR_DOMAIN = 'https://communitysolar.energysage.com',
    HEAT_PUMPS_DOMAIN = 'https://heatpumps.energysage.com',
    HELP_DOMAIN = 'https://help.energysage.com',
) => ({
    columns: [
        // TODO: remove new tab option once other verticals adopt global nav
        {
            title: 'Our offerings',
            links: [
                { text: 'Home solar', url: `${ES_DOMAIN}/market-intro/` },
                { text: 'Community solar', url: COMMUNITY_SOLAR_DOMAIN, newTab: true },
                { text: 'Heating & cooling', url: HEAT_PUMPS_DOMAIN, newTab: true },
                { text: 'Backup power', url: `${ES_DOMAIN}/energy-storage/` },
                { text: 'EV charging', url: `${ES_DOMAIN}/ev-charging/` },
                { text: 'For your business', url: `${ES_DOMAIN}/businesses/` },
                { text: 'Other energy options', url: `${ES_DOMAIN}/other-clean-options/` },
            ],
        },
        {
            title: 'Resources',
            links: [
                { text: 'Solar calculator', url: `${ES_DOMAIN}/solar/calculator/` },
                { text: 'Solar rebates', url: `${ES_DOMAIN}/market/equipment-rebates/` },
                { text: 'News', url: NEWS_DOMAIN, newTab: true },
                { text: 'Help center', url: HELP_DOMAIN, newTab: true },
                { text: 'Home solar guide', url: `${ES_DOMAIN}/market-intro/` },
            ],
        },
        {
            title: 'About us',
            links: [
                { text: 'Mission & values', url: `${ES_DOMAIN}/about-us/company/` },
                { text: 'How it works', url: `${ES_DOMAIN}/market-intro/` },
                { text: 'Careers', url: `${ES_DOMAIN}/about-us/careers/` },
                { text: 'Contact us', url: `${ES_DOMAIN}/contact/` },
                { text: 'Editorial guidelines', url: `${ES_DOMAIN}/editorial-guidelines/` },
            ],
        },
        {
            title: 'Work with us',
            links: [
                { text: 'Solar companies', url: `${ES_DOMAIN}/installers/` },
                { text: 'Partner with us', url: `${ES_DOMAIN}/partners/` },
                { text: 'Market intel', url: `${ES_DOMAIN}/data/` },
                { text: 'Refer a friend', url: `${ES_DOMAIN}/refer-a-friend/` },
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
        { text: 'Terms of use', url: `${ES_DOMAIN}/terms-of-use/` },
        { text: 'Privacy policy', url: `${ES_DOMAIN}/privacy-policy/` },
        { text: 'Mobile terms of use', url: `${ES_DOMAIN}/mobile-terms-of-use/` },
        { text: 'Non-discrimination policy', url: `${ES_DOMAIN}/nondiscrimination/` },
    ],
});

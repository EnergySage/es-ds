require('dotenv').config({ override: true })
const process = require('node:process')

const snapShotFactory = (name, path, overrides) => {
    const baseUrl = process.env.PERCY_BRANCH === 'production' ? 'https://design.energysage.dev' : 'http://localhost:8500';
    const url = `${baseUrl}${path}`;
    const baseTemplate = {
        name,
        url,
        waitForTimeout: 30000,
        waitForSelector: '.container',
    }
    return {...baseTemplate, ...overrides}
}

module.exports = async () => {
    const urls = [
        // Home
        '/',

        // Atoms
        '/atoms/color',
        '/atoms/typography',
        '/atoms/layout',
        '/atoms/spacing',
        '/atoms/icons',

        // Molecules
        '/molecules/es-accordion',
        '/molecules/es-badge',
        '/molecules/es-breadcrumbs',
        '/molecules/es-button',
        '/molecules/es-card',
        '/molecules/es-collapse',
        '/molecules/es-data-table',
        '/molecules/es-file-input',
        '/molecules/es-form-input',
        '/molecules/es-form-msg',
        '/molecules/es-form-radio-cards',
        '/molecules/es-form-textarea',
        '/molecules/es-horizontal-list',
        '/molecules/es-modal',
        '/molecules/es-pagination',
        '/molecules/es-popover',
        '/molecules/es-progress',
        '/molecules/es-progress-circle',
        '/molecules/es-rating',
        '/molecules/es-search-bar',
        '/molecules/es-slider',
        '/molecules/es-support',
        '/molecules/es-tabs',
        '/molecules/es-verification-code',
        '/molecules/es-video',
        '/molecules/es-view-more',

        // Organisms
        '/organisms/es-cta-banner',
        '/organisms/es-cta-card',
        '/organisms/es-error-page',
        '/organisms/es-footer',
        '/organisms/es-form',
        '/organisms/es-nav-bar',
        '/organisms/es-review',
        '/organisms/es-reviews-list',
        '/organisms/es-reviews-io-card-carousel',
        '/organisms/es-support-card',
        '/organisms/es-file-thumbnail',
        '/organisms/es-file-preview-modal',
        '/organisms/es-zip-code-form',

        // Examples
        // '/examples/nuxt-components', <-- Documentation Page
        '/examples/form-field-validation',
        '/examples/form-validation',
        '/examples/file-upload',
    ];

    return urls.map((urlPath) => {
        const name = urlPath.substring(1).replace('/', '__');
        return snapShotFactory(name, urlPath);
    });
}

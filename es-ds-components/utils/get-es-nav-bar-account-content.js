// rooftop account links
export default (
    ES_DOMAIN = process.env.ES_DOMAIN || 'https://www.energysage.com',
    ACCOUNTS_DOMAIN = process.env.ACCOUNTS_DOMAIN || 'https://accounts.energysage.com',
    REGISTER_LINK = process.env.REGISTER_LINK || `${ACCOUNTS_DOMAIN}/register/?next=${ES_DOMAIN}/register-thanks/`,
) => ({
    mobileAccountButtonAltText: 'Open account menu',
    loggedIn: {
        items: [
            {
                name: 'My profile',
                link: `${ES_DOMAIN}/profile/`,
            },
            {
                name: 'My quotes',
                link: `${ES_DOMAIN}/your-marketplace/`,
            },
            {
                name: 'My messages',
                link: `${ES_DOMAIN}/message/`,
            },
            {
                name: 'My project preferences',
                link: `${ES_DOMAIN}/market/solarpv/update/`,
            },
            {
                name: 'Account settings',
                link: `${ES_DOMAIN}/account-settings/router/`,
            },
            {
                name: 'How it works',
                link: `${ES_DOMAIN}/market-process/`,
            },
            {
                name: 'Write a review',
                link: `${ES_DOMAIN}/share-your-experience/`,
            },
            {
                name: 'Sign out',
                link: `${ES_DOMAIN}/logout/`,
            },
        ],
    },
    loggedOut: {
        menuButtonText: 'Sign in',
        signIn: {
            name: 'Sign in',
            link: `${ES_DOMAIN}/login/`,
        },
        createAccount: {
            name: 'Create an account',
            link: REGISTER_LINK,
        },
    },
});

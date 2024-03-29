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
                name: 'My Account',
                link: `${ES_DOMAIN}/profile/`,
            },
            {
                name: 'My Quotes',
                link: `${ES_DOMAIN}/your-marketplace/`,
            },
            {
                name: 'Share Your Experience',
                link: `${ES_DOMAIN}/share-your-experience/`,
            },
            {
                name: 'Settings',
                link: `${ES_DOMAIN}/account-settings/router/`,
            },
            {
                name: 'Refer a Friend',
                link: `${ES_DOMAIN}/refer-a-friend/`,
            },
            {
                name: 'Sign Out',
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

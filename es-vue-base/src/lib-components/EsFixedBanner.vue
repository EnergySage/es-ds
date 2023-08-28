<template>
    <div>
        <div
            v-html="`<script>
function getCookieValue(cookieName) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === cookieName) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}
try {
    const userPrefsCookie = JSON.parse(getCookieValue('userPreferences'));
    const bannerShouldBeHidden = userPrefsCookie['${bannerShouldBeHiddenUserPrefsAttributeName}'];
    if (bannerShouldBeHidden) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('.EsFixedBanner { display: none !important }');
    }
} catch (e) {
    if (e instanceof SyntaxError) {
        // ignore invalid/nonexistent JSON
    } else {
        throw e;
    }
}
</script>`" />
        <div
            id="singleEsFixedBanner"
            ref="banner"
            class="fixed-bottom bg-white EsFixedBanner">
            CTA text will go here
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: 'EsFixedBanner',
    props: {
        bannerShouldBeHiddenUserPrefsAttributeName: {
            type: String,
            required: true,
        },
    },
};
</script>

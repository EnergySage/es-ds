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
            <div
                role="button"
                aria-label="Close banner"
                tabindex="0"
                class="DismissButton"
                @click="dismiss"
                @keyup="dismiss">
                <icon-x />
            </div>
        </div>
    </div>
</template>

<script lang="js">
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

function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

export default {
    name: 'EsFixedBanner',
    props: {
        bannerShouldBeHiddenUserPrefsAttributeName: {
            type: String,
            required: true,
        },
    },
    methods: {
        dismiss() {
            this.$refs.banner.classList.add('d-none');
        },
    },
};
</script>

<style lang="scss" scoped>
.EsFixedBanner .DismissButton {
    cursor: pointer;
}
</style>

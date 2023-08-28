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
const bannerShouldBeHidden = getCookieValue('${bannerShouldBeHiddenCookieName}');
if (bannerShouldBeHidden) {
    const style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('.EsFixedBanner { display: none !important }');
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
function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}

export default {
    name: 'EsFixedBanner',
    props: {
        bannerShouldBeHiddenCookieName: {
            type: String,
            required: true,
        },
    },
    methods: {
        dismiss() {
            this.$refs.banner.classList.add('d-none');
            setCookie(this.bannerShouldBeHiddenCookieName, 1, 30);
        },
    },
};
</script>

<style lang="scss" scoped>
.EsFixedBanner .DismissButton {
    cursor: pointer;
}
</style>

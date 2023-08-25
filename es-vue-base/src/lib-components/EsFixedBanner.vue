<template>
    <div>
        <div
            id="singleEsFixedBanner"
            ref="banner"
            class="fixed-bottom bg-white"
            :class="{'d-none': bannerShouldBeHidden }">
            CTA text will go here
        </div>
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
console.log('howwdy');
const bannerShouldBeHidden = getCookieValue('bannerShouldBeHidden');
if (bannerShouldBeHidden) {
    const banner = document.getElementById('singleEsFixedBanner');
    console.log(banner.classList);
    banner.classList.add('d-none');
    console.log(banner.classList);
}
</script>`" />
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

export default {
    name: 'EsFixedBanner',
    data() {
        const bannerShouldBeHidden = typeof document !== 'undefined' && !!getCookieValue('bannerShouldBeHidden');
        return {
            bannerShouldBeHidden,
        };
    },
};
</script>

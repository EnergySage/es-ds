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
const bannerShouldBeHidden = getCookieValue('bannerShouldBeHidden');
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
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: 'EsFixedBanner',
};
</script>

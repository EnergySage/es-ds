<template>
    <div>
        <div
            id="singleEsFixedBanner"
            class="fixed-bottom bg-white d-none"
            ref="banner">
            CTA text will go here
        </div>
        <div
v-html="`<script>function getCookieValue(cookieName) {
const cookies = document.cookie.split('; ');
for (let i = 0; i < cookies.length; i++) {
const cookie = cookies[i].split('=');
if (cookie[0] === cookieName) {
return decodeURIComponent(cookie[1]);
}
}
return null;
}
console.log('howdy');
const bannerShouldBeHidden = getCookieValue('esFixedBannerShouldBeHidden');
if (!bannerShouldBeHidden) {
const banner = document.getElementById('singleEsFixedBanner');
banner.classList.remove('d-none');
}</script>`">
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: 'EsFixedBanner',
};
</script>

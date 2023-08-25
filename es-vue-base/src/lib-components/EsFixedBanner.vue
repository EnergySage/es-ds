<template>
    <div
        id="singleEsFixedBanner"
        ref="fixedBanner"
        class="fixed-bottom bg-white"
        :class="{'d-none': bannerShouldBeHidden}">
        CTA text will go here
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
        return {
            bannerShouldBeHidden: false,
        };
    },
    mounted() {
        const cookieValue = getCookieValue('bannerShouldBeHidden');
        this.bannerShouldBeHidden = !!cookieValue;
    },
};
</script>

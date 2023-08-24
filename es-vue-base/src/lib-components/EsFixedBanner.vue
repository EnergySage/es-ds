<template>
    <div>
        <div
            id="singleEsFixedBanner"
            class="fixed-bottom bg-white d-none">
            howdyy
        </div>
        <component is="script">
            const banner = document.getElementById('singleEsFixedBanner');
            console.log(banner);
            banner.classList.remove('d-none');
        </component>
    </div>
</template>

<script lang="js">
export default {
    name: 'EsFixedBanner',
};
</script>

<template>
    <div class="my-5 container">
        <div class="mb-5 mx-auto col-md-7 text-center">
            <slot name="errorType" />
            <slot name="errorMsg" />
        </div>

        <div class="row">
            <a
                :class="linkClass"
                :style="linkStyle"
                href="mailto:hello@energysage.com">
                <div class="circle mb-2">
                    <div
                        class="m-3 text-orange">
                        <IconContactUs
                            :width="iconFill"
                            :height="iconFill" />
                    </div>
                </div>

                <p :class="linkTextClass">Contact Us</p>
            </a>
            <a
                :class="linkClass"
                :style="linkStyle"
                href="https://www.energysage.com/solar/">
                <div class="circle mb-2">
                    <div
                        class="m-3 text-orange">
                        <IconCommunitySolar
                            :width="iconFill"
                            :height="iconFill" />
                    </div>
                </div>
                <p :class="linkTextClass">Learn About Solar</p>
            </a>
            <a
                :class="linkClass"
                :style="linkStyle"
                href="https://news.energysage.com/">
                <div class="circle mb-2">
                    <div
                        class="m-3 text-orange">
                        <IconInfoBlogPost
                            :width="iconFill"
                            :height="iconFill" />
                    </div>
                </div>
                <p :class="linkTextClass">Informative Blog Posts</p>

            </a>
            <a
                :class="linkClass"
                :style="linkStyle"
                href="https://www.energysage.com/market-intro/">
                <div class="circle mb-2">
                    <div
                        class="m-3 text-orange">
                        <IconMarketplace
                            :width="iconFill"
                            :height="iconFill" />
                    </div>
                </div>
                <p :class="linkTextClass">EnergySage Marketplace</p>
            </a>
        </div>
    </div>
</template>

<script lang="js">

export default {
    name: 'EsErrorPage',
    data() {
        return {
            linkClass: 'col-6 col-md-3 text-center',
            linkTextClass: 'font-weight-bolder mb-4 mb-md-0',
            linkStyle: 'display:flex; align-items: center; flex-direction:column',
            iconFill: '100%',
        };
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.circle {
    align-items: center;
    background-color: $gray-100;
    border-radius: 100%;
    display:flex;
    height:72px;
    justify-content: center;
    width:72px;
}
</style>

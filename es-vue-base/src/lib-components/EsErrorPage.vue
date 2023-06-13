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
                    <IconContactUs
                        :width="width"
                        :height="height" />
                </div>

                <p :class="linkTextClass">Contact Us</p>
            </a>
            <a
                :class="linkClass"
                :style="linkStyle"
                href="https://www.energysage.com/solar/">
                <div class="circle mb-2">
                    <IconLearnSolar
                        :width="width"
                        :height="height" />
                </div>
                <p :class="linkTextClass">Learn About Solar</p>
            </a>
            <a
                :class="linkClass"
                :style="linkStyle"
                href="https://news.energysage.com/">
                <div class="circle mb-2">
                    <IconInfoBlogPost
                        :width="width"
                        :height="height" />
                </div>
                <p :class="linkTextClass">Informative Blog Posts</p>

            </a>
            <a
                :class="linkClass"
                :style="linkStyle"
                href="https://www.energysage.com/market-intro/">
                <div class="circle mb-2">
                    <IconMarketplace
                        :width="width"
                        :height="height" />
                </div>
                <p :class="linkTextClass">EnergySage Marketplace</p>
            </a>
        </div>
    </div>
</template>

<script lang="js">

export default {
    name: 'EsErrorPage',
    props: {
        /**
         * Icon Width
         */
        width: {
            type: String,
            default: '46px',
            required: false,
        },
        /**
         * Icon Height
         */
        height: {
            type: String,
            default: '46px',
            required: false,
        },
    },
    data() {
        return {
            linkClass: 'col-6 col-md-3 text-center',
            linkTextClass: 'font-weight-bolder mb-4 mb-md-0',
            linkStyle: 'display:flex; align-items: center; flex-direction:column',
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

<template>
    <div class="container my-5">
        <div class="mb-5 mx-auto col-md-7 text-center">
            <slot name="errorType" />
            <slot name="errorMsg" />
        </div>

        <div class="row">
            <a
                :class="linkClass"
                href="mailto:hello@energysage.com">
                <IconCommunitySolar
                    class="mb-2"
                    :width="width"
                    :height="height" />
                <p :class="linkTextClass">Contact Us</p>
            </a>
            <a
                :class="linkClass"
                href="https://www.energysage.com/solar/">
                <IconCommunitySolar
                    class="mb-2"
                    :width="width"
                    :height="height" />
                <p :class="linkTextClass">Learn About Solar</p>
            </a>
            <a
                :class="linkClass"
                href="https://news.energysage.com/">
                <IconCommunitySolar
                    class="mb-2"
                    :width="width"
                    :height="height" />
                <p :class="linkTextClass">Informative Blog Posts</p>
            </a>
            <a
                :class="linkClass"
                href="https://www.energysage.com/market-intro/">
                <IconCommunitySolar
                    class="mb-2"
                    :width="width"
                    :height="height" />
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
            default: '72px',
            required: false,
        },
        /**
         * Icon Height
         */
        height: {
            type: String,
            default: '72px',
            required: false,
        },
    },
    data() {
        return {
            linkClass: 'col-6 col-md-3 text-center',
            linkTextClass: 'font-weight-bolder mb-4 mb-md-0',
        };
    },
};
</script>

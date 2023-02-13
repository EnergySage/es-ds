<template>
    <div>
        <div class="mb-3">
            <h1>
                Popover
            </h1>
            <p>
                Extended from <b-link href="https://bootstrap-vue.org/docs/components/popover">
                    bootstrap-vue popover
                </b-link>
            </p>
            <p>
                The default trigger prop is <code>focus</code>.
                When using the default please ensure you use a <code>href</code> not a <code>button</code>.
                See <b-link
                    target="_blank"
                    href="https://bootstrap-vue.org/docs/components/popover#caveats-with-focus-trigger-on-button-elements">
                    bootstrap-vue documentation
                </b-link>
                for more details.
            </p>
            <div class="my-5">
                <h2>
                    Dark Variant
                </h2>
                <div>
                    <!-- eslint-disable vuejs-accessibility/label-has-for -->
                    <label>
                        With Title
                        <b-link
                            id="darkTitleTarget"
                            class="p-0 text-gray-700"
                            tabindex="0">
                            <IconInfo
                                width="16px"
                                height="16px" />
                        </b-link>
                    </label>
                    <EsPopover
                        target="darkTitleTarget"
                        variant="dark">
                        <template #title>
                            My Title
                        </template>
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-2 d-block"
                                href="https://communitysolar.energysage.com/"
                                target="_blank">Learn More</a>
                        </p>
                    </EsPopover>
                </div>
                <div>
                    <label>
                        No Title
                        <b-link
                            id="darkNoTitleTarget"
                            class="p-0 text-gray-700"
                            tabindex="0">
                            <IconInfo
                                width="16px"
                                height="16px" />
                        </b-link>
                    </label>
                    <EsPopover
                        target="darkNoTitleTarget"
                        variant="dark">
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-2 d-block"
                                href="https://communitysolar.energysage.com/"
                                target="_blank">Learn More</a>
                        </p>
                    </EsPopover>
                </div>
            </div>
            <div>
                <h2>
                    Light Variant
                </h2>
                <p>
                    This popover is only to be used in a wizard like userflow. If you have long content on a page;
                    outside of a wizard, we recommend that you utilize a drawer instead.
                </p>
                <div>
                    <!-- eslint-disable vuejs-accessibility/label-has-for -->
                    <label>
                        With Title
                        <b-link
                            id="lightTitleTarget"
                            class="p-0 text-gray-700"
                            tabindex="0">
                            <IconInfo
                                width="16px"
                                height="16px" />
                        </b-link>
                    </label>
                    <EsPopover
                        target="lightTitleTarget"
                        variant="light">
                        <template #title>
                            My Title
                        </template>
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-2 d-block"
                                href="https://communitysolar.energysage.com/"
                                target="_blank">Learn More</a>
                        </p>
                    </EsPopover>
                </div>
                <div>
                    <label>
                        No Title
                        <b-link
                            id="lightNoTitleTarget"
                            class="p-0 text-gray-700"
                            tabindex="0">
                            <IconInfo
                                width="16px"
                                height="16px" />
                        </b-link>
                    </label>
                    <EsPopover
                        target="lightNoTitleTarget"
                        variant="light">
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-2 d-block"
                                href="https://communitysolar.energysage.com/"
                                target="_blank">Learn More</a>
                        </p>
                    </EsPopover>
                </div>
            </div>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsPopover.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-popover.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsPopoverDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-popover.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsPopover.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

// TODO: Remove when gray scale is added to es-bs-base
.text-gray-700 {
    color: $gray-700;
}
</style>

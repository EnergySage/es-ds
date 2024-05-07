<template>
    <div>
        <div class="mb-100">
            <h1>
                Popover
            </h1>
            <p>
                Extended from <b-link
                    href="https://bootstrap-vue.org/docs/components/popover"
                    target="_blank">
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
            <div class="my-450">
                <h2>
                    Dark variant
                </h2>
                <div
                    v-for="placement in directives"
                    :key="`dark-${placement.directive}`"
                    class="py-100">
                    <h3>
                        {{ placement.text }}
                    </h3>
                    <div>
                        <!-- eslint-disable vuejs-accessibility/label-has-for -->
                        <label>
                            With title
                            <b-link
                                :id="`darkTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    width="16px"
                                    height="16px" />
                            </b-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`darkTitleTarget-${placement.directive}`"
                            variant="dark">
                            <template #title>
                                My title
                            </template>
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                    <div>
                        <label>
                            No title
                            <b-link
                                :id="`darkNoTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    width="16px"
                                    height="16px" />
                            </b-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`darkNoTitleTarget-${placement.directive}`"
                            variant="dark">
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                </div>
            </div>
            <div class="bg-dark-blue p-100 my-450 rounded-lg text-white">
                <h2 class="text-white">
                    Light variant
                </h2>
                <p>
                    This popover is only to be used in a wizard like userflow with a dark background. If you have
                    long content on a page; outside of a wizard, we recommend that you utilize a modal instead.
                </p>
                <div
                    v-for="placement in directives"
                    :key="`light-${placement.directive}`"
                    class="py-100">
                    <h3 class="text-white">
                        {{ placement.text }}
                    </h3>
                    <div>
                        <!-- eslint-disable vuejs-accessibility/label-has-for -->
                        <label>
                            With title
                            <b-link
                                :id="`lightTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    class="text-white"
                                    width="16px"
                                    height="16px" />
                            </b-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`lightTitleTarget-${placement.directive}`"
                            variant="light">
                            <template #title>
                                My title
                            </template>
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                    <div>
                        <label>
                            No title
                            <b-link
                                :id="`lightNoTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    class="text-white"
                                    width="16px"
                                    height="16px" />
                            </b-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`lightNoTitleTarget-${placement.directive}`"
                            variant="light">
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                </div>
            </div>
            <ds-doc-source
                :comp-code="compCode"
                comp-source="es-vue-base/src/lib-components/EsPopover.vue"
                :doc-code="docCode"
                doc-source="es-design-system/pages/molecules/es-popover.vue" />
        </div>
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
    computed: {
        directives() {
            return [
                { directive: 'topright', text: 'Top right' },
                { directive: 'bottomright', text: 'Bottom right' },
                { directive: 'leftbottom', text: 'Left bottom' },
                { directive: 'rightbottom', text: 'Right bottom' },
            ];
        },
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
@use '~@energysage/es-bs-base/scss/variables' as variables;

// TODO: Remove when gray scale is added to es-bs-base
.text-gray-700 {
    color: variables.$gray-700;
}
</style>

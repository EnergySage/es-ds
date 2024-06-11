<template>
    <div>
        <h1>
            Modal
        </h1>
        <p>
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/modal"
                target="_blank">
                bootstrap-vue modal
            </b-link>
        </p>
        <div class="my-500">
            <es-button
                class="mb-100 mb-lg-0 mr-100"
                @click="simpleModalVisible = true">
                Show simple modal
            </es-button>
            <es-button
                class="mb-100 mb-lg-0"
                @click="buttonsModalVisible = true">
                Show modal with buttons
            </es-button>

            <es-modal
                id="simple-modal"
                hide-footer
                :visible="simpleModalVisible"
                size="lg"
                @hidden="simpleModalVisible=false">
                <template #modal-title>
                    Arcadia Reviews
                </template>
                <template #default>
                    <p
                        id="lorem-ipsum"
                        class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus
                        quis turpis commodo tempus. Donec sodales enim in dolor blandit aliquet. Sed ac lectus ipsum.
                        Curabitur et nisi dapibus, ultricies lacus a, congue turpis. Nullam viverra velit nisi, sed
                        eleifend neque condimentum at. Sed a vulputate ligula, sit amet viverra velit. Proin interdum
                        ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.
                        Praesent non gravida leo, quis ultrices mi. Aliquam erat volutpat. Donec sed orci. Quisque
                        felis est, et cursus diam facilisis quis. Integer fermentum mauris ut metus dignissim, sed
                        ligula finibus. Donec non sem tempus nulla lobortis elementum at a sapien. Sed ut elit.
                        dignissim lobortis varius. Duis sollicitudin justo vel augue eleifend interdum. Mauris a ligula
                        lorem pulvinar viverra. Integer arcu erat, bibendum quis est sit amet, volutpat aliquam lacus.
                        volutpat odio vitae lacinia semper. Nulla sit amet iaculis lacus, sit amet tempor nisi. Donec
                        vitae lacus vel aliquam. Maecenas vitae scelerisque elit. Vestibulum ante ipsum in faucibus
                        orci luctus et ultrices posuere cubilia curae; Pellentesque nisi dolor, lobortis eu ut,
                        feugiat quis erat.Orci varius natoque penatibus et magnis dis parturient montes, ridiculus
                        mus. Integer mauris ipsum, suscipit nec lobortis pulvinar, finibus accumsan felis. Nullam
                        consequat auctor. Duis non efficitur ante. Morbi malesuada, nunc non imperdiet, enim
                        lectus dapibus purus, at vestibulum elit tellus id eros. Vestibulum volutpat ex, a faucibus
                        tortor posuere non. Integer in risus in justo efficitur semper. In hac habitasse dictumst.
                        Vestibulum vitae semper turpis.
                    </p>
                </template>
            </es-modal>

            <es-modal
                id="buttons-modal"
                :visible="buttonsModalVisible"
                size="lg"
                @hidden="buttonsModalVisible = false">
                <template #modal-title>
                    Arcadia Reviews
                </template>
                <template #default>
                    <p
                        id="lorem-ipsum"
                        class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus
                        quis turpis commodo tempus. Donec sodales enim in dolor blandit aliquet. Sed ac lectus ipsum.
                        Curabitur et nisi dapibus, ultricies lacus a, congue turpis. Nullam viverra velit nisi, sed
                        eleifend neque condimentum at. Sed a vulputate ligula, sit amet viverra velit. Proin interdum
                        ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos.
                        Praesent non gravida leo, quis ultrices mi. Aliquam erat volutpat. Donec sed orci. Quisque
                        felis est, et cursus diam facilisis quis. Integer fermentum mauris ut metus dignissim, sed
                        ligula finibus. Donec non sem tempus nulla lobortis elementum at a sapien. Sed ut elit.
                        dignissim lobortis varius.
                    </p>
                </template>
                <template #modal-footer>
                    <es-button
                        outline
                        @click="buttonsModalVisible = false">
                        Cancel
                    </es-button>
                    <es-button
                        class="ml-100"
                        @click="buttonsModalVisible = false">
                        Submit
                    </es-button>
                </template>
            </es-modal>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsModal.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-modal.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsModalDocs',
    data() {
        return {
            buttonsModalVisible: false,
            simpleModalVisible: false,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-modal.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsModal.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

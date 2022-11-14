<template>
    <div>
        <h1>
            Modal
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/modal">
                bootstrap-vue modal
            </b-link>
        </p>
        <es-button @click="visible = true">
            Show modal
        </es-button>
        <es-modal
            id="es-modal"
            hide-footer
            :visible="visible"
            size="lg"
            @hidden="visible=false">
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
                    ornare. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    Praesent non gravida leo, quis ultrices mi. Aliquam erat volutpat. Donec sed orci ligula. Quisque
                    felis est, et cursus diam facilisis quis. Integer fermentum mauris ut metus dignissim, sed
                    ligula finibus. Donec non sem tempus nulla lobortis elementum at a sapien. Sed ut suscipit elit.
                    dignissim lobortis varius. Duis sollicitudin justo vel augue eleifend interdum. Mauris a ligula
                    lorem pulvinar viverra. Integer arcu erat, bibendum quis est sit amet, volutpat aliquam lacus.
                    volutpat odio vitae lacinia semper. Nulla sit amet iaculis lacus, sit amet tempor nisi. Donec
                    vitae lacus vel aliquam. Maecenas vitae scelerisque elit. Vestibulum ante ipsum primis in faucibus
                    orci luctus et ultrices posuere cubilia curae; Pellentesque nisi dolor, lobortis eu porttitor ut,
                    feugiat quis erat.Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                    mus. Integer mauris ipsum, suscipit nec lobortis pulvinar, finibus accumsan felis. Nullam tristique
                    consequat auctor. Duis non efficitur ante. Morbi malesuada, nunc non imperdiet sollicitudin, enim
                    lectus dapibus purus, at vestibulum elit tellus id eros. Vestibulum volutpat ex mauris, a faucibus
                    tortor posuere non. Integer in risus in justo efficitur semper. In hac habitasse platea dictumst.
                    Vestibulum vitae semper turpis.
                </p>
            </template>
        </es-modal>
    </div>
</template>
<script>
import { EsModal, EsButton } from '@energysage/es-vue-base';

export default {
    name: 'EsModalDocs',
    components: {
        EsModal, EsButton,
    },
    data() {
        return {
            visible: false,
        };
    },
};
</script>

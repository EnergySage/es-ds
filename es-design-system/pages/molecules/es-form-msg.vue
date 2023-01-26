<template>
    <div>
        <h1>
            Form Message
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/alert">
                bootstrap-vue alert
            </b-link>
        </p>
        <es-button @click="fakeFormMsg()">
            Show Success
        </es-button>
        <es-button @click="fakeFormMsg(false)">
            Show Success
        </es-button>
        <es-form-msg
            class="my-5"
            :variant="formMsgVariant"
            :message="formMsg"
            @hidden="formMsg = ''" />
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormMsg.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-msg.vue" />
    </div>
</template>
<script>
import { EsFormMsg, EsButton, formMixins } from '@energysage/es-vue-base';

export default {
    name: 'EsFormMsgDocs',
    components: {
        EsFormMsg,
        EsButton,
    },
    mixins: [formMixins],
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-form-msg.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsFormMsg.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        fakeFormMsg(success = true) {
            if (success) {
                this.showFormSuccess();
            } else {
                this.showFormError();
            }
        },
    },
};
</script>

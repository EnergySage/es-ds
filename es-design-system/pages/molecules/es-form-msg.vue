<template>
    <div :key="link">
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
            Show Error
        </es-button>
        <es-button @click="showLink('https://www.energysage.com/')">
            Show Link
        </es-button>
        <es-form-msg
            class="my-450"
            :variant="formMsgVariant"
            :message="formMsg"
            @hidden="formMsg = ''" />
        <es-form-msg
            variant="success"
            name="slotContent"
            class="my-450"
            @hidden="link = ''">
            <a
                v-if="link"
                :href="link">{{ link }}</a>
        </es-form-msg>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormMsg.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-msg.vue" />
    </div>
</template>
<script>
import { formMixins } from '@energysage/es-vue-base';

export default {
    name: 'EsFormMsgDocs',
    mixins: [formMixins],
    data() {
        return {
            compCode: '',
            docCode: '',
            link: '',
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
        showLink(link) {
            this.link = link;
            this.formMsg = '';
        },
    },
};
</script>

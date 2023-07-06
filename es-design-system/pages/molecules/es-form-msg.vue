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

        <es-button @click="showSuccess = true" >Show Success</es-button>
        <es-button @click="showError = true">Show Error</es-button>
        <es-button @click="showInfo = true">Show Info</es-button>

        <es-form-msg class="my-450" @hidden="showSuccess = false" :show="showSuccess" :variant="'success'" >Saved Successfully</es-form-msg>
        <es-form-msg class="my-450" @hidden="showError = false" :show="showError" :variant="'danger'">The server responded with an error and we were unable to complete your request. Please try again</es-form-msg>
        <es-form-msg class="my-450" @hidden="showInfo = false" :show="showInfo" :variant="'primary'">Need Expert Advice? &nbsp;<a href="https://www.energysage.com/"> Schedule a free call with our Energy Advisor Team!</a></es-form-msg>


        <ds-doc-source :comp-code="compCode" comp-source="es-vue-base/src/lib-components/EsFormMsg.vue" :doc-code="docCode"
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
            showSuccess: false,
            showError: false,
            showInfo: false,
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

};
</script>

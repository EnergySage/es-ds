<template>
    <div>
        <h1>
            Form message
        </h1>
        <p>
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/alert"
                target="_blank">
                bootstrap-vue alert
            </b-link>
        </p>

        <es-button
            @click="showSuccess = true">
            Show success
        </es-button>
        <es-button
            @click="showError = true">
            Show error
        </es-button>
        <es-button
            @click="showInfo = true">
            Show info
        </es-button>

        <es-form-msg
            class="my-450 form-msg-border"
            :show="showSuccess"
            variant="success"
            @hidden="showSuccess = false">
            Saved successfully
        </es-form-msg>
        <es-form-msg
            class="my-450 form-msg-border"
            :show="showError"
            variant="danger"
            @hidden="showError = false">
            The server responded with an error
            and we were unable to complete your request. Please try again
        </es-form-msg>
        <es-form-msg
            class="my-450 form-msg-border"
            :show="showInfo"
            variant="primary"
            @hidden="showInfo = false">
            Need expert advice? &nbsp;<a href="https://www.energysage.com/"> Schedule a free call with our Energy Advisor team!</a>
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

<style lang="scss" scoped>
@use '~@energysage/es-bs-base/scss/variables' as variables;

.form-msg-border{
    background-color: variables.$white;
    border: 1px solid variables.$gray-300;
    border-radius: 8px;
}

</style>

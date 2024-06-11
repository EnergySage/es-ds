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

        <div class="my-500">
            <h2>
                Simple
            </h2>

            <es-button
                class="mb-100 mb-sm-0 mr-100"
                @click="showSimpleSuccess = true">
                Show success
            </es-button>
            <es-button
                class="mb-100 mb-sm-0 mr-100"
                @click="showSimpleError = true">
                Show error
            </es-button>
            <es-button
                class="mb-100 mb-sm-0"
                @click="showSimpleInfo = true">
                Show info
            </es-button>

            <es-form-msg
                class="my-100"
                :show="showSimpleSuccess"
                variant="success"
                @hidden="showSimpleSuccess = false">
                <div class="align-items-center d-flex">
                    Saved successfully!
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showSimpleError"
                variant="danger"
                @hidden="showSimpleError = false">
                <div class="align-items-center d-flex">
                    The server responded with an error and we were unable to complete your request.
                    Please try again.
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showSimpleInfo"
                variant="primary"
                @hidden="showSimpleInfo = false">
                <div class="align-items-center d-flex">
                    <p class="mb-0">
                        Need expert advice? &nbsp;
                        <a href="https://www.energysage.com/">
                            Schedule a free call with our Energy Advisor team!
                        </a>
                    </p>
                </div>
            </es-form-msg>
        </div>

        <div class="my-500">
            <h2>
                With header and body
            </h2>

            <es-button
                class="mb-100 mb-sm-0  mr-100"
                @click="showHeaderSuccess = true">
                Show success
            </es-button>
            <es-button
                class="mb-100 mb-sm-0  mr-100"
                @click="showHeaderError = true">
                Show error
            </es-button>
            <es-button
                class="mb-100 mb-sm-0 "
                @click="showHeaderInfo = true">
                Show info
            </es-button>

            <es-form-msg
                class="my-100"
                :show="showHeaderSuccess"
                variant="success"
                @hidden="showHeaderSuccess = false">
                <div>
                    <h2 class="h4 mb-50">
                        bill.png
                    </h2>
                    <p class="mb-0">
                        Upload successful!
                    </p>
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showHeaderError"
                variant="danger"
                @hidden="showHeaderError = false">
                <div>
                    <h2 class="h4 mb-50">
                        bill.webp
                    </h2>
                    <p class="mb-0">
                        Upload failed: incorrect file type.
                    </p>
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showHeaderInfo"
                variant="primary"
                @hidden="showHeaderInfo = false">
                <div>
                    <h2 class="h4 mb-50">
                        bill.png
                    </h2>
                    <p class="mb-0">
                        This file is now available for preview.
                    </p>
                </div>
            </es-form-msg>
        </div>

        <es-collapse
            id="legacy-collapse"
            v-model="legacyCollapseVisible"
            :is-programmatic-until-user-input="false">
            <template #title>
                <h2 class="mb-0">
                    Legacy variants
                </h2>
            </template>
            <p>
                These legacy variants have all been updated to match the new background and border colors.
            </p>

            <b-alert
                show
                variant="primary">
                Here is a primary alert
            </b-alert>
            <b-alert
                show
                variant="secondary">
                Here is a secondary alert
            </b-alert>
            <b-alert
                show
                variant="success">
                Here is a success alert
            </b-alert>
            <b-alert
                show
                variant="danger">
                Here is a danger alert
            </b-alert>
            <b-alert
                show
                variant="warning">
                Here is a warning alert
            </b-alert>
            <b-alert
                show
                variant="info">
                Here is an info alert
            </b-alert>
            <b-alert
                show
                variant="light">
                Here is a light alert
            </b-alert>
            <b-alert
                show
                variant="dark">
                Here is a dark alert
            </b-alert>
        </es-collapse>

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
            legacyCollapseVisible: false,
            showHeaderError: false,
            showHeaderInfo: false,
            showHeaderSuccess: false,
            showSimpleError: false,
            showSimpleInfo: false,
            showSimpleSuccess: false,
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

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
            class="mt-3"
            :variant="formMsgVariant"
            :message="formMsg"
            @hidden="formMsg = ''" />
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

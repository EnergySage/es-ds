<template>
    <b-form
        novalidate
        @submit.prevent="submitLogin">
        <h1>
            Verification Code
        </h1>
        <es-verification-code
            v-model="code"
            @valid-code="isValid = $event" />
        <b-row class="mt-4 align-items-center">
            <b-col
                class="mb-3 mb-lg-0"
                cols="6"
                lg="4">
                <dl class="row">
                    <dd class="col-3">
                        Code:
                    </dd>
                    <dt class="col-9">
                        {{ code }}
                    </dt>
                    <dd class="col-3">
                        Valid:
                    </dd>
                    <dt class="col-9">
                        {{ isValid }}
                    </dt>
                </dl>
            </b-col>
            <b-col
                class="text-right"
                cols="12"
                lg="4">
                <es-button @click="code = randomCode()">
                    random code
                </es-button>
                <es-button
                    outline
                    @click="code = ''">
                    clear code
                </es-button>
            </b-col>
        </b-row>
    </b-form>
</template>
<script>
import { EsVerificationCode, EsButton } from '@energysage/es-vue-base';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsButton,
        EsVerificationCode,
    },
    data() {
        return {
            code: '',
            isValid: false,
        };
    },
    methods: {
        randomCode() {
            return `${Math.random()}`.substring(2, 7);
        },
    },
};
</script>

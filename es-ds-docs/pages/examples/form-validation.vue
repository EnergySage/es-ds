<script setup lang="ts">
const state = reactive({
    form: {
        name: '',
    }
});
const rules = {};

const { showFormError, formShowError } = useEsForms(rules, state);

const asyncTimeout = async (seconds = 3) => {
    const millisecondTimeout = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondTimeout);
    });
}

const fakeServerRequest = async () => {
    await asyncTimeout();
    showFormError();
}

const onSubmit = async () => {
    this.startSubmit(); // This method via forms composable, will set submitInProgress to true
    await this.fakeServerRequest();
    this.stopSubmit(); // This method via forms composable, will set submitInProgress to false
}
</script>

<template>
    <h1>howdy</h1>
<!--    <b-container>-->
<!--        <b-row>-->
<!--            <b-col>-->
<!--                <h1>-->
<!--                    Form with server error-->
<!--                </h1>-->
<!--                <p>-->
<!--                    See-->
<!--                    <b-link to="/examples/form-field-validation">-->
<!--                        Form with client-side validation-->
<!--                    </b-link> for example of individual field validation-->
<!--                </p>-->
<!--                <h2>-->
<!--                    UX Guidelines-->
<!--                </h2>-->
<!--                <p>-->
<!--                    <ul>-->
<!--                        <li>-->
<!--                            Show loading spinner on button during server request-->
<!--                        </li>-->
<!--                        <li>-->
<!--                            Use <b-link to="/molecules/es-form-msg">-->
<!--                                Form message-->
<!--                            </b-link>-->
<!--                            to display server-side errors-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </p>-->
<!--            </b-col>-->
<!--        </b-row>-->
<!--        <b-row class="border-top pt-200 my-50">-->
<!--            <b-col-->
<!--                cols="12"-->
<!--                lg="8">-->
<!--                <b-form @submit.stop.prevent="onSubmit">-->
<!--                    <es-form-msg-->
<!--                        class="mt-100"-->
<!--                        :show="formShowError"-->
<!--                        :variant="formMsgVariant"-->
<!--                        @hidden="formShowError=false">-->
<!--                        The server responded with an error and-->
<!--                        we were unable to complete your request. Please try again-->
<!--                    </es-form-msg>-->
<!--                    <es-form-input-->
<!--                        id="form-input-name"-->
<!--                        v-model="form.name"-->
<!--                        :disabled="isSubmitInProgress"-->
<!--                        required>-->
<!--                        <template #label>-->
<!--                            Name-->
<!--                        </template>-->
<!--                    </es-form-input>-->
<!--                    <div class="d-flex flex-grow-1 justify-content-end mt-200">-->
<!--                        <es-button-->
<!--                            type="submit"-->
<!--                            class="w-100 w-lg-auto"-->
<!--                            :disabled="isSubmitInProgress">-->
<!--                            <span class="w-100">-->
<!--                                <span-->
<!--                                    v-if="isSubmitInProgress">-->
<!--                                    <b-spinner-->
<!--                                        role="status"-->
<!--                                        label="Loading" />-->
<!--                                </span>-->
<!--                                <span-->
<!--                                    :class="{'sr-only': isSubmitInProgress }">-->
<!--                                    Submit-->
<!--                                </span>-->
<!--                            </span>-->
<!--                        </es-button>-->
<!--                    </div>-->
<!--                </b-form>-->
<!--            </b-col>-->
<!--        </b-row>-->
<!--    </b-container>-->
</template>

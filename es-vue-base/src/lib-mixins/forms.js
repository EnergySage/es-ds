import { validationMixin } from 'vuelidate';

export default {
    mixins: [validationMixin],
    data() {
        return {
            submitInProgress: false,
            formMsg: '',
            formMsgVariant: 'danger',
        };
    },
    computed: {
        isSubmitInProgress() {
            return this.submitInProgress;
        },
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        // eslint-disable-next-line max-len
        showFormError(text = 'The server responded with an error and we were unable to complete your request. Please try again') {
            this.formMsgVariant = 'danger';
            this.formMsg = text;
        },
        showFormSuccess(text = 'Saved Successfully') {
            this.formMsgVariant = 'success';
            this.formMsg = text;
        },
        startSubmit() {
            this.formMsg = '';
            this.submitInProgress = true;
        },
        stopSubmit() {
            this.submitInProgress = false;
        },
    },
};

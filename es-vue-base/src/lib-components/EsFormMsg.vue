<template>
    <b-alert
        v-if="message"
        :show="dismissCountDown"
        :variant="variant"
        dismissible
        class="form-msg"
        fade
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged">
        <div class="d-flex">
            <div class="pr-2">
                <IconCircleAlert v-if="variant === 'danger'" />
                <IconCircleCheck v-if="variant === 'success'" />
            </div>
            {{ message }}
        </div>
    </b-alert>
</template>
<script>
import {
    BAlert,
} from 'bootstrap-vue';
import IconCircleAlert from '@/src/lib-icons/circle-alert.vue';
import IconCircleCheck from '@/src/lib-icons/circle-check.vue';

export default {
    name: 'EsFormMsg',
    components: {
        BAlert,
        IconCircleAlert,
        IconCircleCheck,
    },
    props: {
        message: {
            type: String,
            default: '',
            required: false,
        },
        timeout: {
            type: Number,
            default: 5,
            required: false,
        },
        variant: {
            type: String,
            default: 'danger',
            required: false,
            validator: (val) => ['danger', 'success'].includes(val),
        },
    },
    data() {
        return {
            dismissCountDown: this.timeout,
        };
    },
    watch: {
        message() {
            this.dismissCountDown = this.timeout;
        },
    },
    methods: {
        countDownChanged(currentCountDown) {
            this.dismissCountDown = currentCountDown;
            if (currentCountDown === 0) {
                this.$emit('hidden');
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.form-msg {
  flex: 0 0 100%;
  padding-right: 2.5rem;
}
</style>

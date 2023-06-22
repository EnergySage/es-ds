<template>
    <b-alert
        v-if="message || hasSlot"
        :show="dismissCountDown"
        :variant="variant"
        dismissible
        class="form-msg"
        fade
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged">
        <div class="d-flex">
            <div class="pr-50">
                <IconCircleAlert v-if="variant === 'danger'" />
                <IconCircleCheck v-if="variant === 'success'" />
            </div>
            <template v-if="!hasSlot">
                {{ message }}
            </template>
            <template name="slotContent">
                <slot />
            </template>
        </div>
    </b-alert>
</template>
<script>
import {
    BAlert,
} from 'bootstrap-vue';
import IconCircleAlert from '../lib-icons/icon-circle-alert.vue';
import IconCircleCheck from '../lib-icons/icon-circle-check.vue';

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
            default: 20,
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
    computed: {
        hasSlot() {
            return !!this.$slots.default?.[0];
        },
    },
    watch: {
        message() {
            this.resetCountdown();
        },
    },
    methods: {
        countDownChanged(currentCountDown) {
            this.dismissCountDown = currentCountDown;
            if (currentCountDown === 0) {
                this.$emit('hidden');
            }
        },
        resetCountdown() {
            this.dismissCountDown = this.timeout;
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

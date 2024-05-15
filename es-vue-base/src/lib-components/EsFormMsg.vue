<template>
    <b-alert
        class="es-form-msg"
        dismissible
        fade
        :show="dismissCountDown"
        :variant="variant"
        @dismiss-count-down="countDownChanged"
        @dismissed="dismissAlert">
        <template #dismiss>
            <icon-x />
        </template>
        <div class="d-flex pr-100">
            <div
                class="icon-wrapper flex-shrink-0 mr-100"
                :class="`icon-color-${variant}`">
                <icon-circle-alert v-if="variant === 'danger'" />
                <icon-circle-check v-if="variant === 'success'" />
                <icon-info v-if="variant === 'primary'" />
            </div>
            <slot />
        </div>
    </b-alert>
</template>

<script>
import {
    BAlert,
} from 'bootstrap-vue';
import IconCircleAlert from '../lib-icons/icon-circle-alert.vue';
import IconCircleCheck from '../lib-icons/icon-circle-check.vue';
import IconInfo from '../lib-icons/icon-info.vue';
import IconX from '../lib-icons/icon-x.vue';

export default {
    name: 'EsFormMsg',
    components: {
        BAlert,
        IconCircleAlert,
        IconCircleCheck,
        IconInfo,
        IconX,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
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
            validator: (val) => ['danger', 'success', 'primary'].includes(val),
        },
    },
    data() {
        return {
            dismissCountDown: this.show ? this.timeout : 0,
        };
    },
    watch: {
        show() {
            if (this.show) {
                this.dismissCountDown = this.timeout;
            }
        },
    },
    methods: {
        countDownChanged(currentCountDown) {
            this.dismissCountDown = currentCountDown;
            if (currentCountDown === 0) {
                this.dismissAlert();
            }
        },
        dismissAlert() {
            this.dismissCountDown = 0;
            this.$emit('hidden');
        },
    },
};
</script>

<style lang="scss" scoped>
.form-msg {
    flex: 0 0 100%;
    padding-right: 2.5rem;
}
</style>

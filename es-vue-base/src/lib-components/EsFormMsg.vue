<template>
    <b-alert
    :show="dismissCountDown "  fade  dismissible  :variant="variant" @dismissed="dismissAlert"
    @dismiss-count-down="countDownChanged">
        <div class="d-flex">
            <div class="pr-50">
                <IconCircleAlert v-if="variant === 'danger'" />
                <IconCircleCheck v-if="variant === 'success'" />
                <IconInfo v-if="variant === 'primary'" />
            </div>
            <slot/>
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

export default {
    name: 'EsFormMsg',
    components: {
        BAlert,
        IconCircleAlert,
        IconCircleCheck,
        IconInfo,
    },
    props: {

        show: {
            type: Boolean,
            default: false,
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
            validator: (val) => ['danger', 'success', 'primary'].includes(val),
        },
    },
    data() {
        return {
            dismissCountDown: this.show ? this.timeout : 0,
            // isClicked : false,
            // counter: 3
            // showvar:false,
            // sec:1000
        };
    },
    watch: {
        show() {
            if (this.show) {
                this.dismissCountDown = this.timeout;
            }
        }
      
    },
    methods: {
        // handleAlertClick() {
        //     if (this.counter === 0) {
        //         this.isClicked = false;
        //     } else {
        //         this.counter--;
        //     }
        // },

        // resetAlert()  {
        //     this.isClicked = false;
        //     this.counter = 3;
        // }

        // test: function() {
        // console.log("hi")
        // let self = this;
        // self.showvar=true
        // setTimeout(function(){ self.showvar=false; }, self.sec);
    // },
        countDownChanged(currentCountDown) {
            this.dismissCountDown = currentCountDown;
            if (currentCountDown === 0) {
                this.dismissAlert();
            }
        },
        resetCountdown() {
           this.dismissCountDown = this.timeout;
            
        },
        dismissAlert() {
            this.dismissCountDown = 0;
            this.$emit('hidden');
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

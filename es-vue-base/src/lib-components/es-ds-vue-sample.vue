<script>

export default /* #__PURE__ */{
    name: 'EsDsVueSample', // vue component name
    data() {
        return {
            counter: 5,
            initCounter: 5,
            message: {
                action: null,
                amount: null,
            },
        };
    },
    computed: {
        changedBy() {
            const { message } = this;
            if (!message.action) return 'initialized';
            return `${message.action} ${message.amount || ''}`.trim();
        },
    },
    methods: {
        increment(arg) {
            const amount = (typeof arg !== 'number') ? 1 : arg;
            this.counter += amount;
            this.message.action = 'incremented by';
            this.message.amount = amount;
        },
        decrement(arg) {
            const amount = (typeof arg !== 'number') ? 1 : arg;
            this.counter -= amount;
            this.message.action = 'decremented by';
            this.message.amount = amount;
        },
        reset() {
            this.counter = this.initCounter;
            this.message.action = 'reset';
            this.message.amount = null;
        },
    },
};
</script>

<template>
    <div class="es-ds-vue-sample">
        <p>
            The counter was {{ changedBy }} to <b>{{ counter }}</b>.
        </p>
        <button @click="increment">
            Click +1
        </button>
        <button @click="decrement">
            Click -1
        </button>
        <button @click="increment(5)">
            Click +5
        </button>
        <button @click="decrement(5)">
            Click -5
        </button>
        <button @click="reset">
            Reset
        </button>
    </div>
</template>

<style scoped>
  .es-ds-vue-sample {
    background: #eaeaea;
    border: 1px solid #ccc;
    display: block;
    margin: 25px auto;
    padding: 25px;
    text-align: center;
    width: 400px;
  }

  .es-ds-vue-sample p {
    margin: 0 0 1em;
  }
</style>

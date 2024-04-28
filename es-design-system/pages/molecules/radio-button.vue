<template>
    <div>
        <h1>
            Radio button
        </h1>
        <p class="mb-450">
            Uses
            <b-link
                href="https://bootstrap-vue.org/docs/components/form-radio"
                target="_blank">
                bootstrap-vue form radio
            </b-link>
        </p>

        <div class="my-450">
            <h2>
                Inline
            </h2>
            <div>
                <b-form-group
                    v-slot="{ ariaDescribedby }"
                    label="Please choose your favorite fruit.">
                    <b-form-radio-group
                        id="fruit-inline"
                        v-model="fruit"
                        :aria-describedby="ariaDescribedby"
                        name="fruit-inline">
                        <b-form-radio value="apple">
                            Apple
                        </b-form-radio>
                        <b-form-radio value="banana">
                            Banana
                        </b-form-radio>
                        <b-form-radio value="cherry">
                            Cherry
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </div>
        </div>

        <div class="my-450">
            <h2>
                Stacked
            </h2>
            <div>
                <b-form-group
                    v-slot="{ ariaDescribedby }"
                    label="Please choose your favorite fruit.">
                    <b-form-radio-group
                        id="fruit-stacked"
                        v-model="fruit"
                        :aria-describedby="ariaDescribedby"
                        name="fruit-stacked"
                        stacked>
                        <b-form-radio value="apple">
                            Apple
                        </b-form-radio>
                        <b-form-radio value="banana">
                            Banana
                        </b-form-radio>
                        <b-form-radio value="cherry">
                            Cherry
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </div>
        </div>

        <div class="my-450">
            <h2>
                Disabled
            </h2>
            <div>
                <b-form-group
                    v-slot="{ ariaDescribedby }"
                    label="Please choose your favorite fruit.">
                    <b-form-radio-group
                        id="fruit-disabled"
                        v-model="fruit"
                        :aria-describedby="ariaDescribedby"
                        name="fruit-disabled"
                        stacked>
                        <b-form-radio
                            disabled
                            value="apple">
                            Apple
                        </b-form-radio>
                        <b-form-radio
                            disabled
                            value="banana">
                            Banana
                        </b-form-radio>
                        <b-form-radio
                            disabled
                            value="cherry">
                            Cherry
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RadioButtonDocs',
    data() {
        return {
            docCode: '',
            fruit: 'banana',
        };
    },
};
</script>

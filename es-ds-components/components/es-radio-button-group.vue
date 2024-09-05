<script setup lang="ts">
/*
Similar API to https://bootstrap-vue.org/docs/components/form-radio#component-reference

Only more restrained, and based on historical usage. Things like configurable
value field aren't supported as they weren't used downstream.

Similarly things like size are not implemented
*/

interface IOptions {
    text: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    disabled?: boolean;
}

interface IProps {
    id: string;
    label: string;
    name?: string;
    options?: IOptions[];
    inline?: boolean;
}

withDefaults(defineProps<IProps>(), {
    inline: false,
    name: '',
    options: undefined,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const model = defineModel<any>();
</script>

<template>
    <fieldset
        :id="id"
        class="form-group">
        <legend
            :id="`legend-${id}`"
            class="font-size-100"
            tabindex="-1">
            {{ label }}
        </legend>
        <template v-if="$slots.default">
            <slot />
        </template>
        <template v-else>
            <es-radio-button
                v-for="option in options"
                :key="option.value"
                v-model="model"
                :disabled="option?.disabled || false"
                :display-name="option?.text"
                :group-name="name"
                :inline="inline"
                :value="option.value" />
        </template>
    </fieldset>
</template>

<script setup lang="ts">
/*
Similar API to https://bootstrap-vue.org/docs/components/form-radio#component-reference

Only more restrained, and based on historical usage. Things like configurable
value field aren't supported as they weren't used downstream.

Similarly things like size are not implemented
*/

interface IOptions {
    text: string;
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
})

const model = defineModel();

</script>

<template>
    <fieldset class="form-group" :id="id">
        <legend :id="`legend-${id}`" class="font-size-100" tabindex="-1">{{ label }}</legend>
        <template v-if="$slots.default">
            <slot />
        </template>
        <template v-else>
            <es-radio-button
                v-for="option in options"
                :disabled="option?.disabled || false"
                :displayName="option?.text"
                :groupName="name"
                :inline="inline"
                :value="option.value"
                v-model="model"
            />
        </template>
    </fieldset>
</template>

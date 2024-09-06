<script setup lang="ts">
interface IProps {
    disabled?: boolean;
    displayName: string; // TODO: make this optional if user opts for slot?
    groupName?: string;
    inline?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    displayName: '',
    groupName: '',
    inline: false,
    value: null,
});
</script>

<template>
    <es-radio-button
        class="es-form-radio-card es-card interactive w-100"
        :disabled="props.disabled"
        :display-name="props.displayName"
        :group-name="props.groupName"
        :inline="props.inline"
        :value="props.value" />
</template>

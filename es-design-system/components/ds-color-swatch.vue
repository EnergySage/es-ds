<template>
    <div
        class="font-size-sm px-50 py-200 rounded text-center"
        :class="{
            [`bg-${token}`]: true,
            'border': showBorder,
            'text-white': !isLight,
            'text-dark': isLight
        }">
        <p class="mb-50">
            {{ uppercaseHex }}
        </p>
        <p class="m-0">
            {{ token }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'DsColorSwatch',
    props: {
        hex: {
            type: String,
            required: true,
        },
        isLight: {
            type: Boolean,
            default: false,
        },
        showBorder: {
            type: Boolean,
            default: false,
        },
        token: {
            type: String,
            required: true,
        },
    },
    computed: {
        uppercaseHex() {
            return this.hex.toUpperCase();
        },
    },
};
</script>

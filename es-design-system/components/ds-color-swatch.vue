<template>
    <div
        class="font-size-sm px-2 py-4 rounded text-center"
        :class="{
            [`bg-${token}`]: true,
            'border': showBorder,
            'text-white': !isLight,
            'text-dark': isLight
        }">
        <p class="mb-2">
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

<script setup lang="ts">
defineProps({
    link: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
});

const slots = useSlots();
const hasTitle = computed(() => !!slots.title);
const hasLinkCopy = computed(() => !!slots.linkCopy);
</script>

<template>
    <div class="d-flex support-holder align-items-center">
        <div class="mr-50">
            <a
                target="_blank"
                aria-label="Support"
                :href="link">
                <img
                    class="image"
                    :src="src"
                    alt="EnergySage support" />
            </a>
        </div>
        <div class="d-flex flex-column">
            <div>
                <div class="h5 mb-25 font-size-base font-weight-bold">
                    <slot
                        v-if="hasTitle"
                        name="title" />
                    <template v-else> Need help signing up? </template>
                </div>
            </div>
            <div>
                <a
                    target="_blank"
                    class="font-size-75"
                    :href="link">
                    <slot
                        v-if="hasLinkCopy"
                        name="linkCopy" />
                    <template v-else> Schedule a free call with your EnergySage Advisor. </template>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.support-holder {
    max-width: 325px;

    .image {
        height: 64px;
        width: 64px;
        border-radius: 2rem;
        object-fit: contain;
    }
}
</style>

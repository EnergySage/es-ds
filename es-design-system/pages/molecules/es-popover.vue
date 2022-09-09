<template>
    <div>
        <div class="mb-3">
            <h2>
                Dark Variant
            </h2>
            <div>
                <!-- eslint-disable vuejs-accessibility/label-has-for -->
                <label>
                    With Title
                    <es-button
                        id="darkTitleTarget"
                        class="p-0 text-gray-700 align-text-bottom"
                        tabindex="0"
                        variant="link">
                        <IconInfo
                            width="16px"
                            height="16px" />
                    </es-button>
                </label>
                <EsPopover
                    target="darkTitleTarget"
                    variant="dark">
                    <template #title>
                        My Title
                    </template>
                    <p class="mb-0">
                        Install solar panels through this program and get $250 cash back.
                        <a
                            class="mt-2 d-block"
                            href="https://communitysolar.energysage.com/"
                            target="_blank">Learn More</a>
                    </p>
                </EsPopover>
            </div>
            <div>
                <label>
                    No Title
                    <es-button
                        id="darkNoTitleTarget"
                        class="p-0 text-gray-700 align-text-bottom"
                        tabindex="0"
                        variant="link">
                        <IconInfo
                            width="16px"
                            height="16px" />
                    </es-button>
                </label>
                <EsPopover
                    target="darkNoTitleTarget"
                    variant="dark">
                    <p class="mb-0">
                        Install solar panels through this program and get $250 cash back.
                        <a
                            class="mt-2 d-block"
                            href="https://communitysolar.energysage.com/"
                            target="_blank">Learn More</a>
                    </p>
                </EsPopover>
            </div>
        </div>
        <div>
            <h2>
                Light Variant
            </h2>
            <div>
                <!-- eslint-disable vuejs-accessibility/label-has-for -->
                <label>
                    With Title
                    <es-button
                        id="lightTitleTarget"
                        class="p-0 text-gray-700 align-text-bottom"
                        tabindex="0"
                        variant="link">
                        <IconInfo
                            width="16px"
                            height="16px" />
                    </es-button>
                </label>
                <EsPopover
                    target="lightTitleTarget"
                    variant="light">
                    <template #title>
                        My Title
                    </template>
                    <p class="mb-0">
                        Install solar panels through this program and get $250 cash back.
                        <a
                            class="mt-2 d-block"
                            href="https://communitysolar.energysage.com/"
                            target="_blank">Learn More</a>
                    </p>
                </EsPopover>
            </div>
            <div>
                <label>
                    No Title
                    <es-button
                        id="lightNoTitleTarget"
                        class="p-0 text-gray-700 align-text-bottom"
                        tabindex="0"
                        variant="link">
                        <IconInfo
                            width="16px"
                            height="16px" />
                    </es-button>
                </label>
                <EsPopover
                    target="lightNoTitleTarget"
                    variant="light">
                    <p class="mb-0">
                        Install solar panels through this program and get $250 cash back.
                        <a
                            class="mt-2 d-block"
                            href="https://communitysolar.energysage.com/"
                            target="_blank">Learn More</a>
                    </p>
                </EsPopover>
            </div>
        </div>
    </div>
</template>
<script>
import { EsPopover, IconInfo, EsButton } from '@energysage/es-vue-base';

export default {
    name: 'EsPopoverDocs',
    components: {
        EsPopover,
        EsButton,
        IconInfo,
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

// TODO: Remove when gray scale is added to es-bs-base
.text-gray-700 {
    color: $gray-700;
}
</style>

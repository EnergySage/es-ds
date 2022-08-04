<template>
    <div>
        <div>
            <!-- eslint-disable vuejs-accessibility/label-has-for -->
            <label>
                With Title
                <es-button
                    id="titleTarget"
                    class="p-0 text-gray-700 align-text-bottom"
                    tabindex="0"
                    variant="link">
                    <IconInfo
                        width="16px"
                        height="16px" />
                </es-button>
            </label>
            <EsPopover target="titleTarget">
                <template #title>
                    My Title
                </template>
                <p>
                    Install solar panels through this program and get $250 cash back.
                    <a
                        class="mt-3 d-block"
                        href="https://communitysolar.energysage.com/"
                        target="_blank">Learn more.</a>
                </p>
            </EsPopover>
        </div>
        <div>
            <label>
                No Title
                <es-button
                    id="noTitleTarget"
                    class="p-0 text-gray-700 align-text-bottom"
                    tabindex="0"
                    variant="link">
                    <IconInfo
                        width="16px"
                        height="16px" />
                </es-button>
            </label>
            <EsPopover target="noTitleTarget">
                <p>
                    Install solar panels through this program and get $250 cash back.
                    <a
                        class="mt-3 d-block"
                        href="https://communitysolar.energysage.com/"
                        target="_blank">Learn more.</a>
                </p>
            </EsPopover>
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
@import '~@energysage/es-bs-extends/scss/includes';

// TODO: Remove when gray scale is added to es-bs-base
.text-gray-700 {
    color: $gray-700;
}
</style>

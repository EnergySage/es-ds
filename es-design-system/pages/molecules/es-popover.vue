<template>
    <div>
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label
            id="myTarget">
            Click Me
            <IconInfo
                width="16px"
                height="16px"
                class="ml-1 text-gray-700" />
        </label>
        <EsPopover target="myTarget">
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
</template>
<script>
import { EsPopover, IconInfo } from '@energysage/es-vue-base';

export default {
    name: 'EsPopoverDocs',
    components: {
        EsPopover,
        IconInfo,
    },
};
</script>

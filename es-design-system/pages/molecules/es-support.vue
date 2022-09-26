<template>
    <div>
        <h1>
            Default(Warm)
        </h1>
        <es-support
            :link="link"
            :src="benr" />
        <h1 class="mt-5">
            Cool Variant
        </h1>
        <es-support
            variant="cool"
            :link="link"
            :src="benr" />
        <h1 class="mt-5">
            Custom Copy
        </h1>
        <es-support
            :link="link"
            :src="benr">
            <template #title>
                Custom title
            </template>
            <template #linkCopy>
                Link Copy
            </template>
        </es-support>
    </div>
</template>
<script>
import { EsSupport } from '@energysage/es-vue-base';
import benr from '@/assets/imgs/benr.png';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsSupport,
    },
    data() {
        return {
            link: 'https://www.energysage.com',
            benr,
        };
    },
};
</script>

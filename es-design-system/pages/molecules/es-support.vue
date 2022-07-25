<template>
    <div>
        <es-support
            link="https://www.energysage.com"
            rep-name="Ben">
            Need help signing up?
        </es-support>
    </div>
</template>
<script>
import { EsSupport } from '@energysage/es-vue-base';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsSupport,
    },
};
</script>

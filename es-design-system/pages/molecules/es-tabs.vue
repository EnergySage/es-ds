<template>
    <div>
        <h1>
            Tabs
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/tabs">
                bootstrap-vue tabs
            </b-link>
        </p>
        <es-tabs>
            <es-tab title="Tab 1">
                <p>
                    Content 1
                </p>
            </es-tab>
            <es-tab title="Tab 2">
                <p>
                    Content 2
                </p>
            </es-tab>
            <es-tab title="Tab 3">
                <p>
                    Content 3
                </p>
            </es-tab>
        </es-tabs>
    </div>
</template>
<script>
import { EsTab, EsTabs } from '@energysage/es-vue-base';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsTab, EsTabs,
    },
};
</script>

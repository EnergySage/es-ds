<template>
    <div>
        <es-breadcrumbs :items="items" />
    </div>
</template>
<script>
import { EsBreadcrumbs } from '@energysage/es-vue-base';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsBreadcrumbs,
    },
    data() {
        return {
            items: [
                {
                    text: 'Home',
                    to: '#',
                },
                {
                    text: 'Details',
                    to: '#',
                },
                {
                    text: 'Search',
                    active: true,
                },
            ],
        };
    },
};
</script>

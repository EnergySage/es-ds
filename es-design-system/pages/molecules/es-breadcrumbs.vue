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
                    href: '#',
                },
                {
                    text: 'Details',
                    href: '#',
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

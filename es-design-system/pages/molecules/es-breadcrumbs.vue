<template>
    <div>
        <h1>
            Breadcrumbs
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/breadcrumb">
                bootstrap-vue breadcrumbs
            </b-link>
        </p>
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

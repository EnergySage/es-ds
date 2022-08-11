<template>
    <div>
        <es-rating
            :read-only="false"
            @change="changeEvent" />
    </div>
</template>
<script>
import { EsRating } from '@energysage/es-vue-base';

export default {
    name: 'EsRatingDocs',
    components: {
        EsRating,
    },
    methods: {
        changeEvent($event) {
            // eslint-disable-next-line no-alert
            alert($event);
        },
    },
};
</script>

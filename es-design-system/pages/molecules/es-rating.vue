<template>
    <div>
        <h1>
            Form Input
        </h1>
        <es-rating
            :read-only="false"
            @change="changeEvent" />
        <h1 class="mt-5">
            Static Display
        </h1>
        <es-rating
            :rating="3.9" />
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

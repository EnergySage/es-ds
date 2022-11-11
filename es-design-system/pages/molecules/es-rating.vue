<template>
    <div>
        <h1>
            Rating
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/form-rating">
                bootstrap-vue form-rating
            </b-link>
        </p>
        <h2>
            Form Input
        </h2>
        <es-rating
            :read-only="false"
            @change="changeEvent" />
        <h2 class="mt-5">
            Static Display
        </h2>
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

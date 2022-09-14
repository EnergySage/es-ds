<template>
    <ul>
        <li>
            <b-link to="/organisms/es-review">
                EsReview
            </b-link>
        </li>
        <li>
            <b-link to="/organisms/es-form">
                EsForm
            </b-link>
        </li>
    </ul>
</template>

<script>
import {
    BLink,
} from 'bootstrap-vue';

export default {
    name: 'DsOrganismsList',
    components: {
        BLink,
    },
};
</script>

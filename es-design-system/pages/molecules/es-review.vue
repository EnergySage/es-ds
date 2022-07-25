<template>
    <b-row>
        <b-col
            cols="12 "
            lg="6">
            <es-review
                id="123"
                :rating="5"
                reviewer-name="My Name"
                title="My Title"
                certified
                :comment="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex.
                Nullam vestibulum ex mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi
                molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum.
                Mauris vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus.
                Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet
                sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam. `" />
        </b-col>
    </b-row>
</template>
<script>
import { EsReview } from '@energysage/es-vue-base';
import { BRow, BCol } from 'bootstrap-vue';

export default {
    name: 'EsReviewDocs',
    components: {
        EsReview,
        BRow,
        BCol,
    },

};
</script>

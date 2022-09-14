<template>
    <ul>
        <li>
            <b-link to="/atoms/color">
                Color
            </b-link>
        </li>
        <li>
            <b-link to="/atoms/typography">
                Typography
            </b-link>
        </li>
        <li>
            <b-link to="/atoms/grids">
                Grids
            </b-link>
        </li>
        <li>
            <b-link to="/atoms/space">
                Space
            </b-link>
        </li>
        <li>
            <b-link to="/atoms/icons">
                Icons
            </b-link>
        </li>
    </ul>
</template>

<script>
import {
    BLink,
} from 'bootstrap-vue';

export default {
    name: 'DsAtomsList',
    components: {
        BLink,
    },
};
</script>

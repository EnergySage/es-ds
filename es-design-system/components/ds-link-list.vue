<template>
    <ul>
        <li>
            <div class="h4">
                <b-link to="/">
                    Bootstrap 4
                </b-link>
            </div>
        </li>
        <li>
            <div class="h4">
                <b-link to="/atoms">
                    Atoms
                </b-link>
            </div>
            <DsAtomsList />
        </li>
        <li>
            <div class="h4">
                <b-link to="/molecules">
                    Molecules
                </b-link>
            </div>
            <DsMoleculesList />
        </li>
        <li>
            <div class="h4">
                <b-link to="/organisms">
                    Organisms
                </b-link>
            </div>
            <DsOrganismsList />
        </li>
    </ul>
</template>

<script>
import { BLink } from 'bootstrap-vue';
import DsAtomsList from '@/components/ds-atoms-list.vue';
import DsOrganismsList from '@/components/ds-organisms-list.vue';
import DsMoleculesList from '@/components/ds-molecules-list.vue';

export default {
    name: 'DsLinkList',
    components: {
        BLink,
        DsAtomsList,
        DsOrganismsList,
        DsMoleculesList,
    },
};
</script>

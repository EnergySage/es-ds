<template>
    <div>
        <h1>
            Organisms
        </h1>
        <DsOrganismsList />
    </div>
</template>

<script>
import DsOrganismsList from '@/components/ds-organisms-list.vue';

export default {
    name: 'OrganismsIndex',
    components: {
        DsOrganismsList,
    },
};
</script>

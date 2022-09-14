<template>
    <div>
        <h1>
            Atoms
        </h1>
        <DsAtomsList />
    </div>
</template>

<script>
import DsAtomsList from '@/components/ds-atoms-list.vue';

export default {
    name: 'AtomsIndex',
    components: {
        DsAtomsList,
    },
};
</script>

<template>
    <div>
        <h1>
            Molecules
        </h1>
        <DsMoleculesList />
    </div>
</template>

<script>
import DsMoleculesList from '@/components/ds-molecules-list.vue';

export default {
    name: 'MoleculesIndex',
    components: {
        DsMoleculesList,
    },
};
</script>

<script setup lang="ts">
const moleculeSlugs = [
    'accordion',
    'badge',
    'breadcrumbs',
    'card',
    'collapse',
    'checkbox',
    'data-table-simple',
    'radio-button',
];
const moleculeList = moleculeSlugs.map((slug) => {
    const nameWithCap = slug[0].toUpperCase() + slug.slice(1);
    return {
        slug,
        name: nameWithCap.replace(/\-/g, ' '),
    }
})
const molecules = ref(moleculeList);
</script>

<template>
    <ul class="list-unstyled pl-100">
        <li v-for="mol in molecules" :key="mol.slug">
            <ds-link :to="`/molecules/${mol.slug}/`">
                {{ mol.name }}
            </ds-link>
        </li>
    </ul>
</template>

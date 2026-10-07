<template>
    <ul class="list-unstyled pl-100">
        <li
            v-for="molecule in DS_MOLECULES_LIST"
            :key="molecule.path">
            <ds-link :to="molecule.path"> {{ molecule.name }} </ds-link>
        </li>
    </ul>
</template>

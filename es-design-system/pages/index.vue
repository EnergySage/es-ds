<template>
    <div>
        <h1>
            EnergySage Design System
        </h1>
        <ul>
            <li>
                <nuxt-link :to="{name: 'bootstrap-4___en'}">
                    Bootstrap 4
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name: 'atoms___en'}">
                    Atoms
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{name: 'icons___en'}">
                    Icons
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names, vue/component-definition-name-casing */
export default {
    name: 'index',
};
</script>

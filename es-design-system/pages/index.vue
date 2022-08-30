<template>
    <div>
        <h1>
            EnergySage Design System
        </h1>
        <ul>
            <li>
                <nuxt-link to="'/bootstrap-4'">
                    Bootstrap 4
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/atoms">
                    Atoms
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/atoms/icons">
                    Icons
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/molecules">
                    Molecules
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/organisms">
                    Organisms
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

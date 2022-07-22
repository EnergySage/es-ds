<template>
    <ul>
        <li :class="{'nav-item-active': currentRouteName === 'bootstrap-4___en'}">
            <div class="h4">
                <b-link :to="{name: 'bootstrap-4___en'}">
                    Bootstrap 4
                </b-link>
            </div>
        </li>
        <li :class="{'nav-item-active': currentRouteName === 'atoms___en'}">
            <div class="h4">
                <b-link :to="{name: 'atoms___en'}">
                    Atoms
                </b-link>
            </div>
            <ul>
                <li :class="{'nav-item-active': currentRouteName === 'atoms-color___en'}">
                    <b-link :to="{name: 'atoms-color___en'}">
                        Color
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'atoms-typography___en'}">
                    <b-link :to="{name: 'atoms-typography___en'}">
                        Typography
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'atoms-grids___en'}">
                    <b-link :to="{name: 'atoms-grids___en'}">
                        Grids
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'atoms-space___en'}">
                    <b-link :to="{name: 'atoms-space___en'}">
                        Space
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'atoms-icons___en'}">
                    <b-link :to="{name: 'atoms-icons___en'}">
                        Icons
                    </b-link>
                </li>
            </ul>
        </li>
        <li :class="{'nav-item-active': currentRouteName === 'molecules___en'}">
            <div class="h4">
                <b-link :to="{name: 'molecules___en'}">
                    Molecules
                </b-link>
            </div>
            <ul>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-button___en'}">
                    <b-link :to="{name: 'molecules-es-button___en'}">
                        EsButton
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-badge___en'}">
                    <b-link :to="{name: 'molecules-es-badge___en'}">
                        EsBadge
                    </b-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import {
    BLink,
} from 'bootstrap-vue';

export default {
    name: 'DsLinkList',
    components: {
        BLink,
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        },
    },
};
</script>

<style lang="scss" scoped>
.nav-item-active {
    .nuxt-link-active {
        text-decoration: underline;
    }
}
</style>

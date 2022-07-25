<template>
    <!-- TODO: Replace with Bootstrap-vue Navigation and b-link; will handle active class automagicly -->
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
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-badge___en'}">
                    <b-link :to="{name: 'molecules-es-badge___en'}">
                        EsBadge
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-breadcrumbs___en'}">
                    <b-link :to="{name: 'molecules-es-breadcrumbs___en'}">
                        EsBreadcrumbs
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-button___en'}">
                    <b-link :to="{name: 'molecules-es-button___en'}">
                        EsButton
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-collapse___en'}">
                    <b-link :to="{name: 'molecules-es-collapse___en'}">
                        EsCollapse
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-form-input___en'}">
                    <b-link :to="{name: 'molecules-es-form-input___en'}">
                        EsFormInput
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-form-textarea___en'}">
                    <b-link :to="{name: 'molecules-es-form-textarea___en'}">
                        EsFormTextarea
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-horizontal-list___en'}">
                    <b-link :to="{name: 'molecules-es-horizontal-list___en'}">
                        EsHorizontalList
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-modal___en'}">
                    <b-link :to="{name: 'molecules-es-modal___en'}">
                        EsModal
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-popover___en'}">
                    <b-link :to="{name: 'molecules-es-popover___en'}">
                        EsPopover
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-rating___en'}">
                    <b-link :to="{name: 'molecules-es-rating___en'}">
                        EsRating
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-review___en'}">
                    <b-link :to="{name: 'molecules-es-review___en'}">
                        EsReview
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-slider___en'}">
                    <b-link :to="{name: 'molecules-es-slider___en'}">
                        EsSlider
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-support___en'}">
                    <b-link :to="{name: 'molecules-es-support___en'}">
                        EsSupport
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-tabs___en'}">
                    <b-link :to="{name: 'molecules-es-tabs___en'}">
                        EsTabs
                    </b-link>
                </li>
                <li :class="{'nav-item-active': currentRouteName === 'molecules-es-view-more___en'}">
                    <b-link :to="{name: 'molecules-es-view-more___en'}">
                        EsViewMore
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

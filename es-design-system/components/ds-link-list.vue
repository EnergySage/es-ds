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
            <ul>
                <li>
                    <b-link to="/atoms/color">
                        Color
                    </b-link>
                </li>
                <li>
                    <b-link to="/atoms/typography">
                        Typography
                    </b-link>
                </li>
                <li>
                    <b-link to="/atoms/grid">
                        Grids
                    </b-link>
                </li>
                <li>
                    <b-link to="/atoms/space">
                        Space
                    </b-link>
                </li>
                <li>
                    <b-link to="/atoms/icons">
                        Icons
                    </b-link>
                </li>
            </ul>
        </li>
        <li>
            <div class="h4">
                <b-link to="/molecules">
                    Molecules
                </b-link>
            </div>
            <ul>
                <li>
                    <b-link to="/molecules/es-badge">
                        EsBadge
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-breadcrumbs">
                        EsBreadcrumbs
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-button">
                        EsButton
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-collapse">
                        EsCollapse
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-form-input">
                        EsFormInput
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-form-textarea">
                        EsFormTextarea
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-horizontal-list">
                        EsHorizontalList
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-modal">
                        EsModal
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-popover">
                        EsPopover
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-rating">
                        EsRating
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-slider">
                        EsSlider
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-support">
                        EsSupport
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-tabs">
                        EsTabs
                    </b-link>
                </li>
                <li>
                    <b-link to="/molecules/es-view-more">
                        EsViewMore
                    </b-link>
                </li>
            </ul>
        </li>
        <li>
            <div class="h4">
                <b-link to="/organisms">
                    Organisms
                </b-link>
            </div>
            <ul>
                <li>
                    <b-link to="/organisms/es-review">
                        EsReview
                    </b-link>
                </li>
                <li>
                    <b-link to="/organisms/es-form">
                        EsForm
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

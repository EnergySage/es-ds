<template>
    <ul class="ds-link-list list-unstyled">
        <li>
            <div class="h4">
                <ds-link to="/">
                    Home
                </ds-link>
            </div>
        </li>
        <li>
            <div class="h4">
                <ds-link to="/atoms">
                    Atoms
                </ds-link>
            </div>
            <ds-atoms-list class="mb-100" />
        </li>
        <li>
            <div class="h4">
                <ds-link to="/molecules">
                    Molecules
                </ds-link>
            </div>
            <ds-molecules-list class="mb-100" />
        </li>
        <li>
            <div class="h4">
                <ds-link to="/organisms">
                    Organisms
                </ds-link>
            </div>
            <ds-organisms-list class="mb-100" />
        </li>
        <li>
            <div class="h4">
                <ds-link to="/examples">
                    Examples
                </ds-link>
            </div>
            <ds-examples-list class="mb-100" />
        </li>
    </ul>
</template>

<script>
export default {
    name: 'DsLinkList',
    props: {
        currentPath: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.ds-link-list {
    li {
        list-style-type: none;
    }
}
</style>

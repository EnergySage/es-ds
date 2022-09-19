<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1>
                    Bootstrap 4
                </h1>
                <p>
                    Our designs system is based upon the bootstrap 4 framework.
                    And therefore there are a number of inherit properties, hooks for theming,
                    and components we get for free.

                    See <b-link href="https://getbootstrap.com/docs/4.6/getting-started/introduction/">
                        getbootstrap.com
                    </b-link> and <b-link href="https://bootstrap-vue.org/docs">
                        bootstrap-vue
                    </b-link> to see what is available by default.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import sassColors from '@energysage/es-bs-base/scss/variables/_colors.scss';
import sassGrays from '@energysage/es-bs-base/scss/variables/_grays.scss';
import sassThemeColors from '@energysage/es-bs-base/scss/variables/_theme-colors.scss';
import sassGlobalSettings from '@energysage/es-bs-base/scss/variables/_global-settings.scss';
import sassSpacers from '@energysage/es-bs-base/scss/variables/_spacers.scss';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Bootstrap4',
    data() {
        return {
            colors: sassColors,
            grays: sassGrays,
            themeColors: sassThemeColors,
            globalSettings: sassGlobalSettings,
            spacers: sassSpacers,
        };
    },
};
</script>

<style lang="scss" scoped>
.swatch {
    background: currentColor;
    height: 3em;
    width: 3em;
}
</style>

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
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <h2>
                    Color System
                </h2>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <h3>
                    Colors
                </h3>
                <table class="table-sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                &nbsp;
                            </th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(value, alias) in colors"
                            :key="alias">
                            <td>
                                <div
                                    :style="{ color: value }"
                                    class="swatch" />
                            </td>
                            <td>
                                {{ alias }}
                            </td>
                            <td>
                                {{ value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-6">
                <h3>
                    Grays
                </h3>
                <table class="table-sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                &nbsp;
                            </th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(value, alias) in grays"
                            :key="alias">
                            <td>
                                <div
                                    :style="{ color: value }"
                                    class="swatch" />
                            </td>
                            <td>
                                {{ alias }}
                            </td>
                            <td>
                                {{ value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Start Theme colors -->
        <div class="row">
            <div class="col">
                <h3>
                    Theme Colors
                </h3>
                <table class="table-sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                &nbsp;
                            </th>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(value, alias) in themeColors"
                            :key="alias">
                            <td>
                                <div
                                    :style="{ color: value }"
                                    class="swatch" />
                            </td>
                            <td>
                                {{ alias }}
                            </td>
                            <td>
                                {{ value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Theme colors -->

        <!-- Start Options -->
        <div class="row">
            <div class="col">
                <h2>
                    Options
                </h2>
                <table class="table-sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(value, alias) in globalSettings"
                            :key="alias">
                            <td>
                                {{ alias }}
                            </td>
                            <td>
                                {{ value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Options -->

        <!-- Start Spacers -->
        <div class="row">
            <div class="col">
                <h2>
                    Spacers
                </h2>
                <table class="table-sm">
                    <thead>
                        <tr>
                            <th scope="col">
                                Name
                            </th>
                            <th scope="col">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(value, alias) in spacers"
                            :key="alias">
                            <td>
                                {{ alias }}
                            </td>
                            <td>
                                {{ value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- End Spacers -->
    </div>
</template>

<script>
// import sassColors from '@/assets/scss/main.scss';
import sassColors from '@energysage/es-bs-extends/scss/variables/_colors.scss';
import sassGrays from '@energysage/es-bs-extends/scss/variables/_grays.scss';
import sassThemeColors from '@energysage/es-bs-extends/scss/variables/_theme-colors.scss';
import sassGlobalSettings from '@energysage/es-bs-extends/scss/variables/_global-settings.scss';
import sassSpacers from '@energysage/es-bs-extends/scss/variables/_spacers.scss';

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

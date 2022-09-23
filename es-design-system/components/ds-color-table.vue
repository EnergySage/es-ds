<template>
    <table class="table-sm">
        <thead>
            <tr>
                <th scope="col">
                    Name
                </th>
                <th scope="col">
                    Code
                </th>
                <th scope="col">
                    &nbsp;
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(value, alias) in colors"
                :key="alias">
                <td>
                    {{ alias }}
                </td>
                <td>
                    <code>{{ value }}</code>
                </td>
                <td>
                    <div
                        :style="{ color: value }"
                        class="swatch ml-4 border" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'DsColorTable',
    props: {
        colors: {
            type: Object,
            required: true,
        },
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

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
                <th
                    scope="col"
                    colspan="2">
                    &nbsp;
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(value, alias) in colors"
                :key="alias">
                <td class="pr-3">
                    {{ alias }}
                </td>
                <td class="pr-3">
                    <code>{{ value }}</code>
                </td>
                <td class="pr-3">
                    <div
                        :class="`swatch border bg-${alias}`" />
                </td>
                <td>
                    <div
                        :class="`swatch-text text-${alias}`">
                        Sample Text
                    </div>
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
    height: 3em;
    width: 3em;
}
</style>

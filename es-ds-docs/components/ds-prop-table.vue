<script lang="js">
export default {
    name: 'DsPropTable',
    props: {
        columns: {
            type: Array,
            default: () => ['Name', 'Type', 'Default', 'Description'],
        },
        rows: {
            type: Array,
            required: true,
        },
        widths: {
            type: Object,
            default: () => ({
                md: ['3', '2', '2', '5'],
            }),
        },
    },
};
</script>

<template>
    <ds-responsive-table>
        <ds-responsive-table-row
            v-for="row in rows"
            :key="row[0]">
            <ds-responsive-table-column
                v-for="(column, columnIndex) in columns"
                :key="column"
                :md="widths.md[columnIndex]"
                :lg="widths.lg && widths.lg[columnIndex] || null">
                <template #name>
                    {{ column }}
                </template>
                <template #value>
                    <code v-if="columnIndex < 3 && row[columnIndex] !== 'n/a'">
                        {{ row[columnIndex] }}
                    </code>
                    <span v-else>
                        {{ row[columnIndex] }}
                    </span>
                </template>
            </ds-responsive-table-column>
        </ds-responsive-table-row>
    </ds-responsive-table>
</template>

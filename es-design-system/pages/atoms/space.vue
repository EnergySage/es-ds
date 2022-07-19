<template>
    <b-row>
        <b-col>
            <h1>
                Space
            </h1>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            Alias
                        </th>
                        <th scope="col">
                            EM Value
                        </th>
                        <th scope="col">
                            Approximate PX Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="space in spacers"
                        :key="space.alias">
                        <td>
                            {{ space.alias }}
                        </td>
                        <td>
                            {{ space.em }}
                        </td>
                        <td>
                            {{ space.px }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </b-col>
    </b-row>
</template>

<script>
import sassSpacers from '@energysage/es-bs-extends/scss/variables/_spacers.scss';
import {
    BRow,
    BCol,
} from 'bootstrap-vue';

export default {
    name: 'AtomsSpace',
    components: {
        BRow,
        BCol,
    },
    data() {
        const spacers = Object.keys(sassSpacers)
            .map((key) => ({ key, value: sassSpacers[key] }))
            .map((item) => {
                const alias = `(p|m)-${item.key.replace(/s/, '')}`;
                const em = Number(item.value.replace(/rem/, ''));
                const px = em * 16; // Assuming we'll never change base font-size
                return {
                    alias,
                    em,
                    px,
                };
            });

        // eslint-disable-next-line no-debugger
        // debugger;
        return {
            spacers,
        };
    },
};
</script>

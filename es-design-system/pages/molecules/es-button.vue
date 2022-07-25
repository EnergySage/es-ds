<template>
    <div>
        <h1>
            EsButton
        </h1>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">
                        Variant
                    </th>
                    <th scope="col">
                        Small
                    </th>
                    <th scope="col">
                        Default
                    </th>
                    <th scope="col">
                        Large
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td scope="row">
                        Primary
                    </td>
                    <td>
                        <es-button size="sm">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button>
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button size="lg">
                            Large Button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Primary (Disabled)
                    </td>
                    <td>
                        <es-button
                            disabled
                            size="sm">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button disabled>
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            disabled
                            size="lg">
                            Large Button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Primary Outline
                    </td>
                    <td>
                        <es-button
                            :outline="true"
                            size="sm">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button :outline="true">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            :outline="true"
                            size="lg">
                            Large Button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Secondary
                    </td>
                    <td>
                        <es-button
                            variant="secondary"
                            :outline="false"
                            size="sm">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="secondary"
                            :outline="false">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="secondary"
                            :outline="false"
                            size="lg">
                            Large Button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Secondary (disabled)
                    </td>
                    <td>
                        <es-button
                            disabled
                            variant="secondary"
                            :outline="false"
                            size="sm">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            disabled
                            variant="secondary"
                            :outline="false">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            disabled
                            variant="secondary"
                            :outline="false"
                            size="lg">
                            Large Button
                        </es-button>
                    </td>
                </tr>
                <tr>
                    <td scope="row">
                        Secondary Outline
                    </td>
                    <td>
                        <es-button
                            variant="secondary"
                            :outline="true"
                            size="sm">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="secondary"
                            :outline="true">
                            Small Button
                        </es-button>
                    </td>
                    <td>
                        <es-button
                            variant="secondary"
                            :outline="true"
                            size="lg">
                            Large Button
                        </es-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { EsButton } from '@energysage/es-vue-base';

export default {
    name: 'EsButtonDocs',
    components: {
        EsButton,
    },
};
</script>

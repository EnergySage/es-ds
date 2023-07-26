<template>
    <ul>
        <li>
            <b-link :to="{ name: 'examples-nuxt-components___en' }">
                Nuxt Components
            </b-link>
        </li>
        <li>
            <b-link :to="{ name: 'examples-form-field-validation___en' }">
                Form with Field Validation
            </b-link>
        </li>
        <li>
            <b-link :to="{ name: 'examples-form-validation___en' }">
                Form with (form level) Validation
            </b-link>
        </li>
        <li>
            <b-link :to="{ name: 'examples-file-upload___en' }">
                File Upload
            </b-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'DsExamplesList',
};
</script>

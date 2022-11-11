<template>
    <div>
        <h1>
            Badges
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/badge">
                bootstrap-vue badge
            </b-link>
        </p>
        <es-badge>
            Primary
        </es-badge>
        <es-badge variant="success">
            Success
        </es-badge>
        <es-badge variant="danger">
            Danger
        </es-badge>
        <es-badge variant="warning">
            Warning
        </es-badge>
        <es-badge variant="info">
            Info
        </es-badge>
        <es-badge variant="dark">
            Dark
        </es-badge>
    </div>
</template>
<script>
import { EsBadge } from '@energysage/es-vue-base';

export default {
    name: 'EsBadgeDocs',
    components: {
        EsBadge,
    },
};
</script>

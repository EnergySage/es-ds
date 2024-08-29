<template>
    <div>
        <h1>Pagination</h1>
        <p class="pb-200">
            Extended from <nuxt-link
                href="https://v3.primevue.org/paginator/"
                target="_blank">
                PrimeVue paginator
            </nuxt-link>
        </p>

        <div class="mb-500">
            <ul
                id="paginated-list">
                <li
                    v-for="item in items.slice(first, first + perPage)"
                    :key="item">
                    {{ item }}
                </li>
            </ul>
            <es-pagination
                v-model:first="first"
                :total-rows="rows"
                :per-page="perPage"
                list-id="paginated-list"
                align="center" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-pagination.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/pagination.vue"
        />
    </div>
</template>

<script setup>
const { $prism } = useNuxtApp();
const compCode = ref("");
const docCode = ref("");
if ($prism) {
    const compSource = await import("@energysage/es-ds-components/components/es-pagination.vue?raw");
    const docSource = await import("./pagination.vue?raw");
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const perPage = 3;
const items = Array.from({ length: 36 }, (v, i) => `Item ${i}`);

const rows = computed(() => items.length);

const first = ref(0);
</script>

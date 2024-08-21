<template>
    <div>
        <h1>
            Corners
        </h1>
        <p>
            Below are the four corner radius sizes used throughout the design system. Each size lists a few examples of
            components that make use of that size. Use the utility classes listed below (e.g. <code>rounded</code>) to
            add the desired corner radius to your UI elements.
        </p>

        <b-row class="my-500">
            <b-col
                v-for="item in borderRadius"
                :key="item.name"
                class="mb-200"
                cols="6"
                lg="3">
                <div
                    class="bg-soft-blue h-100 px-100 px-lg-200 py-200 py-lg-300 text-center text-dark-blue"
                    :class="item.class">
                    <p class="font-size-300 mb-25">
                        {{ `${item.name} / ${item.sizePx}px` }}
                    </p>
                    <p>
                        <code class="text-body">
                            {{ item.class }}
                        </code>
                    </p>
                    <p class="font-size-sm mb-0">
                        <ul class="component-list list-unstyled mb-0">
                            <li class="d-inline-block">
                                Used by&nbsp;
                            </li>
                            <li
                                v-for="component in item.components"
                                :key="component.name"
                                class="d-inline-block">
                                <ds-link :to="component.url">
                                    {{ component.name }}
                                </ds-link>
                            </li>
                        </ul>
                    </p>
                </div>
            </b-col>
        </b-row>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/corners.vue" />
    </div>
</template>

<script setup lang="ts">
import sassBorderRadius from '@energysage/es-ds-styles/scss/modules/border-radius.module.scss';
import sassBorderRadiusComponents from '@energysage/es-ds-styles/scss/modules/border-radius-components.module.scss';

import { computed, ref } from 'vue';

const BASE_FONT_SIZE_PX = 16;

const COMPONENT_NAME_URLS = {
    /* TODO: uncomment once these molecules exist
    accordion: '/molecules/es-accordion',
    badge: '/molecules/es-badge',
    button: '/molecules/es-button',
    card: '/molecules/es-card',
    'data-table': '/molecules/es-data-table',
    'form-message': '/molecules/es-form-msg',
    modal: '/molecules/es-modal',
    pagination: '/molecules/es-pagination',
    popover: '/molecules/es-popover',
    textarea: '/molecules/es-form-textarea',
    'text-input': '/molecules/es-form-input',
    'verification-code': '/molecules/es-verification-code',
    */
};

const borderRadius = computed(() => {
    const sizeMap = Object.entries(sassBorderRadius).reduce((result, [name, sizeRem]) => {
        // eslint-disable-next-line no-param-reassign
        result[sizeRem] = {
            name,
            components: [],
        };
        return result;
    }, {});

    Object.entries(sassBorderRadiusComponents).forEach(([component, sizeRem]) => {
        if (sizeMap[sizeRem]?.components?.push) {
            sizeMap[sizeRem].components.push(component);
        }
    });

    return Object.entries(sassBorderRadius).map(([name, sizeRem]) => {
        const sizePx = parseFloat(sizeRem.replace('rem', '')) * BASE_FONT_SIZE_PX;
        return {
            class: name === 'md' ? 'rounded' : `rounded-${name}`,
            components: sizeMap[sizeRem].components.map((simpleName) => ({
                name: `${simpleName[0].toUpperCase()}${simpleName.substring(1).replace('-', ' ')}`,
                url: COMPONENT_NAME_URLS[simpleName],
            })),
            name,
            sizePx,
            sizeRem,
        };
    });
});

const { $prism } = useNuxtApp();
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const docSource = await import('./corners.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<style lang='scss' scoped>
.component-list {
    li:not(:first-child):not(:last-child) {
        margin-right: 0.25rem;

        &::after {
            content: ',';
        }
    }
}
</style>

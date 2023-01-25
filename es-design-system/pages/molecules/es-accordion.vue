<template>
    <div>
        <h1>
            Accordion
        </h1>
        <p>
            Makes use of <b-link href="https://bootstrap-vue.org/docs/components/collapse">
                bootstrap-vue collapse
            </b-link>
        </p>

        <h2 class="mt-5">
            Single expand (default)
        </h2>
        <p>
            By default, accordions will only allow one item to be expanded at a time. Upon expanding a second
            item, the open item will collapse.
        </p>
        <es-accordion-list initial-expanded-id="single-question-1">
            <es-accordion id="single-question-1">
                <template #title>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                    gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.
                    Mi tempus imperdiet nulla malesuada pellentesque elit.
                </p>
            </es-accordion>
            <es-accordion id="single-question-2">
                <template #title>
                    Faucibus purus in massa tempor nec feugiat?
                </template>
                <p>
                    Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                    quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur vitae
                    nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare arcu dui
                    vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                </p>
            </es-accordion>
            <es-accordion id="single-question-3">
                <template #title>
                    Duis convallis convallis tellus id interdum velit laoreet id?
                </template>
                <p>
                    Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                    id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                    Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                    vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                    Est velit egestas dui id ornare arcu odio ut sem.
                </p>
            </es-accordion>
            <es-accordion id="single-question-4">
                <template #title>
                    Ipsum a arcu cursus vitae congue mauris rhoncus?
                </template>
                <p>
                    Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                    risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                    enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                    cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi tincidunt.
                    Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in mollis nunc sed
                    id semper.
                </p>
            </es-accordion>
        </es-accordion-list>

        <h2 class="mt-5">
            Single expand, starts collapsed
        </h2>
        <p>
            If no initial expanded id is provided, each item will start collapsed.
        </p>
        <es-accordion-list>
            <es-accordion id="collapsed-question-1">
                <template #title>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                    gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.
                    Mi tempus imperdiet nulla malesuada pellentesque elit.
                </p>
            </es-accordion>
            <es-accordion id="collapsed-question-2">
                <template #title>
                    Faucibus purus in massa tempor nec feugiat?
                </template>
                <p>
                    Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                    quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur vitae
                    nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare arcu dui
                    vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                </p>
            </es-accordion>
            <es-accordion id="collapsed-question-3">
                <template #title>
                    Duis convallis convallis tellus id interdum velit laoreet id?
                </template>
                <p>
                    Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                    id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                    Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                    vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                    Est velit egestas dui id ornare arcu odio ut sem.
                </p>
            </es-accordion>
            <es-accordion id="collapsed-question-4">
                <template #title>
                    Ipsum a arcu cursus vitae congue mauris rhoncus?
                </template>
                <p>
                    Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                    risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                    enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                    cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi tincidunt.
                    Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in mollis nunc sed
                    id semper.
                </p>
            </es-accordion>
        </es-accordion-list>

        <h2 class="mt-5">
            Multiple expand
        </h2>
        <p>
            This variant allows more than one item to be expanded at a time.
        </p>
        <es-accordion-list
            allow-multiple-expand
            initial-expanded-id="multiple-question-1">
            <es-accordion id="multiple-question-1">
                <template #title>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit?
                </template>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                    gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing.
                    Mi tempus imperdiet nulla malesuada pellentesque elit.
                </p>
            </es-accordion>
            <es-accordion id="multiple-question-2">
                <template #title>
                    Faucibus purus in massa tempor nec feugiat?
                </template>
                <p>
                    Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                    quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur vitae
                    nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare arcu dui
                    vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                </p>
            </es-accordion>
            <es-accordion id="multiple-question-3">
                <template #title>
                    Duis convallis convallis tellus id interdum velit laoreet id?
                </template>
                <p>
                    Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                    id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                    Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                    vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                    Est velit egestas dui id ornare arcu odio ut sem.
                </p>
            </es-accordion>
            <es-accordion id="multiple-question-4">
                <template #title>
                    Ipsum a arcu cursus vitae congue mauris rhoncus?
                </template>
                <p>
                    Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                    risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                    enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                    cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi tincidunt.
                    Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in mollis nunc sed
                    id semper.
                </p>
            </es-accordion>
        </es-accordion-list>

        <h2 class="mt-5">
            EsAccordionList props
        </h2>
        <b-table
            :fields="accordionListFields"
            :items="accordionListProps"
            striped />

        <h2 class="mt-5">
            EsAccordion props
        </h2>
        <b-table
            :fields="accordionFields"
            :items="accordionProps" />

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsAccordion.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-accordion.vue" />
    </div>
</template>

<script>
import { EsAccordion, EsAccordionList } from '@energysage/es-vue-base';

export default {
    name: 'EsAccordionDocs',
    components: {
        EsAccordion,
        EsAccordionList,
    },
    data() {
        return {
            accordionFields: [
                'name',
                'description',
            ],
            accordionProps: [
                {
                    name: 'id',
                    description: `
                        Required. Used to uniquely identify the item on the page. This value can also be passed to
                        EsAccordionList to signify that this item should start out expanded.
                    `,
                },
            ],
            accordionListFields: [
                'name',
                'description',
            ],
            accordionListProps: [
                {
                    name: 'allowMultipleExpand',
                    description: `
                        Defaults to false, which only allows one item to expand at a time. If true, allows multiple
                        items to expand at a time.
                    `,
                },
                {
                    name: 'initialExpandedId',
                    description: `
                        The id of the item that should begin expanded when the component mounts. If omitted, all
                        items will start out collapsed.
                    `,
                },
            ],
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-accordion.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsAccordion.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

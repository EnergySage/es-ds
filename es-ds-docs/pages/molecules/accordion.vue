<script setup lang="ts">
const programmaticExpandedId = ref('programmatic-question-1');

const accordionListProps = [
    [
        'allowMultipleExpand',
        'Boolean',
        'false',
        `
        Defaults to false, which only allows one item to expand at a time. If true, allows multiple
        items to expand at a time. Do not use at the same time as v-model.
        `,
    ],
    [
        'initialExpandedId',
        'String',
        'n/a',
        `
        The id of the item that should begin expanded when the component mounts. If omitted, all
        items will start out collapsed. Do not use at the same time as v-model.
        `,
    ],
    [
        'variant',
        'String',
        'default',
        `
        Defaults to 'default'; also accepts 'minimal'. Default has a rounded white background,
        minimal has no background, Heading 3 text style, reduced padding, and a horizontal border
        separating accordions.
        `,
    ],
];
const accordionProps = [
    [
        'id',
        'String',
        'n/a',
        `
        Required. Used to uniquely identify the item on the page. This value can also be passed to
        EsAccordionList to signify that this item should start out expanded.
        `,
    ],
    [
        'headingTag',
        'String',
        'h3',
        `
        Defaults to h3. The tag used can be customized as needed.
        For example, if the accordion is used within a section that is already under an <h3>,
        it may need to be an h4.
        `,
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-accordion-list.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./accordion.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Accordion</h1>
        <p class="mb-450">
            Extended from
            <a href="https://v3.primevue.org/accordion/">PrimeVue accordion</a>
        </p>

        <div class="mb-450">
            <h2>Single expand</h2>
            <p>
                By default, accordions will only allow one item to be expanded at a time. Upon expanding a second item,
                the open item will collapse.
            </p>
            <es-accordion-list initial-expanded-id="single-question-11">
                <es-accordion id="single-question-11">
                    <template #title> Lorem ipsum dolor sit amet, consectetur adipiscing elit? </template>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                        gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi
                        tempus imperdiet nulla malesuada pellentesque elit.
                    </p>
                </es-accordion>
                <es-accordion id="single-question-12">
                    <template #title> Faucibus purus in massa tempor nec feugiat? </template>
                    <p>
                        Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                        quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur
                        vitae nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare
                        arcu dui vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                    </p>
                </es-accordion>
                <es-accordion id="single-question-13">
                    <template #title> Duis convallis convallis tellus id interdum velit laoreet id? </template>
                    <p>
                        Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                        id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                        Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                        vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                        Est velit egestas dui id ornare arcu odio ut sem.
                    </p>
                </es-accordion>
                <es-accordion id="single-question-14">
                    <template #title> Ipsum a arcu cursus vitae congue mauris rhoncus? </template>
                    <p>
                        Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                        risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                        enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                        cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi
                        tincidunt. Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in
                        mollis nunc sed id semper.
                    </p>
                </es-accordion>
            </es-accordion-list>
        </div>

        <div class="mb-450">
            <h2>Single expand, minimal variant</h2>
            <p>
                The minimal variant is designed to be used within a block of long-form content to better match headings
                and text alignment.
            </p>
            <es-accordion-list
                initial-expanded-id="single-question-21"
                variant="minimal">
                <es-accordion id="single-question-21">
                    <template #title> Lorem ipsum dolor sit amet, consectetur adipiscing elit? </template>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                        gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi
                        tempus imperdiet nulla malesuada pellentesque elit.
                    </p>
                </es-accordion>
                <es-accordion id="single-question-22">
                    <template #title> Faucibus purus in massa tempor nec feugiat? </template>
                    <p>
                        Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                        quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur
                        vitae nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare
                        arcu dui vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                    </p>
                </es-accordion>
                <es-accordion id="single-question-23">
                    <template #title> Duis convallis convallis tellus id interdum velit laoreet id? </template>
                    <p>
                        Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                        id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                        Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                        vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                        Est velit egestas dui id ornare arcu odio ut sem.
                    </p>
                </es-accordion>
                <es-accordion id="single-question-24">
                    <template #title> Ipsum a arcu cursus vitae congue mauris rhoncus? </template>
                    <p>
                        Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                        risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                        enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                        cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi
                        tincidunt. Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in
                        mollis nunc sed id semper.
                    </p>
                </es-accordion>
            </es-accordion-list>
        </div>

        <div class="mb-450">
            <h2>Single expand, starts collapsed</h2>
            <p>If no initial expanded id is provided, each item will start collapsed.</p>
            <es-accordion-list>
                <es-accordion id="collapsed-question-1">
                    <template #title> Lorem ipsum dolor sit amet, consectetur adipiscing elit? </template>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                        gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi
                        tempus imperdiet nulla malesuada pellentesque elit.
                    </p>
                </es-accordion>
                <es-accordion id="collapsed-question-2">
                    <template #title> Faucibus purus in massa tempor nec feugiat? </template>
                    <p>
                        Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                        quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur
                        vitae nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare
                        arcu dui vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                    </p>
                </es-accordion>
                <es-accordion id="collapsed-question-3">
                    <template #title> Duis convallis convallis tellus id interdum velit laoreet id? </template>
                    <p>
                        Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                        id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                        Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                        vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                        Est velit egestas dui id ornare arcu odio ut sem.
                    </p>
                </es-accordion>
                <es-accordion id="collapsed-question-4">
                    <template #title> Ipsum a arcu cursus vitae congue mauris rhoncus? </template>
                    <p>
                        Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                        risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                        enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                        cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi
                        tincidunt. Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in
                        mollis nunc sed id semper.
                    </p>
                </es-accordion>
            </es-accordion-list>
        </div>

        <div class="mb-450">
            <h2>Single expand with v-model</h2>
            <p>
                If you want to control the accordion programmatically or trigger a UI change elsewhere when a specific
                item is expanded, you can use the
                <code>v-model</code> directive to bind the active id to a data value. The initial state of the data
                value must be a valid accordion id.
            </p>
            <div class="mb-200">
                <!-- TODO: these are temporarily buttons rather than es-buttons, until es-button exists -->
                <es-button
                    class="mb-50 mr-50"
                    :disabled="programmaticExpandedId === 'programmatic-question-1'"
                    @click="programmaticExpandedId = 'programmatic-question-1'">
                    Expand first accordion
                </es-button>
                <es-button
                    class="mb-50 mr-50"
                    :disabled="programmaticExpandedId === 'programmatic-question-2'"
                    @click="programmaticExpandedId = 'programmatic-question-2'">
                    Expand second accordion
                </es-button>
                <es-button
                    class="mb-50 mr-50"
                    :disabled="programmaticExpandedId === 'programmatic-question-3'"
                    @click="programmaticExpandedId = 'programmatic-question-3'">
                    Expand third accordion
                </es-button>
                <es-button
                    class="mb-50"
                    :disabled="programmaticExpandedId === 'programmatic-question-4'"
                    @click="programmaticExpandedId = 'programmatic-question-4'">
                    Expand fourth accordion
                </es-button>
            </div>
            <div>
                <div>
                    <es-accordion-list
                        v-model="programmaticExpandedId"
                        class="mb-4 mb-lg-0">
                        <es-accordion id="programmatic-question-1">
                            <template #title> Lorem ipsum dolor sit amet, consectetur adipiscing elit? </template>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque
                                varius. Risus in hendrerit gravida rutrum. Faucibus interdum posuere lorem ipsum dolor
                                sit amet consectetur adipiscing. Mi tempus imperdiet nulla malesuada pellentesque elit.
                            </p>
                        </es-accordion>
                        <es-accordion id="programmatic-question-2">
                            <template #title> Faucibus purus in massa tempor nec feugiat? </template>
                            <p>
                                Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis
                                ut diam quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam.
                                Elementum curabitur vitae nunc sed velit dignissim. Velit sed ullamcorper morbi
                                tincidunt ornare. Sed cras ornare arcu dui vivamus arcu felis bibendum. Vel pharetra
                                vel turpis nunc eget lorem.
                            </p>
                        </es-accordion>
                        <es-accordion id="programmatic-question-3">
                            <template #title> Duis convallis convallis tellus id interdum velit laoreet id? </template>
                            <p>
                                Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis
                                pellentesque id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat
                                sed cras ornare. Turpis egestas pretium aenean pharetra magna ac. Pellentesque
                                dignissim enim sit amet. Placerat vestibulum lectus mauris ultrices eros. Amet nisl
                                suscipit adipiscing bibendum est ultricies. Est velit egestas dui id ornare arcu odio
                                ut sem.
                            </p>
                        </es-accordion>
                        <es-accordion id="programmatic-question-4">
                            <template #title> Ipsum a arcu cursus vitae congue mauris rhoncus? </template>
                            <p>
                                Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et
                                tortor at risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla
                                pellentesque dignissim enim sit amet venenatis urna. Duis convallis convallis tellus id
                                interdum velit laoreet. A arcu cursus vitae congue mauris rhoncus aenean vel elit. In
                                aliquam sem fringilla ut morbi tincidunt. Semper auctor neque vitae tempus quam
                                pellentesque nec. Sit amet nisl purus in mollis nunc sed id semper.
                            </p>
                        </es-accordion>
                    </es-accordion-list>
                </div>
                <div>
                    <div
                        v-if="programmaticExpandedId === 'programmatic-question-1'"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with "Lorem ipsum dolor sit amet, consectetur adipiscing elit?"
                    </div>
                    <div
                        v-if="programmaticExpandedId === 'programmatic-question-2'"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with "Faucibus purus in massa tempor nec feugiat?"
                    </div>
                    <div
                        v-if="programmaticExpandedId === 'programmatic-question-3'"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with "Duis convallis convallis tellus id interdum velit laoreet id?"
                    </div>
                    <div
                        v-if="programmaticExpandedId === 'programmatic-question-4'"
                        class="bg-gray-300 p-200 rounded-lg text-center">
                        Content associated with "Ipsum a arcu cursus vitae congue mauris rhoncus?"
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-450">
            <h2>Multiple expand</h2>
            <p>
                This variant allows more than one item to be expanded at a time. Do not use in conjunction with
                <code>v-model</code>.
            </p>
            <es-accordion-list
                allow-multiple-expand
                initial-expanded-id="multiple-question-1">
                <es-accordion id="multiple-question-1">
                    <template #title> Lorem ipsum dolor sit amet, consectetur adipiscing elit? </template>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit
                        gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi
                        tempus imperdiet nulla malesuada pellentesque elit.
                    </p>
                </es-accordion>
                <es-accordion id="multiple-question-2">
                    <template #title> Faucibus purus in massa tempor nec feugiat? </template>
                    <p>
                        Faucibus purus in massa tempor nec feugiat. In hac habitasse platea dictumst. Leo duis ut diam
                        quam nulla porttitor. Diam vel quam elementum pulvinar etiam non quam. Elementum curabitur
                        vitae nunc sed velit dignissim. Velit sed ullamcorper morbi tincidunt ornare. Sed cras ornare
                        arcu dui vivamus arcu felis bibendum. Vel pharetra vel turpis nunc eget lorem.
                    </p>
                </es-accordion>
                <es-accordion id="multiple-question-3">
                    <template #title> Duis convallis convallis tellus id interdum velit laoreet id? </template>
                    <p>
                        Duis convallis convallis tellus id interdum velit laoreet id. Condimentum mattis pellentesque
                        id nibh tortor id aliquet lectus proin. Nunc sed blandit libero volutpat sed cras ornare.
                        Turpis egestas pretium aenean pharetra magna ac. Pellentesque dignissim enim sit amet. Placerat
                        vestibulum lectus mauris ultrices eros. Amet nisl suscipit adipiscing bibendum est ultricies.
                        Est velit egestas dui id ornare arcu odio ut sem.
                    </p>
                </es-accordion>
                <es-accordion id="multiple-question-4">
                    <template #title> Ipsum a arcu cursus vitae congue mauris rhoncus? </template>
                    <p>
                        Ipsum a arcu cursus vitae congue mauris rhoncus. Tortor dignissim convallis aenean et tortor at
                        risus viverra. Aliquet enim tortor at auctor urna. Placerat orci nulla pellentesque dignissim
                        enim sit amet venenatis urna. Duis convallis convallis tellus id interdum velit laoreet. A arcu
                        cursus vitae congue mauris rhoncus aenean vel elit. In aliquam sem fringilla ut morbi
                        tincidunt. Semper auctor neque vitae tempus quam pellentesque nec. Sit amet nisl purus in
                        mollis nunc sed id semper.
                    </p>
                </es-accordion>
            </es-accordion-list>
        </div>

        <div class="mb-500">
            <h2>EsAccordionList props</h2>
            <ds-prop-table :rows="accordionListProps" />
        </div>

        <div class="mb-500">
            <h2>EsAccordion props</h2>
            <ds-prop-table :rows="accordionProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-breadcrumbs.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/breadcrumbs.vue" />
    </div>
</template>

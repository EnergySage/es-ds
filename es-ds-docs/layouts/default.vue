<template>
    <div>
        <div class="d-flex justify-content-center">
            <div class="ds-side-nav d-none d-xl-block flex-shrink-0 p-100">
                <ds-link-list />
            </div>
            <b-container class="pt-xl-100 mx-0">
                <b-row class="mb-100">
                    <b-col cols="12">
                        breadcrumbs
                        <!--<es-breadcrumbs :items="breadcrumbs" />-->
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        cols="12">
                        <slot />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

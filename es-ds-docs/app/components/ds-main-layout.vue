<template>
    <div class="d-flex justify-content-center">
        <es-container class="pt-100 mx-0">
            <es-row>
                <es-col
                    class="d-none d-xl-block"
                    xl="3">
                    <div class="ds-side-nav flex-shrink-0">
                        <ds-link-list />
                    </div>
                </es-col>
                <es-col xl="9">
                    <div class="mb-100">
                        <ds-breadcrumbs />
                    </div>
                    <div class="mb-300">
                        <slot />
                    </div>
                </es-col>
            </es-row>
        </es-container>
    </div>
</template>

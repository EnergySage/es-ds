<template>
    <div>
        <es-sticky-bar>
            <es-container>
                <div class="d-flex justify-content-between py-100 py-lg-200">
                    <p class="mb-0">test content</p>
                    <p class="mb-0">test content</p>
                    <p class="mb-0">test content</p>
                </div>
            </es-container>
        </es-sticky-bar>
        <ds-main-layout>
            <slot />
        </ds-main-layout>
    </div>
</template>

<template>
    <ul class="ds-link-list list-unstyled">
        <li>
            <div class="h4">
                <ds-link to="/"> Home </ds-link>
            </div>
        </li>
        <li>
            <div class="h4">
                <ds-link to="/atoms"> Atoms </ds-link>
            </div>
            <ds-atoms-list class="mb-100" />
        </li>
        <li>
            <div class="h4">
                <ds-link to="/molecules"> Molecules </ds-link>
            </div>
            <ds-molecules-list class="mb-100" />
        </li>
        <li>
            <div class="h4">
                <ds-link to="/examples"> Examples </ds-link>
            </div>
            <ds-examples-list class="mb-100" />
        </li>
    </ul>
</template>

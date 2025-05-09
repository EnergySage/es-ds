<template>
    <form class="w-100">
        <div class="d-flex flex-column flex-md-row mb-100 mb-md-0 w-100">
            <es-form-input
                id="email-subscribe"
                class="flex-grow-1"
                label-sr-only
                placeholder="Enter your email address">
                <template #label> Enter your email address </template>
            </es-form-input>
            <es-button class="ml-md-100">
                Subscribe
                <icon-envelope class="ml-50" />
            </es-button>
        </div>
        <div class="align-items-center d-flex flex-wrap font-size-75 font-size-sm-100">
            <icon-lock-on
                class="flex-shrink-0 mr-50"
                height="1.125rem"
                width="1.125rem" />
            <span class="mr-25 text-nowrap"> Your information is safe with us. </span>
            <a
                href="https://www.energysage.com/privacy-policy/"
                target="_blank">
                Privacy Policy
            </a>
        </div>
    </form>
</template>

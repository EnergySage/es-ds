<template>
    <div>
        <h1>EnergySage Design System</h1>
        <p>
            Our design system is based upon the
            <a
                href="https://getbootstrap.com/docs/4.6/getting-started/introduction/"
                target="_blank">
                Bootstrap 4
            </a>
            and
            <a
                href="https://v3.primevue.org/introduction/"
                target="_blank">
                PrimeVue v3
            </a>
            projects. If something is documented in Bootstrap but not here, it is still very likely you can use it in
            our system. If a component does not exist here but exists in PrimeVue, you may use it, but it will not have
            any styles.
        </p>
        <ul>
            <li>
                <nuxt-link to="/atoms"> Atoms </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/molecules"> Molecules </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/organisms"> Organisms </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/examples"> Examples </nuxt-link>
            </li>
        </ul>
    </div>
</template>

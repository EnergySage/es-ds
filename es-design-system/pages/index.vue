<template>
    <div>
        <h1>
            EnergySage Design System
        </h1>
        <p>
            Our designs system is based upon the
            <b-link href="https://getbootstrap.com/docs/4.6/getting-started/introduction/">
                bootstrap 4
            </b-link> and
            <b-link href="https://bootstrap-vue.org/docs">
                bootstrap-vue
            </b-link> projects. If something is documented in those projects but not here it is
            still very likely you can use it in our system. For example if a component does not exist
            here but exists in
            <b-link href="https://bootstrap-vue.org/docs">
                bootstrap-vue
            </b-link> you are encouraged to use it.
        </p>
        <ul>
            <li>
                <nuxt-link to="/atoms">
                    Atoms
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/molecules">
                    Molecules
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/organisms">
                    Organisms
                </nuxt-link>
            </li>
            <li>
                <nuxt-link to="/examples">
                    Examples
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
};
</script>

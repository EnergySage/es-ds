<template>
    <div>
        <h1>
            Nuxt Module Usage
        </h1>

        <h2>
            es-vue-base Module
        </h2>
        <p>
            Nuxt now suggest
            <b-link
                target="_blank"
                href="https://nuxtjs.org/docs/directory-structure/components/#components-discovery">
                component discovery
            </b-link>
            as the preferred method of importing components into your application. Doing so allows webpack to
            <b-link
                target="_blank"
                href="https://webpack.js.org/guides/tree-shaking/">
                tree shake
            </b-link>
            components the way it determines is most performant. With the use of our included nuxt module you
            can turn on this feature for our design system components.
        </p>
        <h3>
            Auto Include Everything
        </h3>
        <p>
            There are a two main ways to configure the included module. The default configuration is to auto
            import all components and icons. This will allow you to use all possible design system components
            and icons without having to import them manually. When doing a production build you will end up with
            significantly more bundle files; even for unused components. Regardless, the only component bundles
            that are loaded are ones you've used in your application. This is the easiest method by far and requires
            little maintanance going forward. The downside to this can be significantly longer build times. Especially
            when components are being added and updated regularly.
        </p>
        <pre>
            <code>
nuxt.config.ts:
buildModules: [
    '@energysage/es-vue-base/nuxt'
],
            </code>
        </pre>

        <h2>
            Bootstrap-Vue Module
        </h2>
        <p>
            To start we first recommend using bootstrap-vue's
            <b-link
                target="_blank"
                href="https://bootstrap-vue.org/docs/#nuxtjs-module">
                nuxt module
            </b-link>
            and their suggested pattern for
            <b-link
                target="_blank"
                href="https://bootstrap-vue.org/docs/#tree-shaking-with-nuxtjs">
                tree shaking
            </b-link>. With this pattern there is a
            <b-link
                target="_blank"
                href="https://github.com/bootstrap-vue/bootstrap-vue/issues/5713">
                bug
            </b-link>
            that results in bootstrap-vue's icon bundle always being included. Below is one way on how to prevent
            the bundle from being included.
        </p>
        <pre>
            <code>
$ npm install -D null-loader

nuxt.config.ts:
 build: {
    extend(config) {
        // Prevents bootstrap-vue icons from being unitentionally included
        config.module.rules.push({
            test: /bootstrap-vue\/src\/icons\/icons/,
            use: 'null-loader',
        });
    },
},
            </code>
        </pre>
    </div>
</template>

<script>

export default {
    name: 'NuxtModule',
};
</script>

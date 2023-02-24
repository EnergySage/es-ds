import Vue from 'vue';

<% if (typeof options.components === 'boolean' && options.components) { %>
import install from '@energysage/es-vue-base';

install(Vue);

<% } %>

<% if (Array.isArray(options.components) && options.components.length) { %>
import {
    <%= [].concat(
        options.components,
    ).join(',\n  ') %>
} from '@energysage/es-vue-base';

<%= options.components.reduce((acc, c) => (acc += `Vue.component('${c}', ${c});\n` ), '') %>

<% } %>

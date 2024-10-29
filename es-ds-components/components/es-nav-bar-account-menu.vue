<script lang="ts">
export default {
    name: 'EsNavBarAccountMenu',
    props: {
        authItems: {
            type: Array,
            default: () => [],
        },
        loggedOut: {
            type: Object,
            required: true,
        },
    },
};
</script>

<template>
    <div class="icon-dropdown">
        <div class="nav-item">
            <div class="nav-link dropdown-toggle d-none d-lg-flex flex-nowrap py-100">
                <icon-person
                    class="align-self-center account-icon"
                    width="20px"
                    height="20px" />
                <span class="sr-only">
                    {{ loggedOut.menuButtonText }}
                </span>
            </div>
            <div class="menu">
                <ul
                    class="loggedIn dropdown-menu account-menu rounded mt-0 py-100 list-unstyled"
                    style="display: none">
                    <li
                        v-for="item in authItems"
                        :key="item.name">
                        <es-nav-bar-link
                            class="dropdown-item nav-link"
                            :href="item.link">
                            <span class="mx-50">
                                {{ item.name }}
                            </span>
                        </es-nav-bar-link>
                    </li>
                </ul>
                <ul
                    class="loggedOut dropdown-menu account-menu rounded mt-0"
                    style="display: none">
                    <li class="d-flex justify-content-center">
                        <es-button
                            :href="loggedOut.signIn.link"
                            class="m-100 w-100 text-white font-weight-bold">
                            {{ loggedOut.signIn.name }}
                        </es-button>
                    </li>
                    <li class="d-flex justify-content-center">
                        <es-button
                            :href="loggedOut.createAccount.link"
                            :outline="true"
                            class="mx-100 w-100 font-weight-bold">
                            {{ loggedOut.createAccount.name }}
                        </es-button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

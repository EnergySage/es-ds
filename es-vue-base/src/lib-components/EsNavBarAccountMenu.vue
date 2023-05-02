<template>
    <div>
        <li class="icon-dropdown">
            <div class="nav-item">
                <div class="nav-link dropdown-toggle d-none d-lg-flex flex-nowrap py-100">
                    <IconPerson class="align-self-center" />
                    <div class="first-name align-self-center pl-50">
                        Sign in
                    </div>
                </div>
                <div class="menu">
                    <ul
                        class="loggedIn dropdown-menu account-menu rounded mt-0 py-100"
                        style="display: none">
                        <li
                            v-for="item in authItems"
                            :key="item.name">
                            <a
                                class="dropdown-item nav-link"
                                :href="item.link">
                                <span class="mx-50"> {{ item.name }} </span>
                            </a>
                        </li>
                    </ul>
                    <ul
                        class="loggedOut dropdown-menu account-menu rounded mt-0"
                        style="display: none">
                        <a
                            class="d-flex justify-content-around text-decoration-none"
                            :href="loggedOut.signIn.link">
                            <EsButton
                                :outline="true"
                                variant="secondary"
                                class="m-100 w-75">
                                {{ loggedOut.signIn.name }}
                            </EsButton>
                        </a>
                        <li>
                            <a
                                class="d-flex justify-content-around"
                                :href="loggedOut.createAccount.link">
                                <EsButton
                                    variant="link">
                                    {{ loggedOut.createAccount.name }}
                                </EsButton>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </div>
</template>

<script lang="js">
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

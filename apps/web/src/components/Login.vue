<template>
    <div v-if="!loggedIn">
        <NuxtLink class="rounded bg-green p-6 py-2" href="/login">Login</NuxtLink>
    </div>
    <div v-else>
        <ClientOnly>
            <NuxtLink href="/user" @click="reloadPageOnSecondClick('/user')" class="text-md mr-4 hover:text-white">{{userStore.username()}}</NuxtLink>
            <a href="/user/logout" class="rounded bg-red-500 p-4 py-2">Logout</a>
        </ClientOnly>
    </div>
</template>

<script setup>
    import { useUserStore } from '../store/user';
    const loggedIn = useCookie("logged_in").value;
    const userStore = useUserStore();
    if (process.client) {
        if (loggedIn && userStore.userData == undefined) {
            await userStore.getUser();
        }
    }
</script>

<script>
    export default {
        methods: {
            reloadPageOnSecondClick(url) {
                if (this.$route.path == url) {
                    window.location.reload();
                }
            }
        }
    }
</script>
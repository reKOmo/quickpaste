<template>
    <div v-if="!loggedIn">
        <a class="rounded bg-green p-6 py-2" href="/login">Login</a>
    </div>
    <div v-else>
        <ClientOnly>
            <a href="#" class="text-md mr-4">{{userStore.username()}}</a>
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
            console.log(userStore.userData)
        }
    }
</script>